import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { LoaderButton, SimpleButton } from "../../buttons";
import { Modal } from "../../ui";
import useDeleteImage from "../../../lib/images/useDeleteImage";

type Props = {
  title: string;
  imageId: string;
  closeModal: () => void;
};

const DeleteImageConfirmation = ({ title, imageId, closeModal }: Props) => {
  const deleteImage = useDeleteImage();

  const handleDelete = () => deleteImage.mutate(imageId);

  useEffect(() => {
    if (deleteImage.isError)
      toast.error("Error al eliminar imagen");
    if (deleteImage.data) closeModal();
  }, [deleteImage.isLoading]);

  return (
    <div>
      <span>
        ¿Estas seguro de eliminar la imagen {" "}
        <strong className="font-semibold">{title}</strong> ?
      </span>
      <div className="flex justify-between mt-8">
        <SimpleButton
          label="Cancel"
          className="bg-gray-500 text-white px-3 py-2"
          onClick={closeModal}
        />
        <LoaderButton
          label="Eliminar"
          className="bg-red-600 text-white px-3 py-2"
          onClick={handleDelete}
          loading={deleteImage.isLoading}
        />
      </div>
    </div>
  );
};

export default DeleteImageConfirmation;
