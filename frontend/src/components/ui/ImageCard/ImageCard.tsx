import React from "react";
import { MdDelete, MdEdit } from "react-icons/md";

type Props = {
  url: string;
  title: string;
  id: string;
  onClickEdit: (id: string) => void;
  onClickDelete: (id: string) => void;
};

const ImageCard = ({
  url,
  title,
  id,
  onClickDelete,
  onClickEdit,
}: Props) => {
  return (
    <div className="flex flex-col">
      <div className="rounded-md w-full bg-slate-200 aspect-square overflow-hidden">
        <img src={url} alt={title} className="object-contain w-full h-full" />
      </div>

      <div className="flex mt-1 justify-between py-1 items-center">
        <span className="font-semibold text-lg">{title}</span>
        <div className="flex space-x-2">
          <MdEdit
            className="cursor-pointer"
            onClick={() => onClickEdit(id)}
            size={23}
          />
          <MdDelete
            className="cursor-pointer"
            onClick={() => onClickDelete(id)}
            size={23}
          />
        </div>
      </div>
    </div>
  );
};

export default ImageCard;
