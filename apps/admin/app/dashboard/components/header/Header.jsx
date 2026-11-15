"use client"
import { faSearch, faChevronUp, faChevronDown, faCloudArrowUp, faRemove, faRotateRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button } from "@repo/ui"
import Link from "next/link"
import { useState } from "react"
import { useAdminStore } from "../../../../stores/admin_store"
import RightSide from "./RightSide"


export default function Header() {



    const [searchingMode, setSearchingMode] = useState('products')
    const [editSearching, setEditSearching] = useState(false)


    function productsSearch() {
        setSearchingMode('products')
        setEditSearching(false)
    }
    function customersSearch() {
        setSearchingMode('customers')
        setEditSearching(false)
    }





    return (
        <main className=" h-[6%]  ">
            <div className="flex items-center justify-between h-full">
                <div onMouseLeave={() => setEditSearching(false)} className="bg-white  h-full  px-4 rounded-full flex items-center gap-3 relative">
                    <FontAwesomeIcon icon={faSearch} className="w-4 h-4 text-secondary" />
                    <input onChange={() => setEditSearching(false)} onClick={() => setEditSearching(false)} type="text" placeholder="Search..." className=" outline-none flex-1  placeholder:text-secondary  w-70" />
                    <button onMouseEnter={() => setEditSearching(true)}><FontAwesomeIcon icon={editSearching ? faChevronUp : faChevronDown} className="w-4 h-4 text-secondary cursor-pointer text-xs" /></button>
                    {editSearching &&
                        <div className="z-10 absolute right-0 top-full pt-1">
                            <div className=" flex flex-col gap-2 bg-white p-3 shadow-2xl text-white text-xs font-semibold rounded-md">
                                <button onClick={productsSearch} className={`${searchingMode === 'products' ? 'bg-primary' : 'bg-secondary  hover:opacity-80 cursor-pointer'} px-3 py-1 rounded-sm `}>Products</button>
                                <button onClick={customersSearch} className={`${searchingMode === 'customers' ? 'bg-primary ' : 'bg-secondary  hover:opacity-80 cursor-pointer'} px-3 py-1 rounded-sm`}>Customers</button>
                            </div>
                        </div>
                    }
                </div>

                    <RightSide/>
 
            </div>
        </main>
    )
}