import { Bike, Car, CarFront, Hotel, Route } from "lucide-react";
import React, { useEffect, useState } from "react";

const DashboardStatCard = () => {
  const apiURL = import.meta.env.VITE_API_URL;
  const [counts, setCounts] = useState({
    hotelBookings: 0,
    cabBookings: 0,
    bikeRentals: 0,
    selfDriveRequests: 0,
    itineraries: 0,
  });

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const response = await fetch(`${apiURL}/api/dashboard/counts`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        console.log("Dashboard Counts API Response:", result);
        if (result && result.data) {
          setCounts(result.data);
        } else if (result) {
          // Fallback if data is directly in result (though user said it is in 'data')
          setCounts(result);
        }
      } catch (error) {
        console.error("Error fetching dashboard counts:", error);
      }
    };
    fetchCounts();
  }, [apiURL]);

  return (
    <>
      <section className="grid grid-cols-5 gap-4 mt-4">
        <div className="card w-full bg-white shadow py-4 rounded-xl flex items-center">
          <div className="header text-black mt-2 px-2 flex items-center gap-3">
            <div className="icon-container bg-[#DDF9E4] w-10 h-10 rounded-full flex items-center justify-center">
              <Hotel className="text-[#22A447]" />
            </div>
            <div>
              <h1 className="font-medium text-gray-500">Hotel Booking</h1>
              <h1 className="font-medium text-black">{counts.hotelBookings || 0}</h1>
            </div>
          </div>
        </div>
        <div className="card w-full  shadow py-4 rounded-xl flex items-center">
          <div className="header text-black mt-2 px-2 flex items-center gap-3">
            <div className="icon-container bg-[#FFEADA] w-10 h-10 rounded-full flex items-center justify-center">
              <Car className="text-[#F8964C]" />
            </div>
            <div>
              <h1 className="font-medium text-gray-500">Cab Booking</h1>
              <h1 className="font-medium text-black">{counts.cabBookings || 0}</h1>
            </div>
          </div>
        </div>
        <div className="card w-full  shadow py-4 rounded-xl flex items-center">
          <div className="header text-black mt-2 px-2 flex items-center gap-3">
            <div className="icon-container bg-[#E4F0FF] w-10 h-10 rounded-full flex items-center justify-center">
              <Bike className="text-[#70A6E8]" />
            </div>
            <div>
              <h1 className="font-medium text-gray-500">Bike Rentals</h1>
              <h1 className="font-medium text-black">{counts.bikeRentals || 0}</h1>
            </div>
          </div>
        </div>
        <div className="card w-full  shadow py-4 rounded-xl flex items-center">
          <div className="header text-black mt-2 px-2 flex items-center gap-3">
            <div className="icon-container bg-[#bb453049] w-10 h-10 rounded-full flex items-center justify-center">
              <CarFront className="text-[#BB4430]" />
            </div>
            <div>
              <h1 className="font-medium text-gray-500">Self Car Driving</h1>
              <h1 className="font-medium text-black">{counts.selfDriveRequests || 0}</h1>
            </div>
          </div>
        </div>
        <div className="card w-full  shadow py-4 rounded-xl flex items-center">
          <div className="header text-black mt-2 px-2 flex items-center gap-3">
            <div className="icon-container bg-[#30abbb49] w-10 h-10 rounded-full flex items-center justify-center">
              <Route className="text-[#30abbb]" />
            </div>
            <div>
              <h1 className="font-medium text-gray-500">Itnearies</h1>
              <h1 className="font-medium text-black">{counts.itineraries || 0}</h1>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DashboardStatCard;
