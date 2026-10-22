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

/** Which API the chat panel posts to. Relative → same origin by default. */
export const CONTACT_ENDPOINT =
  process.env.NEXT_PUBLIC_CONTACT_API ?? "/api/contact";
