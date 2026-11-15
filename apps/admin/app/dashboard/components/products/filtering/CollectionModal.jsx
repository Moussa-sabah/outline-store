"use client"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Category from "./Category";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import ActivityModal from './ActivityModal'
import { useState } from 'react'

export default function ({ changeCollection }) {

    const [modal, setModal] = useState(false)

    return (
        <main className="pt-1 absolute">
            <div className="  z-10  flex flex-col gap-3 p-3 font-semibold bg-buttons text-white w-45 rounded-lg">
                <Category category='New Season' change={changeCollection} />
                <Category category='Best Sellers & Core' change={changeCollection} />
                <Category category='Limited & Exclusives' change={changeCollection} />
                <div className="relative ">
                    <button onMouseEnter={()=>setModal(true)} className="border-b pb-1 w-full hover:bg-whiteButtonsHover hover:text-primary hover:px-1 cursor-pointer flex items-center justify-between">
                        Shop by Activity
                        <FontAwesomeIcon icon={faCaretRight} />
                    </button>
                    {modal && <ActivityModal changeCollection={changeCollection}/>}

                </div>

            </div>
        </main>
    )
}