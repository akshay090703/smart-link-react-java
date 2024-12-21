export interface EmailDetails {
  sender: string | undefined;
  recipient: string;
  subject: string;
  body: string;
  attachment: File | null;
}
