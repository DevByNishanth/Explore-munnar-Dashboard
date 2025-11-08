import { X } from "lucide-react";
import React, { useState } from "react";

const HotelAddModal = ({ type, onClose, onSave }) => {
  const activityOptions = [
    "Free WiFi",
    "Campfire",
    "Couple Friendly",
    "Private Bath",
    "Breakfast",
  ];

  const amenityOptions = [
    "Comfortable beds",
    "Clean linens and blankets",
    "Attached private bathrooms",
    "Hot water supply (solar/geyser)",
    "Room heater",
    "Free parking",
    "Paid cab or taxi assistance",
    "Two-wheeler rental",
    "Breakfast included",
    "Room service",
    "CCTV surveillance",
    "Free Wi-Fi",
    "Mobile signal support",
    "Garden or plantation view",
    "Kitchen access (for homestays)",
  ];

  const options = type === "activities" ? activityOptions : amenityOptions;
  const [selected, setSelected] = useState([]);

  const handleSelect = (item) => {
    setSelected((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const handleSave = () => {
    onSave(selected);
  };

  return (
    <>
      <div className="main-container w-[500px] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md z-50 bg-white border border-gray-300 shadow-lg">
        <div className="header flex items-center justify-between border-b border-gray-300 px-4 py-3">
          <h1 className="font-medium text-lg text-[#333]">
            {type === "activities" ? "Popular Activities" : "Amenities"}
          </h1>
          <button
            onClick={onClose}
            className="bg-gray-200 hover:bg-gray-300 rounded-full p-2"
          >
            <X />
          </button>
        </div>

        <div className="content-container px-4 py-3 max-h-[300px] overflow-y-auto">
          {options.map((item, index) => (
            <label
              key={index}
              className="flex items-center gap-2 py-1 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selected.includes(item)}
                onChange={() => handleSelect(item)}
                className="accent-amber-700"
              />
              <span>{item}</span>
            </label>
          ))}
        </div>

        <div className="footer flex justify-end border-t border-gray-300 px-4 py-3">
          <button
            onClick={handleSave}
            className="btn-green cursor-pointer text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </div>
      </div>

      <div
        className="tint fixed top-0 left-0 right-0 bottom-0 z-10"
        onClick={onClose}
      ></div>
    </>
  );
};

export default HotelAddModal;
