'use client';

import {
  OrderManufacturer,
  updateOrderManufacturerSchema,
} from '@/entities/order-manufacturer';
import { useEffect, useState } from 'react';
import { getOrderManufacturerById } from '@/services/orderManufacturer/getOrderManufacturer';
import { OrderManufacturerForm } from './OrderManufacturerForm';
import { usePathname, useRouter } from 'next/navigation';
import { updateOrderManufacturerById } from '@/services/orderManufacturer/addOrderManufacturer';

const OrderManufacturerDetail = () => {
  const pathname = usePathname();
  const id = pathname.split('/').pop();
  const [orderManufacturer, setOrderManufacturer] =
    useState<OrderManufacturer | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchOrderManufacturer() {
      if (id) {
        const data = await getOrderManufacturerById(Number(id));
        setOrderManufacturer(data);
      }
    }
    fetchOrderManufacturer();
  }, [id]);

  const onSubmit = async (data: OrderManufacturer) => {
    const amount = data.OrderDevices.length;
    const updateData = {
      ...data,
      amount,
      OrderDevices: data.OrderDevices.map((od: any) => ({
        deviceId: Number(od.device.id),
        orderManufacturerId: Number(id),
        device: {
          id: od.device.id,
          serialNumber: od.device.serialNumber,
          manufacturerId: Number(od.device.manufacturerId),
          colorId: Number(od.device.colorId),
          typeId: Number(od.device.typeId),
          stockInDate: od.device.stockInDate || new Date().toISOString(),
        },
      })),
    };

    try {
      await updateOrderManufacturerById(Number(id), updateData);
      router.push('/order-manufacturer');
    } catch (error) {
      console.error('Error updating order manufacturer:', error);
    }
  };

  if (!orderManufacturer) {
    return <div>Loading...</div>;
  }

  return (
    <OrderManufacturerForm
      orderManufacturer={orderManufacturer}
      onSubmit={onSubmit}
    />
  );
};

export { OrderManufacturerDetail };
