'use client'
import { Button, Message } from "@repo/ui"
import Header from "../components/header/Header"
import Link from 'next/link'
import { useCustomerStore } from "@/stores/customer_store"
import { useRef, useState } from "react"
import { CustomerAuthInput } from "@repo/types"
import { useRouter } from "next/navigation"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSpinner } from "@fortawesome/free-solid-svg-icons"
import Image from "next/image"


export default function SignIn() {

    const router = useRouter()
    const signIn = useCustomerStore((state) => state.signIn)
    const signWithGoogle = useCustomerStore(state => state.signWithGoogle)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [showMessage, setShowMessage] = useState(false)
    const [messageText, setMessageText] = useState('')
    const [messageBg, setMessageBg] = useState('')
    const signinInput: CustomerAuthInput = {
        email, password
    }
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        setLoading(true)
        const response = await signIn(signinInput)
        if (response.status === 'error') {
            setMessageBg('redColor')
            setMessageText(response.message)
            setShowMessage(true)
            timeoutRef.current = setTimeout(() => {
                setShowMessage(false)
                setMessageText('')
                setMessageBg('')

            }, 4000);
        }
        else if (response.status === 'success') {
            router.refresh();
            window.location.href = "/";
        }

        setLoading(false)
    }

    return (
        <main className="flex flex-col   min-h-screen   items-center">
            <Header />
            <div className="w-full flex-1 flex items-center justify-center">
                <form onSubmit={handleSubmit} className=" text-sm md:text-[16px] w-full px-5 xxs_xs:px-10 xs_sm:w-10/12 xs_sm:px-0  sm:w-9/12 md:w-7/12  lg:w-5/12 xl:w-1/4 flex flex-col  justify-center font-semibold   gap-6   ">

                    <h1 className="text-xl md:text-2xl font-semibold text-center pb-3">أهلاً بك مجدداً</h1>

                    <button onClick={signWithGoogle} type="button" className="border border-borders hover:bg-whiteButtonsHover px-3 h-11 rounded-md cursor-pointer flex items-center justify-center gap-2 ">
                        <div className="w-5">
                            <Image alt="" src='google-color-svgrepo-com.svg' width={800} height={800} />
                        </div>
                        المتابعة باستخدام Google
                    </button>
                    <div className="  flex justify-center relative">
                        <hr className="text-borders/70 w-full" />
                        <p className=" absolute -translate-y-1/2 bg-white w-8 text-center">أو</p>
                    </div>
                    <div className="flex flex-col flex-1 gap-2 ">
                        <label>البريد الإلكتروني</label>
                        <input required onChange={(e) => setEmail(e.target.value)} type="email" className=" outline-none px-3 h-11 border border-borders rounded-md" />
                    </div>
                    <div className="flex flex-col flex-1 gap-2 ">
                        <label>كلمة المرور</label>
                        <input required onChange={(e) => setPassword(e.target.value)} type="text" className=" outline-none px-3 h-11 border border-borders rounded-md" />
                        <Link href='/forgot-password' className="text-secondary text-xs border-b w-fit border-borders hover:text-primary">نسيت كلمة المرور؟</Link>
                    </div>

                    {loading ?
                        <p className='bg-primary text-white  h-11 rounded-md flex items-center justify-center '> <FontAwesomeIcon icon={faSpinner} className='animate-spin' /></p> :
                        <Button type="submit" title="تسجيل الدخول" bg="primary" textColor="white" height="44" textSize="16" />}

                    <p className="text-center font-normal">ليس لديك حساب؟ <Link href='/sign-up' className="font-semibold">إنشاء حساب</Link></p>
                    <Message show={showMessage} text={messageText} bg={messageBg} />
                </form>
            </div>
        </main>
    )
}