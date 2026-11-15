import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type {
  AdminAuthInput,
  CreatedAdminPayload,
  InsertedAdminPayload,
  Admin,
} from "@repo/types";
import type {} from "@repo/types";
import { createClient } from "../utils/supabase/client";

interface UserState {
  currentUser: Admin | null;
  // auth

  signIn: (
    signInInput: AdminAuthInput,
  ) => Promise<{ status: string; message: string }>;
  signOut: () => Promise<{ status: string; message: string }>;
  addAdmin: (
    signUpInput: AdminAuthInput,
    newAdmin: CreatedAdminPayload,
    confirmPassword: string,
  ) => Promise<{ status: string; message: string }>;
  confirmAdminEmail: () => Promise<{ status: string; message: string }>;
  changeImage: (
    file: File | null,
  ) => Promise<{ status: string; message: string }>;
  removeImage: () => Promise<{ status: string; message: string }>;
  sendResetPasswordLink: () => Promise<{ status: string; message: string }>;
  resetPassword: (
    newPassword: string,
  ) => Promise<{ status: string; message: string }>;
  getAdmins: (
    adminsPerPage: number,
    page: number,
    sort: boolean,
  ) => Promise<
    | { status: string; message: string }
    | { status: string; data: Admin[]; count: number | null }
  >;
  deleteAdminByManager: (
    adminId: string,
  ) => Promise<{ status: string; message: string }>;
}

export const useAdminStore = create<UserState>()(
  persist(
    (set, get) => ({
      currentUser: null,
      // Auth methods
      signIn: async (signInInput) => {
        const supabase = createClient();
        try {
          const { data: signInData, error: signInError } =
            await supabase.auth.signInWithPassword({
              email: signInInput.email,
              password: signInInput.password,
            });
          if (signInError) {
            throw new Error(signInError.message);
          }
          const userId = signInData.user?.id;
          const { data: getUserData, error: getUserError } = await supabase
            .from("admins")
            .select()
            .eq("id", userId)
            .maybeSingle();
          if (getUserError) {
            await supabase.auth.signOut();
            throw new Error(getUserError.message);
          }
          set({ currentUser: getUserData });
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
          const { error: signOutError } = await supabase.auth.signOut();
          if (signOutError) {
            throw new Error(signOutError.message);
          }
          set({ currentUser: null });
          return {
            status: "success",
            message: "Sign out successfully",
          };
        } catch (error) {
          const err = error as Error;
          return {
            status: "error",
            message: err.message,
          };
        }
      },
      addAdmin: async (signUpInput, newAdmin, confirmPassword) => {
        const supabase = createClient();
        try {
          if (newAdmin.name.length < 5 || newAdmin.name.length > 20) {
            throw new Error(
              "Full name must be between 5 and 20 characters long",
            );
          }
          if (signUpInput.password.length < 8) {
            throw new Error("Password should be at least 8 characters");
          }
          if (signUpInput.password !== confirmPassword) {
            throw new Error("Wrong confirm password");
          }
          const { error: signUpError } = await supabase.auth.signUp({
            email: signUpInput.email,
            password: signUpInput.password,
            options: {
              emailRedirectTo: `${window.location.origin}/auth/callback`,
              data: {
                name: newAdmin.name,
                phone: newAdmin.phone,
              },
            },
          });
          if (signUpError) {
            throw new Error(signUpError.message);
          }
          return {
            status: "success",
            message: "Please check your email and click on confirm link",
          };
        } catch (error) {
          const err = error as Error;
          return {
            status: "error",
            message: err.message,
          };
        }
      },
      confirmAdminEmail: async () => {
        const supabase = createClient();
        try {
          const { data: getUserData, error: getUserError } =
            await supabase.auth.getUser();
          if (getUserError) {
            throw new Error(getUserError.message);
          }

          const admin: InsertedAdminPayload = {
            id: getUserData.user.id,
            name: getUserData.user.user_metadata.name,
            email: getUserData.user.email as string,
            phone: getUserData.user.user_metadata.phone,
            image: "",
            role: "admin",
          };
          const { data: insertUserData, error: insertUserError } =
            await supabase.from("admins").insert(admin).select().single();
          if (insertUserError) {
            console.log(insertUserError.message);
            throw new Error(insertUserError.message);
          }
          set({ currentUser: insertUserData });

          return {
            status: "success",
            message: "Create admin successfully",
          };
        } catch (error) {
          const err = error as Error;
          return {
            status: "error",
            message: err.message,
          };
        }
      },
      changeImage: async (file) => {
        const supabase = createClient();
        let uploadedPath: string = "";
        try {
          if (file) {
            const imageUrl = get().currentUser?.image;
            const filePath: string = `${crypto.randomUUID()}.${file.name.split(".").pop()}`;
            const { error: uploadError } = await supabase.storage
              .from("avatars")
              .upload(filePath, file);
            if (uploadError) {
              throw new Error("Can't upload an image, please try again.");
            }
            uploadedPath = filePath;

            const { data: publicUrlData } = supabase.storage
              .from("avatars")
              .getPublicUrl(filePath);

            const { data: updatedUser, error: updateError } = await supabase
              .from("admins")
              .update({
                image: publicUrlData.publicUrl,
              })
              .eq("id", get().currentUser?.id)
              .select()
              .single();
            if (updateError) {
              throw new Error("Can't update profile, please try again.");
            }
            set({ currentUser: updatedUser });

            if (imageUrl) {
              const filePathToDelete = imageUrl.split("/public/avatars/")[1];
              if (filePathToDelete) {
                const { error: deleteAvatarError } = await supabase.storage
                  .from("avatars")
                  .remove([filePathToDelete]);
                if (deleteAvatarError) {
                  throw new Error("Can't delete an image, please try again.");
                }
              }
            }
          }
          return {
            status: "success",
            message: "Image updated successfully",
          };
        } catch (error) {
          if (uploadedPath) {
            await supabase.storage.from("avatars").remove([uploadedPath]);
          }
          const err = error as Error;
          return {
            status: "error",
            message: err.message,
          };
        }
      },
      removeImage: async () => {
        const supabase = createClient();
        try {
          const imageUrl = get().currentUser?.image;
          if (imageUrl) {
            const filePathToDelete = imageUrl.split("/public/avatars/")[1];
            if (filePathToDelete) {
              const { data: updatedUser, error: updateError } = await supabase
                .from("admins")
                .update({
                  image: "",
                })
                .eq("id", get().currentUser?.id)
                .select()
                .single();
              if (updateError) {
                throw new Error("Can't update profile, please try again.");
              }
              set({ currentUser: updatedUser });
              const { error: deleteAvatarError } = await supabase.storage
                .from("avatars")
                .remove([filePathToDelete]);
              if (deleteAvatarError) {
                throw new Error("Can't delete an image, please try again.");
              }
            }
          }
          return {
            status: "success",
            message: "Image removed successfully",
          };
        } catch (error) {
          const err = error as Error;
          return {
            status: "error",
            message: err.message,
          };
        }
      },
      sendResetPasswordLink: async () => {
        const supabase = createClient();
        try {
          const { error: sendResetPasswordLinkError } =
            await supabase.auth.resetPasswordForEmail(
              get().currentUser?.email as string,
              {
                redirectTo: `${window.location.origin}/auth/reset-password`,
              },
            );

          if (sendResetPasswordLinkError) {
            throw new Error(sendResetPasswordLinkError.message);
          }
          return {
            status: "success",
            message: "Please check your email",
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
            throw new Error("Password should be at least 8 characters");
          }
          const { error: updateUserError } = await supabase.auth.updateUser({
            password: newPassword,
          });
          if (updateUserError) {
            throw new Error(updateUserError?.message);
          }
          return {
            status: "success",
            message: "Password updated successfully",
          };
        } catch (error) {
          const err = error as Error;
          return {
            status: "error",
            message: err.message,
          };
        }
      },
      getAdmins: async (adminsPerPage, page, sort) => {
        const supabase = createClient();
        try {
          const from: number = (page - 1) * adminsPerPage;
          const to: number = from + adminsPerPage - 1;
          const {
            data: getCustomersData,
            count,
            error: getCustomersError,
          } = await supabase
            .from("admins")
            .select("*", { count: "exact" })
            .order("created_at", { ascending: sort })
            .range(from, to);

          if (getCustomersError) {
            throw new Error(getCustomersError.message);
          }

          return {
            status: "success",
            data: getCustomersData,
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
      deleteAdminByManager: async (adminId: string) => {
        const supabase = createClient();
        let adminImagePath = "";
        try {
          if (get().currentUser?.role !== "manager") {
            throw new Error("Only manager can delete admins");
          } else if (get().currentUser?.id === adminId) {
            throw new Error("Can't delete your account");
          }
          const { data: adminToDeleteData, error: adminToDeleteError } =
            await supabase
              .from("admins")
              .select()
              .eq("id", adminId)
              .maybeSingle();
          if (adminToDeleteError) {
            throw new Error("Can't find admin");
          }
          const adminImage: string = adminToDeleteData?.image;
          if (adminImage) {
            adminImagePath = adminImage
              .split("public/avatars/")
              .pop() as string;
          }
          const { error: deleteAdminError } = await supabase
            .from("admins")
            .delete()
            .eq("id", adminId);
          if (deleteAdminError) {
            throw new Error(deleteAdminError.message);
          }

          const { error: removeAdminImageError } = await supabase.storage
            .from("avatars")
            .remove([adminImagePath]);
          if (removeAdminImageError) {
            throw new Error("Can't remove image from storage");
          }

          return {
            status: "success",
            message: "Admin has been deleted",
          };
        } catch (error) {
          const err = error as Error;
          console.log(err.message);
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
