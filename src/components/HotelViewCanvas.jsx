import { ChevronDown, ChevronUp, ClipboardList, Codepen, Megaphone, Upload, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
const HotelViewCanvas = ({ canvasData, setisCanvas }) => {
  const [promotion, setPromotion] = useState(false);
  const [cardView, setCardView] = useState(false);
  const [previewImg, setPreviewImg] = useState(null)
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPromotionDays, setSelectedPromotionDays] = useState("");
  const [fileName, setFileName] = useState(null)
  const days = Array.from({ length: 30 }, (_, i) => i + 1);

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


  // functions 
  const handleFileChange = (e) => {
    // console.log("file : ", e.target.files);
    const file = e.target.files[0];
    setFileName(file.name)
    const previewUrl = URL.createObjectURL(file);
    setPreviewImg(previewUrl)
  }

  return (
    <>
      <div className="fixed inset-0 bg-black/30"></div>
      <div
        ref={canvasRef}
        className="main-container w-[40%] z-30 bg-white p-2 h-[100vh] absolute top-0 right-0"
      >
        <div className="img-container w-[100%] h-[270px]">
          <img
            src={canvasData.hotelImg}
            className="w-[100%] h-[100%] object-cover rounded-lg"
          />
        </div>
        {/* ------------------ Table container ---------------------  */}

        <div className="table-container  px-4">
          <div className="flex ">
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
          </div>
          {/* -----checkbox container ------------  */}
          <div className="checkbox-container mt-3 ">
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
            {promotion && <div className="form-container mx-4 mt-2 mb-8 grid gap-2 grid-cols-2">
              {previewImg == null ? <div className="input relative  border border-dashed rounded bg-gray-100 border-green-800 flex items-center justify-center">
                <div>
                  <input type="file" onChange={(e) => handleFileChange(e)} className="absolute top-0 right-0 left-0 bottom-0 opacity-0 cursor-pointer" />
                  <h1 className="flex items-center gap-2"><span className="text-gray-600"><Upload /></span>Upload Image</h1>
                </div>
              </div> : <div className="flex gap-4 items-center justify-between border rounded border-gray-400 p-1">
                <div className="flex gap-2 items-center text-gray-700">
                  <img src={previewImg} className="h-[90%] w-14 " />
                  <h1>{fileName.slice(0, 12)}</h1>
                </div>
                <button className="text-red-400 cursor-pointer"><X /></button>
              </div>}


              <div className="relative w-64">
                {/* Dropdown Header */}
                <div
                  className="select-containaer rounded border border-gray-400 py-2 px-3 flex items-center justify-between cursor-pointer"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <h1>{selectedPromotionDays || "Select Days"}</h1>
                  {isOpen ? <ChevronUp /> : <ChevronDown />}
                </div>

                {/* Dropdown Menu */}
                {isOpen && (
                  <div className="absolute bottom-[100%] w-full mt-1 bg-white border border-gray-300 rounded shadow-lg max-h-60 overflow-y-auto z-10">
                    {days.map((day) => (
                      <div
                        key={day}
                        className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          setSelectedPromotionDays(day);
                          setIsOpen(false);
                        }}
                      >
                        {day} {day === 1 ? "day" : "days"}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>}
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
          <div className="btn-container absolute bottom-2 right-4  flex justify-end">
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
