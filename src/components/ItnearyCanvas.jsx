import React, { useEffect, useRef, useState } from "react";
import itnearyBannerImg from "../assets/itnearyBannerImg.svg";
import { ChevronRight, ChevronUp } from "lucide-react";

const statusData = ["All", "Pending", "Booked", "Canceled"];

const ItnearyCanvas = ({ setIsCanvas }) => {
  // states
  const [isStatusDropdown, setIsStatusDropdown] = useState(false);

  // ref's
  const canvasRef = useRef(null);
  const dropdownRef = useRef(null);
  const btnRef = useRef(null);

  // useEffect call's
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (canvasRef.current && !canvasRef.current.contains(e.target)) {
        setIsCanvas(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // dropdown click outside functionality
  useEffect(() => {
    function handleOutsideClick(e) {
      if (
        dropdownRef.current &&
        btnRef.current &&
        !btnRef.current.contains(e.target) &&
        !dropdownRef.current.contains(e.target)
      ) {
        setIsStatusDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  // ---------------------------------------------------------------------Jsx  ------------------------------------------------------

  return (
    <>
      <div className="tint fixed z-20 inset-0 bg-black/30"></div>
      <section
        ref={canvasRef}
        className="absolute top-0 right-0 w-[55%] h-[100vh] bg-white z-20 px-6"
      >
        <div className="header mt-4 h-[200px] relative">
          <img
            src={itnearyBannerImg}
            className="h-[100%] object-cover rounded-lg w-[100%]"
          />
          <div className="absolute top-0 right-0 left-0 bottom-0 rounded-lg bg-black/20"></div>
        </div>
        <div className="content-container mt-4">
          <div className="personalInfo-container">
            <div className="header flex items-center gap-4 justify-between ">
              <h1 className="font-medium text-lg">Personal Info</h1>
              <button className="bg-red-200 text-black px-4 py-2 rounded-lg">
                Pending
              </button>
            </div>
            <div className="sub-content-container mt-2 flex items-center gap-6">
              <h1 className="text-gray-600">Nishanth</h1>
              <h1 className="text-gray-600">1234567890</h1>
              <h1 className="text-gray-600">Coimbatore</h1>
              <h1 className="text-gray-600">Contact preference : By call</h1>
            </div>
          </div>
          <div className="personalInfo-container mt-4">
            <h1 className="font-medium text-lg">Trip dates & group details</h1>
            <div className="sub-content-container mt-2 flex items-center gap-6">
              <h1 className="text-gray-600">May 10 – May 14, 2024</h1>
              <h1 className="text-gray-600"> 2 Adults</h1>
              <h1 className="text-gray-600">Family</h1>
            </div>
          </div>
          <div className="personalInfo-container mt-4">
            <h1 className="font-medium text-lg">Accommodation</h1>
            <div className="sub-content-container mt-2 flex items-center gap-6">
              <h1 className="text-gray-600">3 Star Room</h1>
              <h1 className="text-gray-600">Type: 1 Room</h1>
              <h1 className="text-gray-600">Budget: Rs 5,000/room</h1>
            </div>
          </div>
          <div className="personalInfo-container mt-4">
            <h1 className="font-medium text-lg">Transport</h1>
            <div className="sub-content-container mt-2 flex items-center gap-6">
              <h1 className="text-gray-600">Yes, Private</h1>
              <h1 className="text-gray-600">Requirement: Local Sightseeing</h1>
              <h1 className="text-gray-600">Suv 5 seater</h1>
            </div>
          </div>
          <div className="btn-container mt-8 w-[190px] relative">
            <button
              ref={btnRef}
              onClick={() => setIsStatusDropdown(!isStatusDropdown)}
              className=" btn-green px-4 py-2 rounded-lg text-white flex gap-3 items-center"
            >
              Change status{" "}
              <ChevronUp
                className={`text-white ${
                  isStatusDropdown ? "rotate-180" : "rotate-0"
                } transition-all duration-300 `}
              />
            </button>
            {/* dropdown-container  */}
            {isStatusDropdown && (
              <div
                ref={dropdownRef}
                className="dropdown-container absolute bottom-[100%] left-0 rounded  bg-gray-50 shadow-xl  border border-gray-200"
              >
                {statusData.map((item) => (
                  <button className="w-full px-4 py-2 text-left hover:bg-gray-300 cursor-pointer">
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default ItnearyCanvas;
