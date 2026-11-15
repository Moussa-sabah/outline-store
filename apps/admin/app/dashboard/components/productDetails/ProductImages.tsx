'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useProductStore } from '../../../../stores/product_store'
import { Product } from '@repo/types'

interface Props {
    productId: string
}

export default function ProductImages({ productId }: Props) {

    const getProduct = useProductStore(state => state.getProduct)
    const [product, setProduct] = useState<Product>()
    useEffect(() => {
        async function fetchProduct() {
            const response = await getProduct(productId)
            if (response.status === 'success') {
                setProduct(response.data)
            }
        }
        fetchProduct()
    })

    return (
        <div className=" flex-1 flex gap-2">
            <div className="flex flex-col  gap-2">
                {/* {product?.variants.map((variant,index)=>
                    <Image key={index} alt='' width={800} height={800} src={variant.image} className="h-31 w-31 rounded-xl object-cover border border-borders" />
                )} */}

            </div>
            <div className="flex-8 relative h-130">
                <div className="absolute right-4 bottom-4 flex items-center  gap-2">
                    <img src="/next-arrow-forward-svgrepo-com.svg" className="w-7 h-7 rotate-180 hover:scale-110 transition-all" />
                    <img src="/next-arrow-forward-svgrepo-com.svg" className="w-7 h-7 hover:scale-110 transition-all" />
                </div>
                <img src="/images/W+NIKE+DUNK+LOW.avif" className=" w-full h-130  object-cover rounded-2xl border border-borders" />
            </div>
        </div>
    )
}
