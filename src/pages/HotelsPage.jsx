import React from "react";
import Sidebar from "../components/Sidebar";
import { ChevronRight, Plus } from "lucide-react";
import AddedHotels from "../components/AddedHotels";
import { Link } from "react-router-dom";

const HotelsPage = () => {
  // Auth 
  // const []
  return (
    <>
      <section className="flex w-[100%]">
        <Sidebar />
        <div className="hotelPage-container pt-4 bg-white px-6 w-[100%]">
          <div className="breadcrumb-section ">
            <div className="w-[100%] flex items-center justify-between">
              <h1 className="flex items-center text-gray-600">
                <Link to="/">Dashboard</Link> <ChevronRight />
                <span className="font-medium text-black">Hotels</span>
              </h1>
              <Link
                to={"/hotels/addHotels"}
                className="text-white px-4 py-2 rounded-md cursor-pointer btn-green flex items-center gap-2"
              >
                <Plus />
                Add Hotel
              </Link>
            </div>
            <h1 className="font-medium text-[#333333] text-xl mt-4">
              Manage Your Hotels
            </h1>
          </div>
          {/* hotel listing  */}
          <AddedHotels />
        </div>
      </section>
    </>
  );
};

export default HotelsPage;
