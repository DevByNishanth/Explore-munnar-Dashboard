import axios from 'axios'
import React, { useEffect, useState } from 'react'
import att1 from '../assets/att1.jpg'
import { MapPin, Trash2 } from 'lucide-react'
import LoadingPage from '../pages/LoadingPage'
import BusTimingsActionPopup from '../components/BusTimingsActionPopup'
import NoData from './NoData'
const AttractionsCard = () => {
    // Auth 
    const apiUrl = import.meta.env.VITE_API_URL

    // states 
    const [data, setData] = useState([])
    const [isModal, setIsModal] = useState(false)
    const [selectedId, setSelectedId] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    // side effects 

    useEffect(() => {
        getData()
    }, [])
    // functions 

    async function getData() {
        try {
            setIsLoading(true)
            const res = await axios.get(`${apiUrl}/api/attractions`);
            setData(res.data.data)
            setIsLoading(false)
        } catch (err) {
            setIsLoading(false)
            console.error("Error while fetching Attractions : ", err.message)
        }
    }
    async function handleDelete() {
        try {
            const res = await axios.delete(`${apiUrl}/api/attractions/${selectedId}`)
            window.location.reload()
        } catch (err) {
            console.error("Error occured while deleting attraction record : ", err.message)
        }
    }
    function onclose() {
        setIsModal(false)
    }
    return (
        <>
            <div className="card-container grid grid-cols-1 md:grid-cols-3 gap-3 mt-4 max-h-[calc(100vh-160px)] overflow-auto">
                {data?.length > 0 ? (
                    data.map((item) => {
                        return <div className="card border border-gray-300 p-2 rounded-lg h-fit ">
                            <img src={att1} className="h-[240px] rounded-lg w-full object-cover" />
                            <div className="content-container mt-2 space-y-2">
                                <div className='flex items-center justify-between'>
                                    <h1 className='font-medium text-lg text-green-800'>{item.route}</h1>
                                    <div onClick={() => { setIsModal(true); setSelectedId(item.id) }} className="delete-btn-container bg-amber-700 hover:bg-amber-900 cursor-pointer w-8 h-8 flex items-center justify-center rounded-full">
                                        <button><Trash2 className='text-white h-6 w-6' /></button>
                                    </div>
                                </div>
                                <h1 className='text-gray-900 flex items-center gap-1 font-medium'><MapPin className='w-5 h-5 text-amber-700' /> {item.spot_name}</h1>
                                <h1 className='text-gray-500'>{item.description.slice(0, 34)}..</h1>
                            </div>

                        </div>
                    })
                ) : (
                    <NoData />
                )}
            </div>
            {isLoading && <LoadingPage />}
            {isModal && <BusTimingsActionPopup handleDelete={handleDelete} onclose={onclose} />}
        </>
    )
}

export default AttractionsCard
