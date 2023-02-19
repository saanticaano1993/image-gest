import { Request, Response } from "express";
import { ZodError } from "zod";
import { ImageModel } from "../models/ImageModel";
import { queryParamsSchema } from "../validation/pagination";
import { promisify } from "util";
import sizeOf from "image-size";
import { imageUploadSchema, updateImageSchema } from "../validation/image";
import { FilterQuery } from "mongoose";
import { IImage } from "../models/types";

export default {
  getAllImagesByUser,
  createNewImage,
  updateImage,
  deleteImage,
};

async function getAllImagesByUser(req: Request, res: Response) {
  if (!req.user) {
    return res.status(401).json({
      message: "Unauthorized, you must be logged in to view images",
    });
  }

  // Pagination
  let skip = 0;
  let limit = 0;
  let search: string | undefined = "";
  let orderByFilesize: 1 | -1 | undefined = undefined;
  let orderByUploadDate: 1 | -1 = -1;

  const sort: Record<string, 1 | -1> = {};
  try {
    const {
      page,
      limit: limit_,
      search: search_,
      orderByFilesize: orderByFilesize_,
      orderByUploadDate: orderByUploadDate_,
    } = queryParamsSchema.parse(req.query);
    skip = (page - 1) * limit_;
    limit = limit_;
    search = search_;
    orderByFilesize = orderByFilesize_;
    orderByUploadDate = orderByUploadDate_;

    if (orderByFilesize) {
      sort.filesize = orderByFilesize;
    }
    sort.uploadDate = orderByUploadDate;
  } catch (err) {
    if (err instanceof ZodError) {
      return res.status(400).json({
        message: err.message,
      });
    }
  }

  const filter: FilterQuery<IImage> = { authorId: req.user._id };
  // Checking for search string
  let regex: RegExp | undefined = undefined;
  if (search) {
    regex = new RegExp(
      search.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"),
      "gi"
    );

    filter.title = regex;
  }

  const images = await ImageModel.find(filter, { authorId: false })
    .limit(limit)
    .skip(skip)
    .sort(sort);

  const count = await ImageModel.find(filter, { authorId: false }).count();

  return res.json({ images, count });
}

async function createNewImage(req: Request, res: Response) {
  if (!req.user) {
    return res.status(401).json({
      message: "Unauthorized, you must be logged in to create images",
    });
  }

  if (!req.file) {
    return res.status(400).json({
      message: "No file was uploaded",
    });
  }

  let description = "";
  let title = "";
  try {
    const { description: description_, title: title_ } =
      imageUploadSchema.parse(req.body);
    description = description_;
    title = title_;
  } catch (err) {
    if (err instanceof ZodError) {
      return res.status(400).json({
        message: err.message,
      });
    }
  }

  const { path, size } = req.file;
  const dimensions = await promisify(sizeOf)(path);

  const image = await ImageModel.create({
    authorId: req.user._id,
    slug: path,
    filesize: size,
    description,
    title,
    dimensions: {
      width: dimensions?.width,
      height: dimensions?.height,
    },
  });

  res.json(image);
}

async function updateImage(req: Request, res: Response) {
  if (!req.user) {
    return res.status(401).json({
      message: "Unauthorized, you must be logged in to update images",
    });
  }

  const imageId = req.params.imageId;

  let title = "";
  try {
    const { title: title_ } = updateImageSchema.parse(req.body);
    title = title_;
  } catch (err) {
    if (err instanceof ZodError) {
      return res.status(400).json({
        message: err.message,
      });
    }
  }

  const image = await ImageModel.findById(imageId, {
    authorId: true,
  });

  if (!image) {
    return res.status(404).json({
      message: "Image not found",
    });
  }

  if (String(image.authorId) !== String(req.user?._id)) {
    return res.status(401).json({
      message: "Unauthorized, you can only update your own images",
    });
  }

  image.title = title;
  await image.save();

  res.json(image);
}

async function deleteImage(req: Request, res: Response) {
  if (!req.user) {
    return res.status(401).json({
      message: "Unauthorized, you must be logged in to update images",
    });
  }

  const imageId = req.params.imageId;

  const image = await ImageModel.findById(imageId, {
    authorId: true,
  });

  if (!image) {
    return res.status(404).json({
      message: "Image not found",
    });
  }

  if (String(image.authorId) !== String(req.user?._id)) {
    return res.status(401).json({
      message: "Unauthorized, you can only update your own images",
    });
  }

  await image.remove();

  res.status(202).json(image);
}
