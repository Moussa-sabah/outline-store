'use client'
import React, { useRef } from 'react'
import Header from '../components/admins/Header'
import AdminsList, { AdminsListRef } from '../components/admins/AdminsList'

export default function Admins() {
    const adminsRef = useRef<AdminsListRef>(null)
    return (
        <main className='flex flex-col   relative h-full w-full px-8 py-3 gap-3'>
            <Header refresh={(page) => adminsRef.current?.refresh(page)} />
            <AdminsList ref={adminsRef} />
        </main>
    )
}