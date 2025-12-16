import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import { Link, Navigate, useNavigate, useNavigation, useParams } from 'react-router-dom'
import { ChevronRight, Edit, Trash2 } from 'lucide-react'
import ac1 from '../assets/a1.svg'
import ac2 from '../assets/a2.svg'
import ac3 from '../assets/a3.svg'
import locationImg from '../assets/locationImg.svg'
import BusTimingsActionPopup from '../components/BusTimingsActionPopup'
import axios from 'axios'
import LoadingPage from './LoadingPage'

const data = {
    img: { img1: ac1, img2: ac2, img3: ac3 },
    category: "Regular activity",
    type: "Boating & Lake Tours",
};
const ActivitiesDetailsPage = () => {
    // Auth 
    const apiUrl = import.meta.env.VITE_API_URL

    // params 
    const { id } = useParams()

    const navigate = useNavigate()

    // states 
    const [activityData, setData] = useState({})
    const [isDeleteModal, setIsDeleteModal] = useState(false)
    const [selectedActivityId, setSelectedActivityId] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    // console.log("activity data", activityData.images[0].url)


    // handling sifd effects 
    useEffect(() => {
        fetchData()
    }, [])

    // functions 
    async function onclose() {
        setIsDeleteModal(false);
    }

    const fetchData = async () => {

        try {
            setIsLoading(true)
            const response = await axios.get(`${apiUrl}/api/activity/${id}`);
            // console.log("Activity detail view : ", response.data.data)
            setData(response.data.data)
            setIsLoading(false)
        } catch (err) {
            console.error("Error while fetching Activity : ", err.message);
            setIsLoading(false)
        }
    }

    async function handleDelete() {
        try {
            setIsLoading(true)
            const response = await axios.delete(`${apiUrl}/api/activity/${id}`);
            console.log("Activity Deleted Successfully..", response);
            setIsDeleteModal(false);
            setSelectedActivityId(null);
            navigate(`/activities`)
        } catch (err) {
            console.error("Error while deleting Activity : ", err.message);
            setIsDeleteModal(false)
            setSelectedActivityId(null)
            setIsLoading(false)
        }
    }
    console.log("activity data 11: ", activityData) 
    return (
        <>
            <section className="flex items-start">
                <Sidebar />
                <div className="main-container px-6 mt-4 w-[100%] " >
                    {/* Breadcrumb  ------------------------------------------  */}
                    <div className="breadcrumbs-section flex items-center pb-2 justify-between">
                        <h1 className="flex items-center text-gray-600">
                            <Link to="/activities">Activities</Link> <ChevronRight />
                            <span className="font-medium text-black">Activity</span>
                        </h1>
                        <div className="btn-container flex gap-3 items-center ">
                            <Link to={`/activities/addActivity/?editMode=true&id=${id}`} className='btn-green text-white flex items-center gap-2 cursor-pointer px-4 py-2 rounded-md'>
                                <Edit className='w-4 h-4 text-white' />
                                Edit</Link>
                            <button onClick={() => setIsDeleteModal(true)} className='bg-[#AF4300] text-white cursor-pointer px-3 py-2 flex items-center gap-2 rounded-md'>
                                <Trash2 className='w-4 h-4 text-white' />
                                Delete</button>
                        </div>
                    </div>

                    <div className="main-container max-h-[calc(100vh-70px)] overflow-auto">
                        {/* Hero section ----------------------------------  */}
                        <div className="main-container mt-4 ">
                            <div className="hero-section  flex gap-2">
                                <div className="container-1 h-[510px] w-[58%]">
                                    <div className="img-1 h-[100%]">
                                        <img
                                            src={activityData?.images?.[0]?.url}
                                            className="h-[100%] w-[100%] rounded-lg object-cover"
                                        />
                                    </div>
                                </div>
                                <div className="container-2 space-y-2 w-[42%] h-[500px]">
                                    <img
                                        src={activityData?.images?.[1]?.url}
                                        className="h-[50%] w-[100%] rounded-lg object-cover"
                                    />
                                    <img
                                        src={activityData?.images?.[2]?.url}
                                        className="h-[50%] w-[100%] rounded-lg object-cover"
                                    />
                                </div>
                            </div>

                            {/* category-container ---------------------  */}
                            <div className='flex items-center justify-between pr-3'>
                                <div className="category-tab-container mt-4 flex gap-4 items-center">
                                    <button className="bg-[#EEEEEE] text-[#333333] px-4 py-2 rounded-full shadow">
                                        {activityData.type}
                                    </button>
                                    <button className="bg-[#EEEEEE] text-[#333333] px-4 py-2 rounded-full shadow">
                                        {activityData.category}
                                    </button>
                                </div>
                                {/* <button className='text-green-900 font-medium text-xl'> ₹ {activityData.price}</button> */}
                            </div>
                        </div>

                        {/* Overvire section ----------------------------------------         */}
                        <div className="overview-container mt-12">
                            <h1 className='font-medium text-lg'>Overview</h1>

                            <div className='w-[100%] text-justify'>
                                {activityData?.description?.split('. ').map((item, index) => {
                                    return <p className='mb-2 text-justify text-[#777777]'>{item}.</p>
                                })}
                            </div>
                        </div>
                        <div className="overview-container mt-12">
                            {/* <img src={locationImg} alt="" /> */}
                            <iframe src={activityData.location_url} frameborder="0" className='w-[100%] h-[380px]'></iframe>
                        </div>
                    </div>

                </div>
            </section>
            {isDeleteModal && <BusTimingsActionPopup onclose={onclose} handleDelete={handleDelete} />}
            {isLoading && <LoadingPage />}
        </>
    )
}

export default ActivitiesDetailsPage