import { ButtonHTMLAttributes } from "react";
import { LoadingSpinner } from "../../loaders";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
  loading?: boolean;
};

const LoaderButton = ({
  label,
  onClick,
  loading,
  disabled,
  className,
  ...extras
}: Props) => {
  return (
    <button
      className={`rounded-md w-fit ${
        disabled ? "cursor-not-allowed" : "cursor-pointer hover:scale-110"
      } active:scale-90 transition-transform ease-in-out duration-200 flex ${className}`}
      disabled={disabled}
      onClick={onClick}
      {...extras}>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <span className={`${loading ? "invisible" : "visible"} `}>{label}</span>
      )}
    </button>
  );
};

export default LoaderButton;
