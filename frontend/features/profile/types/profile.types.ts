export interface Profile {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number?: string;
  role: "user" | "admin";
  createdAt: string;
}