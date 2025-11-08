import React from "react";
import logo from "../assets/logo.svg";
import man from "../assets/man.jpg";
import {
  BusFront,
  ChevronLeft,
  ChevronRight,
  Hotel,
  LayoutDashboard,
  ListCollapse,
  User,
} from "lucide-react";
import { useGeneralData } from "../context/GeneralData";
import { Link, useLocation } from "react-router-dom";
const Sidebar = () => {
  // router dom hooks
  const location = useLocation();
  console.log("location : ", location.pathname);

  // context
  const { setIsCollapsed, isCollapsed } = useGeneralData();
  return (
    <>
      <section
        className={`relative sidebar bg-[#ececec8c] transition-all duration-300  ${
          isCollapsed ? "w-[5%]" : "w-[20%]"
        } h-[100vh] `}
      >
        <div className="logo-container px-5 m-auto mt-3">
          <img src={logo} className="w-[120px]" />
        </div>
        <div className="header px-5 mt-4 ">
          <div className="profile-container flex items-center gap-3">
            <img
              src={man}
              className={`w-[40px] h-[40px] object-cover rounded-full ${
                isCollapsed ? "m-auto" : ""
              }`}
            />
            <div
              className={`content-container ${isCollapsed ? "hidden" : ""} `}
            >
              <h1 className="text-black font-medium">Nishanth</h1>
              <h1 className="text-gray-700 mt-[-3px] text-[12px]">Admin</h1>
            </div>
          </div>
        </div>
        {/* navigation-container  */}

        <div className="links-container mt-7 space-y-2 ">
          <Link
            to={"/"}
            className={`link-container px-5 w-[88%] flex items-center gap-2 hover:bg-white cursor-pointer py-2 rounded-r-full`}
          >
            <LayoutDashboard
              className={`text-gray-600 w-5 h-5 transition-all duration-300 ${
                isCollapsed ? "m-auto" : ""
              } `}
            />
            <h1
              className={`text-gray-900 transition-all duration-300 ${
                isCollapsed ? "hidden" : ""
              } `}
            >
              Dashboard
            </h1>
          </Link>
          <Link
            to={"/users"}
            className={`link-container px-5 w-[88%] flex items-center gap-2 hover:bg-white cursor-pointer py-2 rounded-r-full`}
          >
            <User
              className={`text-gray-600 w-5 h-5 transition-all duration-300 ${
                isCollapsed ? "m-auto" : ""
              } `}
            />
            <h1
              className={`text-gray-900 transition-all duration-300 ${
                isCollapsed ? "hidden" : ""
              } `}
            >
              Users
            </h1>
          </Link>
          <Link
            to={"/hotels"}
            className={`link-container ${
              location.pathname.toLowerCase().includes("hotels")
                ? "bg-white"
                : ""
            } px-5 w-[88%] flex items-center gap-2 hover:bg-white cursor-pointer py-2 rounded-r-full`}
          >
            <Hotel
              className={`text-gray-600 w-5 h-5 transition-all duration-300 ${
                isCollapsed ? "m-auto" : ""
              } `}
            />
            <h1
              className={`text-gray-900 transition-all duration-300 ${
                isCollapsed ? "hidden" : ""
              } `}
            >
              Hotels
            </h1>
          </Link>
          <Link
            to={"/Bookings"}
            className={`link-container ${
              location.pathname.toLowerCase().includes("bookings")
                ? "bg-white"
                : ""
            } px-5 w-[88%] flex items-center gap-2 hover:bg-white cursor-pointer py-2 rounded-r-full`}
          >
            <BusFront
              className={`text-gray-600 w-5 h-5 transition-all duration-300 ${
                isCollapsed ? "m-auto" : ""
              } `}
            />
            <h1
              className={`text-gray-900 transition-all duration-300 ${
                isCollapsed ? "hidden" : ""
              } `}
            >
              Bookings
            </h1>
          </Link>
          <Link
            to={"/liveInformation"}
            className={`link-container ${
              location.pathname.toLowerCase().includes("liveinformation")
                ? "bg-white"
                : ""
            } px-5 w-[88%] flex items-center gap-2 hover:bg-white cursor-pointer py-2 rounded-r-full`}
          >
            <BusFront
              className={`text-gray-600 w-5 h-5 transition-all duration-300 ${
                isCollapsed ? "m-auto" : ""
              } `}
            />
            <h1
              className={`text-gray-900 transition-all duration-300 ${
                isCollapsed ? "hidden" : ""
              } `}
            >
              Live Information
            </h1>
          </Link>
        </div>
      </section>
    </>
  );
};

export default Sidebar;
