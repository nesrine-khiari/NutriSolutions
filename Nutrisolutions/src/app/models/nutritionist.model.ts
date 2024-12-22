export interface NutritionistModel {
  id: string;
  name: string;
  email: string;
  phone: string;
  profilePictureUrl: string; // Optional
  patientsNumber: number;
  experience: number;
  certifications: string[]; // Array of certifications
  bio: string;
  workingHours?: string; // e.g., "9:00 AM - 5:00 PM"
  location?: string;
  consultationFee: number;
  ratings: number;
  appointments?: string[];
}
