'use client'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSquare } from "@fortawesome/free-regular-svg-icons";
import { faTrashCan, faCheckSquare, faL } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from 'react'
import { Admin } from "@repo/types";
import Image from "next/image";
import { ConfirmModal, PopupBG } from "@repo/ui";
import { useAdminStore } from "../../../../stores/admin_store";


interface Props {
  checkedAll: boolean,
  admin: Admin
  refresh: () => void
}

export default function AdminElement({ checkedAll, admin, refresh }: Props) {
  const deleteAdminByManager = useAdminStore(state => state.deleteAdminByManager)
  const [checked, setChecked] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  useEffect(() => {
    setChecked(checkedAll)
  }, [checkedAll])


  async function fetchDeleteAdminByManager() {
    const response = await deleteAdminByManager(admin.id)
    if (response.status === 'success') {
      setShowDeleteModal(false)
      refresh()
    }
  }


  return (
    <div className="flex   px-4   row h-15  items-center  rounded-xl hover:border-borders  border border-white">
      <button className="flex-0 cursor-pointer mr-3"><FontAwesomeIcon onClick={() => setChecked(!checked)} icon={checked ? faCheckSquare : faSquare} className={`w-4 h-4 ${checked ? '' : 'text-borders'}`} /></button>
      <div className="flex-1  whitespace-nowrap overflow-x-auto  ">
        <p className="max-w-2/3  overflow-x-auto scrollbar-none">#{admin.id}</p>
      </div>
      <div className="flex-2 flex items-center gap-4">
        {admin?.image ? <Image alt="" width={500} height={500} src={admin.image} className="w-6 h-6 rounded-full object-cover border border-lightBorder" /> :
          <p className="w-6 h-6 bg-buttons flex items-center justify-center text-white font-semibold rounded-full text-xs">{admin.name.split('')[0]}</p>
        }
        {admin?.name}
      </div>
      <p className="flex-2">{admin.email}</p>
      <p className='flex-2'>{admin.phone}</p>
      <p className="flex-1">{new Date(admin.created_at).toLocaleDateString('en-ca', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric'
      })}</p>
      <button onClick={() => setShowDeleteModal(true)} className="flex-1 text-center text-sm"><FontAwesomeIcon icon={faTrashCan} className="w-4 h-4 text-red-400 hover:scale-110 cursor-pointer" /></button>
      {showDeleteModal && <PopupBG close={() => setShowDeleteModal(false)} />}
      <ConfirmModal show={showDeleteModal} buttonTitle='delete' buttonColor='redColor' doing={fetchDeleteAdminByManager} />
    </div>
  )
}