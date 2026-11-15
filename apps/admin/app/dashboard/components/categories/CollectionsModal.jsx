'use client'
import React from 'react'
import { useState } from 'react'
import Category from './Category'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons'
import ActivityModal from './ActivityModal'

export default function CollectionsModal({changeCollection}) {
    const [activityModal, setActivityModal] = useState(false)
    const showModal = () => {
        setActivityModal(!activityModal)
    }
    return (
        <div className=' absolute z-10 mt-2 flex flex-col gap-3 p-3 font-semibold bg-primary shadow-2xl text-white w-45 rounded-lg'>
            <Category category='New Season' change={changeCollection} />
            <Category category='Best Sellers & Core' change={changeCollection} />
            <Category category='Limited & Exclusives' change={changeCollection} />
            <div className="relative ">
                <button onClick={showModal} className="border-b pb-1 hover:bg-whiteButtonsHover  hover:text-primary hover:px-1 flex items-center justify-between w-full">
                    Shop by Activity
                    <FontAwesomeIcon icon={activityModal ? faCaretLeft : faCaretRight} />
                </button>
                {activityModal && <ActivityModal changeCollection={changeCollection}/>}

            </div>
        </div>
    )
}
