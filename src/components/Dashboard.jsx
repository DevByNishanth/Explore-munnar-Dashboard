import React, { useEffect, useRef, useState } from "react";
import { Bell, ChevronDown } from "lucide-react";
import man from "../assets/man.jpg";
import DashboardStatCard from "./DashboardStatCard";
import HotelBookingBarChart from "./HotelBookingBarChart";
import PieChart1 from "./PieChart1";
import DashboardHotelTable from "./DashboardHotelTable";
import { Link } from "react-router-dom";
import { buttonBaseClasses } from "@mui/material";
import ItnearyBarChart from "./ItnearyBarChart";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const Dashboard = () => {
  // states
  const [isMonthFilterDropdown, setIsMonthFilterDropdown] = useState(false);

  // ref's
  const monthFilterDropdownRef = useRef(null);
  const btnref = useRef(null);

  // useEffect call's

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        monthFilterDropdownRef.current &&
        !btnref.current.contains(e.target) &&
        !monthFilterDropdownRef.current.contains(e.target)
      ) {
        setIsMonthFilterDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <>
      <section className="px-6 mt-4 w-[100%] max-h-[calc(100vh-20px)] overflow-auto ">
        {/* header  */}
        <div className="header flex items-center justify-between w-[100%] ">
          <h1 className="font-medium text-lg text-[#333333]">Dashboard</h1>
          <div className="end-container flex items-center gap-3">
            <div className="notification-container relative">
              <Bell className="cursor-pointer" />
              <div className="red-box w-2 h-2 bg-red-400 rounded-full absolute top-[0px] right-1 "></div>
            </div>
            <div className="profile-dropdown flex items-center gap-2 bg-gray-100 w-fit px-4 py-2 rounded-full">
              <img src={man} className="w-6 h-6 rounded-full object-cover" />
              <h1>Nishanth</h1>
              <ChevronDown className="text-gray-500" />
            </div>
          </div>
        </div>
        {/* statcard */}
        <DashboardStatCard />
        <div className="stat-container grid grid-cols-12 gap-3 mt-3">
          <div className="barchart-container col-span-8  bg-white shadow-lg border border-gray-100 rounded-lg">
            <div className="header-container m-6 flex items-center justify-between">
              <h1 className="font-medium">Hotel Bookings</h1>
              <div className="btn-container relative">
                <button
                  ref={btnref}
                  onClick={() => {
                    setIsMonthFilterDropdown(!isMonthFilterDropdown);
                  }}
                  className="border border-gray-300 text-gray-800 rounded-md px-4 py-1 w-[120px] text-left flex justify-between items-center"
                >
                  Nov{" "}
                  <span className="h-5 w-5 ">
                    <ChevronDown
                      className={`text-gray-600 ${isMonthFilterDropdown ? "rotate-180" : "rotate-0"
                        } transition-all duration-300`}
                    />
                  </span>
                </button>
                {isMonthFilterDropdown && (
                  <div
                    ref={monthFilterDropdownRef}
                    className="dropdown-container absolute top-full right-0 h-[260px] overflow-auto w-[150px] bg-white shadow rounded-md z-20"
                  >
                    {months.map((item) => {
                      return (
                        <button className="w-full px-5 hover:bg-gray-200 py-2 cursor-pointer text-left">
                          {item}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
            <HotelBookingBarChart />
          </div>
          <div className="main-chart-container col-span-4 h-[483px]">
            <div className="chart-container2 h-[241px] bg-white  rounded-lg border border-gray-100 pb-2">
              <div className="pie-chart">
                <div className="header mt-2 mx-6 flex items-center justify-between">
                  <h1 className="font-medium">Tranport Bookings</h1>
                  <button className="cursor-pointer border border-gray-400 text-gray-600 rounded px-3 py-1 text-[12px]">
                    View
                  </button>
                </div>
                <PieChart1 />
              </div>
            </div>
            <div className="chart-container2 overflow-y-scroll mt-2 h-[240px] shadow-lg bg-white border border-gray-100 rounded-lg">
              <div className="table-container mx-6 ">
                <div className="header flex justify-between items-center bg-white py-2 sticky top-0">
                  <h1 className="font-medium">Hotel Bookings</h1>
                  <button className="cursor-pointer border border-gray-400 text-gray-600 rounded px-3 py-1 text-[12px]">
                    View
                  </button>
                </div>
                <DashboardHotelTable />
              </div>
            </div>
          </div>
        </div>
        <ItnearyBarChart />

      </section>
    </>
  );
};

export default Dashboard;
