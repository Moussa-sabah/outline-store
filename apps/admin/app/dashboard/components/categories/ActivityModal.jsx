
import React from 'react'
import Category from './Category'

export default function ActivityModal({ changeCollection }) {
    return (
        <div className=' absolute left-full top-0 translate-x-5 z-10 flex flex-col gap-2 p-3 font-semibold bg-primary shadow-2xl  rounded-lg w-50'>
            <Category category='Sport & Performance' change={changeCollection} />
            <Category category='Casual & Streetwear' change={changeCollection} />
            <Category category='Formal & Dress' change={changeCollection} />
        </div>
    )
}
