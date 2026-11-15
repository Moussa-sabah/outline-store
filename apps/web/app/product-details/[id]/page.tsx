'use client'
import Header from "@/app/components/header/Header";
import ProductImages from '../../components/productDetails/ProductImages'
import ProductInformations from '../../components/productDetails/ProductInformations'
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useProductStore } from "@/stores/product_store";
import { Product, Product_image } from "@repo/types";

export default function ProductDetails() {

    const [product, setProduct] = useState<Product>()
    const getProduct = useProductStore(state => state.getProduct)
    const [images, setImages] = useState<Product_image[]>()
    const getProductImages = useProductStore(state => state.getProductImages)
    const params = useParams()
    const id = params.id as string

    useEffect(() => {
        async function fetchProduct() {
            const response = await getProduct(id)
            if (response.status === 'success') {
                setProduct(response.data)
            }

        }
        async function fectchImages() {
            const response = await getProductImages(id)
            if (response.status === 'success') {
                setImages(response.data)
            }
        }

        fectchImages()
        fetchProduct()
    }, [setProduct, getProduct, id, getProductImages])

    return (
        <main className="flex flex-col  min-h-screen">
            <Header />
            <div className="flex flex-col flex-1   items-center  lg_xl:flex-row lg_xl:items-start  px-5 sm:px-10 lg:px-20 gap-15 lg_xl:gap-5 py-10 md:py-15">
                {(product && images) ? <>
                    <ProductImages images={images as Product_image[]} />
                    <ProductInformations product={product as Product} /></> :
                    <div className="flex-1 flex items-center justify-center">
                        <p className=" text-center text-lg md:text-xl ">جاري التحميل...</p></div>}
            </div>
        </main>
    )
}