import React, { useEffect, useRef, useState } from "react";
import h3 from "../assets/h3.jpg";
import { ChevronDown, ChevronUp, Pencil } from "lucide-react";
import axios from "axios";
const HotelCanvas = ({ setIsCanvas, canvasData, getHotelBookings }) => {
  // Auth
  const apiUrl = import.meta.env.VITE_API_URL;

  // ref's
  const canvasRef = useRef(null);
  const dropdownRef = useRef(null);
  // states
  const [isStatusDropdown, setIsStatusDropdown] = useState(false);
  const [status, setStatus] = useState(canvasData?.status);
  // useEffect's

  useEffect(() => {
    function handleOutsideClick(e) {
      if (canvasRef.current && !canvasRef.current.contains(e.target)) {
        setIsCanvas(false);
      }
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsStatusDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  // functions
  const handleStatusEdit = async (selectedSatus) => {
    try {
      const response = await axios.put(
        `${apiUrl}/api/hotel-booking/${canvasData.id}`,
        { status: selectedSatus }
      );
      getHotelBookings();
    } catch (err) {
      console.error("Error occured while editing status : ", err);
    }
  };
  return (
    <>
      <section
        ref={canvasRef}
        className="bg-white w-[65%] z-20 absolute right-0 top-0 h-[100vh] p-4"
      >
        <div className="hotel-image-slider ">
          <img
            src={canvasData?.image?.url}
            className="h-[calc(100vh-400px)] w-[100%] object-cover rounded-lg "
          />
        </div>
        <div className="content-container flex items-start gap-3 mt-6  px-5 ">
          <div className="container-1 w-[50%] h-[100%]">
            <div className="heading flex items-center justify-between">
              <h1 className="font-semibold text-lg">Hotel Details</h1>
              <div
                className={`text-center w-fit px-4 py-1  ${
                  status.toLowerCase() == "pending"
                    ? "bg-rose-400 text-white"
                    : status.toLowerCase() == "canceled"
                    ? "bg-gray-200 border border-gray-300"
                    : "bg-emerald-500 text-white"
                }`}
              >
                {status.toUpperCase()}
              </div>
            </div>
            <div className="content text-[#333333] mt-7 ">
              <table>
                <tr>
                  <td className="text-black font-medium">Hotel Name : </td>
                  <td className="pl-5">{canvasData?.hotelName}</td>
                </tr>
                <tr>
                  <td className="text-black font-medium pt-3">
                    Room / night :{" "}
                  </td>
                  <td className="pl-5 pt-3">{canvasData?.pricePerNight}</td>
                </tr>
                <tr>
                  <td className="text-black font-medium pt-3">Phone : </td>
                  <td className="pl-5 pt-3">
                    {canvasData?.holtePhone || "--"}
                  </td>
                </tr>
              </table>
              <h1 className="mt-4 w-[100%]">{canvasData?.address}</h1>
            </div>
          </div>
          <div className="container-2 w-[50%] h-[100%] pl-4   border-l border-gray-300">
            <div className="heading">
              <h1 className="font-semibold text-lg">Customer Details</h1>
            </div>
            <div className="content text-[#333333] mt-7 ">
              <table>
                <tr>
                  <td className="text-black font-medium">Name : </td>
                  <td className="pl-5">{canvasData?.name}</td>
                </tr>
                <tr>
                  <td className="text-black font-medium pt-3">Phone</td>
                  <td className="pl-5 pt-3">{canvasData?.phone}</td>
                </tr>
                <tr>
                  <td className="text-black font-medium pt-3">Email : </td>
                  <td className="pl-5 pt-3">{canvasData?.email}</td>
                </tr>
                <tr>
                  <td className="text-black font-medium pt-3">check - In : </td>
                  <td className="pl-5 pt-3">{canvasData?.checkIn}</td>
                </tr>
                <tr>
                  <td className="text-black font-medium pt-3">
                    check - Out :{" "}
                  </td>
                  <td className="pl-5 pt-3">{canvasData?.checkOut}</td>
                </tr>
                <tr>
                  <td className="text-black font-medium pt-3">
                    No of Adults :{" "}
                  </td>
                  <td className="pl-5 pt-3">{canvasData?.adults}</td>
                </tr>
                <tr>
                  <td className="text-black font-medium pt-3">No of Kids : </td>
                  <td className="pl-5 pt-3">{canvasData?.kids}</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
        <div className="btn-container mt-4 relative flex justify-end">
          <button
            onClick={() => {
              setIsStatusDropdown(!isStatusDropdown);
            }}
            className=" flex items-center gap-3 transition-all duration-100 bg-green-800  text-white px-3 py-2 rounded cursor-pointer "
          >
            Change Status{" "}
            <ChevronUp
              className={`w-6 h-6 ${
                isStatusDropdown ? "rotate-180" : ""
              } transition-all duration-300`}
            />
          </button>
          {isStatusDropdown && (
            <div
              ref={dropdownRef}
              className="dropdown-container absolute top-[-305%] bg-white w-[180px] shadow-lg border border-gray-300 rounded h-fit"
            >
              <button
                onClick={() => {
                  setStatus("booked");
                  handleStatusEdit("Booked");
                  setIsStatusDropdown(false);
                }}
                className="w-[100%] text-left px-2 hover:bg-gray-200 outline-none py-2 cursor-pointer"
              >
                Booked
              </button>
              <button
                onClick={() => {
                  setStatus("pending");
                  handleStatusEdit("Pending");
                  setIsStatusDropdown(false);
                }}
                className="w-[100%] text-left px-2 hover:bg-gray-200 outline-none py-2 cursor-pointer"
              >
                Pending
              </button>
              <button
                onClick={() => {
                  setStatus("canceled");
                  handleStatusEdit("Canceled");
                  setIsStatusDropdown(false);
                }}
                className="w-[100%] text-left px-2 hover:bg-gray-200 outline-none py-2 cursor-pointer"
              >
                Canceled
              </button>
            </div>
          )}
        </div>
      </section>
      <div className="tint fixed top-0 right-0 left-0 bottom-0"></div>
    </>
  );
};

export default HotelCanvas;
