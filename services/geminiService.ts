import { GoogleGenAI, Type } from "@google/genai";
import { Address } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const parseAddressWithGemini = async (rawText: string): Promise<Address> => {
  if (!process.env.API_KEY) {
    throw new Error("Gemini API Key is missing");
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Parse the following address text into a structured JSON object. 
      If a field is missing, make a best guess or leave it as an empty string.
      Input text: "${rawText}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            street1: { type: Type.STRING },
            city: { type: Type.STRING },
            state: { type: Type.STRING },
            zip: { type: Type.STRING },
            country: { type: Type.STRING },
            email: { type: Type.STRING },
            phone: { type: Type.STRING },
          },
          required: ["street1", "city", "country"],
        },
      },
    });

    const jsonText = response.text;
    if (!jsonText) throw new Error("No response from Gemini");
    
    const parsed = JSON.parse(jsonText) as Address;
    return parsed;

  } catch (error) {
    console.error("Gemini Parsing Error:", error);
    throw new Error("Failed to parse address with AI.");
  }
};