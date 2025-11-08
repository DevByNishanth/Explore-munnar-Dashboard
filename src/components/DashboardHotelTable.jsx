import React from "react";
import fiveStar from "../assets/star.svg";
import threestar from "../assets/threestar.svg";
import tent from "../assets/tent.svg";
import leaf from "../assets/leaf.svg";
import homeIcon from "../assets/homeIcon.svg";
const data = [
  {
    icon: fiveStar,
    hotelName: "Misty Hill Eco Retreat",
    date: "10/10/2025",
    category: "5 star",
    icon_bg: "bg-violet-100",
  },
  {
    icon: threestar,
    hotelName: "Misty Hill Eco Retreat",
    date: "10/10/2025",
    category: "3 star",
    icon_bg: "bg-red-100",
  },
  {
    icon: tent,
    hotelName: "Misty Hill Eco Retreat",
    date: "10/10/2025",
    category: "Tents",
    icon_bg: "bg-orange-100",
  },
  {
    icon: homeIcon,
    hotelName: "Misty Hill Eco Retreat",
    date: "10/10/2025",
    category: "Home stays & guest house",
    icon_bg: "bg-gray-100",
  },
  {
    icon: leaf,
    hotelName: "Misty Hill Eco Retreat",
    date: "10/10/2025",
    category: "Eco cottages",
    icon_bg: "bg-blue-100",
  },
];

const DashboardHotelTable = () => {
  return (
    <>
      <section className="h-[210px] w-full rounded-lg ">
        <div className="table-container mb-2 space-y-3 h-[100%] ">
          {data.map((item, index) => {
            return (
              <div
                key={index}
                className="card  flex items-center justify-between"
              >
                <div className="first-container flex gap-3 items-center">
                  <div
                    className={`icon-container ${item.icon_bg} w-fit p-2 rounded-lg`}
                  >
                    <img src={item.icon} className="w-5 h-5" />
                  </div>
                  <div>
                    <h1 className="font-medium text-gray-700 text-[14px]">
                      {item.hotelName.slice(0, 13)} ..
                    </h1>
                    <h1 className="text-[12px] mt-[-2px] text-gray-500">
                      {item.category}
                    </h1>
                  </div>
                </div>
                <div className="second-container">
                  <h1 className="text-gray-500 text-[13px]">{item.date}</h1>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default DashboardHotelTable;
