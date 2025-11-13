import axios from "axios";

export interface FormData {
  name: string;
  email: string;
  message: string;
}

export interface SubmitStatus {
  success: boolean;
  message: string;
}

export const initialFormData: FormData = {
  name: "",
  email: "",
  message: "",
};

export const initialSubmitStatus: SubmitStatus = {
  success: false,
  message: "",
};

export const contactAPI = process.env.API_CONTACTS;
