
import React from 'react'
import ProductImages from '../../components/productDetails/ProductImages'
import ProductInformations from '../../components/productDetails/ProductInformations'

interface Props {
    params: { productId: string }
}

export default async function ProductDetails({ params }: Props) {

    const { productId } = await params
    return (
        <div className="flex  gap-20 p-8">
          
          <ProductImages productId={productId}/>
          <ProductInformations/>
        </div>
    )
}
