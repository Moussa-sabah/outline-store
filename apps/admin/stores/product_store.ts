import type { Product } from "@repo/types";
import { createClient } from "../utils/supabase/client";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import {
  InsertedProductPayload,
  Add_Edit_ProductPayload,
} from "../../../packages/types/Product";

interface ProductState {
  addProduct: (
    product: Add_Edit_ProductPayload,
    files: (File | null)[],
  ) => Promise<{ status: string; message: string }>;
  getProducts: (
    pageSize: number,
    page: number,
    gender: string,
    brand: string,
    createdSort: null | boolean,
    priceSort: null | boolean,
  ) => Promise<
    | { status: string; data: Product[]; count: number | null }
    | { status: string; message: string }
  >;
  editProduct: (
    updatedProduct: Add_Edit_ProductPayload,
    oldProduct: Product,
  ) => Promise<{ status: string; message: string }>;
  checkProductData: (
    product: Add_Edit_ProductPayload,
    files: (File | null)[] | string[],
  ) => void;
  checkChangingProductData: (
    updatedProduct: Add_Edit_ProductPayload,
    oldProduct: Product,
  ) => boolean;
  getProduct: (productId: string) => Promise<
    | {
        status: "error";
        message: string;
      }
    | {
        status: "success";
        data: Product;
      }
  >;
}

export const useProductStore = create<ProductState>()(
  persist(
    (set, get) => ({
      getProducts: async (
        pageSize,
        page,
        gender,
        brand,
        createdSort,
        priceSort,
      ) => {
        const supabase = createClient();
        try {
          const from = (page - 1) * pageSize;
          const to = from + pageSize - 1;
          const query = supabase
            .from("products")
            .select("*", { count: "exact" });
          if (gender) {
            query.eq("gender", gender);
          }
          if (brand) {
            query.eq("brand", brand);
          }
          if (createdSort !== null) {
            query.order("created_at", { ascending: createdSort });
          }
          if (priceSort !== null) {
            query.order("original_price", { ascending: priceSort });
          }

          const {
            data: getProductsData,
            count,
            error: getProductsError,
          } = await query.range(from, to);
          if (getProductsError) {
            throw new Error(getProductsError.message);
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
      checkProductData: (product, files) => {
        if (product.title.length > 60 || product.title.length < 5) {
          throw new Error(
            "The product title must be between 10 and 60 characters long",
          );
        } else if (
          product.description &&
          (product.description.length > 500 || product.description.length < 30)
        ) {
          throw new Error(
            "The product description must be between 30 and 500 characters long",
          );
        } else if (!product.gender || !product.brand) {
          throw new Error("Categories");
        } else if (
          product.original_price < 10 ||
          product.original_price > 50000
        ) {
          throw new Error("Price should be between 10,000 and 50,000 (IQD)");
        }
        //  else if (product.color.length > 20 || product.color.length < 3) {
        //   throw new Error(
        //     "The product color name must be between 3 and 20 characters long",
        //   );
        // }
        else if (product.size < 25 || product.size > 46) {
          throw new Error("Size should be between 25 and 46");
        } else if (files.some((file) => !file)) {
          throw new Error("Upload all images, or delete empty one");
        }
      },
      checkChangingProductData: (updatedProduct, oldProduct) => {
        const check =
          updatedProduct.title !== oldProduct.title ||
          updatedProduct.description !== oldProduct.description ||
          updatedProduct.gender !== oldProduct.gender ||
          updatedProduct.brand !== oldProduct.brand ||
          updatedProduct.status !== oldProduct.status ||
          updatedProduct.original_price !== oldProduct.original_price ||
          updatedProduct.discount !== oldProduct.discount ||
          updatedProduct.quantity !== oldProduct.quantity ||
          updatedProduct.color !== oldProduct.color ||
          updatedProduct.size !== oldProduct.size;

        return check;
      },
      addProduct: async (product, files) => {
        const uploadedFilePaths: string[] = [];
        const supabase = createClient();
        try {
          const validFiles = files as File[];
          get().checkProductData(product, files);

          const imagesUrls = await Promise.all(
            validFiles.map(async (file, index) => {
              const fileType = file.name.split(".").pop();
              const filePath = `${product.title
                .trim()
                .toLowerCase()
                .replace(/[^a-z0-9]/g, "-")
                .replace(/-+/g, "-")}/${crypto.randomUUID()}.${fileType}`;
              const { error: uploadFileError } = await supabase.storage
                .from("product-images")
                .upload(filePath, file, {
                  cacheControl: "3600",
                  upsert: false,
                });
              if (uploadFileError) {
                throw new Error("Failed to upload image");
              }
              uploadedFilePaths.push(filePath);
              const { data: publicUrlData } = supabase.storage
                .from("product-images")
                .getPublicUrl(filePath);

              return {
                url: publicUrlData.publicUrl,
                position: index,
              };
            }),
          );

          const newProduct: InsertedProductPayload = {
            title: product.title,
            description: product.description.trim().replace(/\s+/g, " "),
            gender: product.gender,
            brand: product.brand,
            status: product.status,
            original_price: product.original_price,
            discount: product.discount,
            final_price: product.final_price,
            color: product.color.trim().replace(/\s+/g, " "),
            size: product.size,
            quantity: product.quantity,
            waterproof: product.waterproof,
            strap_material: product.strap_material,
            movement: product.movement,
          };
          const { data: insertProductData, error: insertProductError } =
            await supabase
              .from("products")
              .insert(newProduct)
              .select()
              .single();
          if (insertProductError) {
            throw new Error(insertProductError.message);
          }

          await Promise.all(
            imagesUrls.map(async (image) => {
              const { error: insertImagesError } = await supabase
                .from("product_images")
                .insert({
                  product_id: insertProductData?.id,
                  url: image.url,
                  position: image.position,
                });
              if (insertImagesError) {
                throw new Error(insertImagesError.message);
              }
            }),
          );
          return {
            status: "success",
            message: "Product has been created successfully",
          };
        } catch (error) {
          if (uploadedFilePaths.length > 0) {
            await supabase.storage
              .from("product-images")
              .remove(uploadedFilePaths);
          }

          const err = error as Error;
          return {
            status: "error",
            message: err.message,
          };
        }
      },
      editProduct: async (updatedProduct, oldProduct) => {
        const supabase = createClient();
        const removedPaths: string[] = [];
        const uploadedPaths: string[] = [];
        try {
          get().checkProductData(updatedProduct, []);
          // if (
          //   files.some((f) => f) ||
          //   files.length !== oldProduct.images.length
          // ) {
          //   const updatedImages: (string | undefined)[] = await Promise.all(
          //     oldProduct.images.map(async (img, index) => {
          //       if (files[index]) {
          //         const filePathToDelete: string | undefined = img?.split(
          //           "/public/product-images/",
          //         )[1];

          //         if (filePathToDelete) {
          //           removedPaths.push(filePathToDelete);
          //           const fileType = files[index].name.split(".").pop();
          //           const filePath = `${updatedProduct.title
          //             .trim()
          //             .toLowerCase()
          //             .replace(/[^a-z0-9]/g, "-")
          //             .replace(/-+/g, "-")}/${crypto.randomUUID()}.${fileType}`;
          //           const { error: uploadFileError } = await supabase.storage
          //             .from("product-images")
          //             .upload(filePath, files[index], {
          //               cacheControl: "3600",
          //               upsert: false,
          //             });
          //           if (uploadFileError) {
          //             throw new Error(uploadFileError?.message);
          //           }
          //           uploadedPaths.push(filePath);
          //           const { data: publicUrlData } = supabase.storage
          //             .from("product-images")
          //             .getPublicUrl(filePath);

          //           return publicUrlData.publicUrl;
          //         }
          //       } else if (files[index] === undefined) {
          //         const filePathToDelete: string | undefined = img?.split(
          //           "/public/product-images/",
          //         )[1];

          //         if (filePathToDelete) {
          //           removedPaths.push(filePathToDelete);
          //         }
          //       } else if (files[index] === null) {
          //         return oldProduct.images[index];
          //       }
          //     }),
          //   );

          //   const { error: updateProductError } = await supabase
          //     .from("products")
          //     .update({
          //       title: updatedProduct.title,
          //       description: updatedProduct.description,
          //       gender: updatedProduct.gender,
          //       brand: updatedProduct.brand,
          //       status: updatedProduct.status,
          //       original_price: updatedProduct.original_price,
          //       discount: updatedProduct.discount,
          //       final_price: updatedProduct.final_price,
          //       quantity: updatedProduct.quantity,
          //       color_name: updatedProduct.color_name,
          //       // images: updatedImages,
          //       size: updatedProduct.size,
          //     })
          //     .eq("id", oldProduct.id);
          //   if (updateProductError) {
          //     throw new Error(updateProductError.message);
          //   }
          //   if (removedPaths.length > 0) {
          //     const { error: removePathisError } = await supabase.storage
          //       .from("product-images")
          //       .remove(removedPaths);
          //     if (removePathisError) {
          //       throw new Error(removePathisError.message);
          //     }
          //   }

          //   return {
          //     status: "success",
          //     message: "product updated successfully",
          //   };
          // }
          if (
            // !files.some((f) => f) &&
            get().checkChangingProductData(updatedProduct, oldProduct)
          ) {
            const { error: updateProductError } = await supabase
              .from("products")
              .update({
                title: updatedProduct.title,
                description: updatedProduct.description,
                gender: updatedProduct.gender,
                brand: updatedProduct.brand,
                status: updatedProduct.status,
                original_price: updatedProduct.original_price,
                discount: updatedProduct.discount,
                final_price: updatedProduct.final_price,
                quantity: updatedProduct.quantity,
                color: updatedProduct.color,
                size: updatedProduct.size,
                movement: updatedProduct.movement,
                waterproof: updatedProduct.waterproof,
                strap_material: updatedProduct.strap_material,
              })
              .eq("id", oldProduct.id);
            if (updateProductError) {
              throw new Error(updateProductError.message);
            }
            if (removedPaths.length > 0) {
              const { error: removePathisError } = await supabase.storage
                .from("product-images")
                .remove(removedPaths);
              if (removePathisError) {
                throw new Error(removePathisError.message);
              }
            }
            return {
              status: "success",
              message: "product updated successfully",
            };
          } else {
            throw new Error("don't change anything");
          }
        } catch (error) {
          if (uploadedPaths.length > 0) {
            const { error: removeUploadedPathsError } = await supabase.storage
              .from("product-images")
              .remove(uploadedPaths);
            if (removeUploadedPathsError) {
              return {
                status: "error",
                message: removeUploadedPathsError.message,
              };
            }
          }
          const err = error as Error;
          return {
            status: "error",
            message: err.message,
          };
        }
      },
      getProduct: async (productId) => {
        try {
          const supabase = createClient();
          const { data, error } = await supabase
            .from("products")
            .select()
            .eq("id", productId)
            .single();
          if (error) {
            throw new Error(error.message);
          }
          return {
            status: "success",
            data,
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
