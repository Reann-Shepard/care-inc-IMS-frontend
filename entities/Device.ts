import { Color } from './Color';
import { Type } from './Type';
import { Manufacturer } from './manufacturer';

export interface Device {
  id: number;
  serialNumber: string;
  manufacturerId: number;
  colorId: number;
  typeId: number;
  stockDate: Date;
  sellDate?: Date;
  packageId?: number;
  manufacturer: Manufacturer;
  type: Type;
  color: Color;
}
