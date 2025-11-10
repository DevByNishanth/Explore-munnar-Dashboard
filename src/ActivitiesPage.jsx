import React, { useEffect, useState } from 'react'
import Sidebar from './components/Sidebar'
import { Link } from 'react-router-dom'
import { ChevronRight, Plus } from 'lucide-react'
import SeasonalActivitesCard from './components/SeasonalActivitesCard'

const allData = [
    { title: "Seasonal Activites Title 1", description: "Seasonal Activities Description 1", category: "seasonalActivities", id: 1 },
    { title: "Winter Activites Title 1", description: "Winter Activities Description 1", category: "winterActivities", id: 2 },
    { title: "Seasonal Activites Title 2", description: "Seasonal Activities Description 2", category: "seasonalActivities", id: 3 },
]

const ActivitiesPage = () => {
    // states 
    const [bookingSelectedTab, setSelectedTab] = useState("seasonalactivities");
    const [formatedData, setFormatedData] = useState(null)

    // useEffect call's 

    useEffect(() => {
        handleCardRendering()
    }, [bookingSelectedTab])

    // functions 
    const handleCardRendering = () => {
        const selectedBtn = bookingSelectedTab.toLowerCase()
        const filteredData = allData.filter(item => item.category.toLowerCase() == selectedBtn);
        setFormatedData(filteredData)
    }


    // load the whole activities data


    /*
    
    1. if selectedTab == ("SeasonalActivities"){
        filter the seasonal Activities Data and store it in a State => Array of object
    }

    2. Trigger the Card and just pass the formated(filtered) data to the card component 
        
    */
    return (
        <>
            <section className="flex items-start">
                <Sidebar />
                <div className="main-container px-6 mt-4 w-[100%]">
                    {/* Breadcrumb  ------------------------------------------  */}
                    <div className="breadcrumbs-section flex justify-between">
                        <h1 className="flex items-center text-gray-600">
                            <Link to="/">Dashboard</Link> <ChevronRight />
                            <span className="font-medium text-black">Activites</span>
                        </h1>
                        <Link to={'/activities/addActivity'} className='flex items-center text-white btn-green px-4 py-2 rounded cursor-pointer gap-3'><Plus /> Add Activity</Link>
                    </div>
                    {/* tabs */}
                    <div className="tab-container  w-fit px-2 py-2 border-b-gray-200 bg-gray-100 rounded-full mt-6 flex gap-4 text-gray-400">
                        <button
                            className={`w-fit px-4 py-2 cursor-pointer ${bookingSelectedTab.toLowerCase() == "seasonalactivities"
                                ? "font-medium bg-white shadow text-black rounded-full"
                                : ""
                                }`}
                            onClick={() => {
                                setSelectedTab("seasonalactivities");
                            }}
                        >
                            Seasonal Activities
                        </button>
                        <button
                            onClick={() => {
                                setSelectedTab("winterActivities");
                            }}
                            className={`w-fit px-4 py-2 cursor-pointer  ${bookingSelectedTab.toLowerCase() == "winteractivities"
                                ? "font-medium bg-white shadow text-black rounded-full"
                                : ""
                                }`}
                        >
                            Winter Activites
                        </button>
                        <button
                            onClick={() => {
                                setSelectedTab("bikeRentals");
                            }}
                            className={`w-fit px-4 py-2 cursor-pointer ${bookingSelectedTab.toLowerCase() == "bikerentals"
                                ? "font-medium bg-white shadow text-black rounded-full"
                                : ""
                                }`}
                        >
                            Bike Rentals
                        </button>
                        <button
                            onClick={() => {
                                setSelectedTab("selfCarDriving");
                            }}
                            className={`w-fit px-4 py-2 cursor-pointer ${bookingSelectedTab.toLowerCase() == "selfcardriving"
                                ? "font-medium bg-white shadow text-black rounded-full"
                                : ""
                                }`}
                        >
                            Self Car Driving
                        </button>
                    </div>
                    <div className="card-container grid grid-cols-3 gap-4 mt-6">
                        <SeasonalActivitesCard formatedData={formatedData} />
                    </div>
                </div>
            </section>
        </>
    )
}

export default ActivitiesPage