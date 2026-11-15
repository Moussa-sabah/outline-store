

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  wishlist: string[];
  created_at: string;
}

export type InsertedCustomerPayload = Omit<Customer, "created_at" | "phone">;

// export interface UpdatedCustomer {
//   name: string;
//   birth: string;
//   phone: string;
// }

export interface CustomerAuthInput {
  email: string;
  password: string;
}
