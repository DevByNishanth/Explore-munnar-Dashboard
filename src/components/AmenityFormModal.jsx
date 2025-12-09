import React, { useState, useEffect } from "react";
import { Bed, Bus, Utensils, Mountain, Wifi, Users, X } from "lucide-react";

const amenitiesData = [
  {
    category: "Room comfort",
    title: [
      "Comfortable beds (Double/Queen/King)",
      "Clean linens and blankets",
      "Attached private bathrooms",
      "Hot water supply (solar/geyser)",
      "Room heater"
    ]
  },
  {
    category: "Travel convenience",
    title: [
      "Free parking",
      "Paid cab or taxi assistance",
      "Two-wheeler rental",
      "Nearby KSRTC bus stand info"
    ]
  },
  {
    category: "Food & beverage",
    title: [
      "Breakfast included",
      "Room service",
      "On-site restaurant or dining area",
      "Campfire snacks or BBQ (in tent/eco stays)",
      "Kitchen access (for homestays)"
    ]
  },
  {
    category: "View and nature",
    title: [
      "Balcony with valley/mountain/lake views",
      "Garden or plantation view",
      "Tea estate surroundings",
      "Birdwatching or sunrise points nearby"
    ]
  },
  {
    category: "Connectivity",
    title: ["Free Wi-Fi", "Mobile signal support"]
  },
  {
    category: "Family & safety",
    title: [
      "Family-friendly environment",
      "CCTV surveillance",
      "Fire safety measures",
      "Doctor on call",
      "Kitchen access (for homestays)"
    ]
  }
];

export default function AmenitiesModal({ setIsAmenityModal, setForm }) {
  const [pageNumber, setPageNumber] = useState(1);
  const [selectedTab, setSelectedTab] = useState(amenitiesData[0].category);
  const [selectedAmenities, setSelectedAmenities] = useState({});

  const currentCategory = amenitiesData[pageNumber - 1];

  useEffect(() => {
    setSelectedTab(currentCategory.category);
  }, [pageNumber]);

  function handleCheck(item) {
    const cat = currentCategory.category;

    setSelectedAmenities(prev => {
      const current = prev[cat] || [];
      const updated = current.includes(item)
        ? current.filter(i => i !== item)
        : [...current, item];

      return { ...prev, [cat]: updated };
    });
  }

  function handleNext() {
    setPageNumber(prev => Math.min(prev + 1, amenitiesData.length));
  }

  function handlePrev() {
    setPageNumber(prev => Math.max(prev - 1, 1));
  }

  function handleSave() {
    const finalAmenities = amenitiesData.map(cat => ({
      title: cat.category,
      data: selectedAmenities[cat.category] || []
    }));

    setForm(prev => ({ ...prev, amenities: finalAmenities }));
    setIsAmenityModal(false);
  }

  return (
    <>
      <div className="tint-1 fixed inset-0 z-40 bg-black/40"></div>
      <section className="bg-white w-[45%] p-3 rounded-lg absolute top-[50%] border border-gray-400 left-[50%] translate-x-[-50%] translate-y-[-50%] z-40">
        <header className="pb-2 px-4 flex items-center justify-between">
          <h1 className="font-medium text-xl">Add Amenities</h1>
          <div


          >
            <X className="text-gray-800" onClick={() => setIsAmenityModal(false)} />
          </div>
        </header>

        {/* TAB BUTTONS */}
        <div className="tab-container mt-4 flex gap-4 items-center justify-evenly tab-bg px-3 rounded-full py-3">
          {[
            { key: amenitiesData[0].category, icon: <Bed /> },
            { key: amenitiesData[1].category, icon: <Bus /> },
            { key: amenitiesData[2].category, icon: <Utensils /> },
            { key: amenitiesData[3].category, icon: <Mountain /> },
            { key: amenitiesData[4].category, icon: <Wifi /> },
            { key: amenitiesData[5].category, icon: <Users /> }
          ].map(tab => (
            <button
              key={tab.key}
              className={`flex items-center gap-2 font-medium ${selectedTab === tab.key
                ? "bg-active rounded-full text-white"
                : "text-gray-700"
                } py-2 px-3 rounded`}
            >
              {React.cloneElement(tab.icon, {
                className: selectedTab === tab.key ? "text-white" : "text-gray-600"
              })}
              {selectedTab === tab.key && <span>{tab.key}</span>}
            </button>
          ))}
        </div>

        {/* CHECKBOX ITEMS */}
        <div className="input-container mt-6 min-h-[180px] mx-4">
          {currentCategory.title.map(item => (
            <div key={item} className="input flex items-center gap-2 mb-2">
              <input
                type="checkbox"
                className="scale-120 accent-amber-700"
                checked={(selectedAmenities[selectedTab] || []).includes(item)}
                onChange={() => handleCheck(item)}
              />
              <h1>{item}</h1>
            </div>
          ))}
        </div>

        {/* BUTTONS */}
        <div className="btn-container mx-4 flex gap-4 justify-end mt-4">
          {pageNumber > 1 && (
            <button onClick={handlePrev} className="bg-gray-300 px-6 py-2 rounded-lg">
              Previous
            </button>
          )}

          {pageNumber < amenitiesData.length ? (
            <button
              onClick={handleNext}
              className="bg-amber-700 text-white px-6 py-2 rounded-lg"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSave}
              className="bg-amber-700 text-white px-6 py-2 rounded-lg"
            >
              Save
            </button>
          )}
        </div>
      </section>
    </>

  );
}