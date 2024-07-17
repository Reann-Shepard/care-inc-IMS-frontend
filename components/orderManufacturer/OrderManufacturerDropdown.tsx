import {
  UseControllerProps,
  useController,
  useFormContext,
} from 'react-hook-form';

interface OrderManufacturerDropdownProps extends UseControllerProps {
  name: string;
  options: { value: string | number; label: string }[];
  disabled?: boolean;
}

const OrderManufacturerDropdown: React.FC<OrderManufacturerDropdownProps> = ({
  name,
  options,
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
  });

  const disabledClass = disabled ? 'select-disabled-black' : '';

  return (
    <>
      <style>
        {`
          .select-disabled-black {
            color: black !important;
          }
        `}
      </style>
      <select
        className={`select select-bordered p-2 w-full ${disabledClass}`}
        {...field}
        {...rest}
        onChange={field.onChange}
        onBlur={field.onBlur}
        value={field.value}
        ref={field.ref}
        disabled={disabled}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {errors[name] && (
        <span className="text-red-500 font-medium">
          {errors[name]?.message as string}
        </span>
      )}
    </>
  );
};

export { OrderManufacturerDropdown };
