import React, { useEffect, useState } from "react";
import { MapPin, Wifi, Flame, Leaf } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import NoData from "./NoData";


const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const AddedHotels = ({ data }) => {

  return (
    <>
      <section className="mt-4 grid gap-4 md:grid-cols-3 h-[calc(100vh-140px)] overflow-auto">
        {data?.length > 0 ? (
          data.map((item, index) => {
            return (
              <div className="w-full h-fit bg-gray-50 px-3 py-3 rounded-2xl shadow-md">
                {/* Image */}
                <div className="overflow-hidden  rounded-xl h-[230px]">
                  <img
                    src={item?.images?.[0]?.url}
                    alt=""
                    className="w-full h-[100%] object-cover"
                  />
                </div>
                <div className="mt-2">
                  <div className="flex items-center justify-between">
                    <h2 className="text-green-900 font-medium text-lg">
                      {item?.name.slice(0, 24)}..
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
                    {item?.description.slice(0, 55)}...
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
          })
        ) : (
          <NoData />
        )}

      
      </section>
    </>
  );
};

export default AddedHotels;
