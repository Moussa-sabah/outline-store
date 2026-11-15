

import { useProductFiltersStore } from '../../../../apps/admin/stores/filters/productFilters_store'
import { useFilterStore } from '../../../../apps/web/stores/filters_store'
import Category from '../Category'

interface props {
  type: string
  hideModal:()=>void
}

export default function GenderModal({ type,hideModal }: props) {

  const setGender_dash = useProductFiltersStore((state) => state.setGender_dash)
  const setGender_add = useProductFiltersStore((state) => state.setGender_add)
  const setGender_edit = useProductFiltersStore((state) => state.setGender_edit)
  const setGender_web = useFilterStore(state => state.setGender_web)

  function handleGender(gender: string) {
    hideModal()
    if (type === 'dashboard') {
      setGender_dash(gender)
    }
    else if (type === 'addProduct') {
      setGender_add(gender)
    }
    else if (type === 'editProduct') {
      setGender_edit(gender)
    }
    else if (type === 'web') {
      setGender_web(gender)
    }
  }
  return (

      <div className={`flex flex-col gap-3 p-3 absolute right-0 top-full mt-1 bg-primary shadow-2xl text-white w-23 rounded-md    z-10`}>
        <Category show='رجالي' category='men' setCategory={handleGender} />
        <Category show='نسائي' category='women' setCategory={handleGender} />
        <Category show='أطفال' category='kids' setCategory={handleGender} />
      </div>

  )
}
