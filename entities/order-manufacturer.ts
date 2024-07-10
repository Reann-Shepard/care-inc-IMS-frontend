import { z } from 'zod';
import { OrderDevice } from './order-device';
import { deviceSchema } from './Device';

export interface OrderManufacturer {
  id: number;
  amount: number;
  orderDate: Date;
  OrderDevices: OrderDevice[];
}

export const updateOrderManufacturerSchema = z.object({
  id: z.number(),
  amount: z.number(),
  orderDate: z.string(),
  OrderDevices: z.array(
    z.object({
      device: deviceSchema,
      deviceId: z.number().optional(),
      orderManufacturerId: z.number().optional(),
    }),
  ),
});
