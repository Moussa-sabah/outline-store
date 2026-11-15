'use client'
import React, { useEffect } from 'react'
import { useAdminStore } from '../../../stores/admin_store'
import { useRouter } from 'next/navigation'
export default function Callback() {

    const confirmAdminEmail = useAdminStore(state => state.confirmAdminEmail)
    const router = useRouter()
    useEffect(() => {
        async function fetchConfirmAdminEmail() {
            const response = await confirmAdminEmail()
            if (response.status === 'error') {
                router.replace('/auth/signIn')
            }
            else {
                router.replace('/dashboard/products')
            }
        }
        fetchConfirmAdminEmail()
    }, [router, confirmAdminEmail])
    return (
        <div className='h-screen flex items-center justify-center text-2xl font-semibold'>
            Your account is being confirmed and your data is being set up...
        </div>
    )
}
