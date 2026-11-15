import { create } from "zustand";

interface ProductFiltersState {
  changeFilter: boolean;
  brand_web: string;
  gender_web: string;
  sort_web: string;
  unChangeFilter: () => void;

  setBrand_web: (brand: string) => void;
  setGender_web: (gender: string) => void;
  setSort_web: (sort: string) => void;
  resetFilters: () => void;
}

export const useFilterStore = create<ProductFiltersState>((set) => ({
  changeFilter: false,
  brand_web: "",
  gender_web: "",
  sort_web: "newest",
  setBrand_web: (brand) => {
    set({ brand_web: brand });
    set({ changeFilter: true });
  },
  setGender_web: (gender) => {
    set({ gender_web: gender });
    set({ changeFilter: true });
  },
  setSort_web: (sort) => {
    set({ sort_web: sort });
    set({ changeFilter: true });
  },
  unChangeFilter: () => set({ changeFilter: false }),
  resetFilters: () => {
    set({ brand_web: "", gender_web: "", sort_web: "newest" });
  },
}));
