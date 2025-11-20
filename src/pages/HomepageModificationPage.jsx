import React from 'react'
import Sidebar from '../components/Sidebar'
import { Link } from 'react-router-dom'
import { ChevronRight, Plus } from 'lucide-react'

const HomepageModificationPage = () => {
    return (
        <>
            <section className="flex items-start">
                <Sidebar />
                <div className="main-container px-6 mt-4 w-[100%]">
                    <div className="breadcrumbs-section flex items-center justify-between">
                        <h1 className="flex items-center text-gray-600">
                            <Link to="/">Dashboard</Link> <ChevronRight />
                            <span className="font-medium text-black">Pick Hotels</span>
                        </h1>
                    </div>
                </div>
            </section>
        </>
    )
}

export default HomepageModificationPage
