import { MapPinHouse, Plus, X } from 'lucide-react'
import React, { useState } from 'react'
import addspot from '../assets/addSpot.svg'
const ItnearyAttractionModal = ({ setIsModal }) => {
    // states 
    const [spots, setSpots] = useState([{ value: "" }]);


    // functions 
    const handleAddInput = () => {
        setSpots(prev => [...prev, { value: "" }])
    }

    const handleRemove = (index) => {
        if (spots.length < 2) {
            alert("Minimum one spot is required.")
            return;
        }
        const updated = spots.filter((_, i) => i !== index);
        setSpots(updated);
    }

    const hanldeInputChange = (index, inputValue) => {
        const updatedSpots = [...spots];
        updatedSpots[index].value = inputValue;
        setSpots(updatedSpots)
    }


    return (
        
        <>
            <div className="fixed inset-0 bg-black/40 z-40"></div>
            <section className='bg-white w-[50%] max-h-[calc(100vh-70px)] overflow-auto z-50 pb-2 absolute rounded-lg top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'>
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
                <div className="form-container mt-3 mx-6 space-y-2">
                    <div className="input">
                        <h1 className='font-medium text-lg'>Route</h1>
                        <input type="text" placeholder='Eg: Mattupetty - Topstation - Vattavada' className='border border-gray-400 w-[100%] mt-1 rounded px-4 py-2' />
                    </div>
                    <div className="input">
                        <h1 className='font-medium text-lg'>Description</h1>
                        <input type="text" placeholder='Eg: Scenic tea trails & mountain views' className='border border-gray-400 w-[100%] mt-1 rounded px-4 py-2' />
                    </div>

                    {/* attraction add input container  */}
                    <div className="attraction-add-input-container">
                        <div className="header relative">
                            <header className='flex items-center justify-between'>
                                <h1 className='font-medium text-lg'>Add Spots</h1>
                                <button onClick={handleAddInput} className='btn-green text-white flex items-center justify-center h-[30px] w-[7%] cursor-pointer rounded'><Plus /></button>
                            </header>
                            <div className="input-container  max-h-[calc(100vh-370px)] overflow-auto hide-scrollbar">
                                {spots.map((item, index) => {
                                    return <div key={index} className="input-container flex items-center justify-between gap-2 mt-2">
                                        <input type="text" value={item.value} onChange={(e) => hanldeInputChange(index, e.target.value)} placeholder='Eg: Munnar rose garden' className='border border-gray-400 w-[92%] rounded px-4 py-2' />
                                        <button onClick={() => handleRemove(index)} className='text-red-400'><X /></button>
                                    </div>
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ItnearyAttractionModal