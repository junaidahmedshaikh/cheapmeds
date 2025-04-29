export type MedicineCategory =
  | "all"
  | "pain-relief"
  | "antibiotics"
  | "cardiovascular"
  | "diabetes"
  | "respiratory";

export interface Medicine {
  id: number;
  name: string;
  description: string;
  category: MedicineCategory;
  imageLink: string;
  // MG1 data
  mg1Price: number;
  mg1Quality: number; // 1-5 rating
  mg1Availability: number; // 1-10 rating
  mg1Formulation: string;
  mg1Delivery: string;

  // Pharma Company data
  pharmaPrice: number;
  pharmaQuality: number; // 1-5 rating
  pharmaAvailability: number; // 1-10 rating
  pharmaFormulation: string;
  pharmaDelivery: string;
}
