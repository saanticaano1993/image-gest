import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { LoaderButton } from "../../buttons";
import { GenericInput } from "../../inputs";
import useUpdateTitle from "../../../lib/images/useUpdateTitle";

type Props = {
  defaultTitle: string;
  imageId: string;
  closeModal: () => void;
};

type FormInput = {
  title: string;
};

const EditTitleForm = ({ defaultTitle, imageId, closeModal }: Props) => {
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<FormInput>({
    defaultValues: { title: defaultTitle },
  });

  const updateTitle = useUpdateTitle();

  const handleUpdate = (data: FormInput) =>
    updateTitle.mutate({ imageId, title: data.title });

  useEffect(() => {
    if (updateTitle.isError)
      toast.error("Error al actualizar título");
    if (updateTitle.isSuccess) closeModal();
  }, [updateTitle.isLoading]);

  return (
    <form
      className="mt-5 flex flex-col space-y-3"
      onSubmit={handleSubmit(handleUpdate)}>
      <GenericInput
        id="title"
        label="Título"
        error={errors.title}
        {...register("title", { required: true, min: 10 })}
      />

      <LoaderButton
        type="submit"
        className="px-3 py-2 mt-4 bg-black text-white"
        loading={updateTitle.isLoading}
        disabled={watch("title").trim() === defaultTitle}
        label="Actualizar"
      />
    </form>
  );
};

export default EditTitleForm;
