import React from 'react'
import Sidebar from '../components/Sidebar'
import { Link } from 'react-router-dom'
import { ChevronRight, Plus } from 'lucide-react'
import ReportsStatcard from '../components/ReportsStatcard'
import SimpleAreaChart from '../components/SimpleAreaChart'
import DonutChart from '../components/DonutChart'
import Calendar from '../components/Calendar'

const ReportsPage = () => {
    const myData = [
        { name: "Group A", value: 400, fill: "#0088FE" },
        { name: "Group B", value: 300, fill: "#00C49F" },
        { name: "Group C", value: 300, fill: "#FFBB28" },
    ];
    return (
        <>
            <section className="flex w-[100%]">
                <Sidebar />

                {/* main-container  */}
                <div className="main-container px-6 w-[100%] max-h-[calc(100vh-20px)] overflow-auto">
                    {/* breadcrumbs  */}
                    {/* <div className="breadcrumbs-section flex items-center justify-between">
                        <h1 className="flex items-center text-gray-600">
                            <Link to="/">Dashboard</Link> <ChevronRight />
                            <span className="font-medium text-black">Reports</span>
                        </h1>
                    </div> */}

                    {/* chart container  */}
                    <div className="chart-container mt-5 grid grid-cols-12 gap-4 ">
                        <ReportsStatcard />
                        <SimpleAreaChart />
                    </div>
                    <div className="chart-container mt-5 grid grid-cols-12 gap-4 ">
                        <div className="container-1 col-span-6 border relative border-gray-200 rounded-md shadow">
                            <h2 className='absolute top-4 left-4 text-[#333333d8] font-medium text-lg'>Transport Bookings</h2>
                            <DonutChart data={myData} totalLabel="Bookings" />
                            <div className="denote-container absolute bottom-7 right-4">
                                <div className='flex items-center gap-2'>
                                    <div className="bg-[#aa5563] w-5 h-5 rounded-full"></div>
                                    <h1 className='text-gray-400 text-sm'>Cab booking</h1>
                                </div>
                                <div className='flex items-center gap-2 mt-3'>
                                    <div className="bg-[#376d5c] w-5 h-5 rounded-full"></div>
                                    <h1 className='text-gray-400 text-sm'>Bike rentals</h1>
                                </div>
                                <div className='flex items-center gap-2 mt-3'>
                                    <div className="bg-[#45538a] w-5 h-5 rounded-full"></div>
                                    <h1 className='text-gray-400 text-sm'>Seld drive car</h1>
                                </div>
                            </div>
                        </div>
                        <div className='col-span-6'>
                            <Calendar/>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ReportsPage