'use client'
import Link from "next/link"
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react"

export default function Sidebar() {
    const pathname = usePathname()
    const segment = pathname.split("/").filter(Boolean)[1];
    const [page, setPage] = useState(segment ? segment : 'products')

    useEffect(() => {
        setPage(segment ? segment : 'products')
    }, [segment])

    return (
        <main className="bg-white h-screen w-[15%] rounded-r-4xl px-4 py-6 flex flex-col gap-10 ">
            <h1 className="text-2xl font-bold pl-5">Conwere</h1>
            <div className="flex flex-col  font-semibold ">
                <Link href='/dashboard/products' onClick={() => setPage('products')} className={`rounded-full px-5 py-2  cursor-pointer ${page == 'products' ? 'bg-buttons text-white font-semibold' : 'hover:bg-whiteButtonsHover'} `}>Products</Link>
                <Link href='/dashboard/orders' onClick={() => setPage('orders')} className={`rounded-full px-5 py-2  cursor-pointer ${page == 'orders' ? 'bg-buttons text-white font-semibold' : 'hover:bg-whiteButtonsHover'} `}>Orders</Link>
                <Link href='/dashboard/customers' onClick={() => setPage('customers')} className={`rounded-full px-5 py-2   cursor-pointer ${page == 'customers' ? 'bg-buttons text-white font-semibold' : 'hover:bg-whiteButtonsHover'}  `}>Customers</Link>
                <Link href='/dashboard/admins' onClick={() => setPage('admins')} className={`rounded-full px-5 py-2   cursor-pointer ${page == 'admins' ? 'bg-buttons text-white font-semibold' : 'hover:bg-whiteButtonsHover'}  `}>Admins</Link>
            </div>
        </main>
    )
}