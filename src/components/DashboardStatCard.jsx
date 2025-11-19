import { Bike, Car, CarFront, Hotel } from "lucide-react";
import React from "react";

const DashboardStatCard = () => {
  return (
    <>
      <section className="grid grid-cols-4 gap-4 mt-4">
        <div className="card w-full bg-white shadow-lg py-4 rounded-xl flex items-center">
          <div className="header text-black mt-2 px-2 flex items-center gap-3">
            <div className="icon-container bg-[#DDF9E4] w-10 h-10 rounded-full flex items-center justify-center">
              <Hotel className="text-[#22A447]" />
            </div>
            <div>
              <h1 className="font-medium text-gray-500">Hotel Booking</h1>
              <h1 className="font-medium text-black">5</h1>
            </div>
          </div>
        </div>
        <div className="card w-full  shadow-lg py-4 rounded-xl flex items-center">
          <div className="header text-black mt-2 px-2 flex items-center gap-3">
            <div className="icon-container bg-[#FFEADA] w-10 h-10 rounded-full flex items-center justify-center">
              <Car className="text-[#F8964C]" />
            </div>
            <div>
              <h1 className="font-medium text-gray-500">Cab Booking</h1>
              <h1 className="font-medium text-black">5</h1>
            </div>
          </div>
        </div>
        <div className="card w-full  shadow-lg py-4 rounded-xl flex items-center">
          <div className="header text-black mt-2 px-2 flex items-center gap-3">
            <div className="icon-container bg-[#E4F0FF] w-10 h-10 rounded-full flex items-center justify-center">
              <Bike className="text-[#70A6E8]" />
            </div>
            <div>
              <h1 className="font-medium text-gray-500">Bike Rentals</h1>
              <h1 className="font-medium text-black">5</h1>
            </div>
          </div>
        </div>
        <div className="card w-full  shadow-lg py-4 rounded-xl flex items-center">
          <div className="header text-black mt-2 px-2 flex items-center gap-3">
            <div className="icon-container bg-[#bb453049] w-10 h-10 rounded-full flex items-center justify-center">
              <CarFront className="text-[#BB4430]" />
            </div>
            <div>
              <h1 className="font-medium text-gray-500">Self Car Driving</h1>
              <h1 className="font-medium text-black">5</h1>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DashboardStatCard;
