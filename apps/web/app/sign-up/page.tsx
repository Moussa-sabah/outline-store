'use client'
import { useCustomerStore } from "@/stores/customer_store"
import Header from "../components/header/Header"
import Link from 'next/link'
import { useRef, useState } from "react"
import { CustomerAuthInput } from "@repo/types"
import { Button, Message } from "@repo/ui"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSpinner } from "@fortawesome/free-solid-svg-icons"

import Image from "next/image"

export default function Signup() {

    const signUp = useCustomerStore((state) => state.signUp)
    const signWithGoogle = useCustomerStore((state) => state.signWithGoogle)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false);
    const [showMessage, setShowMessage] = useState(false)
    const [messageText, setMessageText] = useState('')
    const [messageBg, setMessageBg] = useState('')
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const signUpInput: CustomerAuthInput = {
        email: email,
        password: password,
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
        }
        setLoading(true);
        const response = await signUp(signUpInput, name.trim().replace(/\s+/g, " "))
        if (response.status === 'error') {
            setMessageBg('redColor')
        }
        else if (response.status === 'success') {
            setMessageBg('primary')
        }
        setMessageText(response.message)
        setShowMessage(true)
        timeoutRef.current = setTimeout(() => {
            setShowMessage(false)
            setMessageText('')
            setMessageBg('')

        }, 4000);

        setLoading(false);
    }

    return (
        <main className="flex flex-col  min-h-screen    items-center">
            <Header />
            <div className="flex-1 flex items-center justify-center w-full">
                <form onSubmit={handleSubmit} className="font-semibold text-sm md:text-[16px] w-full px-5 xxs_xs:px-10 xs_sm:w-10/12 xs_sm:px-0  sm:w-9/12 md:w-7/12  lg:w-5/12 xl:w-1/4 flex flex-col  justify-center   gap-6  ">

                    <h1 className="text-xl md:text-2xl font-semibold text-center pb-3">إنشاء حساب جديد</h1>

                    <button type="button" onClick={signWithGoogle} className="border border-borders hover:bg-whiteButtonsHover px-3 h-11 rounded-md cursor-pointer flex items-center justify-center gap-2 ">
                        <div className="w-5">
                            <Image alt="" src='google-color-svgrepo-com.svg' width={800} height={800} />
                        </div>
                        المتابعة باستخدام Google
                    </button>
                    <div className="  flex justify-center relative">
                        <hr className="text-borders/70 w-full" />
                        <p className=" absolute -translate-y-1/2 bg-white w-8 text-center">أو</p>
                    </div>
                    <div className="flex flex-col flex-1 gap-1 ">
                        <label>الأسم الكامل</label>
                        <input onChange={(e) => setName(e.target.value)} required type="text" className=" outline-none border border-borders px-3 h-11 rounded-md  " />
                    </div>
                    <div className="flex flex-col flex-1 gap-1">
                        <label>البريد الألكتروني</label>
                        <input onChange={(e) => setEmail(e.target.value)} required type="email" className=" outline-none border border-borders px-3 h-11 rounded-md" />
                    </div>



                    <div className="flex flex-col flex-1 gap-1 ">
                        <label>كلمة المرور</label>
                        <input onChange={(e) => setPassword(e.target.value)} required type="text" className=" outline-none border border-borders px-3 h-11 rounded-md " />
                    </div>


             
                        {loading ?
                            <p className='bg-primary text-white h-11 rounded-md flex items-center justify-center '> <FontAwesomeIcon icon={faSpinner} className='animate-spin' /></p> :
                            <Button type="submit" title="إنشاء الحساب" bg="primary" textColor="white" fullWidth="full" height="44" textSize="16" />}
                
                    <p className="text-center font-normal ">لديك حساب بالفعل؟ <Link href='/sign-in' className="font-semibold">تسجيل الدخول</Link></p>
                    <Message show={showMessage} text={messageText} bg={messageBg} />
                </form>
            </div>
        </main>
    )
}