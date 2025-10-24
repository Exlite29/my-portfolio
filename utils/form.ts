export const sanitizeInput = (input: string): string => {
  return input.replace(/</g, "&lt;").replace(/>/g, "&gt;");
};

export const validateEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const validateFormData = (
  name: string,
  email: string,
  message: string
): void => {
  if (!name.trim() || !email.trim() || !message.trim()) {
    throw new Error("All fields are required");
  }
  if (!validateEmail(email)) {
    throw new Error("Please enter a valid email address");
  }
};
