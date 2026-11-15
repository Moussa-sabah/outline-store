"use client"
import Header from "../components/orders/Header"
import OrdersList from '../components/orders/OrdersList'

export default function Orders() {

    return (
        <main className="p-5 flex flex-col gap-6">
            <Header />
            <OrdersList />
        </main>
    )
}