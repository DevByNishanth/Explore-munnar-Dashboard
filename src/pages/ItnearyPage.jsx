import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { Link } from "react-router-dom";
import { ChevronRight, Plus } from "lucide-react";
import ItnearyTable from "../components/ItnearyTable";
import ItnearyAttractionModal from "../components/ItnearyAttractionModal";
import AttractionsCard from "../components/AttractionsCard";
const ItnearyPage = () => {
  // states 
  const [isModal, setIsModal] = useState(false);
  const [selectedTab, setSelectedTab] = useState("Added Attractions")
  return (
    <>
      <section className="flex items-start">
        <Sidebar />
        <div className="main-container px-6 mt-4 w-[100%]">

          {/* breadcrumbs --------------- */}
          <div className="breadcrumbs-section flex items-center justify-between">
            <h1 className="flex items-center text-gray-600">
              <Link to="/">Dashboard</Link> <ChevronRight />
              <span className="font-medium text-black">Itneary</span>
            </h1>
            <button onClick={() => setIsModal(true)} className="btn-green text-white cursor-pointer px-3 py-2 rounded-md flex items-center gap-2"><Plus />Add Attractions</button>
          </div>
          <div className="tab-container bg-gray-100 w-fit px-6 py-2 rounded-full flex gap-6 items-center">
            <button onClick={() => setSelectedTab("Added Attractions")} className={` cursor-pointer rounded-full ${selectedTab == "Added Attractions" ? "bg-white shadow px-4 py-2 " : ""}`}>Added Attractions</button>
            <button onClick={() => setSelectedTab("Bookings")} className={`cursor-pointer rounded-full ${selectedTab == "Bookings" ? "bg-white shadow px-4 py-2 " : ""}`}>Bookings</button>
          </div>
          {/* table-section --------------  */}

          {selectedTab == "Bookings" ? <ItnearyTable /> : <AttractionsCard />}


        </div>

      </section>
      {isModal && <ItnearyAttractionModal setIsModal={setIsModal} />}
    </>
  );
};

export default ItnearyPage;
