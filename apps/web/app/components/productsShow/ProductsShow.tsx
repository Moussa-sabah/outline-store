'use client'

import { useFilterStore } from '@/stores/filters_store'
import { useProductStore } from '@/stores/product_store'
import { Product } from '@repo/types'
import React, { useEffect, useState } from 'react'
import ProductsList from './productsList/ProductsList'
import { Pagination } from '@repo/ui'

export default function ProductsShow() {
    const gender = useFilterStore(state => state.gender_web)
    const productsByfilter = useProductStore(state => state.productsByfilter)
    const brand = useFilterStore(state => state.brand_web)
    const sort = useFilterStore(state => state.sort_web)
    const [products, setProducts] = useState<Product[]>()
    const [page, setPage] = useState<number>(1)
    const [pagesCount, setPagesCount] = useState<number>(1)
    const productsPerPage = 8
    const [clickedPageInput, setClickedPageInput] = useState<boolean>(false)
    const changeFilter = useFilterStore(state => state.changeFilter)
    const unChangeFilter = useFilterStore(state => state.unChangeFilter)
    const [loding, setLoding] = useState(true)
    async function fetchProducts(page: number) {
        if (changeFilter) {
            setPage(1)
        }
        const response = await productsByfilter(page, productsPerPage, gender as string, brand, sort)
        if (response.status === 'success' && 'data' in response) {

            setProducts(response.data)
            setPagesCount(response.count ? Math.ceil(Number(response.count) / productsPerPage) : 1)

        }

        setLoding(false)

    }

    function trueClickedPageInput() {
        setClickedPageInput(true)
    }

    function nextPage() {
        setClickedPageInput(false)
        setPage(prev => prev + 1)
        unChangeFilter()
    }
    function prevPage() {
        setClickedPageInput(false)
        setPage(prev => prev - 1)
        unChangeFilter()
    }
    function changePageInput(e: React.ChangeEvent<HTMLInputElement>) {

        const enterdPageNumber: number = Number(e.target.value)
        if (enterdPageNumber <= Number(pagesCount) && enterdPageNumber >= 0) {

            if (enterdPageNumber === 0) {
                setClickedPageInput(true)
            }
            else {
                unChangeFilter()
                setPage(enterdPageNumber)
                fetchProducts(enterdPageNumber)
                setClickedPageInput(false)
            }

        }
    }

    useEffect(() => {
        fetchProducts(page)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, gender, brand, sort])
    return (
        <div className='flex flex-col justify-between items-center flex-1   gap-15'>
            {products?.length ? <>
                <ProductsList products={products as Product[]} />
                <Pagination page={page} pagesCount={pagesCount} prevPage={prevPage} nextPage={nextPage} clickedPageInput={clickedPageInput} trueClickedPageInput={trueClickedPageInput} changePageInput={changePageInput} />
            </> :
                <div className=' flex-1 flex items-center justify-center'>
                    <p className='text-lg md:text-xl'>{loding ? 'جاري التحميل...' : 'غير متوفر حالياً'}</p>
                </div>}
        </div>
    )
}
