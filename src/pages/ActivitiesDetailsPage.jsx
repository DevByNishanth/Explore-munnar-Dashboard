import React from 'react'
import Sidebar from '../components/Sidebar'
import { Link, useParams } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import ac1 from '../assets/a1.svg'
import ac2 from '../assets/a2.svg'
import ac3 from '../assets/a3.svg'
import locationImg from '../assets/locationImg.svg'
const data = {
    img: { img1: ac1, img2: ac2, img3: ac3 },
    category: "Regular activity",
    type: "Boating & Lake Tours",
};
const ActivitiesDetailsPage = () => {

    // params 
    const { id } = useParams()
    return (
        <>
            <section className="flex items-start">
                <Sidebar />
                <div className="main-container px-6 mt-4 w-[100%] " >
                    {/* Breadcrumb  ------------------------------------------  */}
                    <div className="breadcrumbs-section flex justify-between">
                        <h1 className="flex items-center text-gray-600">
                            <Link to="/activities">Activities</Link> <ChevronRight />
                            <span className="font-medium text-black">Activity</span>
                        </h1>
                        <button className='bg-[#AF4300] text-white cursor-pointer px-3 py-2 rounded-md'>Delete</button>
                    </div>

                    <div className="main-container max-h-[calc(100vh-70px)] overflow-auto">
                        {/* Hero section ----------------------------------  */}
                        <div className="main-container mt-4 ">
                            <div className="hero-section  flex gap-2">
                                <div className="container-1 h-[510px] w-[58%]">
                                    <div className="img-1 h-[100%]">
                                        <img
                                            src={data.img.img1}
                                            className="h-[100%] w-[100%] rounded-lg object-cover"
                                        />
                                    </div>
                                </div>
                                <div className="container-2 space-y-2 w-[42%] h-[500px]">
                                    <img
                                        src={data.img.img2}
                                        className="h-[50%] w-[100%] rounded-lg object-cover"
                                    />
                                    <img
                                        src={data.img.img3}
                                        className="h-[50%] w-[100%] rounded-lg object-cover"
                                    />
                                </div>
                            </div>

                            {/* category-container ---------------------  */}
                            <div className="category-tab-container mt-4 flex gap-4 items-center">
                                <button className="bg-[#EEEEEE] text-[#333333] px-4 py-2 rounded-full shadow">
                                    {data.type}
                                </button>
                                <button className="bg-[#EEEEEE] text-[#333333] px-4 py-2 rounded-full shadow">
                                    {data.category}
                                </button>
                            </div>
                        </div>

                        {/* Overvire section ----------------------------------------         */}
                        <div className="overview-container mt-12 ">
                            <h1 className='font-medium text-lg'>Overview</h1>
                            <p className='mt-2 text-[#777777]'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Inventore sapiente voluptatum quidem sint consequuntur exercitationem autem vel distinctio neque nulla necessitatibus quam, blanditiis optio quaerat, provident placeat qui, sunt expedita porro atque vitae. Fugiat amet eius, ipsa mollitia provident quo tempora asperiores nam quod quis corporis perferendis sint doloribus voluptatibus voluptates aliquid ad iste sit velit consequatur quaerat! Adipisci expedita nemo nostrum excepturi nesciunt omnis, delectus rem impedit dolorum reiciendis optio minima consequatur, sint fuga illum esse itaque voluptas minus ratione veniam, iusto nisi nihil? Cum nam obcaecati, placeat consequuntur similique laudantium dolorum tenetur laboriosam dolores ipsa, recusandae libero tempore.</p>
                        </div>
                        <div className="overview-container mt-12 ">
                            <img src={locationImg} alt="" />
                        </div>
                    </div>

                </div>
            </section>
        </>
    )
}

export default ActivitiesDetailsPage