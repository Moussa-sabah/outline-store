'use client'
import AdminElement from "./AdminElement";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSquare } from "@fortawesome/free-regular-svg-icons";
import { faCheckSquare, faSort } from "@fortawesome/free-solid-svg-icons"
import { RefObject, useEffect, useImperativeHandle, useState } from 'react'
import type { Admin } from "@repo/types";
import { useAdminStore } from "../../../../stores/admin_store";
import { Pagination } from "@repo/ui";


export interface AdminsListRef {
    refresh: (page: number) => void;
}

interface AdminsListProps {
    ref: RefObject<AdminsListRef | null>;
}


export default function AdminsList({ ref }: AdminsListProps) {

    const getAdmins = useAdminStore(state => state.getAdmins)

    const [checkedAll, setCheckedAll] = useState(false)
    const [page, setPage] = useState<number>(1)
    const [pagesCount, setPagesCount] = useState<number>(1)
    const [clickedPageInput, setClickedPageInput] = useState<boolean>(false)
    const [sort, setSort] = useState<boolean>(false)
    const [admins, setAdmins] = useState<Admin[]>([])
    const customersPerPage = 2
    const deleteAdminByManager = useAdminStore(state => state.deleteAdminByManager)

    async function fetchAdmins(page: number) {

        const response = await getAdmins(customersPerPage, page, sort)
        if (response.status === 'success' && 'data' in response) {
            setAdmins(response.data)
            setPagesCount(response.count ? Math.ceil(Number(response.count) / customersPerPage) : 1)

        }
        else if ('message' in response) {
            console.log(response.message)
        }

    }

    function refresh() {
        setSort(false)
        setPage(1)
        fetchAdmins(page)
    }

    useImperativeHandle(ref, () => ({
        refresh,
    }));
    useEffect(() => {
        fetchAdmins(page)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, sort, deleteAdminByManager])

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
                    <button onClick={() => setSort(prev => !prev)} className="flex-1 flex items-center gap-1 cursor-pointer">
                        <p>Created At</p>
                        <FontAwesomeIcon icon={faSort} className="text-[10px]" />
                    </button>
                    <p className="flex-1 text-center">Action</p>

                </div>
                <div className='tabelContainer  overflow-auto h-11/12 '>
                    {admins?.map(admin =>
                        <AdminElement refresh={refresh} checkedAll={checkedAll} admin={admin} key={admin?.id} />
                    )}
                </div>

            </div>
            <Pagination page={page} pagesCount={pagesCount} prevPage={prevPage} nextPage={nextPage} clickedPageInput={clickedPageInput} trueClickedPageInput={trueClickedPageInput} changePageInput={changePageInput} />

        </main>
    )
}