'use client'
import Order from "./Order";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSquare } from "@fortawesome/free-regular-svg-icons";
import { faCheckSquare } from "@fortawesome/free-solid-svg-icons"
import { useState } from 'react'

export default function OrdersList() {

    const [checkedAll, setCheckedAll] = useState(false)

    return (
        <main className="font-semibold text-sm">
            <div className="flex   items-center py-2 px-4 gap-4  border  rounded-lg">
                <button className="flex-0 text-sm"><FontAwesomeIcon onClick={() => setCheckedAll(!checkedAll)} icon={checkedAll ? faCheckSquare : faSquare} className={`cursor-pointer ${checkedAll?'text-primary':'text-secondary'}`}  /></button>
                <p className="flex-1">#Id</p>
                <p className="flex-3">Product </p>
                <p className="flex-3">Customer</p>
                <p className="flex-2">Status</p>
                <p className='flex-1'>Amount</p>
                <p className="flex-1">Date</p>
                <p className="flex-1 text-center">Action</p>

            </div>
            <div className='tabelContainer '>

                <Order checkedAll={checkedAll} />
                <Order checkedAll={checkedAll} />
                <Order checkedAll={checkedAll} />
                <Order checkedAll={checkedAll} />

            </div>

        </main>
    )
}