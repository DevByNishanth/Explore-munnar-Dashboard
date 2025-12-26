import React from "react";
import noData from "../assets/noData.svg";

export default function NoData({ message = "No data found", className = "", imageClassName = "" }) {
  return (
    <div className={`text-center py-6 ${className}`}>
      <img src={noData} className={`w-[300px] h-[200px] mx-auto ${imageClassName}`} alt="" />
      <h1 className="text-gray-600 mt-2">{message}</h1>
    </div>
  );
}

