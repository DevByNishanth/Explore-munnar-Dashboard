import React, { useState } from "react";
import img1 from "../assets/img1.jpg";
import img2 from "../assets/img2.jpg";
import img3 from "../assets/img3.jpg";
import img4 from "../assets/img-4.jpg";
import {
  ClipboardList,
  Gift,
  LayoutGrid,
  List,
  MapPin,
  Megaphone,
  Pin,
  Star,
} from "lucide-react";
import star from "../assets/fiveStar.svg";
import HotelViewCanvas from "./HotelViewCanvas";

const hotelData = [
  {
    hotelImg: img1,
    hotelName: "Highland Mist Resort",
    price: 1200,
    location: "Munnar",
    category: "3 Star",
    ratings: 3,
    isPromotion: true,
    isCardView: true,
    description:
      "A serene getaway surrounded by lush tea plantations, offering comfortable rooms and scenic views.",
  },
  {
    hotelImg: img2,
    hotelName: "Blue Valley Retreat",
    price: 1500,
    location: "Ooty",
    category: "4 Star",
    ratings: 3,
    description:
      "Modern retreat with elegant interiors, hillside views, and premium hospitality services.",
  },
  {
    hotelImg: img3,
    hotelName: "Palm Grove Hotel",
    price: 1800,
    location: "Alleppey",
    category: "3 Star",
    ratings: 3,
    description:
      "A cozy stay near the backwaters featuring traditional Kerala architecture and warm service.",
  },
  {
    hotelImg: img4,
    hotelName: "Crystal Peaks Residency",
    price: 2000,
    location: "Kodaikanal",
    category: "4 Star",
    ratings: 3,
    description:
      "A contemporary hotel offering lake views, excellent dining options, and spacious rooms.",
  },
  {
    hotelImg: img1,
    hotelName: "Mountain Breeze Inn",
    price: 1100,
    location: "Munnar",
    category: "2 Star",
    ratings: 3,
    isPromotion: true,
    isCardView: true,
    description:
      "Budget-friendly stay with easy access to sightseeing spots and refreshing mountain air.",
  },
  {
    hotelImg: img2,
    hotelName: "Lakeview Paradise Hotel",
    price: 2200,
    location: "Kodaikanal",
    category: "5 Star",
    ratings: 3,
    description:
      "Luxury rooms, lakeside ambiance, and world-class amenities for a premium vacation.",
  },
  {
    hotelImg: img3,
    hotelName: "Riverside Heritage Stay",
    price: 1600,
    location: "Alleppey",
    category: "3 Star",
    ratings: 3,
    description:
      "Charming riverside property with traditional décor and peaceful surroundings.",
  },
  {
    hotelImg: img4,
    hotelName: "Hilltop Grand Suites",
    price: 2400,
    location: "Ooty",
    category: "4 Star",
    ratings: 3,
    description:
      "Spacious suites offering panoramic hill views and exceptional guest services.",
  },
  {
    hotelImg: img1,
    hotelName: "Tea Forest Lodge",
    price: 1300,
    location: "Munnar",
    category: "3 Star",
    ratings: 3,
    description:
      "Comfortable lodge nestled in tea gardens, ideal for nature lovers and trekkers.",
  },
  {
    hotelImg: img2,
    hotelName: "Emerald Bay Resort",
    price: 2500,
    location: "Alleppey",
    ratings: null,
    category: "5 Star",
    description:
      "Luxury resort featuring backwater cruises, fine dining, and premium rooms.",
  },
];
const PromotionHotelCard = () => {
  // states
  const [isCanvas, setisCanvas] = useState(false);
  const [canvasData, setCanvasData] = useState([]);
  //   functions
  const handleCanvas = (item) => {
    setCanvasData(item);
    setisCanvas(true);
  };

  return (
    <>
      <div className="card-container grid grid-cols-3 gap-4 mt-6 h-[calc(100vh-170px)] overflow-auto">
        {hotelData.map((item, index) => {
          return (
            <div
              onClick={() => handleCanvas(item)}
              key={index}
              className="card cursor-pointer border border-gray-300 rounded-md p-2 flex items-start gap-2 relative"
            >
              <div className="img-container w-[25%]">
                <img
                  src={item.hotelImg}
                  className="w-[100%] rounded-md h-[70px]  "
                />
                <div className="icon-container flex items-center gap-2">
                  <p className="text-sm font-semibold text-gray-800 mt-2 flex gap-1 items-center">
                    {" "}
                    <span>
                      <MapPin className="text-sm w-4 h-4 text-green-800" />
                    </span>{" "}
                    {item.location}
                  </p>
                </div>
              </div>
              <div className="content-container w-[55%] ">
                <h1 className="text-[#333333] font-medium text-md">
                  {item.hotelName.slice(0, 18)}..
                </h1>
                <p className="text-sm text-gray-600">
                  {item.description.slice(0, 32)}..
                </p>

                {/* <div className="flex-container mt-2 flex items-center gap-2">
                  <button className="text-sm bg-gray-50 shadow shadow-gray/10 border border-gray-100 px-3 py-1 rounded-xl">
                    {item.category}
                  </button>
                </div> */}
              </div>
              <div className="icon-container w-[20%] flex items-center justify-end gap-2">
                {item.ratings !== null && (
                  <p className="flex items-center  text-gray-500">
                    {item.ratings}{" "}
                    <span className="text-[12px] mt-[-3px] ">⭐</span>
                  </p>
                )}
              </div>
              {/* ------- icon container ------  */}
              <div className="icon-container absolute bottom-3 right-2 flex gap-2">
                {item.isPromotion && (
                  <div className="w-[28px] rounded-full bg-green-100 h-[28px] flex items-center justify-center ">
                    <Megaphone className="w-[70%] text-green-700" />
                  </div>
                )}
                {item.isCardView && (
                  <div className="w-[28px] rounded-full bg-amber-100 h-[28px] flex items-center justify-center ">
                    <ClipboardList className="w-[70%] text-amber-400" />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {isCanvas && (
        <HotelViewCanvas canvasData={canvasData} setisCanvas={setisCanvas} />
      )}
    </>
  );
};

export default PromotionHotelCard;
