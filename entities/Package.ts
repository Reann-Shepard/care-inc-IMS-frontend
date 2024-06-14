export interface Package {
  id: number;
  clientId: number;
  fittingDate: Date;
  warrantyExpiration: Date;
  orderCustomerId: number;
  comments: string | null;
}
