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

  // New fields
  address: string; // Full address
  certificate: string; // File name of the certificate
  status: string; // Status of the nutritionist, e.g., 'Approuvé'
  addedAt: Date; // Date when the nutritionist was added
}


export enum TrieEnum {
  ALL = 'Tous',
  PlusRecents = 'Plus Récents',
  PlusAnciens = 'Plus Anciens',
}
export enum StatusEnum {
  ALL = 'Tous',
  Approved = 'Approuvé',
  Rejected = 'Rejeté',
  Waiting = 'En attente',
}