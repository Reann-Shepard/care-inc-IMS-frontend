export interface Package {
  clientId: number;
  fittingDate: Date;
  warrantyExpiration: Date;
  orderCustomerId: number;
  comments: string | null;
}
