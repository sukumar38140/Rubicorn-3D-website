export interface JobOpening {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
  dataJob: string;
}

export interface ContactFormValues {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}
