export interface Memory {
  id: string;
  thumbnailUrl: string;
  imageUrls: string[]; // Represent a batch of uploaded photos
  imageDescriptions?: string[]; // Optional per-photo narrative
  title: string;
  description: string;
  category: string;
  uploadedBy: string;
  ownerEmail?: string; // The Google Email of the uploader
  date: string;
  passwordHash: string; // bcrypt hash — never send to client
}

// Safe version for client components — sensitive fields stripped
export type ClientMemory = Omit<Memory, 'passwordHash' | 'ownerEmail'>;
