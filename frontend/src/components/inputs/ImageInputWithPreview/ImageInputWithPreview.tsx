import React, { InputHTMLAttributes, useState } from "react";
import { FieldError } from "react-hook-form";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  onChange?: (file: File) => void;
  id: string;
  error?: FieldError;
};

function ImageInputWithPreview({
  label,
  id,
  error,
  onChange,
  ...props
}: Props) {
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImage = e.target.files && e.target.files[0];

    if (!selectedImage) return;

    onChange && onChange(selectedImage as File);

    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setPreviewImage(reader.result as string);
      }
    };
    reader.readAsDataURL(selectedImage);
  };

  return (
    <div className="flex flex-col space-y-3">
      <label htmlFor="img" className="block font-semibold">
        {label}:
      </label>
      {!previewImage && (
        <div className="h-40 aspect-square bg-slate-200 rounded-md grid place-content-center">
          <p className="m-auto">Ninguna Imagen Seleccionada</p>
        </div>
      )}
      <div className="">
        {previewImage && <img src={previewImage} alt="preview" />}
      </div>
      <input
        id="img"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        {...props}
      />
    </div>
  );
}

export default ImageInputWithPreview;
