'use client'
import Header from '../components/customers/Header'
import CustomersList, { CustomersListRef } from '../components/customers/CustomersList'
import { useRef } from 'react';
export default function Customers() {

    const productsRef = useRef<CustomersListRef>(null);

    return (
        <main className="flex flex-col   relative h-full w-full px-8 py-3 gap-3">
            <Header refresh={() => productsRef.current?.refresh()} />
            <CustomersList ref={productsRef} />
        </main>
    )
}