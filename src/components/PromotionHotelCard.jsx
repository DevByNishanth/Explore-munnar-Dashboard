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
  Plus,
  Star,
} from "lucide-react";
import star from "../assets/fiveStar.svg";
import HotelViewCanvas from "./HotelViewCanvas";
import NoData from "./NoData";

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
const PromotionHotelCard = ({ data }) => {
  console.log("Higlights hotels : ", data)

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
      {data?.length > 0 ? (
        <div className="card-container grid grid-cols-3 gap-x-4 mt-6 h-[calc(100vh-170px)] overflow-auto">
          {data.map((item, index) => {
            return (
              <div
                onClick={() => handleCanvas(item)}
                key={index}
                className="card h-[130px] cursor-pointer border border-gray-300 rounded-md p-2 flex items-start gap-2 relative"
              >
                <div className="img-container w-[25%]">
                  <img
                    src={item?.images?.[0]?.url}
                    className="w-[100%] rounded-md h-[70px]  "
                  />
                  <div className="icon-container flex items-center gap-2">
                    <p className="text-sm font-semibold whitespace-nowrap text-gray-800 mt-2 flex gap-1 items-center">
                      <span>
                        <MapPin className="text-sm w-4 h-4 text-green-800" />
                      </span>
                      {item.location}
                    </p>
                  </div>
                </div>
                <div className="content-container w-[55%] ">
                  <h1 className="text-[#333333] font-medium text-md">
                    {item?.name?.slice(0, 18)}..
                  </h1>
                  <p className="text-sm text-gray-600">
                    {item?.description?.slice(0, 32)}..
                  </p>
                </div>
                <div className="icon-container w-[20%] flex items-center justify-end gap-2">
                  {item.ratings !== null && (
                    <p className="flex items-center  text-gray-500">
                      {item?.rating}
                      <span className="text-[12px] mt-[-3px] ">⭐</span>
                    </p>
                  )}
                </div>
                <div className="icon-container absolute bottom-3 right-2 flex gap-2">
                  {item?.isFeatured && (
                    <div className="w-[28px] group relative rounded-full bg-green-100 h-[28px] flex items-center justify-center ">
                      <Megaphone className="w-[70%] text-green-700" />
                      <span className="bg-gray-900 absolute top-[-100%] transition-all duration-300 right-0 border opacity-0 group-hover:opacity-100 text-gray-300 px-2 py-1 text-[10px]">
                        Promotion
                      </span>
                    </div>
                  )}
                  {item?.isHighlighted && (
                    <div className="w-[28px] rounded-full relative group bg-amber-100 h-[28px] flex items-center justify-center ">
                      <ClipboardList className="w-[70%] text-amber-400" />
                      <span className="bg-gray-900 absolute top-[-100%] left-0 z-10 transition-all duration-200 border opacity-0 group-hover:opacity-100 text-gray-300 py-1 text-[10px] w-[70px] text-center">
                        Card view
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <NoData />
      )}

      {isCanvas && (
        <HotelViewCanvas canvasData={canvasData} setisCanvas={setisCanvas} />
      )}
    </>
  );
};

export default PromotionHotelCard;
