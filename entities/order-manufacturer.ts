import { OrderDevice } from './order-device';

export interface OrderManufacturer {
  id: number;
  amount: number;
  orderDate: Date;
  OrderDevices: OrderDevice[];
}
