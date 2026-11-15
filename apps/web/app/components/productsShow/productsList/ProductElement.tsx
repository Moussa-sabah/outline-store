'use client'
import Link from "next/link";
import { GoHeart } from "react-icons/go";

import Image from "next/image";
import { Product } from "@repo/types";
import { useCustomerStore } from "@/stores/customer_store";
import { GoHeartFill } from "react-icons/go";

import { useEffect, useState } from "react";
import { useProductStore } from "@/stores/product_store";
interface Props {
    product: Product
}
import { FaWhatsapp } from "react-icons/fa";

export default function ProductElement({ product }: Props) {

    const addProductToWishlist = useCustomerStore(state => state.addProductToWishlist)
    // const addProductToCart = useCartItemStore(state => state.addProductToCart)
    const getProductImages = useProductStore(state => state.getProductImages)
    const [productImage, setProductImage] = useState<string | null>(null)

    // const customer_id = useCustomerStore(state => state.currentUser?.id as string)

    // async function handleAddProductToCart() {
    //     const newCartItem: InsertCartItemPayload = {
    //         customer_id,
    //         product_id: product.id,
    //         quantity: 1
    //     }
    //     const response = await addProductToCart(newCartItem)
    //     console.log(response.message)
    // }



    useEffect(() => {
        async function fetchProductImage() {
            const response = await getProductImages(product.id)
            if (response.status === 'success') {
                setProductImage(response.data[0]?.url ?? null)
            }
            else {
                console.log(response.message)
            }
        }

        fetchProductImage()
    }, [setProductImage, getProductImages, product.id])

    return (
        <Link href={`/product-details/${product.id}`} className=" w-full flex flex-col gap-5 border p-3.5 sm:p-4 xl:p-5 rounded-lg border-borders">
            <div className="relative rounded-md flex items-center justify-center  h-30 productImageH:h-35 xs_sm:h-40 sm:h-50 md:h-55 xl:h-60">
                {product.discount !== 0 && <p className="bg-redColor text-white  absolute top-0 left-0 px-2 py-1 text-xs md:text-[13px] flex items-center justify-center font-bold rounded-md ">{product.discount}%-</p>}

                {productImage && <Image width={800} height={800} alt='' className="  w-full h-full object-contain rounded-lg" src={productImage} />}


            </div>

            <div className="flex flex-col gap-2">

                <p
                    className="  text-xs sm:text-[13px] lg:text-sm capitalize "> {product.gender === 'women' ? 'نسائي' : product.gender === 'men' ? 'رجالي' : 'أطفال'} / {product.brand}
                </p>


                <p className=" xs_sm:text-lg lg:text-xl font-semibold">{product?.title}</p>



                <div className="flex flex-col gap-1">
                    <p className="  lg:text-lg ">{product.final_price.toLocaleString('en-US')} د.ع</p>
                    {product.discount !== 0 && <p className="text-secondary line-through">{product.original_price.toLocaleString('en-US')}</p>}
                </div>
            </div>


        </Link>
    )
}


