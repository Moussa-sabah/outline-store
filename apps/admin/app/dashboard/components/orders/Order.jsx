'use client'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSquare } from "@fortawesome/free-regular-svg-icons";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from 'react'
import { faCheckSquare } from "@fortawesome/free-solid-svg-icons"

export default function Order({ checkedAll }) {

    const [checked, setChecked] = useState(false)
    useEffect(() => {
        setChecked(checkedAll)
    }, [checkedAll])



    return (
        <div className="flex  h-15 px-4 gap-4  row items-center  rounded-xl hover:border-borders  border border-white">
            <button className="flex-0 cursor-pointer"><FontAwesomeIcon onClick={() => setChecked(!checked)} icon={checked ? faCheckSquare : faSquare} className={`w-4 h-4 ${checked ? '' : 'text-borders'}`} /></button>
            <p className="flex-1">#1234567</p>
            <p className="flex-3 flex items-center gap-4">
                <img src="/W+NIKE+DUNK+LOW.avif" className="w-8 h-8 rounded-md object-cover border border-lightBorder" />
                Gazella Indoor Shoes
            </p>
            <p className="flex-3 flex items-center gap-4">
                <img src="/young-bearded-man-with-striped-shirt_273609-5677 (2).avif" className="w-6 h-6 rounded-full object-cover border border-lightBorder" />
                Moussa Sabah
            </p>
            <p className="flex-2">Completed</p>
            <p className="flex-1">$399.00</p>
            <p className="flex-1">23-10-2002</p>
            <button className="flex-1 text-center"><FontAwesomeIcon icon={faTrashCan} className="w-4 h-4 text-rose-400 hover:scale-110 cursor-pointer" /></button>
        </div>
    )
}