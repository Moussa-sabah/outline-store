'use client'
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp, faChevronDown, faRotateRight, faCloudArrowUp } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import { useAdminStore } from '../../../../stores/admin_store'
import { useRouter } from "next/navigation"
import { Button } from '@repo/ui'
import Image from 'next/image'



export default function RightSide() {

    const router = useRouter()
    const currentUser = useAdminStore((state) => state.currentUser)
    const manager = currentUser?.role === 'manager'
    const signOut = useAdminStore((state) => state.signOut)
    const changeImage = useAdminStore((state) => state.changeImage)
    const removeImage = useAdminStore(state => state.removeImage)
    const sendResetPasswordLink = useAdminStore(state => state.sendResetPasswordLink)
    const [showModal, setShowModal] = useState(false)
    const [imageUrl, setImageUrl] = useState(currentUser?.image ? currentUser.image : '')

    useEffect(() => {
        if (currentUser?.image) {
            setImageUrl(currentUser.image)
        }
    }, [currentUser])



    async function handleLogout() {
        const response = await signOut()
        if (response.status === 'error') {
            console.log(response.message)
        }
        else {
            router.push('/auth/signIn')
        }


    }

    async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
        const selectedFile = e.target.files?.[0]
        if (selectedFile) {
            setImageUrl(URL.createObjectURL(selectedFile))
            const response = await changeImage(selectedFile)
            if (response.status === 'error') {
                console.log(response.message)
            }
        }
    }

    async function handleRemoveImage() {
        const response = await removeImage()
        if (response.status === 'error') {
            console.log(response.message)
        }
        else {
            setImageUrl('')
        }
    }


    return (
        <div className="h-full flex items-center gap-3 font-semibold text-sm">
            {manager && <Link href='/auth/addAdmin' className="bg-secondary h-full px-4 rounded-full text-white hover:opacity-85 flex items-center justify-center">Add Admin</Link>}
            <div onMouseLeave={() => setShowModal(false)} onMouseEnter={() => setShowModal(true)} className="relative bg-white flex items-center px-4 gap-3 h-full rounded-full ">
                <button ><FontAwesomeIcon icon={showModal ? faChevronUp : faChevronDown} className="w-4 h-4 text-secondary cursor-pointer text-xs" /></button>
                {showModal &&
                    <div className="z-10 absolute left-0 top-full pt-1 right-0">
                        <div className=" flex flex-col gap-2 items-center bg-white w-full shadow-2xl p-5   font-semibold rounded-md">
                            <div className="flex items-center gap-2">
                                <button onClick={handleRemoveImage}>
                                    <FontAwesomeIcon icon={faRotateRight} className='cursor-pointer' />
                                </button>
                                {imageUrl ? <Image alt='' width={500} height={500} src={imageUrl} className='w-12 h-12 rounded-full object-cover' /> : <p className="bg-buttons w-12 h-12 rounded-full flex items-center justify-center text-white">M</p>}
                                <div>
                                    <input onChange={handleFile} type="file" className='hidden' id='file' />
                                    <label htmlFor='file'><FontAwesomeIcon icon={faCloudArrowUp} className="text-[17px] cursor-pointer" /></label>
                                </div>
                            </div>
                            <Button click={sendResetPasswordLink} type='button' title='Reset Password' />
                            <Button type="button" click={() => handleLogout()} title="Logout" textColor="redColor" />
                        </div>
                    </div>}
                <button className="capitalize">{currentUser?.name}</button>
            </div>
        </div>
    )
}
