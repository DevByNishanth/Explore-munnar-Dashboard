import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { useGeneralData } from "../context/GeneralData";
import BookedHotelsTable from "../components/BookedHotelsTable";
import CabBookingTable from "../components/CabBookingTable";
import BookedBikeRentalsTable from "../components/BookedBikeRentalsTable";
import SelfCarDrivingtable from "../components/SelfCarDrivingtable";
const BookingPage = () => {
  // context Data
  const { bookingSelectedTab, setSelectedTab } = useGeneralData();

  // states
  // const [selectedTab, setSelectedTab] = useState("hotelsBookings");
  return (
    <>
      <section className="flex items-start">
        {" "}
        <Sidebar />
        <div className="main-container px-6 mt-4 w-[100%]">
          <div className="breadcrumbs-section">
            <h1 className="flex items-center text-gray-600">
              <Link to="/">Dashboard</Link> <ChevronRight />
              <span className="font-medium text-black">Bookings</span>
            </h1>
          </div>
          {/* tabs */}
          <div className="tab-container  w-fit px-2 py-2 border-b-gray-200 bg-gray-100 rounded-full mt-6 flex gap-4 text-gray-400">
            <button
              className={`w-fit px-4 py-2 cursor-pointer ${
                bookingSelectedTab.toLowerCase() == "hotelsbookings"
                  ? "font-medium bg-white shadow text-black rounded-full"
                  : ""
              }`}
              onClick={() => {
                setSelectedTab("hotelsBookings");
              }}
            >
              Hotel Bookings
            </button>
            <button
              onClick={() => {
                setSelectedTab("cabBookings");
              }}
              className={`w-fit px-4 py-2 cursor-pointer  ${
                bookingSelectedTab.toLowerCase() == "cabbookings"
                  ? "font-medium bg-white shadow text-black rounded-full"
                  : ""
              }`}
            >
              Cab Bookings
            </button>
            <button
              onClick={() => {
                setSelectedTab("bikeRentals");
              }}
              className={`w-fit px-4 py-2 cursor-pointer ${
                bookingSelectedTab.toLowerCase() == "bikerentals"
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
              className={`w-fit px-4 py-2 cursor-pointer ${
                bookingSelectedTab.toLowerCase() == "selfcardriving"
                  ? "font-medium bg-white shadow text-black rounded-full"
                  : ""
              }`}
            >
              Self Car Driving
            </button>
          </div>
          {/* table-container  */}
          {console.log("selected tab : ", bookingSelectedTab)}
          <div className="table-container">
            {bookingSelectedTab == "cabBookings" && <CabBookingTable />}
            {bookingSelectedTab == "hotelsBookings" && <BookedHotelsTable />}
            {bookingSelectedTab.toLowerCase() == "bikerentals" && (
              <BookedBikeRentalsTable />
            )}
            {bookingSelectedTab.toLowerCase() == "selfcardriving" && (
              <SelfCarDrivingtable />
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default BookingPage;
