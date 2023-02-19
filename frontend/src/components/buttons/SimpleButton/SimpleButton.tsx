type Props = {
  label: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

const SimpleButton = ({ onClick , label, className, disabled=false }: Props) => {
  return (
    <button type='button' onClick={onClick} disabled={disabled}
      className={`${className} rounded-md cursor-pointer hover:scale-110 disabled:cursor-not-allowed active:scale-90 transition-transform ease-in-out duration-200`}>
      {label}
    </button>
  )
}

export default SimpleButton