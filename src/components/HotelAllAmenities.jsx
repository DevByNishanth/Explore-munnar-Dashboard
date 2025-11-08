import React from "react";

const data = [
  {
    title: "Room comfort",
    list: [
      "Comfortable beds (Double/Queen/King)",
      "Clean linens and blankets",
      "Attached private bathrooms",
      "Hot water supply (solar/geyser)",
      "Room heater",
    ],
  },
  {
    title: "Travel convinece",
    list: [
      " Free parking",
      "Paid cab or taxi assistance",
      "Two-wheeler rental",
      " Nearby KSRTC bus stand info",
    ],
  },
  {
    title: "Food & bevarge",
    list: [
      "Breakfast included",
      "Room service",
      " On-site restaurant or dining area",
      "Campfire snacks or BBQ (in tent/eco stays)",
      " Kitchen access (for homestays)",
    ],
  },
];

const HotelAllAmenities = () => {
  return (
    <>
      <section className="mt-6 ">
        <header>
          <h1 className="text-[#333333] font-medium text-xl">All Amenities</h1>
        </header>
        <div className="content-container mt-3 grid grid-cols-3 gap-8">
          {data.map((item, index) => {
            return (
              <div key={index} className="card ">
                <h1 className="font-medium text-[#333333]">{item.title}</h1>
                {item.list.map((listItem, i) => {
                  return (
                    <div
                      key={i}
                      className="list-container mt-3 w-[100% flex items-center gap-4"
                    >
                      <input
                        type="checkbox"
                        checked
                        className="accent-amber-700"
                      />
                      <h1 className="w-[100%] text-gray-500">{listItem}</h1>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default HotelAllAmenities;
