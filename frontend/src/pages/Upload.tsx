import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { LoaderButton } from "../components/buttons";
import { GenericInput, ImageInputWithPreview } from "../components/inputs";
import useUploadImage from "../lib/images/useUploadImage";

export type UploadImageInputs = {
  image: File;
  title: string;
};

const Upload = () => {
  const uploadImage = useUploadImage();
 
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UploadImageInputs>();

  const submitHandler = (data: UploadImageInputs) => uploadImage.mutate(data);

  useEffect(() => {
    if (uploadImage.isError)
      toast.error("Error al subir imagen");

    if (uploadImage.data) {
      toast.success("Imagen subida correctamente.")
      reset();
    }
  }, [uploadImage.isLoading])

  return (
    <div className="mt-10">
      <h1 className="text-center text-3xl font-bold">Subir Imagen</h1>
      <form
        className="max-w-sm mx-auto mt-8 px-3 md:px-0 flex flex-col space-y-5"
        onSubmit={handleSubmit(submitHandler)}>
        <Controller
          control={control}
          defaultValue={undefined}
          name="image"
          render={({ field: { onBlur, onChange, value } }) => (
            <ImageInputWithPreview
              onChange={onChange}
              defaultValue={undefined}
              label="Imagen"
              id="image"
              onBlur={onBlur}
              error={errors.image}
            />
          )}
        />
        <GenericInput
          id="title"
          label="Título"
          type="text"
          {...register("title")}
        />

        <LoaderButton
          label="Subir"
          className="px-3 py-2 mt-4 bg-black mx-auto text-white"
          type="submit"
          loading={uploadImage.isLoading}
        />
      </form>
    </div>
  );
};

export default Upload;
