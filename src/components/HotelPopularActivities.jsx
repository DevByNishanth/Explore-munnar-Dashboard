import React from "react";
const tabsData = [
  "Free wifi",
  "campfire",
  "Couple friendly",
  "Private bath",
  "breakfast",
];
const HotelPopularActivities = ({ data }) => {
  return (
    <>
      <section className="mt-6">
        <div className="header">
          <h1 className="text-[#333333] font-medium text-xl">
            Popular Facilities available{" "}
          </h1>
          <div className="tab-container mt-3 flex items-center gap-3">
            {data?.experiences?.map((item, index) => {
              return (
                <div
                  key={index}
                  className="tab bg-gray-200 px-6 py-2 rounded-full"
                >
                  {item.name}
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
