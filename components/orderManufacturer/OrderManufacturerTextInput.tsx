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
  const { field } = useController({
    name,
    control,
  });

  console.log('Field error:', name, errors[name]);

  return (
    <div>
      <input
        {...field}
        {...rest}
        name={name}
        value={field.value}
        type={type}
        onChange={field.onChange}
        onBlur={field.onBlur}
        ref={field.ref}
        disabled={disabled}
        style={{ borderColor: errors[name] ? 'red' : 'black' }}
      />
      {errors[name] && (
        <span
          className="text-red-500 font-medium"
          style={{ zIndex: 10, position: 'relative' }}
        >
          {errors[name]?.message as string}
        </span>
      )}
    </div>
  );
};

export { OrderManufacturerTextInput };
