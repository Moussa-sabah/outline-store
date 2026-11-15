'use client'
import { Button } from '@repo/ui'
import { useAdminStore } from "../../../stores/admin_store"
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { AdminAuthInput, CreatedAdminPayload } from '@repo/types'
import { IoMdArrowBack } from "react-icons/io";
import Link from 'next/link'

export default function AddAdmin() {

    const addAdmin = useAdminStore((state) => state.addAdmin)

    const [name, setName] = useState<string>('')
    const [email, setEmail] = useState<string>('')

    const [phone, setPhone] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string>('')


    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        // const signUpInput: AdminAuthInput = { email, password }
        // const newAdmin: CreatedAdminPayload = {
        //     name: name.trim(),
        //     phone,
        // }
        // setLoading(true)
        // const response = await addAdmin(signUpInput, newAdmin, confirmPassword)


        // setErrorMessage(response.message)

        // setLoading(false)
    }

    return (
        <main className="relative flex flex-col gap-10  items-center justify-center  h-screen ">

            <Link href='/'><IoMdArrowBack className='absolute top-10 left-10 text-4xl' /></Link>

            <h1 className="text-3xl font-semibold">Add new Admin</h1>

            <form onSubmit={handleSubmit} className="w-1/2 flex flex-col gap-8 text-sm font-semibold">
                <div className="flex items-center gap-5 ">
                    <div className="flex flex-col flex-1 gap-2 ">
                        <label>Full Name</label>
                        <input onChange={(e) => setName(e.target.value)} required type="text" className=" outline-none px-3 border border-borders h-11 rounded-md  " />
                    </div>
                    <div className="flex flex-col flex-1 gap-2">
                        <label>Email</label>
                        <input onChange={(e) => setEmail(e.target.value)} required type="email" className=" outline-none px-3 border border-borders h-11 rounded-md " />
                    </div>
                </div>
                <div className="flex items-center gap-5 ">

                    <div className="flex flex-col flex-1 gap-2">
                        <label>Phone Number</label>
                        <input onChange={(e) => setPhone(e.target.value)} required type="number" className=" outline-none px-3 border border-borders h-11 rounded-md " />
                    </div>
                </div>
                <div className="flex items-center gap-5 ">
                    <div className="flex flex-col flex-1 gap-2 ">
                        <label>Password</label>
                        <input onChange={(e) => setPassword(e.target.value)} required type="password" className=" outline-none px-3 border border-borders h-11 rounded-md " />
                    </div>
                    <div className="flex flex-col flex-1 gap-2">
                        <label>Confirm Password</label>
                        <input onChange={(e) => setConfirmPassword(e.target.value)} required type="password" className=" outline-none px-3 border border-borders h-11 rounded-md " />
                    </div>
                </div>

                <div className='m-auto'>
                    {loading ?
                        <button className='bg-buttons text-white w-75 h-11 rounded-md flex items-center justify-center '> <FontAwesomeIcon icon={faSpinner} className='animate-spin' /></button> :
                        <Button type='submit' title='Confirm' bg='buttons' width='300' height='44' textColor='white' textSize='16' />}
                </div>

                <p className='font-semibold text-sm text-redColor'>{errorMessage}</p>
            </form>
        </main>
    )
}