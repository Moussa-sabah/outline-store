'use client'

import { Product_image } from "@repo/types"
import Image from "next/image"

import { useState } from "react"



interface Props {
    images: Product_image[]
}

export default function ProductImages({ images }: Props) {


    const [currentImageIndex, setCurrentImageIndex] = useState<number>(0)

    function changeImage(imageIndex: number) {
        setCurrentImageIndex(imageIndex)
    }

    return (
        <div className="  flex flex-col md:flex-row gap-2">
            <Image width={1000} height={1000} alt="" src={images[currentImageIndex]?.url as string} className=" md:hidden w-65 h-75 sm:w-90 sm:h-100 md:h-120 md:w-110  object-cover rounded-md md:rounded-lg lg_xl:rounded-2xl border border-borders" />
            <div className="flex flex-row md:flex-col  gap-2 ">
                {images?.map((image, index) =>
                    <Image onClick={() => changeImage(index)} key={index} width={1000} height={1000} alt="" src={image.url} className="h-15.75 w-14.75  sm:h-22 sm:w-21 md:h-28.5 md:w-27.5 rounded-md lg_xl:rounded-xl object-cover border border-borders" />
                )}
            </div>

            <Image width={1000} height={1000} alt="" src={images[currentImageIndex]?.url as string} className=" hidden md:block h-120 w-110  object-cover  rounded-lg lg_xl:rounded-2xl border border-borders" />

        </div>
    )
}