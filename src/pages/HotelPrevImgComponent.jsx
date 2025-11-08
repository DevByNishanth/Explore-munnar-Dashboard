import React, { useState } from "react";
import hotelImg from "../assets/hotelImg.jpg";
import hotelImg2 from "../assets/hotelImg2.jpg";
import hotelImg3 from "../assets/hotelImg3.jpg";
import hotelImg4 from "../assets/hotelImg4.jpg";
const HotelPrevImgComponent = () => {
  const [selectedImg, setSelectedImg] = useState("hotelImg");
  return (
    <>
      <div className="main-container flex gap-2 w-[100%] h-[370px]">
        <div className="first-container w-[20%] flex flex-col gap-2 ">
          <img
            onClick={() => {
              setSelectedImg(hotelImg);
            }}
            src={hotelImg}
            className="w-[100%] h-[90px] object-cover rounded-lg"
          />
          <img
            onClick={() => {
              setSelectedImg(hotelImg2);
            }}
            src={hotelImg2}
            className="w-[100%] h-[90px] object-cover rounded-lg"
          />
          <img
            onClick={() => {
              setSelectedImg(hotelImg3);
            }}
            src={hotelImg3}
            className="w-[100%] h-[83px] object-cover rounded-lg"
          />
          <img
            onClick={() => {
              setSelectedImg(hotelImg4);
            }}
            src={hotelImg4}
            className="w-[100%] h-[80px] object-cover rounded-lg border-2 border-green-600"
          />
        </div>
        <div className="second-container w-[100%]">
          <img src={selectedImg} className="h-[100%] w-[100%] object-cover rounded-lg" />
        </div>
      </div>
    </>
  );
};

export default HotelPrevImgComponent;
