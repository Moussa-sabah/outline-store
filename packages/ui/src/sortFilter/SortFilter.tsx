'use client'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronDown } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useState } from "react"
import SortModal from "./SortModal"
import { useFilterStore } from "../../../../apps/web/stores/filters_store"

interface props {
    type: string,
    toggleModal: (genderModalState: boolean, brandModalState: boolean, sortModalState: boolean) => void
    hideModal: () => void
    showSortModal: boolean
}

export default function SortFilter({ type, toggleModal, hideModal, showSortModal }: props) {



    const sort_web = useFilterStore(state => state.sort_web)

    const [sort, setSort] = useState('')
    useEffect(() => {
        if (type === 'web') {
            setSort(sort_web)
        }

    }, [setSort, sort_web, type])

    return (
        <div className="relative">
            <button type="button" onClick={() => toggleModal(false, false, true)} className={`rounded-md border capitalize w-fit cursor-pointer border-borders px-3 flex items-center justify-between  gap-2 py-1 ${sort ? 'font-bold' : ''}`}>
                {sort === 'price: high-low' ? 'السعر الأعلى' : sort === 'price: low-high' ? 'السعر الأقل' : sort === 'newest' ? 'الأحدث' : sort === 'oldest' ? 'الأساسية' : 'ترتيب حسب'}
                <FontAwesomeIcon style={{ fontSize: '10px' }} icon={faChevronDown} className={`${showSortModal ? 'rotate-180' : ''} transition-all`} />
            </button>
            {showSortModal && <SortModal type={type} hideModal={hideModal} />}
        </div>
    )
}
