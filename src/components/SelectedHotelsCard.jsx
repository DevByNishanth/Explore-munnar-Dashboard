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
        isPromotion: false,
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
        isPromotion: true,
        isCardView: false,
        ratings: 3,
        description:
            "Modern retreat with elegant interiors, hillside views, and premium hospitality services.",
    },
    {
        hotelImg: img2,
        hotelName: "Blue Valley Retreat",
        price: 1500,
        location: "Ooty",
        category: "4 Star",
        isPromotion: true,
        isCardView: false,
        ratings: 3,
        description:
            "Modern retreat with elegant interiors, hillside views, and premium hospitality services. ",
    },

];
const SelectedHotelsCard = () => {
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
                            className="card h-fit cursor-pointer border border-gray-300 rounded-md p-2 flex items-start gap-2 relative"
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
                                    {item.hotelName}
                                </h1>
                                <p className="text-sm text-gray-600">
                                    {item.description.slice(0, 42)}..
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


        </>
    );
};

export default SelectedHotelsCard;
