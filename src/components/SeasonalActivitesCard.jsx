import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const SeasonalActivitesCard = ({ formatedData }) => {
    // states 
    const [selectedCardData, setSlectedCardData] = useState(null);

    if (formatedData == null || formatedData.length == 0) {
        return <div>
            <h1>No data found</h1>
        </div>
    }

    return (
        <>
            {formatedData.map((item, index) => {
                return <Link to={`/activites/${item.id}`} className='card  border border-gray-300 p-2 rounded w-full h-[320px]'>
                    <div className="img-container border w-full h-[44%]">
                        <img src="" className="w-[100%] h-[100%]" />
                    </div>
                    <div className="content-container mt-2">
                        <h1>{item.title}</h1>
                        <h1 className='mt-2'>{item.description}</h1>
                    </div>
                </Link>
            })}
        </>
    )
}

export default SeasonalActivitesCard
