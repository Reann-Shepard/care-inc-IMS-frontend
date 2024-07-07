import { UseControllerProps, useController } from 'react-hook-form';

interface OrderManufacturerInputProps extends UseControllerProps {
  name: string;
  control: any;
  disabled?: boolean;
}

const OrderManufacturerInput: React.FC<OrderManufacturerInputProps> = ({
  control,
  name,
  disabled = false,
}) => {
  const {
    field: { onChange, onBlur, value, ref },
  } = useController({
    name,
    control,
    defaultValue: '',
  });

  return (
    <input
      className="order p-2"
      onChange={onChange}
      onBlur={onBlur}
      value={value}
      ref={ref}
      disabled={disabled}
    />
  );
};

export { OrderManufacturerInput };
