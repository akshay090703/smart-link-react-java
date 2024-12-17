import { FormErrors, ContactFormData } from "./types";

export const validateForm = (formData: ContactFormData): FormErrors => {
  const errors: FormErrors = {};

  if (!formData.name.trim()) {
    errors.name = "Name is required";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.email)) {
    errors.email = "Valid email is required";
  }

  const phoneRegex = /^\d{8,}$/;
  if (!phoneRegex.test(formData.phone.replace(/\D/g, ""))) {
    errors.phoneNumber = "Valid phone number is required (min 8 digits)";
  }

  if (formData.address && !formData.address.trim()) {
    errors.address = "Address is required";
  }

  if (formData.website && !/^https?:\/\/.+/.test(formData.website)) {
    errors.websiteLink = "Valid website URL is required";
  }

  if (formData.socialLink && !/^https?:\/\/.+/.test(formData.socialLink)) {
    errors.linkedInLink = "Valid LinkedIn URL is required";
  }

  return errors;
};
