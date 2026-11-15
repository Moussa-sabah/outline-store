import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Customer } from "@repo/types";
import { createClient } from "../utils/supabase/client";

interface UserState {
  getCustomers: (
    customersPerPage: number,
    page: number,
    sort: boolean,
  ) => Promise<
    | { status: string; message: string }
    | { status: string; data: Customer[]; count: number | null }
  >;
}

export const useCustomersStore = create<UserState>()(
  persist(
    (set, get) => ({
      getCustomers: async (customersPerPage, page, sort) => {
        const supabase = createClient();
        try {
          const from: number = (page - 1) * customersPerPage;
          const to: number = from + customersPerPage - 1;
          const {
            data: getCustomersData,
            count,
            error: getCustomersError,
          } = await supabase
            .from("customers")
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
    }),

    {
      name: "user-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
