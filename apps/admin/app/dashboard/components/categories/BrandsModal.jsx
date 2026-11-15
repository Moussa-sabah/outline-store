import React from 'react'
import Category from './Category'

export default function BrandsModal({changeBrand}) {
    return (
        <div className='absolute  z-10 mt-2 flex flex-col gap-3 p-3  bg-primary shadow-2xl text-white w-30 rounded-lg'>
            <Category category='Nike' change={changeBrand}/>
            <Category category='Air Jordan' change={changeBrand}/>
            <Category category='Adidas' change={changeBrand}/>
            <Category category='New Balance' change={changeBrand}/>
            <Category category='Skechers' change={changeBrand}/>
        </div>
    )
}
