'use client'
import StatusModal from './StatusModal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { useProductFiltersStore } from '../../../../apps/admin/stores/filters/productFilters_store'
import { useEffect, useState } from 'react'

interface props {
    type: string
}

export default function GenderFilter({  type }: props) {

    const status_dash = useProductFiltersStore((state) => state.status_dash)
    const status_edit = useProductFiltersStore((state) => state.status_edit)
    const [status, setStatus] = useState('')
    useEffect(() => {
        if (type === 'dashboard') {
            setStatus(status_dash)
        }
        else {
            setStatus(status_edit)
        }
    }, [status_dash, status_edit, type])


    const [genderModal, setGenderModal] = useState(false)
    return (
        <div onMouseEnter={() => setGenderModal(true)} onMouseLeave={() => setGenderModal(false)} className=" relative">
            <div className={`rounded-md border capitalize border-borders px-3 flex items-center justify-between  gap-5 py-1  ${status ? 'font-semibold' : 'font-normal'}`}>
                {status ? status : 'status'}
                <FontAwesomeIcon style={{ fontSize: '10px' }} icon={faChevronDown} className={` ${genderModal ? 'rotate-180' : ''} transition-all`} />
            </div>
            {genderModal && <StatusModal  />}
        </div>
    )
}
