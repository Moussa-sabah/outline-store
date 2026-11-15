

interface Props {
    close: () => void

}

export default function PopupBG({close}:Props) {
    return (
        <div onClick={close} className={`z-10 fixed top-0 left-0 w-full h-screen backdrop-blur-sm bg-black/40 cursor-pointer `} />

    )
}
