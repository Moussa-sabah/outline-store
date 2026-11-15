
import React from 'react'

export default function Category({ category,change }) {
    return (
        <p onClick={()=>change(category)} className="relative border-b pb-1 border-white/60 hover:bg-whiteButtonsHover hover:text-primary hover:px-1  flex items-center justify-between cursor-pointer">{category}</p>
    )
}
