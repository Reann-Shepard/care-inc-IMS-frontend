import React, { InputHTMLAttributes } from 'react';
import { useController, useFormContext } from 'react-hook-form';

interface InputProps {
  name: string;
  label?: string;
  required?: boolean;
  value?: string;
  type?: string;
  disabled?: boolean;
  errors?: string[];
}

export const InputWithUseForm: React.FC<InputProps> = ({
  name,
  label,
  required = false,
  type = 'text',
  disabled = false,
  ...rest
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const { field } = useController({
    name,
    control,
    rules: { required: required ? `{label} is required` : false },
  });

  const errorMessage = errors[name] ? (errors[name]?.message as string) : '';
  return (
    <div className="flex flex-col gap-2 w-96">
      <label className="flex items-center gap-4">
        {' '}
        <span className="label-text font-normal min-w-32">{label} : </span>
        <input
          {...field}
          type={type}
          disabled={disabled}
          className="rounded-3xl h-9 w-full focus:outline-none ring-2 focus:ring-4 transition ring-gray-200 focus:ring-amber-500 border-none placeholder:text-neutral-400 py-2 pl-4"
          {...rest}
        />
      </label>
      {errorMessage && (
        <span className="text-amber-500 font-medium">{errorMessage}</span>
      )}
    </div>
  );
};
