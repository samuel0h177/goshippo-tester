export interface Address {
  name: string;
  street1: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  email?: string;
  phone?: string;
}

export interface Parcel {
  length: string;
  width: string;
  height: string;
  distance_unit: 'in' | 'cm';
  weight: string;
  mass_unit: 'lb' | 'kg';
}

export interface Rate {
  object_id: string;
  amount: string;
  currency: string;
  amount_local: string;
  currency_local: string;
  provider: string;
  provider_image_75: string;
  servicelevel: {
    name: string;
    terms: string;
  };
  estimated_days: number;
  duration_terms?: string;
  attributes: string[];
}

export interface ShipmentResponse {
  object_id: string;
  status: string;
  rates: Rate[];
  messages?: any[];
}

export enum AppStatus {
  IDLE = 'IDLE',
  PARSING = 'PARSING',
  FETCHING_RATES = 'FETCHING_RATES',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}