import { ArrowBigRight, ArrowRight, ChevronRight } from "lucide-react";
import React from "react";

const HotelAddButtonFooter = ({ setSelectedTab }) => {
  return (
    <>
      <div className="main-container w-[80%] mx-6 fixed bottom-6 flex items-center justify-between">
        <button className="underline text-black cursor-pointer">Cancel</button>
        <button
          className="btn-green text-white rounded-full px-4 py-2 flex items-center gap-3 cursor-pointer"
        >
          Save{" "}
          <span>
            <ArrowRight className="text-white" />
          </span>
        </button>
      </div>
    </>
  );
};

export default HotelAddButtonFooter;
