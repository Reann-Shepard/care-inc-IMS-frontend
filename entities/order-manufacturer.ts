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

export const PostOrderManufacturerSchema = z.object({
  commonManufacturer: z
    .number({
      required_error: 'Manufacturer must be selected',
      invalid_type_error: 'Manufacturer must be selected',
    })
    .nonnegative('Manufacturer must be selected'),
  rows: z.array(
    z.object({
      type: z
        .number({
          required_error: 'Type must be selected',
          invalid_type_error: 'Type must be a number',
        })
        .nonnegative('Type must be selected'),
      color: z
        .number({
          required_error: 'Color must be selected',
          invalid_type_error: 'Color must be a number',
        })
        .nonnegative('Color must be selected'),
    }),
  ),
});
