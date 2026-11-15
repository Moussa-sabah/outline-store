



import  { ChangeEvent } from 'react'

interface Props {
    page: number
    pagesCount: number
    prevPage: () => void
    nextPage: () => void
    clickedPageInput: boolean
    trueClickedPageInput: () => void
    changePageInput: (e: ChangeEvent<HTMLInputElement>) => void

}

export default function Pagination({ page, pagesCount, prevPage, nextPage, clickedPageInput, trueClickedPageInput, changePageInput }: Props) {
    return (
        <main className={`${pagesCount===1?'hidden':''} flex items-center gap-3 justify-end h-1/12  font-semibold`}>
            <button disabled={page === pagesCount} onClick={nextPage} className={`border border-borders text-sm px-3 h-7 rounded-sm   ${page === pagesCount ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110 cursor-pointer'}`}>
                التالي
            </button>
            <div className='flex items-center gap-2'>
                 <p className='text-sm'>ادخل رقم الصفحة</p>
                     <input value={clickedPageInput ? '' : page} disabled={pagesCount === 1} type='number' onChange={changePageInput} onClick={trueClickedPageInput} className='[&::-webkit-inner-spin-button]:appearance-none border  w-7 h-7  rounded-sm text-center' />
                <p>من {pagesCount}</p>
            
               

            </div>
            <button disabled={page === 1} onClick={prevPage} className={`border border-borders text-sm px-3 h-7 rounded-sm   ${page === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110 cursor-pointer'}`}>
                السابق
            </button>



        </main>
    )
}
