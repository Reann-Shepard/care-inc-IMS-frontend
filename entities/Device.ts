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
}
