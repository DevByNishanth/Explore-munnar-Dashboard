import React from "react";

const HotelOverviewComponent = ({ description, data }) => {
  return (
    <>
      <section className="w-[100%] mt-6">
        <h1 className="text-[#333333] font-medium text-xl">overview</h1>
        <h1 className="text-gray-500 mt-3 text-justify">{data?.description}</h1>
      </section>
    </>
  );
};

export default HotelOverviewComponent;
