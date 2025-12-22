import { MapPinHouse, Plus, X } from 'lucide-react'
import React, { useState } from 'react'
import addspot from '../assets/addSpot.svg'
import axios from 'axios'
const ItnearyAttractionModal = ({ setIsModal }) => {
    // Auth 
    const apiUrl = import.meta.env.VITE_API_URL

    // states 
    const [formData, setFormData] = useState({
        route: "",
        description: "",
        spotName: ""
    })


    // functions 
    function handleInputChange(e) {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    async function onSave() {
        try {
            const res = await axios.post(`${apiUrl}/api/attractions`, formData)
            window.location.reload()
        } catch (err) {
            console.error("Error occured while posting attraction data : ", err.message)
        }
    }
    
    return (

        <>
            <div className="fixed inset-0 bg-black/40 z-40"></div>
            <section className='bg-white w-[95%] md:w-[50%] max-h-[calc(100vh-70px)] overflow-auto z-50 pb-2 absolute rounded-lg top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'>
                {/* header  */}
                <div className="header sticky top-0 bg-white z-10 flex items-start justify-between gap-4 px-6 py-4 border-b border-gray-200">
                    <div className='flex items-center gap-4'>
                        <div className="icon-container border border-gray-200 p-2 rounded">
                            <MapPinHouse className='text-gray-800 w-6 h-7' />
                        </div>
                        <div>
                            <h1 className='font-medium'>Add Attraction</h1>
                            <h1 className='text-gray-400 text-[14px]'>Add Spot Between Route Points</h1>
                        </div>
                    </div>
                    <X onClick={() => setIsModal(false)} className='text-gray-600 cursor-pointer hover:text-gray-900' />
                </div>
                {/* form container  */}
                <div className="form-container mt-3 mx-6 space-y-2 ">
                    <div className="input">
                        <h1 className='font-medium text-lg'>Route</h1>
                        <input type="text" onChange={(e) => handleInputChange(e)} name='route' value={formData.route} placeholder='Eg: Mattupetty - Topstation - Vattavada' className='border border-gray-400 w-[100%] mt-1 rounded px-4 py-2' />
                    </div>
                    <div className="input">
                        <h1 className='font-medium text-lg'>Description</h1>
                        <input type="text" onChange={(e) => handleInputChange(e)} name='description' value={formData.description} placeholder='Eg: Scenic tea trails & mountain views' className='border border-gray-400 w-[100%] mt-1 rounded px-4 py-2' />
                    </div>
                    <div className="input">
                        <h1 className='font-medium text-lg'>Spot Name</h1>
                        <input type="text" onChange={(e) => handleInputChange(e)} name='spotName' value={formData.spotName} placeholder='Eg: Echo Point' className='border border-gray-400 w-[100%] mt-1 rounded px-4 py-2' />
                    </div>
                    <div className="btn-container flex items-center justify-end">
                        <button onClick={onSave} className='btn-green text-white px-4 py-2 rounded cursor-pointer'>Save</button>
                    </div>
                </div>

            </section>
        </>
    )
}

export default ItnearyAttractionModal