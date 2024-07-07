import { UseControllerProps, useController } from 'react-hook-form';

interface OrderManufacturerSelectorProps extends UseControllerProps {
  name: string;
  control: any;
  options: { value: string | number; label: string }[];
  disabled?: boolean;
}

const OrderManufacturerSelector: React.FC<OrderManufacturerSelectorProps> = ({
  control,
  name,
  options,
  disabled = false,
}) => {
  const {
    field: { onChange, onBlur, value, ref },
  } = useController({
    name,
    control,
    defaultValue: '',
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
        onChange={(e) => {
          console.log(`${e.target.value}`);
          onChange(e.target.value);
        }}
        onBlur={onBlur}
        value={value}
        ref={ref}
        disabled={disabled}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </>
  );
};

export { OrderManufacturerSelector };
