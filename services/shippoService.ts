import { Address, Parcel, ShipmentResponse } from "../types";
import { MOCK_RATES } from "../constants";

export const fetchRates = async (
  sender: Address,
  receiver: Address,
  parcel: Parcel,
  apiKey: string
): Promise<ShipmentResponse> => {
  
  // If no API key is provided, return a mock response for demo purposes
  if (!apiKey || apiKey.trim() === "") {
     console.warn("No Shippo API Key provided. Returning Mock Data.");
     // Simulate network delay
     await new Promise(resolve => setTimeout(resolve, 1200));
     return {
       object_id: "mock_shipment_" + Date.now(),
       status: "SUCCESS",
       rates: MOCK_RATES as any
     };
  }

  const payload = {
    address_from: sender,
    address_to: receiver,
    parcels: [parcel],
    async: false
  };

  try {
    const response = await fetch("https://api.goshippo.com/shipments/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `ShippoToken ${apiKey}`
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Shippo API Error:", errorData);
      throw new Error(`Shippo Error: ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();
    return data as ShipmentResponse;

  } catch (error) {
    throw error;
  }
};