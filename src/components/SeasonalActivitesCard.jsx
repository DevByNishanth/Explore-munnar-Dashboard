import React, { useState } from "react";
import { Link } from "react-router-dom";
import noData from "../assets/noData.svg";
const SeasonalActivitesCard = ({ formatedData }) => {
  // states
  const [selectedCardData, setSlectedCardData] = useState(null);

  if (formatedData == null || formatedData.length == 0) {
    return (
      <div className="h-[320px] text-center">
        <img src={noData} className="w-[100%]" />
        <h1 className="font-medium text-gray-600 text-lg mt-2">No data found</h1>
      </div>
    );
  }

  return (
    <>
      {formatedData.map((item, index) => {
        return (
          <Link
            to={`/activites/${item.id}`}
            className="card bg-[#f7f9fa] border border-gray-200 p-2 rounded-lg shadow-xl w-full h-[330px]"
          >
            <div className="img-container w-full h-[55%]">
              <img
                src={item.img}
                className="w-[100%] object-cover rounded h-[100%]"
              />
            </div>
            <div className="content-container mt-2">
              <h1 className="font-medium text-lg text-[#333333]">
                {item.title}
              </h1>
              <h1 className="mt-2 text-gray-600">
                {item.description.slice(0, 70)}...
              </h1>
              <button className="mt-2 btn-green text-white px-4 py-2 rounded-lg w-full cursor-pointer">
                View Details
              </button>
            </div>
          </Link>
        );
      })}
    </>
  );
};

export default SeasonalActivitesCard;
