import { MapPinHouse, Plus, X, Image } from 'lucide-react'
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
    const [image, setImage] = useState(null)
    const [isLoading, setIsLoading] = useState(false)


    // functions 
    function handleInputChange(e) {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    function handleImageChange(e) {
        const file = e.target.files[0]
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                alert("File size exceeds 5MB")
                e.target.value = null
                return
            }
            if (!file.type.startsWith('image/')) {
                alert("Please upload an image file")
                e.target.value = null
                return
            }
            setImage(file)
        }
    }

    async function onSave() {
        setIsLoading(true)
        try {
            const data = new FormData()
            data.append("route", formData.route)
            data.append("description", formData.description)
            data.append("spotName", formData.spotName)
            if (image) {
                data.append("image", image)
            }

            const res = await axios.post(`${apiUrl}/api/attractions`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            window.location.reload()
        } catch (err) {
            console.error("Error occured while posting attraction data : ", err.message)
        } finally {
            setIsLoading(false)
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
                        <select onChange={handleInputChange} name='route' value={formData.route} className='border border-gray-400 w-[100%] mt-1 rounded px-4 py-2'>
                            <option value="">Select Route</option>
                            <option value="Mattupetty – Topstation – Vattavada">Mattupetty–Topstation–Vattavada</option>
                            <option value="Eravikulam – Marayoor – Kanthalloor">Eravikulam–Marayoor–Kanthalloor</option>
                            <option value="Devikulam – Chinnakanal – Poopara">Devikulam–Chinnakanal–Poopara</option>
                        </select>
                    </div>
                    <div className="input">
                        <h1 className='font-medium text-lg'>Description</h1>
                        <input type="text" onChange={(e) => handleInputChange(e)} name='description' value={formData.description} placeholder='Eg: Scenic tea trails & mountain views' className='border border-gray-400 w-[100%] mt-1 rounded px-4 py-2' />
                    </div>
                    <div className="input">
                        <h1 className='font-medium text-lg'>Spot Name</h1>
                        <input type="text" onChange={(e) => handleInputChange(e)} name='spotName' value={formData.spotName} placeholder='Eg: Echo Point' className='border border-gray-400 w-[100%] mt-1 rounded px-4 py-2' />
                    </div>
                    <div className="input">
                        <h1 className='font-medium text-lg'>Upload Image</h1>
                        <label htmlFor="image-upload" className='border border-gray-400 border-dashed w-[100%] mt-1 rounded px-4 py-2 flex items-center justify-center gap-2 cursor-pointer hover:bg-gray-50 transition-colors'>
                            <Image className='w-5 h-5 text-gray-500' />
                            <span className='text-gray-600'>{image ? image.name : "Upload Image"}</span>
                        </label>
                        <input id="image-upload" type="file" accept="image/*" onChange={handleImageChange} className='hidden' />
                    </div>
                    <div className="btn-container flex items-center justify-end">
                        <button onClick={onSave} disabled={isLoading} className={`btn-green text-white px-4 py-2 rounded cursor-pointer ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}>{isLoading ? "Saving..." : "Save"}</button>
                    </div>
                </div>

            </section>
        </>
    )
}

export default ItnearyAttractionModal