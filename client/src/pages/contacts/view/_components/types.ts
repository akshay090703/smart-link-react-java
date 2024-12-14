export interface Contact {
  id: string;
  name: string;
  email: string;
  picture: string;
  phoneNumber: string;
  websiteLink?: string;
  linkedinLink?: string;
  favorite?: boolean;
  description?: string;
  address?: string;
  cloudinaryImagePublicId?: string;
}

export interface FormErrors {
  [key: string]: string;
}

export interface FormData extends Omit<Contact, "id" | "picture"> {}
