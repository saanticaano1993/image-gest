import { ReactNode, useState } from "react";
import { Link } from "react-router-dom";

export type HeaderItemProps = {
  href?: string;
  children: ReactNode;
  isActive?: boolean;
};

function HeaderItem({
  href = "",
  children,
  isActive = false,
}: HeaderItemProps) {
  return (
    <Link to={href}>
      <div className="py-2 group">
        <div className="cursor-pointer font-semibold lg:text-lg 2xl:text-xl ">
          {children}
        </div>
        <div className="w-full flex justify-center rounded-full bottom-0">
          <div
            className={`h-0.5 ${
              isActive ? "w-full" : "w-0"
            } bg-slate-200 group-hover:w-full opacity-75 rounded-full transition-all ease-in duration-200`}
          />
        </div>
      </div>
    </Link>
  );
}

export default HeaderItem;
