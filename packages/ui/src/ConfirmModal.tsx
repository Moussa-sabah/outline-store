

import React from 'react'
import Button from './Button'

interface Props {
    show: boolean
    buttonTitle: string
    buttonColor: string
    doing: () => void
}

export default function ConfirmModal({ show, buttonTitle, buttonColor,doing }: Props) {
    return (
        <div className={`${show ? 'scale-100 opacity-100 z-20' : 'scale-50 opacity-0 -z-10'} p-4 flex flex-col duration-250 transition-all fixed top-1/2 left-1/2 w-120 h-75 -translate-x-60 -translate-y-37.5 bg-white rounded-md`}>
            <div className='flex-1  flex flex-col items-center justify-center gap-4'>
                <h1 className='text-3xl '>Are you sure!</h1>
                <p className='text-secondary '>This action cannot be undone.</p>
            </div>
            <div className='flex items-center justify-end'>
                <Button click={doing} type='button' title={buttonTitle} bg={buttonColor} px='20' py='5' textColor='white' />
            </div>
        </div>
    )
}
