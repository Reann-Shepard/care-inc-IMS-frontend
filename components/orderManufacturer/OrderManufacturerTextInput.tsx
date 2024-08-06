import { InputHTMLAttributes } from 'react';
import { useController, useFormContext } from 'react-hook-form';

interface OrderManufacturerTextInputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  disabled?: boolean;
  value?: string | number;
  type?: string;
}

const OrderManufacturerTextInput: React.FC<OrderManufacturerTextInputProps> = ({
  name,
  disabled = false,
  type = 'text',
  ...rest
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const { field, fieldState } = useController({
    name,
    control,
  });

  const error = fieldState.error;

  return (
    <div className="relative">
      <input
        {...field}
        {...rest}
        name={name}
        value={field.value || ''}
        type={type}
        onChange={field.onChange}
        onBlur={field.onBlur}
        ref={field.ref}
        disabled={disabled}
        style={{ borderColor: error ? 'red' : 'black' }}
        className="input-sm m-2"
      />
      {error && (
        <span className="text-red-500 font-medium absolute -bottom-3 left-0">
          {error.message}
        </span>
      )}
    </div>
  );
};

export { OrderManufacturerTextInput };
