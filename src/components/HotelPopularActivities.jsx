import React from "react";
const tabsData = [
  "Free wifi",
  "campfire",
  "Couple friendly",
  "Private bath",
  "breakfast",
];
const HotelPopularActivities = () => {
  return (
    <>
      <section className="mt-6">
        <div className="header">
          <h1 className="text-[#333333] font-medium text-xl">
            Popular Facilities available{" "}
          </h1>
          <div className="tab-container mt-3 flex items-center gap-3">
            {tabsData.map((item, index) => {
              return (
                <div
                  key={index}
                  className="tab bg-gray-200 px-6 py-2 rounded-full"
                >
                  {item}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default HotelPopularActivities;
