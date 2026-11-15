import { create } from "zustand";

interface ProductFiltersState {
  changeFilter: boolean;
  filterType: "dashboard" | "addProduct" | "editProduct";
  gender_dash: string;
  brand_dash: string;
  collection_dash: string;
  status_dash: string;
  status_edit: string;
  gender_add: string;
  brand_add: string;
  collection_add: string;
  gender_edit: string;
  brand_edit: string;
  collection_edit: string;
  setGender_dash: (gender: string) => void;
  setBrand_dash: (brand: string) => void;
  setCollection_dash: (collection: string) => void;
  setStatus_dash: (status: string) => void;
  setStatus_edit: (status: string) => void;
  unChangeFilter: () => void;
  setGender_add: (gender: string) => void;
  setBrand_add: (brand: string) => void;
  setCollection_add: (collection: string) => void;
  setGender_edit: (gender: string) => void;
  setBrand_edit: (brand: string) => void;
  setCollection_edit: (collection: string) => void;
  addProductFilter: () => void;
  editProductFilter: () => void;
  dashboardFilter: () => void;
  resetDashboardFilter: () => void;
  resetAddProductCategories: () => void;
  resetEditProductCategories: () => void;
}

export const useProductFiltersStore = create<ProductFiltersState>((set) => ({
  changeFilter: false,
  gender_dash: "",
  brand_dash: "",
  collection_dash: "",
  status_dash: "",
  status_edit: "",
  gender_add: "",
  brand_add: "",
  collection_add: "",
  gender_edit: "",
  brand_edit: "",
  collection_edit: "",
  filterType: "dashboard",
  setGender_dash: (gender) => {
    set({ gender_dash: gender });
    set({ changeFilter: true });
  },
  setBrand_dash: (brand) => {
    set({ brand_dash: brand });
    set({ changeFilter: true });
  },
  setCollection_dash: (collection) => {
    set({ collection_dash: collection });
    set({ changeFilter: true });
  },

  setStatus_dash: (status) => set({ status_dash: status }),
  setStatus_edit: (status) => set({ status_edit: status }),
  unChangeFilter: () => set({ changeFilter: false }),
  setGender_add: (gender) => set({ gender_add: gender }),
  setBrand_add: (brand) => set({ brand_add: brand }),
  setCollection_add: (collection) => set({ collection_add: collection }),
  setGender_edit: (gender) => set({ gender_edit: gender }),
  setBrand_edit: (brand) => set({ brand_edit: brand }),
  setCollection_edit: (collection) => set({ collection_edit: collection }),
  dashboardFilter: () => set({ filterType: "dashboard" }),
  addProductFilter: () => set({ filterType: "addProduct" }),
  editProductFilter: () => set({ filterType: "editProduct" }),
  resetDashboardFilter: () => {
    set({ gender_dash: "" });
    set({ brand_dash: "" });
    set({ collection_dash: "" });
  },
  resetAddProductCategories: () => {
    set({ gender_add: "" });
    set({ brand_add: "" });
    set({ collection_add: "" });
  },
  resetEditProductCategories: () => {
    set({ gender_edit: "" });
    set({ brand_edit: "" });
    set({ collection_edit: "" });
  },
}));
