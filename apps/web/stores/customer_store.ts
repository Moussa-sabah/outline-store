import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type {
  Customer,
  CustomerAuthInput,
  InsertedCustomerPayload,
  // UpdatedCustomer,
  Product,
} from "@repo/types";
import type {} from "@repo/types";
import { createClient } from "@/utils/supabase/client";

interface UserState {
  currentUser: Customer | null;
  wishlistItems: string[];
  // auth
  signWithGoogle: () => Promise<{ status: string; message: string }>;
  signUp: (
    signUpInput: CustomerAuthInput,
    name: string,
  ) => Promise<{ status: string; message: string }>;
  confirmCustomerEmail: () => Promise<{ status: string; message: string }>;
  signIn: (
    signInInput: CustomerAuthInput,
  ) => Promise<{ status: string; message: string }>;
  signOut: () => Promise<{ status: string; message: string }>;

  // editProfile: (
  //   removeAvatar: boolean,
  //   file: File | undefined,
  //   updatedCustomer: UpdatedCustomer,
  // ) => Promise<{ status: string; message: string }>;
  sendResetPasswordLink: (
    email: string,
  ) => Promise<{ status: string; message: string }>;
  resetPassword: (
    newPassword: string,
  ) => Promise<{ status: string; message: string }>;
  addProductToWishlist: (
    productId: string,
  ) => Promise<{ status: string; message: string }>;
  getWishlistProducts: (
    productsIds: string[],
  ) => Promise<
    | { status: "success"; data: Product[] }
    | { status: "error"; message: string }
  >;
}

export const useCustomerStore = create<UserState>()(
  persist(
    (set, get) => ({
      currentUser: null,
      wishlistItems: [],
      // Auth methods
      signWithGoogle: async () => {
        const supabase = createClient();
        try {
          console.log("ues");
          const { error: signError } = await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
              redirectTo: `${window.location.origin}/callback`,
            },
          });
          if (signError) {
            throw new Error(signError.message);
          }
          return {
            status: "success",
            message: "success",
          };
        } catch (error) {
          const err = error as Error;
          return {
            status: "error",
            message: err.message,
          };
        }
      },
      signUp: async (signUpInput, name) => {
        const supabase = createClient();
        try {
          if (name.length < 5 || name.length > 20) {
            throw new Error("يجب أن يكون الاسم الكامل بين 5 و 20 حرفاً");
          }
          if (signUpInput.password.length < 8) {
            throw new Error("يجب أن تتكون كلمة المرور من 8 أحرف على الأقل");
          }
          const { error: signUpError } = await supabase.auth.signUp({
            email: signUpInput.email,
            password: signUpInput.password,
            options: {
              emailRedirectTo: `${window.location.origin}/callback`,
              data: {
                name,
              },
            },
          });
          if (signUpError) {
            throw new Error("حدث خطأ، يرجى إعادة المحاولة");
          }
          return {
            status: "success",
            message:
              "تم إنشاء الحساب بنجاح. أرسلنا رابط التأكيد إلى بريدك الإلكتروني لتفعيل الحساب.",
          };
        } catch (error) {
          const err = error as Error;
          return {
            status: "error",
            message: err.message,
          };
        }
      },
      confirmCustomerEmail: async () => {
        const supabase = createClient();
        try {
          const { data: getUserData, error: getUserError } =
            await supabase.auth.getUser();
          if (getUserError) {
            throw new Error(getUserError.message);
          }

          const { data: findCustomer } = await supabase
            .from("customers")
            .select("*")
            .eq("id", getUserData.user.id)
            .maybeSingle();

          if (findCustomer) {
            if (!get().wishlistItems.length) {
              set({ currentUser: findCustomer });
            } else if (get().wishlistItems.length) {
              const userWishlist = findCustomer.wishlist;
              const newWishlistItems = [];

              for (let i = 0; i < get().wishlistItems.length; i++) {
                if (userWishlist.includes(get().wishlistItems[i])) {
                  continue;
                } else {
                  newWishlistItems.push(get().wishlistItems[i]);
                }
              }

              if (newWishlistItems.length) {
                const { data: updateCustomerData, error: updateCustomerError } =
                  await supabase
                    .from("customers")
                    .update({
                      wishlist: [...userWishlist, ...newWishlistItems],
                    })
                    .eq("id", findCustomer.id)
                    .select("*")
                    .single();

                if (updateCustomerError) {
                  throw new Error("حدث خطأ، يرجى إعادة المحاولة");
                }
                set({ currentUser: updateCustomerData, wishlistItems: [] });
              }
            }
          } else {
            const customer: InsertedCustomerPayload = {
              id: getUserData.user.id,
              name: getUserData.user.user_metadata.name,
              email: getUserData.user.email as string,
              wishlist: get().wishlistItems,
            };
            const { data: insertUserData, error: insertUserError } =
              await supabase
                .from("customers")
                .insert(customer)
                .select()
                .single();
            if (insertUserError) {
              throw new Error(insertUserError.message);
            }
            set({ currentUser: insertUserData });
          }

          return {
            status: "success",
            message: "successfully",
          };
        } catch (error) {
          const err = error as Error;
          return {
            status: "error",
            message: err.message,
          };
        }
      },
      signIn: async (signInInput) => {
        const supabase = createClient();
        try {
          const { data: signInData, error: signInError } =
            await supabase.auth.signInWithPassword({
              email: signInInput.email,
              password: signInInput.password,
            });
          if (signInError) {
            throw new Error("بيانات الدخول غير صحيحة، حاول مجدداً");
          }
          if (signInData.user) {
            const loginUserId = signInData.user?.id;
            const { data: getUserData, error: getUserError } = await supabase
              .from("customers")
              .select()
              .eq("id", loginUserId)
              .single();
            if (getUserError) throw new Error("حدث خطأ، يرجى إعادة المحاولة");

            if (!get().wishlistItems.length) {
              set({ currentUser: getUserData });
            } else if (get().wishlistItems.length) {
              const userWishlist = getUserData.wishlist;
              const newWishlistItems = [];

              for (let i = 0; i < get().wishlistItems.length; i++) {
                if (userWishlist.includes(get().wishlistItems[i])) {
                  continue;
                } else {
                  newWishlistItems.push(get().wishlistItems[i]);
                }
              }

              if (newWishlistItems.length) {
                const { data: updateCustomerData, error: updateCustomerError } =
                  await supabase
                    .from("customers")
                    .update({
                      wishlist: [...userWishlist, ...newWishlistItems],
                    })
                    .eq("id", getUserData.id)
                    .select("*")
                    .single();

                if (updateCustomerError) {
                  throw new Error("حدث خطأ، يرجى إعادة المحاولة");
                }
                set({ currentUser: updateCustomerData, wishlistItems: [] });
              }
            }
          }
          return {
            status: "success",
            message: "Loged in successfully",
          };
        } catch (error) {
          const err = error as Error;
          return {
            status: "error",
            message: err.message,
          };
        }
      },
      signOut: async () => {
        const supabase = createClient();
        try {
          const { error } = await supabase.auth.signOut();
          if (error) {
            throw new Error("حدث خطأ، يرجى إعادة المحاولة");
          }
          set({ currentUser: null });
          return {
            status: "success",
            message: "تم تسجيل الخروج",
          };
        } catch (error) {
          const err = error as Error;
          return {
            status: "error",
            message: err.message,
          };
        }
      },
      // editProfile: async (removeAvatar, file, updatedCustomer) => {
      //   const supabase = createClient();
      //   const imageUrl = get().currentUser?.image;
      //   try {
      //     if (file) {
      //       const imageUrl = get().currentUser?.image;
      //       const filePath: string = `${get().currentUser?.id}.${file.name.split(".").pop()}`;
      //       if (imageUrl) {
      //         const filePathToDelete = imageUrl.split("/public/avatars/")[1];
      //         if (filePathToDelete) {
      //           console.log(filePathToDelete);
      //           const { error: deleteAvatarError } = await supabase.storage
      //             .from("avatars")
      //             .remove([filePathToDelete]);
      //           if (deleteAvatarError) {
      //             throw new Error("Can't delete an image, please try again.");
      //           }
      //         }
      //       }

      //       const { error: uploadError } = await supabase.storage
      //         .from("avatars")
      //         .upload(filePath, file);
      //       if (uploadError) {
      //         throw new Error("Can't upload an image, please try again.");
      //       }
      //       const { data: publicUrlData } = supabase.storage
      //         .from("avatars")
      //         .getPublicUrl(filePath);

      //       const { data: updatedUser, error: updateError } = await supabase
      //         .from("customers")
      //         .update({
      //           name: updatedCustomer.name,
      //           birth: updatedCustomer.birth,
      //           phone: updatedCustomer.phone,
      //           image: publicUrlData.publicUrl,
      //         })
      //         .eq("id", get().currentUser?.id)
      //         .select()
      //         .single();
      //       if (updateError) {
      //         throw new Error("Can't update profile, please try again.");
      //       }
      //       set({ currentUser: updatedUser });
      //     } else if (imageUrl && removeAvatar) {
      //       const filePathToDelete = imageUrl.split("/public/avatars/")[1];
      //       if (filePathToDelete) {
      //         console.log(filePathToDelete);
      //         const { error: deleteAvatarError } = await supabase.storage
      //           .from("avatars")
      //           .remove([filePathToDelete]);
      //         if (deleteAvatarError) {
      //           throw new Error("Can't delete an image, please try again.");
      //         }
      //       }
      //       const { data: updatedUser, error: updateError } = await supabase
      //         .from("customers")
      //         .update({
      //           name: updatedCustomer.name,
      //           birth: updatedCustomer.birth,
      //           phone: updatedCustomer.phone,
      //           image: "",
      //         })
      //         .eq("id", get().currentUser?.id)
      //         .select()
      //         .single();
      //       if (updateError) {
      //         throw new Error("Can't update profile, please try again.");
      //       }
      //       set({ currentUser: updatedUser });
      //     } else if (
      //       !file &&
      //       (updatedCustomer.name !== get().currentUser?.name ||
      //         updatedCustomer.birth !== get().currentUser?.birth ||
      //         updatedCustomer.phone !== get().currentUser?.phone)
      //     ) {
      //       const { data: updatedUser, error: updateError } = await supabase
      //         .from("customers")
      //         .update({
      //           name: updatedCustomer.name,
      //           birth: updatedCustomer.birth,
      //           phone: updatedCustomer.phone,
      //         })
      //         .eq("id", get().currentUser?.id)
      //         .select()
      //         .single();
      //       if (updateError) {
      //         throw new Error("Can't update profile, please try again.");
      //       }

      //       set({ currentUser: updatedUser });
      //     } else {
      //       throw new Error("No changes detected or no image selected.");
      //     }
      //     return {
      //       status: "success",
      //       message: "Profile updated successfully.",
      //     };
      //   } catch (error) {
      //     const err = error as Error;
      //     return {
      //       status: "error",
      //       message: err.message,
      //     };
      //   }
      // },
      sendResetPasswordLink: async (email) => {
        const supabase = createClient();
        try {
          const { error: sendResetPasswordLinkError } =
            await supabase.auth.resetPasswordForEmail(email, {
              redirectTo: `${window.location.origin}/reset-password`,
            });
          if (sendResetPasswordLinkError) {
            throw new Error(
              "يرجى التأكد من عنون البريد الإلكتروني و إعادة المحاولة",
            );
          }
          return {
            status: "success",
            message: "تم إرسال رابط استعادة كلمة المرور إلى بريدك الإلكتروني",
          };
        } catch (error) {
          const err = error as Error;
          return {
            status: "error",
            message: err.message,
          };
        }
      },
      resetPassword: async (newPassword) => {
        const supabase = createClient();
        try {
          if (newPassword.length < 8) {
            throw new Error("يجب أن تتكون كلمة المرور من 8 أحرف على الأقل");
          }
          const { error: updateUserError } = await supabase.auth.updateUser({
            password: newPassword,
          });
          if (updateUserError) {
            throw new Error("حدث خطأ، يرجى إعادة المحاولة");
          }
          const { data: getUserData, error: getUserError } =
            await supabase.auth.getUser();
          if (getUserError) {
            throw new Error("حدث خطأ، يرجى إعادة المحاولة");
          }
          const { data: getCutomerData, error: getCustomerError } =
            await supabase
              .from("customers")
              .select()
              .eq("id", getUserData.user.id)
              .single();
          if (getCustomerError) {
            throw new Error("حدث خطأ، يرجى إعادة المحاولة");
          }
          set({ currentUser: getCutomerData });
          return {
            status: "success",
            message: "تم تغيير كملة المرور",
          };
        } catch (error) {
          const err = error as Error;
          return {
            status: "error",
            message: err.message,
          };
        }
      },
      addProductToWishlist: async (productId) => {
        const supabase = createClient();
        try {
          if (!productId) {
            throw new Error("Not found product");
          }
          if (get().currentUser) {
            const currentWishlist = get().currentUser?.wishlist || [];
            const updatedWishlist: string[] = currentWishlist.includes(
              productId,
            )
              ? currentWishlist.filter((id) => id !== productId)
              : [...currentWishlist, productId];

            const { data: updateCustomerData, error: updateCustomerError } =
              await supabase
                .from("customers")
                .update({ wishlist: updatedWishlist })
                .eq("id", get().currentUser?.id)
                .select()
                .single();

            if (updateCustomerError) {
              throw new Error("Can't update customer");
            }
            set({ currentUser: updateCustomerData });
          } else {
            const currentWishlist = get().wishlistItems;
            const updatedWishlist: string[] = currentWishlist.includes(
              productId,
            )
              ? currentWishlist.filter((id) => id !== productId)
              : [...currentWishlist, productId];
            set({ wishlistItems: updatedWishlist });
          }
          return {
            status: "success",
            message: "added",
          };
        } catch (error) {
          const err = error as Error;
          return {
            status: "error",
            message: err.message,
          };
        }
      },
      getWishlistProducts: async (productsIds) => {
        const supabase = createClient();
        try {
          const products: Product[] = [];
          await Promise.all(
            productsIds.map(async (id) => {
              const { data: getProductData, error: getProductError } =
                await supabase.from("products").select().eq("id", id).single();

              if (getProductError) {
                throw new Error("Not found product");
              }
              products.push(getProductData);
            }),
          );
          return {
            status: "success",
            data: products,
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
