import { FormData, FormErrors } from "./types";

export const validateForm = (formData: FormData): FormErrors => {
  const errors: FormErrors = {};

  if (!formData.name.trim()) {
    errors.name = "Name is required";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.email)) {
    errors.email = "Valid email is required";
  }

  const phoneRegex = /^\d{8,}$/;
  if (!phoneRegex.test(formData.phoneNumber.replace(/\D/g, ""))) {
    errors.phoneNumber = "Valid phone number is required (min 8 digits)";
  }

  if (formData.address && !formData.address.trim()) {
    errors.address = "Address is required";
  }

  if (formData.websiteLink && !/^https?:\/\/.+/.test(formData.websiteLink)) {
    errors.websiteLink = "Valid website URL is required";
  }

  if (formData.linkedinLink && !/^https?:\/\/.+/.test(formData.linkedinLink)) {
    errors.linkedInLink = "Valid LinkedIn URL is required";
  }

  return errors;
};
