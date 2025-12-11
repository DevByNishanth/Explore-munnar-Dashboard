import { TriangleAlert } from 'lucide-react'
import React from 'react'

const ErrorPopup = ({ onClose, errMessage }) => {
    return (
        <>
            <div className="fixed inset-0 bg-black/20 z-30"></div>
            <section className='w-[30%]  bg-white rounded-b-xl rounded-xl  absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-40'>
                <div className="header-container h-[33%] flex items-center rounded-t-xl justify-center w-full py-3 bg-[#F87C63]">
                    <div className="icon-container w-fit m-auto">
                        <TriangleAlert className='w-[70px] h-[70px] text-white' />
                    </div>
                </div>
                <div className="content-contaienr text-center mt-6">
                    <h1 className='text-[#333333] font-semibold text-3xl'>Warning!</h1>
                    <h1 className='mt-3 text-[#444444] text-lg'>{errMessage}</h1>
                </div>
                <div className="btn-container text-center mb-4 mt-3">
                    <button onClick={onClose} className='bg-[#F87C63] text-white px-7 py-2 rounded-xl cursor-pointer hover:bg-[#f36b50]'>Close</button>
                </div>
            </section>
        </>
    )
}

export default ErrorPopup
