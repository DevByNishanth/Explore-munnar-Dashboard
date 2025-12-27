import { ArrowBigRight, ArrowRight, ChevronRight } from "lucide-react";
import React from "react";

const HotelAddButtonFooter = ({ setSelectedTab, onSave, editMode, isLoading }) => {
  return (
    <>
      <div className="main-container w-[80%] mx-6 fixed bottom-6 z-10 flex items-center justify-end">
        {/* <button className="underline text-black cursor-pointer">Cancel</button> */}
        {editMode == "true" ? (
          <button
            onClick={onSave}
            disabled={isLoading}
            className={`btn-green text-white rounded-full px-4 py-2 flex items-center gap-3 cursor-pointer ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isLoading ? "Saving..." : "Save Changes"}
            <span>
              <ArrowRight className="text-white" />
            </span>
          </button>
        ) : (
          <button
            onClick={onSave}
            disabled={isLoading}
            className={`btn-green text-white rounded-full px-4 py-2 flex items-center gap-3 cursor-pointer ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isLoading ? "Saving..." : "Save"}
            <span>
              <ArrowRight className="text-white" />
            </span>
          </button>
        )}
      </div>
    </>
  );
};

export default HotelAddButtonFooter;
