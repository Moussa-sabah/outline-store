

import { useFilterStore } from '../../../../apps/web/stores/filters_store'
import Category from '../Category'

interface props {
  type: string
  hideModal: () => void
}

export default function SortModal({ type, hideModal }: props) {

  const setSort_web = useFilterStore(state => state.setSort_web)
  function handleSort(sort: string) {
    hideModal()
    if (type === 'web') {
      setSort_web(sort)
    }
  }

  return (

    <div className={`flex flex-col  gap-3 p-3  bg-primary text-white w-28 rounded-md absolute left-0   top-full mt-1 z-10`}>
      <Category category='newest' show='الأحدث' setCategory={handleSort} />
      <Category category='oldest' show='الأساسية' setCategory={handleSort} />
      <Category category='price: high-low' show='السعر الأعلى' setCategory={handleSort} />
      <Category category='price: low-high' show='السعر الاقل' setCategory={handleSort} />
    </div>

  )
}

