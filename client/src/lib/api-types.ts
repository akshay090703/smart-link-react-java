export interface SignUpResponse {
  email: string;
  password: string;
  name: string;
  about: string;
  profilePic: string;
  phoneNumber: string;
  enabled: boolean;
  emailVerified: boolean;
  phoneVerified: boolean;
  provider: "SELF" | "GOOGLE" | "GITHUB";
  providerId: string;
  contacts: string[] | null;
}
