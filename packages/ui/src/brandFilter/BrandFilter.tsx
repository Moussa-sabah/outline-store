
"use client"
import React, { useEffect } from 'react'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import BrandModal from './BrandModal'
import { useProductFiltersStore } from '../../../../apps/admin/stores/filters/productFilters_store'
import { useFilterStore } from '../../../../apps/web/stores/filters_store'
interface props {
    type: string
    toggleModal: (genderModalState: boolean, brandModalState: boolean, sortModalState: boolean) => void
    hideModal: () => void
    showBrandModal: boolean
}

export default function BrandFilter({ type, toggleModal, hideModal, showBrandModal }: props) {

    const brand_dash = useProductFiltersStore((state) => state.brand_dash)
    const brand_add = useProductFiltersStore((state) => state.brand_add)
    const brand_edit = useProductFiltersStore((state) => state.brand_edit)
    const brand_web = useFilterStore(state => state.brand_web)
    const [brand, setBrand] = useState('')
    useEffect(() => {
        if (type === 'dashboard') {
            setBrand(brand_dash)
        }
        else if (type === 'addProduct') {
            setBrand(brand_add)
        }
        else if (type === 'editProduct') {
            setBrand(brand_edit)
        }
        else if (type === 'web') {
            setBrand(brand_web)
        }
    }, [brand_dash, brand_add, brand_edit, type, brand_web])

    return (
        <div className=" relative">
            <button type='button' onClick={() => toggleModal(false, true, false)} className={`rounded-md border capitalize cursor-pointer border-borders px-3 flex items-center justify-between  gap-2 py-1 ${brand ? ' font-bold' : ''}`}>
                {brand ? brand : 'العلامة التجارية'}
                <FontAwesomeIcon style={{ fontSize: '10px' }} icon={faChevronDown} className={`${showBrandModal ? 'rotate-180' : ''} transition-all`} />
            </button>
            {showBrandModal && <BrandModal type={type} hideModal={hideModal} />}

        </div>
    )
}
