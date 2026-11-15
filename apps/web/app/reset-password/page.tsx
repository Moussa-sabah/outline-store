


'use client'
import React, { useRef, useState } from 'react'
import Header from '../components/header/Header'

import { Button, Message } from '@repo/ui'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { useCustomerStore } from '@/stores/customer_store'
import { useRouter } from 'next/navigation'

export default function ResetPassword() {

    const router = useRouter()
    const [loading, setLoading] = useState<boolean>(false)
    const [newPassword, setNewPassword] = useState<string>('')
    const [showMessage, setShowMessage] = useState(false)
    const [messageText, setMessageText] = useState('')
    const [messageBg, setMessageBg] = useState('')
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const resetPassword = useCustomerStore(state => state.resetPassword)

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
        }
        setLoading(true)
        const response = await resetPassword(newPassword)
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
        else {
            router.replace('/sign-in')
        }
        setLoading(false)
    }
    return (
        <div className='flex flex-col items-center  min-h-screen'>
            <Header />
            <div className='w-full flex-1  flex items-center justify-center'>
                <form onSubmit={handleSubmit} className="font-semibold w-full px-5 xxs_xs:px-10 xs_sm:w-10/12 xs_sm:px-0  sm:w-9/12 md:w-7/12  lg:w-5/12 xl:w-1/4 flex flex-col  justify-center   gap-6 ">
                    <div className='pb-3 flex flex-col gap-4 items-center'>
                        <h1 className="text-xl md:text-2xl font-semibold  ">إعادة تعيين كلمة المرور</h1>
                        <p className='text-xs md:text-[16px] text-center'>يرجى إدخال كلمة المرور الجديدة لحسابك أدناه</p>
                    </div>


                    <div className="flex flex-col flex-1 gap-2 text-sm md:text-[16px]">
                        <label>كلمة المرور الجديدة</label>
                        <input onChange={(e) => setNewPassword(e.target.value)} type="text" className=" outline-none px-3 h-11 border border-borders rounded-md" />
                    </div>
                    {loading ?
                        <p className='bg-primary text-white  h-11  rounded-md flex items-center justify-center '> <FontAwesomeIcon icon={faSpinner} className='animate-spin' /></p> :
                        <Button type="submit" title="حفظ" bg="primary" textColor="white" height="44" textSize="16" />}
                    <Message show={showMessage} text={messageText} bg={messageBg} />
                </form>
            </div>
        </div>
    )
}
