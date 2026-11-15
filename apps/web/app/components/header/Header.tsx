'use client'
import { Button } from "@repo/ui";
import Link from "next/link";
import { useCustomerStore } from "@/stores/customer_store";
import { GoPerson } from "react-icons/go";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { GoHeart } from "react-icons/go";
import Image from "next/image";

export default function Header() {
    const router = useRouter();
    const currentUser = useCustomerStore((state) => state.currentUser)
    const [userModal, setUserModal] = useState(false)
    const signOut = useCustomerStore((state) => state.signOut)
    async function handleSignOut() {
        const response = await signOut()
        router.refresh();
        router.push("/");
        console.log(response.message)
    }


    return (
        <main className=" flex items-center justify-between px-5 sm:px-10 lg:px-20 h-18 w-full  border border-borders/60 ">

            <Link href='/'> <Image src='/images/0x7v7Mb8DIDJ8Q4BYqRToX_1794457929545_na1fn_L2hvbWUvdWJ1bnR1L291dGxpbmUtbG9nby1jaXJjbGUtaWNvbi00NjQzNDEtdGlnaHQ.webp' className="w-22 md:w-24   " alt="" width={1000} height={1000} /></Link>

            <div className="flex items-center gap-5">
                <Link href='/wishlist'> <GoHeart className="text-[26px] " /></Link>
                <div className="relative flex flex-col  z-10 " >
                    <button className="cursor-pointer" onClick={() => setUserModal(prev => !prev)} >     <GoPerson className="text-[26px]" /></button>

                    {currentUser ?
                        <button type="button" onClick={handleSignOut} className={`absolute left-0 top-full ${userModal ? 'scale-100' : 'scale-0'}    transition-all bg-redColor text-white mt-2 py-1.5  font-semibold text-xs w-24 rounded-md cursor-pointer hover:opacity-75`}>تسجيل الخروج</button>
                        : <div className={`absolute left-0  top-full pt-2 ${userModal ? 'scale-100' : 'scale-0'}    transition-all text-xs  flex flex-col items-center justify-center   gap-1.5`}>
                            <Link href='/sign-in'>
                                <Button type="button" fontWeight bg="primary" width="100" textColor="white" title="تسجيل الدخول" py="6" /></Link>
                            <Link href='/sign-up'>
                                <Button type="button" fontWeight title="إنشاء حساب" width="100" bg="primary" textColor="white" py="6" /></Link>

                        </div>}



                </div>

            </div>
        </main>
    )
}