import React from 'react'
import Category from './Category'

export default function CategoriesModal({ changeCategory }) {
    return (
        <div className=" absolute  z-10 mt-2 flex flex-col gap-3 p-3  bg-primary shadow-2xl text-white w-22 rounded-lg">
            <Category category='Men' change={changeCategory} />
            <Category category='Women' change={changeCategory} />
            <Category category='Kids' change={changeCategory} />
        </div>
    )
}
