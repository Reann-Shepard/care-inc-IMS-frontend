export interface Package {
  id?: number;
  clientId?: number;
  fittingDate?: String;
  warrantyExpiration?: String;
  orderCustomerId?: number;
  comments?: string | null;
}
