import { UseControllerProps, useController } from 'react-hook-form';

interface OrderManufacturerInputProps extends UseControllerProps {
  name: string;
  control: any;
}

const OrderManufacturerInput: React.FC<OrderManufacturerInputProps> = ({
  control,
  name,
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
    />
  );
};

export { OrderManufacturerInput };
