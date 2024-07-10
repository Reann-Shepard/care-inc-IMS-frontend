export interface Repair {
  id: number;
  clientId: number;
  manufacturerId: number;
  reason: string;
  shippingDate?: Date;
  shipId: string;
  receivedDate?: Date;
}
