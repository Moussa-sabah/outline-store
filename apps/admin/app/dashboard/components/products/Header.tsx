'use client'
import { faArrowsRotate, faPlus, faFilterCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddProduct from '../addProduct/AddProduct'
import { useState } from 'react'
import { useProductFiltersStore } from "../../../../stores/filters/productFilters_store";
import { BrandFilter, GenderFilter } from "@repo/ui";


interface Props {
    refresh: () => void
}

export default function Header({ refresh }: Props) {



    const addProductFilter = useProductFiltersStore(state => state.addProductFilter)
    const resetFilter = useProductFiltersStore(state => state.resetDashboardFilter)
    const [addModal, setAddModal] = useState(false)
    function openAddModal() {
        setAddModal(true)
        addProductFilter()
    }
    function closeAddModal() {
        setAddModal(false)
    }






    return (
        <main className="flex flex-col justify-center text-sm h-1/10">
            <div className="flex items-center justify-between  ">
                <p className="text-2xl font-semibold">Products</p>
                <div className="flex items-center  gap-3  ">
                    {/* <GenderFilter type="dashboard" />
                    <BrandFilter  type="dashboard" /> */}



                </div>
                <div className="flex items-center gap-3">
                    <FontAwesomeIcon onClick={resetFilter} icon={faFilterCircleXmark} className="text-lg hover:scale-110 transition-all cursor-pointer" />
                    <button onClick={openAddModal} className="bg-primary text-white  h-9  px-4 rounded-full flex items-center gap-3 hover:opacity-90 cursor-pointer font-semibold" >
                        <p>Add Product</p>
                        <FontAwesomeIcon icon={faPlus} className="w-3 h-3 " />
                    </button>
                    <button onClick={refresh} className="border border-borders rounded-full h-8 w-8 hover:border-secondary cursor-pointer flex items-center justify-center">
                        <FontAwesomeIcon icon={faArrowsRotate} className="w-4 h-4 text-secondary " />
                    </button>
                </div>
            </div>

            {addModal && <AddProduct closeAddModal={closeAddModal} />}

        </main>
    )
}