"use client"
import { GenderFilter, BrandFilter, SortFilter } from '@repo/ui'
import { useState } from "react";
import { useFilterStore } from "@/stores/filters_store";
export default function Filtering() {

    const resetFilters = useFilterStore(state => state.resetFilters)
    const [showGenderModal, setShowGenderModal] = useState<boolean>(false)
    const [showBrandModal, setShowBrandModal] = useState<boolean>(false)
    const [showSortModal, setShowSortModal] = useState<boolean>(false)
    function toggleModal(genderModalState: boolean, brandModalState: boolean, sortModalState: boolean) {

        if (genderModalState === true) {
            setShowGenderModal(prev => !prev)
            setShowBrandModal(false)
            setShowSortModal(false)
        }
        else if (brandModalState === true) {
            setShowBrandModal(prev => !prev)
            setShowGenderModal(false)
            setShowSortModal(false)
        }
        else if (sortModalState === true) {
            setShowSortModal(prev => !prev)
            setShowGenderModal(false)
            setShowBrandModal(false)
        }

    }

    function hideModal() {
        setShowGenderModal(false)
        setShowBrandModal(false)
        setShowSortModal(false)
    }


    function handleResetFilters() {
        resetFilters()
        hideModal()

    }
    return (
        <main className="flex items-center justify-between text-sm w-full">
            <div className="flex flex-col md:flex-row  gap-5 w-full md:w-fit">
                <div className="flex items-center justify-between">
                    <h1 className="uppercase text-lg lg:text-xl">تشكيلة الساعات</h1>
                    <button onClick={handleResetFilters} className="text-secondary md:hidden cursor-pointer">اعادة تعيين</button>
                </div>

                <div className="flex gap-0.5 xs_sm:gap-2 ">
                    <GenderFilter type="web" toggleModal={toggleModal} hideModal={hideModal} showGenderModal={showGenderModal} />
                    <BrandFilter type="web" toggleModal={toggleModal} hideModal={hideModal} showBrandModal={showBrandModal} />
                    <div className="md:hidden">
                        <SortFilter type="web" toggleModal={toggleModal} hideModal={hideModal} showSortModal={showSortModal} />
                    </div>
                </div>
            </div>
            <div className="hidden md:flex items-center gap-2">
                <SortFilter type="web" toggleModal={toggleModal} hideModal={hideModal} showSortModal={showSortModal} />
                <button onClick={handleResetFilters} className="text-secondary cursor-pointer">اعادة تعيين</button>
            </div>
        </main>
    )


}