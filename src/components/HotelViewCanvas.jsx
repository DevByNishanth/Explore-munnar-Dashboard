import { ClipboardList, Megaphone } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

const HotelViewCanvas = ({ canvasData, setisCanvas }) => {
  const [promotion, setPromotion] = useState(false);
  const [cardView, setCardView] = useState(false);

  // ref's
  const canvasRef = useRef(null);

  useEffect(() => {
    function handleOutsideClick(e) {
      if (canvasRef.current && !canvasRef.current.contains(e.target)) {
        setisCanvas(false);
      }
    }
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  console.log("hotel data : ", canvasData);
  return (
    <>
      <div className="fixed inset-0 bg-black/30"></div>
      <div
        ref={canvasRef}
        className="main-container w-[40%] bg-white p-2 h-[100vh] absolute top-0 right-0"
      >
        <div className="img-container w-[100%] h-[270px]">
          <img
            src={canvasData.hotelImg}
            className="w-[100%] h-[100%] object-cover rounded-lg"
          />
        </div>
        {/* ------------------ Table container ---------------------  */}

        <div className="table-container mt-4 px-4">
          <div className="header flex items-center  gap-2 justify-between">
            <h1 className="font-medium text-lg mb-2">Hotel Details</h1>
            <div className="btn-container flex gap-3 items-center">
              {promotion && (
                <button className="bg-green-100 text-green-700 px-2 py-2 rounded-lg text-sm flex gap-2 items-center">
                  <Megaphone className="w-[22px] text-green-700" />
                  Promotion
                </button>
              )}
              {cardView && (
                <button className="bg-amber-100 text-amber-600 px-2 py-2 rounded-lg text-sm flex gap-2 items-center">
                  <ClipboardList className="w-[22px] text-amber-500" />
                  Card View
                </button>
              )}
            </div>
          </div>
          {/* ---------------table---------------  */}
          <table className="mt-4">
            <tbody>
              <tr>
                <td className="font-medium text-[#333333] w-[120px] ">
                  Hotel Name :{" "}
                </td>
                <td className="text-gray-600">{canvasData.hotelName}</td>
              </tr>
              <tr className="">
                <td className="font-medium pt-2 text-[#333333] w-[120px] ">
                  Phone :{" "}
                </td>
                <td className="text-gray-600 pt-2">1234567890</td>
              </tr>
              <tr className="">
                <td className="font-medium pt-2 text-[#333333] w-[120px] ">
                  Price / room :{" "}
                </td>
                <td className="text-gray-600 pt-2">{canvasData.price}</td>
              </tr>

              <tr className="">
                <td className="font-medium pt-2 text-[#333333] w-[120px] ">
                  Category :
                </td>
                <td className="text-gray-600 pt-2">Tree house</td>
              </tr>
              <tr className="">
                <td className="font-medium pt-2 text-[#333333] w-[120px] ">
                  Location :
                </td>
                <td className="text-gray-600 pt-2">{canvasData.location}</td>
              </tr>
            </tbody>
          </table>
          {/* -----checkbox container ------------  */}
          <div className="checkbox-container mt-3">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={promotion}
                onChange={() => setPromotion(!promotion)}
                className="scale-120 accent-green-800"
              />
              <h1 className="font-medium">
                Do you want to promote this hotel?
              </h1>{" "}
            </div>
            <div className="flex items-center gap-3 mt-2">
              <input
                type="checkbox"
                checked={cardView}
                onChange={() => setCardView(!cardView)}
                className="scale-120 accent-green-800"
              />
              <h1 className="font-medium">
                Do you want to highlight this hotel on the homepage?
              </h1>{" "}
            </div>
          </div>
          {/* btn-container -----------------------  */}
          <div className="btn-container absolute bottom-4 right-8  flex justify-end">
            <button className="btn-green px-4 py-2 rounded-lg text-white hover:cursor-pointer">
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default HotelViewCanvas;
