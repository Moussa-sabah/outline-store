'use client'
import { useCustomerStore } from "@/stores/customer_store";
import Header from "../components/header/Header";
import ProductsList from "../components/productsShow/productsList/ProductsList";
import { useEffect, useState } from "react";
import { Product } from "@repo/types";

export default function Favourite() {
    const currentUserWishlist = useCustomerStore(state => state.currentUser?.wishlist)
    const getWishlistProducts = useCustomerStore(state => state.getWishlistProducts)
    const wishlistItems = useCustomerStore(state => state.wishlistItems)
    const [wishlistProducts, setWishlistProducts] = useState<Product[]>()
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        async function fetchProducts() {

            const response = await getWishlistProducts(currentUserWishlist ? currentUserWishlist : wishlistItems)
            if (response.status === 'success') {
                setWishlistProducts(response.data)
            }
            else {
                console.log(response.message)
            }
            setLoading(false)
        }
        fetchProducts()
    }, [getWishlistProducts, setWishlistProducts, currentUserWishlist, wishlistItems])

    return (
        <main className="flex flex-col min-h-screen">
            <Header />
            <div className="px-5 sm:px-10 lg:px-20 flex flex-col gap-8 py-10 md:py-15  flex-1">
                <h1 className="text-xl md:text-3xl  ">قائمة المفضلة</h1>
                {wishlistProducts?.length ? <ProductsList products={wishlistProducts as Product[]} /> : <div className="flex-1 flex items-center justify-center">
                    <p className=" text-center text-lg md:text-xl ">{loading ? 'جاري التحميل...' : 'قائمة المفضلة لديك فارغة حالياً'}</p></div>}

            </div>
        </main>
    )
}