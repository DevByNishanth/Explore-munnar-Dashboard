import React from 'react'
import editImg from '../assets/editModalImg.svg'
import { Delete, Trash2, X } from 'lucide-react'
import editGif from '../assets/delete.gif'
const BusTimingsActionPopup = ({ toggleState, onclose, handleDelete }) => {

    const title = {
        edit: "Edit bus timing",
        delete: "Delete record"
    }
    return (
        <>
            <div className="fixed inset-0 bg-black/50"></div>
            <section className='bg-white w-[40%] pb-4 px-6 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-lg z-60'>
                <header className='py-4 flex items-center gap-2 justify-between'>
                    <h1 className='font-medium text-lg'>{toggleState == "edit" ? "Edit record" : "Delete record"}</h1>
                    <X onClick={onclose} className='cursor-pointer' />
                </header>
                <div className="img-container mt-2 bg-amber-800 m-auto flex items-center justify-center rounded-full h-[100px] w-[100px] ">
                    <Trash2 className='h-[60px] w-[60px] text-white' />
                </div>
                <h1 className='text-xl font-medium m-auto w-[60%] text-center mt-2 text-gray-700'>Are you sure want to delete this record?</h1>
                <div className="btn-container flex items-center gap-2 mt-4">
                    <button onClick={onclose} className='bg-gray-300 rounded-lg w-[50%] py-2 cursor-pointer'>Cancel</button>
                    <button onClick={handleDelete} className='bg-amber-900 text-white rounded-lg w-[50%] py-2 cursor-pointer'>Delete</button>
                </div>
            </section>
        </>
    )
}

export default BusTimingsActionPopup
