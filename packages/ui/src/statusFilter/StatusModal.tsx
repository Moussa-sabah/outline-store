

import { useProductFiltersStore } from '../../../../apps/admin/stores/filters/productFilters_store'
import Category from '../Category'


export default function StatusModal() {
    const filterType = useProductFiltersStore(state => state.filterType)
    const setStatus_dash = useProductFiltersStore((state) => state.setStatus_dash)
    const setStatus_edit = useProductFiltersStore((state) => state.setStatus_edit)

    function handleGender(gender: string) {
        if (filterType === 'dashboard') {
            setStatus_dash(gender)
        }
        else {
            setStatus_edit(gender)
        }
    }
    return (
        <main className='absolute pt-1'>
            <div className={`flex flex-col gap-3 p-3  bg-primary shadow-2xl text-white w-25 rounded-md font-semibold relative`}>
                <Category category='active' setCategory={handleGender} />
                <Category category='draft' setCategory={handleGender} />
            </div>
        </main>
    )
}
