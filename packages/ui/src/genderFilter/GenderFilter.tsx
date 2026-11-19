'use client'
import GenderModal from './GenderModal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { useProductFiltersStore } from '../../../../apps/admin/stores/filters/productFilters_store'
import { useEffect, useState } from 'react'
import { useFilterStore } from '../../../../apps/web/stores/filters_store'

interface props {
    type: string
    toggleModal: (genderModalState: boolean, brandModalState: boolean, sortModalState: boolean) => void
    hideModal: () => void
    showGenderModal: boolean
}

export default function GenderFilter({ type, toggleModal, hideModal, showGenderModal }: props) {

    const gender_dash = useProductFiltersStore((state) => state.gender_dash)
    const gender_add = useProductFiltersStore((state) => state.gender_add)
    const gender_edit = useProductFiltersStore((state) => state.gender_edit)
    const gender_web = useFilterStore(state => state.gender_web)
    const [gender, setGender] = useState('')
    useEffect(() => {
        if (type === 'dashboard') {
            setGender(gender_dash)
        }
        else if (type === 'addProduct') {
            setGender(gender_add)
        }
        else if (type === 'editProduct') {
            setGender(gender_edit)
        }
        else if (type === 'web') {
            setGender(gender_web)
        }
    }, [gender_dash, gender_add, gender_edit, type, gender_web])





    return (
        <div className=" relative">
            <button type='button' onClick={() => toggleModal(true, false, false)} className={`rounded-md border capitalize cursor-pointer border-borders px-3 flex items-center justify-between  gap-2 py-1  ${gender ? 'font-bold' : ''}`}>
                {gender === 'men' ? 'رجالي' : gender === 'women' ? 'نسائي' : gender === 'kids' ? 'أطفال' : 'الفئة'}
                <FontAwesomeIcon style={{ fontSize: '10px' }} icon={faChevronDown} className={` ${showGenderModal ? 'rotate-180' : ''} transition-all`} />
            </button>
            {showGenderModal && <GenderModal type={type} hideModal={hideModal} />}
        </div>
    )
}
