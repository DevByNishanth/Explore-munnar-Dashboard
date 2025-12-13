import React, { useEffect, useState } from "react";
import { MapPin, Wifi, Flame, Leaf } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const hotelData = [
  {
    id: 1,
    name: "Misty Hill Eco Retreat",
    rating: 4.99,
    reviews: 479,
    description: "Lorem ipsum dolor sit amet consectetur...",
    location: "Devikulam",
    price: 3200,
    priceUnit: "night",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
  },
];
// const data = [1];
const AddedHotels = () => {
  // Auth 
  const apiUrl = import.meta.env.VITE_API_URL
  const navigate = useNavigate();

  // states 
  const [data, setData] = useState([])
  const [pageNumber, setPageNumber] = useState(1)

  // side effects 
  useEffect(() => {
    getHotels()
  }, [])

  // functions

  async function getHotels() {
    try {
      const response = await axios.post(`${apiUrl}/api/hotels-list`, {
        "pageNumber": pageNumber
      });
      // console.log("hotels : ", response.data.data.hotels)
      setData(response.data.data.hotels)
    } catch (err) {
      console.error("Error occured while fetching hotel list : ", err.message)
    }
  }

  return (
    <>
      <section className="mt-4 grid gap-4 grid-cols-3 h-[calc(100vh-140px)] overflow-auto">
        {data.map((item, index) => {
          return (
            <div className="w-full h-fit bg-gray-50 px-3 py-3 rounded-2xl shadow-md">
              {/* Image */}
              <div className="overflow-hidden rounded-xl h-[40%]">
                <img
                  src={item?.images?.[0]}
                  alt="Misty Hill Eco Retreat"
                  className="w-full h-[100%] object-cover"
                />
              </div>
              <div className="mt-2">
                <div className="flex items-center justify-between">
                  <h2 className="text-green-900 font-medium text-lg">
                    {item?.name}
                  </h2>
                  <div className="flex items-center text-sm text-gray-700">
                    <span className="mr-1">⭐</span>
                    <span>{item?.rating}</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Excellent · 479 reviews
                </p>
                <div className="flex items-center gap-1 mt-2 text-sm font-medium text-[#333333]">
                  <MapPin size={15} className="text-amber-800" />
                  <span>{item?.location}</span>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  {item?.description}
                </p>
                <p className="text-green-800 font-medium mt-2">
                  From <span className="font-semibold text-lg">₹ {item?.pricePerNight}</span> /
                  night
                </p>
                <div className="btn-container mt-3 w-[100%]">
                  <Link to={`/hotels/${item.id}`}
                    className="w-full btn-green block text-center   text-white py-2 cursor-pointer rounded-lg mt-3 hover:bg-green-800 transition"
                  >
                    View details
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </>
  );
};

export default AddedHotels;
