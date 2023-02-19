import { Router } from "express";
import upload from "../lib/multer";
import { getCurrentUserMiddleware } from "../middlewares/auth";
import ImageController from "../controllers/ImageController";

const imagesRouter = Router();

imagesRouter.get(
  "/",
  getCurrentUserMiddleware,
  ImageController.getAllImagesByUser
);
imagesRouter.post(
  "/",
  getCurrentUserMiddleware,
  upload.single("image"),
  ImageController.createNewImage
);
imagesRouter.put(
  "/:imageId",
  getCurrentUserMiddleware,
  ImageController.updateImage
);
imagesRouter.delete(
  "/:imageId",
  getCurrentUserMiddleware,
  ImageController.deleteImage
);

export default imagesRouter;
