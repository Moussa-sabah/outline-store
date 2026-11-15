'use client'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSquare } from "@fortawesome/free-regular-svg-icons";
import { faTrashCan, faCheckSquare } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from 'react'
import { Customer } from "@repo/types";


interface Props {
    checkedAll: boolean,
    customer: Customer
}

export default function CustomerElement({ checkedAll, customer }: Props) {

    const [checked, setChecked] = useState(false)
    useEffect(() => {
        setChecked(checkedAll)
    }, [checkedAll])

    return (
        <div className="flex   px-4   row h-15  items-center  rounded-xl hover:border-borders  border border-white">
            <button className="flex-0 cursor-pointer mr-3"><FontAwesomeIcon onClick={() => setChecked(!checked)} icon={checked ? faCheckSquare : faSquare} className={`w-4 h-4 ${checked ? '' : 'text-borders'}`} /></button>
            <div className="flex-1  whitespace-nowrap overflow-x-auto  ">
                <p className="max-w-2/3  overflow-x-auto scrollbar-none">#{customer.id}</p>
            </div>
            <p className="flex-2 flex items-center gap-4">
                <img src="/young-bearded-man-with-striped-shirt_273609-5677 (2).avif" className="w-6 h-6 rounded-full object-cover border border-lightBorder" />
                {customer.name}
            </p>
            <p className="flex-2">{customer.email}</p>
            <p className='flex-2'>{customer.phone}</p>
            <p className="flex-2">sdfsdf</p>
            <p className="flex-1">{new Date(customer?.created_at).toLocaleDateString('en-CA', {
                day: 'numeric',
                month: 'numeric',
                year: 'numeric'
            })}</p>
            <button className="flex-1 text-center text-sm"><FontAwesomeIcon icon={faTrashCan} className="w-4 h-4 text-red-400 hover:scale-110 cursor-pointer" /></button>

        </div>
    )
}