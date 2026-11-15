'use client'
import { Button } from '@repo/ui'
import React from 'react'
import { useState } from 'react'
import { useAdminStore } from '../../../stores/admin_store'
import { useRouter } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
export default function ResetPassword() {

  const router = useRouter()
  const resetPassword = useAdminStore(state => state.resetPassword)
  const [newPassword, setNewPassword] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  async function handleResetPassword(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const response = await resetPassword(newPassword)
    if (response.status === 'success') {
      router.push('/')
      setLoading(false)
      console.log(response.message)
    }
    else {
      setLoading(false)
      console.log(response.message)
    }



  }


  return (
    <main className='h-full flex items-center justify-center text-sm font-semibold'>
      <form onSubmit={handleResetPassword} className='flex flex-col gap-15 '>
        <h1 className='text-3xl text-center font-semibold'>Reset Your Password</h1>


        <div className='flex flex-col gap-3'>
          <label htmlFor="">New Password</label>
          <input onChange={(e) => setNewPassword(e.target.value)} type="text" required className='border outline-0 px-2 h-10 rounded-md border-borders w-70' />
          {loading ? <p className='bg-primary text-white   h-10 text-[16px] rounded-md flex items-center justify-center '> <FontAwesomeIcon icon={faSpinner} className='animate-spin' /></p> :
            <Button type='submit' title='Reset' bg='primary' textColor='white' height='40' textSize='16' />}

        </div>

      </form>
    </main>
  )
}
