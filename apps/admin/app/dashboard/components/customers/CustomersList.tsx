'use client'
import CustomerElement from "./CustomerElement";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSquare } from "@fortawesome/free-regular-svg-icons";
import { faCheckSquare, faSort } from "@fortawesome/free-solid-svg-icons"
import { RefObject, useEffect, useImperativeHandle, useState } from 'react'
import { useCustomersStore } from "../../../../stores/customer_store";
import type { Customer } from "@repo/types";
import { Pagination } from "@repo/ui";



export interface CustomersListRef {
    refresh: () => void;
}

interface CustomerssListProps {
    ref?: RefObject<CustomersListRef | null>;
}


export default function CustomersList({ ref }: CustomerssListProps) {

    const getCustomers = useCustomersStore(state => state.getCustomers)

    const [checkedAll, setCheckedAll] = useState(false)
    const [page, setPage] = useState<number>(1)
    const [pagesCount, setPagesCount] = useState<number>(1)
    const [clickedPageInput, setClickedPageInput] = useState<boolean>(false)
    const [sort, setSort] = useState<boolean>(false)
    const [customers, setCustomers] = useState<Customer[]>([])
    const customersPerPage = 1

    async function fetchCustomers(page: number) {

        const response = await getCustomers(customersPerPage, page, sort)
        if (response.status === 'success' && 'data' in response) {
            setCustomers(response.data)
            setPagesCount(response.count ? Math.ceil(Number(response.count) / customersPerPage) : 1)

        }
        else if ('message' in response) {
            console.log(response.message)
        }

    }

    function refresh() {
        setPage(1)
        setSort(false)
        fetchCustomers(1)
        console.log('ok')
    }

    useImperativeHandle(ref, () => ({
        refresh,
    }));

    useEffect(() => {
        fetchCustomers(page)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, sort])

    function trueClickedPageInput() {
        setClickedPageInput(true)
    }

    function nextPage() {
        setClickedPageInput(false)
        setPage(prev => prev + 1)
    }
    function prevPage() {
        setClickedPageInput(false)
        setPage(prev => prev - 1)
    }

    function changePageInput(e: React.ChangeEvent<HTMLInputElement>) {

        const enterdPageNumber: number = Number(e.target.value)
        if (enterdPageNumber <= Number(pagesCount) && enterdPageNumber >= 0) {

            if (enterdPageNumber === 0) {
                setClickedPageInput(true)
            }
            else {
                setPage(enterdPageNumber)
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
                    <p className="flex-2">Full Name</p>
                    <p className="flex-2">Email</p>
                    <p className='flex-2'>Phone Number</p>
                    <p className='flex-2'>Birthday</p>
                    <button onClick={() => setSort(prev => !prev)} className="flex-1 flex items-center gap-1 cursor-pointer">
                        <p>Created At</p>
                        <FontAwesomeIcon icon={faSort} className="text-[10px]" />
                    </button>
                    <p className="flex-1 text-center">Action</p>

                </div>
                <div className='tabelContainer  overflow-auto h-11/12 '>
                    {customers?.map(customer =>
                        <CustomerElement checkedAll={checkedAll} customer={customer} key={customer?.id} />
                    )}
                </div>

            </div>
            <Pagination page={page} pagesCount={pagesCount} prevPage={prevPage} nextPage={nextPage} clickedPageInput={clickedPageInput} trueClickedPageInput={trueClickedPageInput} changePageInput={changePageInput} />

        </main>
    )
}