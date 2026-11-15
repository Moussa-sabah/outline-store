'use client'
import React, { useEffect } from 'react'

import { useRouter } from 'next/navigation'
import { useCustomerStore } from '@/stores/customer_store'
export default function Callback() {

    const confirmCustomerEmail = useCustomerStore(state => state.confirmCustomerEmail)
    const router = useRouter()
    useEffect(() => {
        async function fetchConfirmAdminEmail() {
            const response = await confirmCustomerEmail()
            if (response.status === 'error') {
                console.log(response.message)
                router.replace('/sign-in')
            }
            else {
                router.replace('/')
            }
        }
        fetchConfirmAdminEmail()
    }, [router, confirmCustomerEmail])
    return (
        <div className=' min-h-screen  flex items-center justify-center  font-semibold'>
            <p className='text-center md:text-2xl'> جاري تأكيد حسابك وإعداد بياناتك...</p>
        </div>
    )
}
