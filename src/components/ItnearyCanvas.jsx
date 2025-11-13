import React from 'react'
import itnearyBannerImg from '../assets/itnearyBannerImg.svg'
import { ChevronRight, ChevronUp } from 'lucide-react'
const ItnearyCanvas = ({ isCanvas }) => {
    return (
        <>
            <div className='tint fixed inset-0 bg-black/30'></div>
            <section className='absolute top-0 right-0 w-[55%] h-[100vh] bg-white z-10 px-6'>
                <div className="header mt-4 h-[200px]">
                    <img src={itnearyBannerImg} className="h-[100%] object-cover rounded-lg w-[100%]" />
                </div>
                <div className="content-container mt-4">
                    <div className="personalInfo-container">
                        <div className="header flex items-center gap-4 justify-between ">
                            <h1 className='font-medium text-lg'>Personal Info</h1>
                            <button className='bg-red-400 text-black px-4 py-2 rounded-lg'>Pending</button>
                        </div>
                        <div className="sub-content-container mt-2 flex items-center gap-6">
                            <h1 className='text-gray-600'>Nishanth</h1>
                            <h1 className='text-gray-600'>1234567890</h1>
                            <h1 className='text-gray-600'>Coimbatore</h1>
                            <h1 className='text-gray-600'>Contact preference : By call</h1>
                        </div>
                    </div>
                    <div className="personalInfo-container mt-4">
                        <h1 className='font-medium text-lg'>Trip dates & group details</h1>
                        <div className="sub-content-container mt-2 flex items-center gap-6">
                            <h1 className='text-gray-600'>May 10 – May 14, 2024</h1>
                            <h1 className='text-gray-600'> 2 Adults</h1>
                            <h1 className='text-gray-600'>Family</h1>
                        </div>
                    </div>
                    <div className="personalInfo-container mt-4">
                        <h1 className='font-medium text-lg'>Accommodation</h1>
                        <div className="sub-content-container mt-2 flex items-center gap-6">
                            <h1 className='text-gray-600'>3 Star Room</h1>
                            <h1 className='text-gray-600'>Type: 1 Room</h1>
                            <h1 className='text-gray-600'>Budget: Rs 5,000/room</h1>
                        </div>
                    </div>
                    <div className="personalInfo-container mt-4">
                        <h1 className='font-medium text-lg'>Transport</h1>
                        <div className="sub-content-container mt-2 flex items-center gap-6">
                            <h1 className='text-gray-600'>Yes, Private</h1>
                            <h1 className='text-gray-600'>Requirement: Local Sightseeing</h1>
                            <h1 className='text-gray-600'>Suv 5 seater</h1>
                        </div>
                    </div>
                    <button className='mt-8 btn-green px-4 py-2 rounded-lg text-white flex gap-3 items-center'>Change status <ChevronUp className='text-white' /> </button>
                </div>
            </section>
        </>
    )
}

export default ItnearyCanvas