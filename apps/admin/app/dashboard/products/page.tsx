'use client'
import React, { useRef } from 'react'
import Header from '../components/products/Header';
import ProductsList, { ProductsListRef } from '../components/products/ProductsList';

export default function Products() {

    const productsRef = useRef<ProductsListRef>(null);

    return (
        <div className=' flex flex-col   relative h-full w-full px-8 py-3 gap-3'>
            <Header refresh={() => productsRef.current?.refresh()} />
            <ProductsList ref={productsRef} />
        </div>
    )
}
