import React from 'react'
import Sidebar from '../components/Sidebar'
import { Link } from 'react-router-dom'
import { ChevronRight, Plus } from 'lucide-react'
import newsImg from '../assets/newsImg.jpeg'
const LiveInformationPage = () => {
    return (
        <>
            <section className='flex items-start'>
                <Sidebar />
                <div className="main-container px-6 mt-4 w-[100%]">
                    <div className="breadcrumbs-section flex items-center justify-between">
                        <h1 className="flex items-center text-gray-600">
                            <Link to="/">Dashboard</Link> <ChevronRight />
                            <span className="font-medium text-black">Bookings</span>
                        </h1>
                        <Link to="/liveInformation/addNews" className='btn-green px-4 py-2 rounded cursor-pointer flex items-center gap-2 text-white'><Plus className='text-white' /> Add News</Link>
                    </div>
                    <div className="news-container mt-6">
                        <div className="news-card w-[360px] p-2 ">
                            <img src={newsImg} className="w-[100%] object-cover rounded-lg h-[180px]" />
                            <div className="content-container mt-2">
                                <h1 className='font-medium text-xl'>Heavy Rainfall Soaks Munnar Hills</h1>
                                <p className="description mt-2 text-gray-600 text-justify">Continuous downpours have lashed Munnar over the past 24 hours, causing landslides in a few areas and disrupting road connectivity. Tourists are advised to stay indoors as the Kerala Disaster Management Authority has issued an alert for the Idukki district, urging residents to remain cautious amid rising water levels in nearby rivers and tea plantations.</p>
                            </div>
                        </div>
                    </div>
                </div>

            </section>

        </>
    )
}

export default LiveInformationPage
