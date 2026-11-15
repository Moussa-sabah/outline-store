'use client'
import { Button } from "@repo/ui";
import { useState } from "react";
import { useAdminStore } from "../../../stores/admin_store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import { AdminAuthInput } from "@repo/types";

export default function Signin() {

    const signIn = useAdminStore((state) => state.signIn)
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')


    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const signInInput: AdminAuthInput = {
            email, password
        }
        setLoading(true)
        const response = await signIn(signInInput)
        if (response.status === 'error') {
            setErrorMessage(response.message)
        }
        else {
            router.push('/')
        }
        setLoading(false)
    }


    return (

        <main className='h-screen flex flex-col items-center justify-center gap-15 '>
            <h1 className='text-2xl font-semibold'>Login to continue to dashboard</h1>
            <form onSubmit={handleSubmit} className=" flex flex-col w-1/4  gap-6 text-sm font-semibold">
                <div className="flex flex-col flex-1 gap-2 ">
                    <label className="font-normal">Email</label>
                    <input onChange={(e) => setEmail(e.target.value)} required type="email" className=" outline-none px-3 h-11 border border-borders rounded-md" />
                </div>
                <div className="flex flex-col flex-1 gap-2 ">
                    <label className="font-normal">Password</label>
                    <input onChange={(e) => setPassword(e.target.value)} required type="password" className=" outline-none px-3 h-11 border border-borders rounded-md" />
                </div>
                {loading ?
                    <p className='bg-buttons text-white  h-11 rounded-md flex items-center justify-center '> <FontAwesomeIcon icon={faSpinner} className='animate-spin' /></p> :
                    <Button type="submit" title="Confirm" bg="buttons" textColor="white" height="44" textSize="18" />}
                <p className="text-redColor font-semibold text-sm">{errorMessage}</p>
            </form>

        </main>

    )
}