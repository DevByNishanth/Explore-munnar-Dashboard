import React from "react";

const data1 = [
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

const HotelAllAmenities = ({ data }) => {
  console.log("amenities data : ", data?.amenities);

  // const mapped_ameniteis = data?.amenities?.map((item) => {
  //   return item;
  // })
  // console.log("mapped ameniteis : ", mapped_ameniteis)

  return (
    <>
      <section className="mt-6 ">
        <header>
          <h1 className="text-[#333333] font-medium text-xl">All Amenities</h1>
        </header>
        <div className="content-container mt-3 grid grid-cols-3 gap-8">
          {data?.amenities?.map((item, index) => {
            const list = item.data.split(","); // 👈 convert string to array

            return (
              <div key={index} className="card">
                <h1 className="font-medium text-[#333333]">{item.name}</h1>

                {list.map((listItem, i) => (
                  <div
                    key={i}
                    className="list-container mt-3 w-full flex items-center gap-4"
                  >
                    <input
                      type="checkbox"
                      checked
                      readOnly
                      className="accent-amber-700"
                    />
                    <h1 className="text-gray-500">
                      {listItem.trim()}
                    </h1>
                  </div>
                ))}
              </div>
            );
          })}

        </div>
      </section>
    </>
  );
};

export default HotelAllAmenities;
