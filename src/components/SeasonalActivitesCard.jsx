import React, { useState } from "react";
import { Link } from "react-router-dom";
import NoData from "./NoData";
const SeasonalActivitesCard = ({ formatedData }) => {
  // states
  const [selectedCardData, setSlectedCardData] = useState(null);

  if (formatedData == null || formatedData.length == 0) {
    return <NoData />;
  }

  return (
    <>
      {formatedData.map((item, index) => {
        return (
          <Link
            to={`/activites/${item.id}`}
            className="card bg-[#f7f9fa] border border-gray-200 p-2 rounded-lg shadow-xl w-full h-[340px]"
          >
            <div className="img-container w-full h-[55%]">
              <img
                src={item?.images?.[0]?.url}
                className="w-[100%] object-cover rounded h-[100%]"
              />
            </div>
            <div className="content-container mt-2">
              <h1 className="font-medium text-lg text-[#333333]">
                {item.name.slice(0, 30)}..
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
