import { z } from 'zod';
import { Color } from './Color';
import { Type } from './Type';
import { Manufacturer } from './manufacturer';
import { checkSerialNumber } from '@/services/orderManufacturer/getOrderManufacturer';

export interface Device {
  id: number;
  serialNumber: string;
  manufacturerId: number;
  colorId: number;
  typeId: number;
  stockInDate?: Date;
  sellDate?: Date;
  packageId?: number;
  manufacturer?: Manufacturer;
  type?: Type;
  color?: Color;
  deleted?: boolean;
}

export const deviceSchema = z.object({
  id: z.number(),
  serialNumber: z
    .string({ message: 'Serial Number must be entered!' })
    .toUpperCase()
    .trim()
    .min(1, { message: 'Serial Number must be entered!' })
    .refine(
      async (serialNumber) => {
        const errorMessage = await checkSerialNumber(serialNumber);
        return !errorMessage;
      },
      {
        message: 'Serial Number already exists!!',
      },
    ),
  manufacturerId: z.number(),
  colorId: z.number(),
  typeId: z.number(),
  stockInDate: z.string().nullish(),
  sellDate: z.string().nullish(),
});

// export const postDeviceSchema = z.object({
//   id: z.number(),
//   serialNumber: z.string(),
//   manufacturerId: z.number(),
//   colorId: z.number(),
//   typeId: z.number(),
//   stockInDate: z.string().nullish(),
//   sellDate: z.string().nullish(),
// });
