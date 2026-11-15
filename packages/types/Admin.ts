export interface Admin {
  id: string;
  name: string;
  email: string;
  phone: string;
  image: string;
  role: string;
  created_at: string;

}

export type CreatedAdminPayload = Omit<
  Admin,
  "id" | "email" | "role" | "image" | "created_at"
>;

export type InsertedAdminPayload = Omit<Admin, "created_at">;

export interface AdminAuthInput {
  email: string;
  password: string;
}
