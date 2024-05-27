import { InputHTMLAttributes } from 'react';

interface InputProps {
  label: string;
  errors?: string[];
  name: string;
}

export default function FormInput({
  label,
  errors = [],
  name,
  ...rest
}: InputProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex flex-col gap-2 w-96">
      <label className="form-control">
        <div className="label">
          <span className="label-text font-normal text-white">{label}</span>
        </div>
        <div className="flex flex-col gap-2 w-96">
          <input
            className="rounded-3xl h-11 w-96 focus:outline-none ring-2 focus:ring-4 transition ring-gray-200 focus:ring-amber-500 border-none placeholder:text-neutral-400 py-2 pl-4"
            name={name}
            {...rest}
          />
          {errors.map((error, index) => (
            <span key={index} className="text-amber-500 font-medium">
              {error}
            </span>
          ))}
        </div>
      </label>
    </div>
  );
}
