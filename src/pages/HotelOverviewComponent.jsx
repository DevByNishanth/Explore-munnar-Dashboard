import React from "react";

const HotelOverviewComponent = ({ description, data }) => {
  return (
    <>
      <section className="w-[100%] mt-6">
        <h1 className="text-[#333333] font-medium text-xl mb-3">overview</h1>
        {data?.description?.split('.').map((item) => {
          return <h1 className="text-gray-500 mb-2 text-justify">{item}.</h1>
        })}
      </section>
    </>
  );
};

export default HotelOverviewComponent;
