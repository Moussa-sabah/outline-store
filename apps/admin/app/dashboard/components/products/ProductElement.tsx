"use client"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSquare } from "@fortawesome/free-regular-svg-icons";
import { faPencil, faTrashCan, faCheckSquare, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import EditProduct from '../editProduct/EditProduct'
import { useState, useEffect } from 'react'
import { Product } from "@repo/types";
import { useProductFiltersStore } from "../../../../stores/filters/productFilters_store";
import { TbEditFilled } from "react-icons/tb";
import { MdDelete } from "react-icons/md";
import Image from "next/image";
import { BiSolidShow } from "react-icons/bi";
import Link from "next/link";

interface Props {
    checkedAll: boolean
    product: Product

}

export default function ProductElement({ checkedAll, product }: Props) {

    const editProductFilter = useProductFiltersStore(state => state.editProductFilter)
    const [editModal, seteditModal] = useState(false)
    const [checked, setChecked] = useState(false)
    useEffect(() => {
        setChecked(checkedAll)
    }, [checkedAll])

    function openModal() {
        seteditModal(true)
        editProductFilter()
    }
    const closeModal = () => {
        seteditModal(false)
    }

    return (

        <div className="flex  h-1/9  items-center row  border  border-white hover:border-secondary rounded-xl    px-4   ">
            <button className="flex-0 cursor-pointer mr-3"><FontAwesomeIcon onClick={() => setChecked(!checked)} icon={checked ? faCheckSquare : faSquare} className={`w-4 h-4 ${checked ? '' : 'text-borders'}`} /></button>
            <div className='flex-1 overflow-x-auto '>
                <p className="whitespace-nowrap overflow-x-auto scrollbar-none max-w-2/3">#{product.id}</p>
            </div>
            <div className="flex-2 flex items-center gap-4 overflow-x-auto">
                {/* <Image alt="" src={product?.images[0] as string} width={800} height={800} className="w-8 h-8 rounded-md object-cover border border-lightBorder" /> */}
                <p className="whitespace-nowrap overflow-x-auto scrollbar-none max-w-2/3 "> {product?.title}</p>
            </div>
            <p className="flex-1">{product?.gender}</p>
            <p className="flex-1">{product?.brand}</p>
            <div className='flex-1 text-xs'>
                <p className={`${product.status === 'in active' ? 'text-redColor bg-white' : 'text-[#35c9cc] bg-white'} w-fit px-1 rounded-md`}>{product?.status}</p>
            </div>
            <p className="flex-1">${product?.final_price}</p>
            <p className="flex-1 ">{new Date(product?.created_at).toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
            })}</p>
            <div className="flex-1 flex gap-2 justify-center">
                <button onClick={openModal} ><TbEditFilled className="text-secondary text-lg cursor-pointer hover:scale-110" /></button>
                <button><FontAwesomeIcon icon={faTrashCan} className="w-4 h-4  text-redColor cursor-pointer hover:scale-110 " /></button>
                <Link href={`product-details/${product.id}`}><BiSolidShow className="text-lg cursor-pointer hover:scale-110" /></Link>
            </div>
            {editModal && <EditProduct closeEditModal={closeModal} product={product} />}
        </div>

    )
}