import { forwardRef, InputHTMLAttributes } from 'react';
import { FieldError } from 'react-hook-form';
import { BiErrorCircle } from 'react-icons/bi';

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: FieldError;
}

const GenericInput = forwardRef<HTMLInputElement, Props>(({ label, className, id, error, name, ...props }, ref) => {
  return (
    <div className={className}>
      {label && <label className='block font-semibold' htmlFor={`${id}`}>{label}:</label>}
      <input name={name} ref={ref} id={`${id}`} className="py-1.5 w-full px-2 rounded-md bg-slate-200" {...props} />
      {error && <p className="text-red-500 text-sm mt-1"> <BiErrorCircle className='mb-0.5 inline mr-1' color='red' />{error.message}</p>}
    </div>
  )
})

GenericInput.displayName = 'GenericInput'

export default GenericInput;