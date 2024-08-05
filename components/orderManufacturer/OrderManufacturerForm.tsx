import { FieldErrors, FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import {
  OrderManufacturer,
  updateOrderManufacturerSchema,
} from '@/entities/order-manufacturer';
import { OrderManufacturerDetailTable } from './OrderManufacturerDetailTable';

interface OrderManufacturerFormProps {
  orderManufacturer: OrderManufacturer;
  onSubmit: (data: OrderManufacturer) => void;
}

const OrderManufacturerForm: React.FC<OrderManufacturerFormProps> = ({
  orderManufacturer,
  onSubmit,
}) => {
  const initialValue = {
    ...orderManufacturer,
    OrderDevices: orderManufacturer.OrderDevices.map((device) => ({
      ...device,
      device: {
        ...device.device,
        serialNumber: device.device.serialNumber || '',
        stockInDate: device.device.stockInDate || undefined,
      },
      deviceId: device.device.id,
      orderManufacturerId: orderManufacturer.id,
    })),
  };
  const methods = useForm<OrderManufacturer>({
    defaultValues: initialValue,
    resolver: zodResolver(updateOrderManufacturerSchema),
  });

  const { handleSubmit, reset } = methods;

  const onError = (errors: FieldErrors<OrderManufacturer>) => {
    console.log('form errors', errors);
  };

  useEffect(() => {
    reset(initialValue, { keepDirty: false });
  }, [orderManufacturer]);

  const handleDiscard = () => {
    reset(initialValue, { keepDirty: false });
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <OrderManufacturerDetailTable orderManufacturer={orderManufacturer} />
        <div className="fixed bottom-5 left-0 right-0 flex justify-between mx-5 mt-4 ">
          <div>
            <button type="submit" className="btn btn-outline btn-info">
              Received
            </button>
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={handleDiscard}
              className="btn btn-outline btn-warning"
            >
              Discard
            </button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export { OrderManufacturerForm };
