import React from 'react'
import Sidebar from '../components/Sidebar'
import { useParams } from 'react-router-dom'

const ActivitiesDetailsPage = () => {

    // params 
    const { id } = useParams()
    return (
        <>
            <section className="flex items-start">
                <Sidebar />
                <div className="main-container px-6 mt-4 w-[100%]">
                    <h1>{id}</h1>
                </div>
            </section>
        </>
    )
}

export default ActivitiesDetailsPage