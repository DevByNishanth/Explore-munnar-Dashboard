import axios from 'axios'
import React, { useEffect, useState } from 'react'
import att1 from '../assets/att1.jpg'
import { MapPin } from 'lucide-react'
const AttractionsCard = () => {
    // Auth 
    const apiUrl = import.meta.env.VITE_API_URL

    // states 
    const [data, setData] = useState([])

    // side effects 

    useEffect(() => {
        getData()
    }, [])
    // functions 

    async function getData() {
        try {
            const res = await axios.get(`${apiUrl}/api/attractions`);
            setData(res.data.data)
        } catch (err) {
            console.error("Error while fetching Attractions : ", err.message)
        }
    }
    return (
        <>
            <div className="card-container grid grid-cols-1 md:grid-cols-3 gap-3 mt-4 max-h-[calc(100vh-160px)] overflow-auto">
                {data.map((item) => {
                    return <div className="card border border-gray-300 p-2 rounded-lg h-[340px] ">
                        <img src={att1} className="h-[60%] rounded-lg w-full object-cover" />
                        <div className="content-container mt-2 space-y-2">
                            <h1 className='font-medium text-lg text-green-800'>{item.route}</h1>
                            <h1 className='text-gray-900 flex items-center gap-1 font-medium'><MapPin className='w-5 h-5 text-amber-700' /> {item.spot_name}</h1>
                            <h1 className='text-gray-500'>{item.description.slice(0, 34)}..</h1>
                        </div>
                    </div>
                })}
            </div>

        </>
    )
}

export default AttractionsCard