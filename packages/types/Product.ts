export interface Product {
  id: string;
  created_at: string;
  title: string;
  description: string;
  gender: string;
  brand: string;
  original_price: number;
  discount: number;
  final_price: number;
  color: string;
  size: number;
  movement:string;
  waterproof:number,
  strap_material:string,
  quantity: number;
  status: string;
}

export type InsertedProductPayload = Omit<Product, "id" | "created_at">;

export type Add_Edit_ProductPayload = Omit<
  Product,
  "id" | "created_at" | "images"
>;
