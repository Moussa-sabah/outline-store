import React from 'react'
import Category from '../Category'
import { useProductFiltersStore } from '../../../../apps/admin/stores/filters/productFilters_store'
import { useFilterStore } from '../../../../apps/web/stores/filters_store'

interface props {
    type: string
    hideModal: () => void
}

export default function BrandModal({ type, hideModal }: props) {

    const setBrand_dash = useProductFiltersStore((state) => state.setBrand_dash)
    const setBrand_add = useProductFiltersStore((state) => state.setBrand_add)
    const setBrand_edit = useProductFiltersStore((state) => state.setBrand_edit)
    const setBrand_web = useFilterStore(state => state.setBrand_web)
    function handleBrand(brand: string) {
        hideModal()
        if (type === 'dashboard') {
            setBrand_dash(brand)
        }
        else if (type === 'addProduct') {
            setBrand_add(brand)
        }
        else if (type === 'editProduct') {
            setBrand_edit(brand)
        }
        else if (type === 'web') {
            setBrand_web(brand)
        }
    }

    return (

        <div className={`shadow-2xl z-10  flex flex-col gap-3 p-3  bg-primary text-white  w-26 rounded-md  absolute right-0 top-full mt-1`}>
            <Category category='naviforce' setCategory={handleBrand} />
            <Category category='megir' setCategory={handleBrand} />
        </div>

    )
}
