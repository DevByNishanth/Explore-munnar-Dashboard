import { X } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import {
  Bed,
  Bus,
  Utensils,
  Mountain,
  Wifi,
  Users
} from "lucide-react";
import { buttonBaseClasses } from '@mui/material';

const amenitiesData = [
  {
    category: "Room comfort",
    title: [
      "Comfortable beds (Double/Queen/King)",
      "Clean linens and blankets",
      "Attached private bathrooms",
      "Hot water supply (solar/geyser)",
      "Room heater"
    ]
  },
  {
    category: "Travel convenience",
    title: [
      "Free parking",
      "Paid cab or taxi assistance",
      "Two-wheeler rental",
      "Nearby KSRTC bus stand info"
    ]
  },
  {
    category: "Food & beverage",
    title: [
      "Breakfast included",
      "Room service",
      "On-site restaurant or dining area",
      "Campfire snacks or BBQ (in tent/eco stays)",
      "Kitchen access (for homestays)"
    ]
  },
  {
    category: "View and nature",
    title: [
      "Balcony with valley/mountain/lake views",
      "Garden or plantation view",
      "Tea estate surroundings",
      "Birdwatching or sunrise points nearby"
    ]
  },
  {
    category: "Connectivity",
    title: [
      "Free Wi-Fi",
      "Mobile signal support"
    ]
  },
  {
    category: "Family & safety",
    title: [
      "Family-friendly environment",
      "CCTV surveillance",
      "Fire safety measures",
      "Doctor on call",
      "Kitchen access (for homestays)"
    ]
  }
];


const AmenityFormModal = ({setIsAmenityModal}) => {
  // states 
  const [selectedTab, setSelectedTab] = useState("Room")
  const [formData, setFormData] = useState([])

  // useEffect call's 

  useEffect(() => {
    const filteredData = amenitiesData.filter((item) => {
      return item.category.toLowerCase().includes(selectedTab.toLowerCase())
    });
    setFormData(filteredData[0].title)
  }, [selectedTab])


  return (
    <>
      <div className="fixed inset-0 bg-black/30"></div>
      <section className="bg-white w-[45%] p-3 rounded-lg absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
        <header className='border-ddb border-gray-400 pb- px-4  flex items-center justify-between'>
          <h1 className='font-medium text-xl'>Add Amenities</h1>
          <div onClick={()=>setIsAmenityModal(false)} className="icon-container cursor-pointer bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center">
            <X className='text-gray-800 ' />
          </div>
        </header>

        {/* tab container -------------->  */}
        <div className="tab-container mt-4 flex gap-4 items-center justify-evenly tab-bg px-3 rounded-full  py-3">

          {/* ROOM */}
          <button
            onClick={() => setSelectedTab("Room")}
            className={`flex items-center gap-2 font-medium 
      ${selectedTab === "Room" ? "bg-active rounded-full text-white" : "text-gray-700"} 
      py-2 px-3 rounded`}
          >
            <Bed className={`${selectedTab === "Room" ? "text-white" : "text-gray-600"}`} />
            {selectedTab === "Room" && <span>Room Comfort</span>}
          </button>

          {/* TRAVEL */}
          <button
            onClick={() => setSelectedTab("Travel")}
            className={`flex items-center gap-2 font-medium 
      ${selectedTab === "Travel" ? "bg-active rounded-full text-white" : "text-gray-700"} 
      py-2 px-3 rounded`}
          >
            <Bus className={`${selectedTab === "Travel" ? "text-white" : "text-gray-600"}`} />
            {selectedTab === "Travel" && <span>Travel Convenience</span>}
          </button>

          {/* FOOD */}
          <button
            onClick={() => setSelectedTab("Food")}
            className={`flex items-center gap-2 font-medium 
      ${selectedTab === "Food" ? "bg-active rounded-full text-white" : "text-gray-700"} 
      py-2 px-3 rounded`}
          >
            <Utensils className={`${selectedTab === "Food" ? "text-white" : "text-gray-600"}`} />
            {selectedTab === "Food" && <span>Food & Beverage</span>}
          </button>

          {/* VIEW */}
          <button
            onClick={() => setSelectedTab("View")}
            className={`flex items-center gap-2 font-medium 
      ${selectedTab === "View" ? "bg-active rounded-full text-white" : "text-gray-700"} 
      py-2 px-3 rounded`}
          >
            <Mountain className={`${selectedTab === "View" ? "text-white" : "text-gray-600"}`} />
            {selectedTab === "View" && <span>View & Nature</span>}
          </button>

          {/* CONNECTIVITY */}
          <button
            onClick={() => setSelectedTab("Connectivity")}
            className={`flex items-center gap-2 font-medium 
      ${selectedTab === "Connectivity" ? "bg-active bg-active rounded-full text-white" : "text-gray-700"} 
      py-2 px-3 rounded`}
          >
            <Wifi className={`${selectedTab === "Connectivity" ? "text-white" : "text-gray-600"}`} />
            {selectedTab === "Connectivity" && <span>Connectivity</span>}
          </button>

          {/* FAMILY */}
          <button
            onClick={() => setSelectedTab("Family")}
            className={`flex items-center gap-2 font-medium 
      ${selectedTab === "Family" ? "bg-active rounded-full text-white" : "text-gray-700"} 
      py-2 px-3 rounded`}
          >
            <Users className={`${selectedTab === "Family" ? "text-white" : "text-gray-600"}`} />
            {selectedTab === "Family" && <span>Family & Safety</span>}
          </button>

        </div>

        <div className="input-conatiner mt-6 min-h-[180px] mx-4">
          {formData.map((item, index) => {
            return <div className="input flex items-center gap-2 mb-2">
              <input type="checkbox" className='scale-120 accent-amber-700' />
              <h1>{item}</h1>
            </div>
          })}
        </div>
        <div className="btn-container mx-4 flex gap-4 justify-end">
          {selectedTab !== "Room" && <button className='bg-gray-300 px-6 py-2 rounded-lg' >Previous</button>}
          <button className='bg-amber-700 text-white px-6 py-2 rounded-lg'>Next</button>
        </div>
      </section>
    </>
  )
}

export default AmenityFormModal