import type { Product, Product_image } from "@repo/types";
import { createClient } from "@/utils/supabase/client";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
interface ProductState {
  productsByfilter: (
    page: number,
    pageSize: number,
    gender: string,
    brand: string,
    sortBy: string,
  ) => Promise<
    | { status: string; data: Product[]; count: number | null }
    | { status: string; message: string }
  >;
  newlyProducts: () => Promise<Product[] | Error>;
  seasonProducts: () => Promise<Product[] | Error>;
  getProduct: (
    productId: string,
  ) => Promise<
    { status: "success"; data: Product } | { status: "error"; message: string }
  >;
  getProductImages: (
    productId: string,
  ) => Promise<
    | { status: "success"; data: Product_image[] }
    | { status: "error"; message: string }
  >;
}

export const useProductStore = create<ProductState>()(
  persist(
    (set) => ({
      productsByfilter: async (page, pageSize, gender, brand, sortBy) => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize - 1;
        const supabase = createClient();
        try {
          let query = supabase
            .from("products")
            .select("*", { count: "exact" })
            .eq("status", "active");
          if (gender) {
            query = query.eq("gender", gender);
          }
          if (brand) {
            query = query.eq("brand", brand);
          }
          if (sortBy === "price: low-high") {
            query = query.order("final_price");
          } else if (sortBy === "price: high-low") {
            query = query.order("final_price", { ascending: false });
          } else if (sortBy === "oldest") {
            query = query.order("created_at", { ascending: true });
          } else {
            query = query.order("created_at", { ascending: false });
          }

          const {
            data: getProductsData,
            count,
            error: getProductsError,
          } = await query.range(from, to);
          if (getProductsError) {
            throw new Error("Can't get products");
          }
          return {
            status: "success",
            data: getProductsData,
            count,
          };
        } catch (error) {
          const err = error as Error;
          return {
            status: "error",
            message: err.message,
          };
        }
      },
      newlyProducts: async () => {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("products")
          .select()
          .order("ctreated_at", { ascending: false })
          .limit(5);
        if (error) return error;
        return data;
      },
      seasonProducts: async () => {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("products")
          .select()
          .eq("collection", "new_season")
          .order("created_at", { ascending: false })
          .limit(5);
        if (error) return error;
        return data;
      },
      getProduct: async (productId) => {
        const supabase = createClient();
        try {
          const { data: getProductData, error: getProductError } =
            await supabase
              .from("products")
              .select("*")
              .eq("id", productId)
              .single();
          if (getProductError) {
            throw new Error(getProductError.message);
          }

          return {
            status: "success",
            data: getProductData,
          };
        } catch (error) {
          const err = error as Error;
          return {
            status: "error",
            message: err.message,
          };
        }
      },
      getProductImages: async (productId) => {
        const supabase = createClient();
        try {
          const { data: getImagesData, error: getImagesError } = await supabase
            .from("product_images")
            .select("*")
            .eq("product_id", productId)
            .order("position", { ascending: true });
          if (getImagesError) {
            throw new Error(getImagesError.message);
          }

          return {
            status: "success",
            data: getImagesData,
          };
        } catch (error) {
          const err = error as Error;
          return {
            status: "error",
            message: err.message,
          };
        }
      },
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
