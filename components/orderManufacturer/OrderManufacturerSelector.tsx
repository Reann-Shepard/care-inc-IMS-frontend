import { UseControllerProps, useController } from 'react-hook-form';

interface OrderManufacturerSelectorProps extends UseControllerProps {
  name: string;
  control: any;
  options: { value: string | number; label: string }[];
}

const OrderManufacturerSelector: React.FC<OrderManufacturerSelectorProps> = ({
  control,
  name,
  options,
}) => {
  const {
    field: { onChange, onBlur, value, ref },
  } = useController({
    name,
    control,
    defaultValue: '',
  });

  return (
    <select
      className="select select-bordered p-2"
      onChange={(e) => {
        console.log(`${e.target.value}`);
        onChange(e.target.value);
      }}
      onBlur={onBlur}
      value={value}
      ref={ref}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export { OrderManufacturerSelector };
