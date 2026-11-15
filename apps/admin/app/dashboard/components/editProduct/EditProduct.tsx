"use client"
import { faArrowUpFromBracket, faSpinner } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from 'react'


import { BrandFilter, Button, GenderFilter, StatusFilter } from '@repo/ui'
import { useProductFiltersStore } from "../../../../stores/filters/productFilters_store"
import { useProductStore } from "../../../../stores/product_store"
import { Add_Edit_ProductPayload, Product } from "../../../../../../packages/types/Product"
import { IoMdAddCircle } from "react-icons/io";
import Image from "next/image"

interface Props {
    closeEditModal: () => void
    product: Product
}

export default function EditProduct({ closeEditModal, product }: Props) {

    const [title, setTitle] = useState<string>(product?.title)
    const [description, setDescription] = useState<string>(product?.description)
    const gender: string = useProductFiltersStore((state) => state.gender_edit)
    const brand: string = useProductFiltersStore((state) => state.brand_edit)
    const status: string = useProductFiltersStore(state => state.status_edit)
    const [original_price, setOriginalPrice] = useState<number>(product.original_price)
    const [discount, setDiscount] = useState<number>(product.discount)
    const [final_price, setFinalPrice] = useState<number>(product.final_price)
    // const [imagesUrls, setImagesUrls] = useState(product.images)
    // const [files, setFiles] = useState<(File | null)[]>(product.images.map(() => null))
    const [loading, setLoading] = useState<boolean>(false)
    // const [imagesBtns, setImagesBtns] = useState(product.images.map(() => false))
    const [color_name, setColorName] = useState<string>(product.color)
    const [size, setSize] = useState<number>(product.size)
    const [quantity, setQuantity] = useState<number>(product.quantity)
    const resetCategories = useProductFiltersStore(state => state.resetAddProductCategories)
    const dashboardFilter = useProductFiltersStore(state => state.dashboardFilter)
    const setGenderEdit = useProductFiltersStore(state => state.setGender_edit)
    const setBrandEdit = useProductFiltersStore(state => state.setBrand_edit)
    const setStatusEdit = useProductFiltersStore(state => state.setStatus_edit)
    const editProduct = useProductStore(state => state.editProduct)

    useEffect(() => {
        setGenderEdit(product.gender)
        setBrandEdit(product.brand)
        setStatusEdit(product.status)
    }, [product.brand, product.gender, product.status, setStatusEdit, setBrandEdit, setGenderEdit])

    function writeOriginalPrice(e: React.ChangeEvent<HTMLInputElement>) {
        const priceValue: number = Number(e.target.value)
        if (priceValue >= 0 && priceValue <= 50000) {
            setOriginalPrice(priceValue)
            setFinalPrice(Number((priceValue - (priceValue * (discount * 0.01))).toFixed(2)))
        }

    }
    function writeDiscount(e: React.ChangeEvent<HTMLInputElement>) {
        const discountValue: number = Number(e.target.value)
        if (discountValue >= 0 && discountValue <= 100) {
            setDiscount(discountValue)
            if (discountValue > 0) {
                setFinalPrice(Number(Math.ceil((original_price - (original_price * (discountValue * 0.01))) / 1000) * 1000))
            }
            else {
                setFinalPrice(Math.ceil(original_price / 1000) * 1000)
            }
        }

    }
    function writeSize(e: React.ChangeEvent<HTMLInputElement>) {
        const SizeValue: number = Number(e.target.value)
        if (SizeValue >= 0 && SizeValue <= 46) {
            setSize(SizeValue)
        }
    }
    function writeQuantity(e: React.ChangeEvent<HTMLInputElement>) {
        const quantityValue: number = Number(e.target.value)
        if (quantityValue >= 0 && quantityValue <= 500) {
            setQuantity(quantityValue)
        }
    }

    // function handleUploadImage(e: React.ChangeEvent<HTMLInputElement>, imgIndex: number) {
    //     const selectedFile = e.target.files?.[0]
    //     if (selectedFile) {
    //         setImagesUrls(prev => {
    //             const newImagesUrls = [...prev]
    //             newImagesUrls[imgIndex] = URL.createObjectURL(selectedFile)
    //             return newImagesUrls
    //         })
    //         setFiles(prev => {
    //             const newFiles = [...prev]
    //             newFiles[imgIndex] = selectedFile
    //             return newFiles
    //         })
    //     }
    // }
    // function addImage() {

    //     setImagesUrls(prev => {
    //         const newImagesUrl = [...prev, '']
    //         return newImagesUrl
    //     }
    //     )
    //     setFiles(prev => {
    //         const newFiles = [...prev, null]
    //         return newFiles
    //     }
    //     )
    //     setImagesBtns(prev => {
    //         const newImagesBtns = [...prev, false]
    //         return newImagesBtns
    //     }
    //     )
    //}
    // function deleteImage(imgIndex: number) {
    //     if (imagesUrls.length === 1) {
    //         setImagesUrls(prev => {
    //             const newImagesUrls = [...prev]
    //             newImagesUrls![imgIndex] = ''
    //             return newImagesUrls
    //         })
    //         setFiles(prev => {
    //             const newFiles = [...prev]
    //             newFiles[imgIndex] = null
    //             return newFiles
    //         })

    //     }
    //     else {

    //         setImagesUrls(prev => {
    //             return prev.filter((_, index) => index !== imgIndex)
    //         })
    //         setFiles(prev => {
    //             return prev.filter((_, index) => index !== imgIndex)
    //         })
    //         setImagesBtns(prev => {
    //             return prev.filter((_, index) => index !== imgIndex)
    //         })
    //     }

    // }
    // function showImageBtns(imgIndex: number) {
    //     setImagesBtns(prev => {
    //         const newImagesBtns = [...prev]
    //         newImagesBtns[imgIndex] = true
    //         return newImagesBtns
    //     })
    // }
    // function hideImageBtns(imgIndex: number) {
    //     setImagesBtns(prev => {
    //         const newImagesBtns = [...prev]
    //         newImagesBtns[imgIndex] = false
    //         return newImagesBtns
    //     })
    // }


    function endEditing() {
        closeEditModal()
        resetCategories()
        dashboardFilter()
    }
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        // const updatedProduct: Add_Edit_ProductPayload = {
        //     gender,
        //     brand,
        //     title: title.trim().replace(/\s+/g, " "),
        //     description: description.trim().replace(/\s+/g, " "),
        //     original_price,
        //     discount,
        //     final_price,
        //     color: color_name.trim().replace(/\s+/g, " "),
        //     size,
        //     quantity,
        //     status,
        // }


        // setLoading(true)
        // const response = await editProduct(updatedProduct, product)
        // console.log(response.message)
        // setLoading(false)
        // if (response.status === 'success') {
        //     endEditing()
        // }
    }


    return (
        <main>
            <div className="bg-black/50 w-screen h-screen fixed top-0 left-0   " />


            <form onSubmit={handleSubmit} className="flex flex-col justify-between   font-semibold text-sm py-8 px-10 fixed bg-white h-160 w-3/5 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 rounded-2xl overflow-auto z-10">

                <div className="flex justify-between">
                    <h1 className=" text-xl ">Create New Product</h1>
                    <div className="flex  gap-5">
                        <button onClick={endEditing} className="border-b-2  hover:opacity-70 cursor-pointer ">Cancel</button>
                        {loading ? <p className='bg-primary  text-white  w-22 h-7 rounded-md flex items-center justify-center '> <FontAwesomeIcon icon={faSpinner} className='animate-spin' /></p> :
                            <Button type='submit' title="Draft" bg="primary" textColor="white" height='28' width="88" />}
                    </div>
                </div>
                <div className="flex gap-3 items-start">
                    {/* <GenderFilter type='editProduct' />
                    <BrandFilter type='editProduct' /> */}
                    <StatusFilter type="editProduct" />
                </div>
                <div className="flex flex-col gap-2">
                    <label className=" ">Title</label>
                    <input required value={title} onChange={(e) => setTitle(e.target.value)} className="border border-borders outline-none p-2  rounded-md" />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="">Description</label>
                    <input value={description} onChange={(e) => setDescription(e.target.value)} className="border border-borders outline-none p-2  rounded-md" />
                </div>


                <div className="flex items-center gap-6">
                    <div className="flex flex-col gap-2 flex-1 ">
                        <label className="">Original Price (IQD)</label>
                        <input value={original_price ? original_price : ''} placeholder="10,000 - 50,000" type="number" required onChange={(e) => writeOriginalPrice(e)} className="border border-borders outline-none p-2  rounded-md " />
                    </div>
                    <div className="flex flex-col gap-2 flex-1 ">
                        <label className="">Discount (%)</label>
                        <input value={discount ? discount : ''} onChange={(e) => writeDiscount(e)} type="number" placeholder="1 - 100" className="border border-borders outline-none p-2  rounded-md" />
                    </div>
                    <div className="flex flex-col gap-2 flex-1 ">
                        <label className="">Final Price (IQD)</label>
                        <p className="border border-borders outline-none p-2  rounded-md">{final_price}</p>
                    </div>
                </div>
                <div className="flex items-center gap-6">





                    <div className="flex flex-col gap-2 flex-1 ">
                        <label className="">Color</label>
                        <input value={color_name} onChange={(e) => setColorName(e.target.value)} placeholder="color name" type="text" required className="border border-borders outline-none p-2  rounded-md" />
                    </div>



                    <div className="flex flex-col gap-2 flex-1 ">
                        <label className="">Size (mm)</label>
                        <input value={size ? size : ''} onChange={(e) => writeSize(e)} type="number" required placeholder="25 - 46" className="border border-borders outline-none p-2  rounded-md" />
                    </div>
                    <div className="flex flex-col gap-2 flex-1 ">
                        <label className="">Quantity</label>
                        <input value={quantity ? quantity : ''} onChange={(e) => writeQuantity(e)} type="number" required placeholder="1 - 500" className="border border-borders outline-none p-2  rounded-md" />
                    </div>
                </div>

                {/* <div className="flex flex-col gap-3  ">
                    <div className="flex items-center gap-2  w-fit">
                        <p>Images</p>
                        <button disabled={imagesUrls.length === 5} type="button" onClick={addImage} className={`${imagesUrls.length < 5 ? 'hover:opacity-80 cursor-pointer' : 'opacity-50'}`}> <IoMdAddCircle className="text-2xl" /></button>
                    </div>


                    <div className="flex gap-3">
                        {imagesUrls.map((img, imgIndex) =>
                            <div key={imgIndex}>
                                <input onChange={(e) => handleUploadImage(e, imgIndex)} id={`productImage-${imgIndex}`} type="file" className="hidden" />
                                <label
                                    onMouseEnter={() => showImageBtns(imgIndex)}
                                    onMouseLeave={() => hideImageBtns(imgIndex)}

                                    className="relative text-xs w-21 h-21    rounded-md flex ">
                                    {img ?
                                        <Image alt="" width={500} height={500} src={img} className=" w-full h-full object-cover rounded-md border border-borders" />
                                        : <div className=" flex flex-col items-center gap-2  w-full h-full rounded-md justify-center border-dashed border">
                                            <FontAwesomeIcon icon={faArrowUpFromBracket} className="w-4 h-4" /> Upload file</div>}

                                    {imagesBtns[imgIndex] && <div className="absolute  flex-col gap-2  w-full h-full rounded-md bg-black/30 flex items-center justify-center">
                                        <label htmlFor={`productImage-${imgIndex}`} className="bg-white px-3 py-0.5 rounded-md cursor-pointer hover:bg-blue-500 hover:text-white ">Choose</label>
                                        <button onClick={() => deleteImage(imgIndex)} type="button" className="bg-white px-3 py-0.5 rounded-md text-redColor cursor-pointer hover:bg-redColor hover:text-white">remove</button>

                                    </div>}
                                </label>
                            </div>
                        )}
                    </div>


                </div> */}





            </form>


        </main>

    )
}