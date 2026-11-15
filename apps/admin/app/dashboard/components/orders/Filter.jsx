
import React from 'react'
import { useState } from 'react'

export default function Filter() {

    const [filter, setFilter] = useState('all')

    return (
        <div className="flex gap-5 ">
            <button onClick={() => setFilter('all')} className={` ${filter === 'all' ? 'border-b font-semibold text-primary' : 'text-secondary cursor-pointer hover:border-b'}`}>All</button>
            <button onClick={() => setFilter('incompleted')} className={` ${filter === 'incompleted' ? 'border-b font-semibold text-primary' : 'text-secondary cursor-pointer hover:border-b'}`}>Incompleted</button>
            <button onClick={() => setFilter('pending')} className={` ${filter === 'pending' ? 'border-b font-semibold text-primary' : 'text-secondary cursor-pointer hover:border-b'}`}>Pending</button>
            <button onClick={() => setFilter('refunded')} className={` ${filter === 'refunded' ? 'border-b font-semibold text-primary' : 'text-secondary cursor-pointer hover:border-b'}`}>Refunded</button>
            <button onClick={() => setFilter('finished')} className={` ${filter === 'finished' ? 'border-b font-semibold text-primary' : 'text-secondary cursor-pointer hover:border-b'}`}>Finished</button>
        </div>
    )
}
