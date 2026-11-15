
'use client'
import ProductElement from './ProductElement'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSquare } from "@fortawesome/free-regular-svg-icons";
import { faCheckSquare, faSort } from '@fortawesome/free-solid-svg-icons'
import React, { useEffect, useState, useImperativeHandle, RefObject } from 'react'
import { useProductStore } from '../../../../stores/product_store';
import { Product } from '@repo/types';
import { useProductFiltersStore } from '../../../../stores/filters/productFilters_store';
import { Pagination } from '@repo/ui';



export interface ProductsListRef {
    refresh: () => void;
}

interface ProductsListProps {
    ref?: RefObject<ProductsListRef | null>;
}

export default function ProductsList({ ref }: ProductsListProps) {


    const getProducts = useProductStore(state => state.getProducts)
    const gender = useProductFiltersStore(state => state.gender_dash)
    const brand = useProductFiltersStore(state => state.brand_dash)
    const resetDashboardFilter = useProductFiltersStore(state => state.resetDashboardFilter)

    const changeFilter = useProductFiltersStore(state => state.changeFilter)
    const unChangeFilter = useProductFiltersStore(state => state.unChangeFilter)

    const [checkedAll, setCheckedAll] = useState(false)
    const [products, setProducts] = useState<Product[]>([])
    const [page, setPage] = useState<number>(1)
    const [pagesCount, setPagesCount] = useState<number>(1)
    const productsPerPage = 10
    const [clickedPageInput, setClickedPageInput] = useState<boolean>(false)
    const [sortByPrice, setSortByPrice] = useState<null | boolean>(null)
    const [sortByCreated, setSortByCreated] = useState<null | boolean>(false)

    async function fetchProducts(page: number) {
        if (changeFilter) {
            setPage(1)
        }
        const response = await getProducts(productsPerPage, page, gender, brand, sortByCreated, sortByPrice)
        if (response.status === 'success' && 'data' in response) {

            setProducts(response.data)
            setPagesCount(response.count ? Math.ceil(Number(response.count) / productsPerPage) : 1)

        }
        else if ('message' in response) {
            return response.message
        }

    }


    function refresh() {
        resetDashboardFilter()
        setPage(1)
        setSortByPrice(null)
        setSortByCreated(false)
        fetchProducts(1)
    }
    useImperativeHandle(ref, () => ({
        refresh,
    }));



    useEffect(() => {
        fetchProducts(page)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, gender, brand, sortByCreated, sortByPrice])

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

    function createdSort() {
        setSortByCreated(prev => {
            if (prev !== null) return !prev
            return false

        })
        setSortByPrice(null)
    }
    function priceSort() {
        setSortByPrice(prev => {
            if (prev !== null) return !prev
            return false
        })
        setSortByCreated(null)
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

    return (
        <main className='font-semibold text-sm capitalize flex flex-col justify-between gap-2  h-9/10'>

            <div className=' h-11/12 '>
                <div className="flex  text-secondary items-center h-1/12 px-4  bg-oddRow rounded-xl   bg ">
                    <button className="flex-0 text-sm mr-3"><FontAwesomeIcon onClick={() => setCheckedAll(!checkedAll)} icon={checkedAll ? faCheckSquare : faSquare} className={`cursor-pointer ${checkedAll ? 'text-primary' : 'text-borders'}`} /></button>
                    <p className='flex-1'>#Id</p>
                    <p className="flex-2">Product Name</p>
                    <p className="flex-1">Category</p>
                    <p className='flex-1'>Brand</p>
                    <p className='flex-1'>Status</p>
                    <button onClick={priceSort} className="flex-1 flex items-center gap-1">
                        <p>Price</p>
                        <FontAwesomeIcon icon={faSort} className='text-[10px]' />
                    </button>
                    <button onClick={createdSort} className="flex-1 flex items-center gap-1">
                        <p>Created At</p>
                        <FontAwesomeIcon icon={faSort} className='text-[10px]' />
                    </button>
                    <button className="flex-1 text-center">Action</button>


                </div>
                <div className='tabelContainer  overflow-auto h-11/12 '>
                    {products?.map(product =>
                        <ProductElement checkedAll={checkedAll} product={product} key={product?.id} />
                    )}
                </div>

            </div>
            <Pagination page={page} pagesCount={pagesCount} prevPage={prevPage} nextPage={nextPage} clickedPageInput={clickedPageInput} trueClickedPageInput={trueClickedPageInput} changePageInput={changePageInput} />
        </main>
    )
}