
import axios from "axios";
import { X } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const BusTimingsForm = ({ onClose, editData, editMode }) => {
  console.log("edit data : ", editData, editMode)


  // Auth
  const apiUrl = import.meta.env.VITE_API_URL;
  // states
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    departureTime: "",
    arrivalTime: "",
    busType: "",
    duration: "",
    price: "",
  });

  // params or url queries
  const [searchList] = useSearchParams();
  const queries = new URLSearchParams(searchList);
  // const editMode = queries.get("editMode");

  // side effects
  useEffect(() => {
    if (editMode && editData) {
      setFormData({
        from: editData.from ?? "",
        to: editData.to ?? "",
        departureTime: editData.departure_time ?? "",
        arrivalTime: editData.arrival_time ?? "",
        busType: editData.bus_type ?? "",
        duration: editData.duration ?? "",
        price: editData.price ?? "",
      });
    }
  }, [editMode, editData]);

  // functons
  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSave(e) {
    e.preventDefault();

    try {
      if (editMode) {
        console.log("running")
        // 🔁 UPDATE
        await axios.put(
          `${apiUrl}/api/bus-timing/${editData.id}`,
          formData
        );
      } else {
        // ➕ CREATE
        await axios.post(
          `${apiUrl}/api/bus-timing`,
          formData
        );
      }

      onClose();
      window.location.reload();
    } catch (err) {
      console.error("Error saving bus timing:", err.message);
    }
  }

  // consoles
  console.log("bus timing : ", formData);

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-30"></div>
      <div className="form-container w-[90%] md:w-[35%] max-h-[calc(100vh-40px)] overflow-auto bg-white absolute top-[50%] rounded-md left-[50%] translate-x-[-50%] translate-y-[-50%] z-40">
        <div className="header-section flex items-center sticky top-0 bg-white justify-between px-4 py-2 border-b border-gray-300">
          <h1 className="font-medium text-[#000000] text-lg ">
            Add Bus Timings
          </h1>
          <X onClick={onClose} className="cursor-pointer" />
        </div>
        <div className="form-container  m-4 space-y-3">
          <div className="input-container space-y-2">
            <h1 className="text-lg text-[#333333] font-medium">From</h1>
            <input
              type="text"
              placeholder="Eg: Munnar "
              name="from"
              value={formData.from}
              onChange={(e) => handleInputChange(e)}
              className="outline-none border border-gray-400 rounded px-3 py-2 w-full"
            />
          </div>
          <div className="input-container space-y-2">
            <h1 className="text-lg text-[#333333] font-medium">To</h1>
            <input
              type="text"
              placeholder="Eg: Coimbatore"
              name="to"
              value={formData.to}
              onChange={(e) => handleInputChange(e)}
              className="outline-none border border-gray-400 rounded px-3 py-2 w-full"
            />
          </div>
          <div className="input-container space-y-2">
            <h1 className="text-lg text-[#333333] font-medium">Depature</h1>
            <input
              type="text"
              placeholder="Eg: 7.30 Am"
              name="departureTime"
              value={formData.departureTime}
              onChange={(e) => handleInputChange(e)}
              className="outline-none border border-gray-400 rounded px-3 py-2 w-full"
            />
          </div>
          <div className="input-container space-y-2">
            <h1 className="text-lg text-[#333333] font-medium">Arrival time</h1>
            <input
              type="text"
              placeholder="Eg: 7.30 Pm"
              name="arrivalTime"
              value={formData.arrivalTime}
              onChange={(e) => handleInputChange(e)}
              className="outline-none border border-gray-400 rounded px-3 py-2 w-full"
            />
          </div>
          <div className="input-container space-y-2">
            <h1 className="text-lg text-[#333333] font-medium">Duration</h1>
            <input
              type="text"
              placeholder="2 hrs"
              name="duration"
              value={formData.duration}
              onChange={(e) => handleInputChange(e)}
              className="outline-none border border-gray-400 rounded px-3 py-2 w-full"
            />
          </div>
          <div className="input-container space-y-2">
            <h1 className="text-lg text-[#333333] font-medium">Bus type</h1>
            <input
              type="text"
              placeholder="Eg: Kerla RTC"
              name="busType"
              value={formData.busType}
              onChange={(e) => handleInputChange(e)}
              className="outline-none border border-gray-400 rounded px-3 py-2 w-full"
            />
          </div>
          <div className="input-container space-y-2">
            <h1 className="text-lg text-[#333333] font-medium">Price</h1>
            <input
              type="text"
              placeholder="Eg: 130"
              name="price"
              value={formData.price}
              onChange={(e) => handleInputChange(e)}
              className="outline-none border border-gray-400 rounded px-3 py-2 w-full"
            />
          </div>
          <div className="btn-container flex justify-end">

            <button
              onClick={handleSave}
              className="btn-green text-white cursor-pointer px-4 py-2 rounded"
            >
              Save
            </button>

          </div>
        </div>
      </div>
    </>
  );
};

export default BusTimingsForm;
