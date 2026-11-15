'use client'

interface Props {
    show: boolean
    text: string
    bg: string
}

export default function Message({ show, text, bg }: Props) {

    return (
        <div className={`${show ? 'z-20 scale-100 opacity-100' : '-z-10 scale-50 opacity-0'} md:p-3 p-2   rounded-br-none duration-250 rounded-xl  bg-${bg} fixed right-5 bottom-5 left-5 text-sm md:text-[15px] w-fit sm:right-10 sm:bottom-10 sm:left-10  text-white`}>
            {text}
        </div>
    )
}
