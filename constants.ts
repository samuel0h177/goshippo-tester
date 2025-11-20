import { Address, Parcel } from "./types";

export const DEFAULT_SENDER: Address = {
  name: "Shawn Ippotle",
  street1: "215 Clayton St.",
  city: "San Francisco",
  state: "CA",
  zip: "94117",
  country: "US",
  email: "shippo@goshippo.com"
};

export const DEFAULT_RECEIVER: Address = {
  name: "Mr. Hippo",
  street1: "965 Mission St",
  city: "San Francisco",
  state: "CA",
  zip: "94103",
  country: "US",
  email: "mrhippo@goshippo.com"
};

export const DEFAULT_PARCEL: Parcel = {
  length: "5",
  width: "5",
  height: "5",
  distance_unit: "in",
  weight: "2",
  mass_unit: "lb"
};

export const MOCK_RATES = [
  {
    object_id: "rate_12345",
    amount: "5.50",
    currency: "USD",
    amount_local: "5.50",
    currency_local: "USD",
    provider: "USPS",
    provider_image_75: "https://shippo-static.s3.amazonaws.com/providers/75/USPS.png",
    servicelevel: {
      name: "Priority Mail",
      terms: ""
    },
    estimated_days: 2,
    attributes: []
  },
  {
    object_id: "rate_67890",
    amount: "12.20",
    currency: "USD",
    amount_local: "12.20",
    currency_local: "USD",
    provider: "FedEx",
    provider_image_75: "https://shippo-static.s3.amazonaws.com/providers/75/FedEx.png",
    servicelevel: {
      name: "Ground",
      terms: ""
    },
    estimated_days: 4,
    attributes: []
  },
  {
    object_id: "rate_54321",
    amount: "24.00",
    currency: "USD",
    amount_local: "24.00",
    currency_local: "USD",
    provider: "UPS",
    provider_image_75: "https://shippo-static.s3.amazonaws.com/providers/75/UPS.png",
    servicelevel: {
      name: "Next Day Air",
      terms: ""
    },
    estimated_days: 1,
    attributes: ["BEST_VALUE"]
  }
];