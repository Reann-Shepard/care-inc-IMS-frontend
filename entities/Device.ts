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
    .string({ required_error: 'Serial Number must be entered!' })
    .toLowerCase()
    .trim()
    .refine(
      async (serialNumber) => {
        const isDuplicate = await checkSerialNumber(serialNumber);
        return !isDuplicate;
      },
      {
        message: 'Serial Number already exists',
      },
    ),
  manufacturerId: z.number(),
  colorId: z.number(),
  typeId: z.number(),
  stockInDate: z.string().nullish(),
  sellDate: z.string().nullish(),
});
