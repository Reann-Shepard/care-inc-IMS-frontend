export interface Device {
  id: number;
  serialNumber: string;
  manufacturerId: number;
  colorId: number;
  typeId: number;
  stockInDate: Date;
  sellDate?: Date;
  packageId?: number;
}
