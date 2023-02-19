import React from "react";

type Props = {};

const ImageCardLoader = (props: Props) => {
  return (
    <div>
      <div className="w-42 rounded-md aspect-square bg-slate-200 animate-pulse" />
      <div className="flex mt-1 justify-between py-1 items-center">
        <div className="w-32 h-4 bg-slate-200 animate-pulse" />
        <div className="flex space-x-2">
          <div className="w-6 rounded-sm aspect-square bg-slate-200 animate-pulse" />
          <div className="w-6 rounded-sm aspect-square bg-slate-200 animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default ImageCardLoader;
