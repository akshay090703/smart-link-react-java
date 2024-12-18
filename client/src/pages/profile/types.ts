export interface ProfileData {
  name: string;
  email: string;
  phoneNumber: string;
  about: string;
  profileImage?: string;
}

export interface ProfileForm {
  name: string;
  email?: string;
  phoneNumber?: string;
  about: string;
  profileImage: File | null;
}

export interface ValidationErrors {
  name?: string;
  email?: string;
  phoneNumber?: string;
  about?: string;
}

export const initialData = {
  name: "",
  email: "",
  phoneNumber: "",
  about: "",
  profileImage: null,
};
