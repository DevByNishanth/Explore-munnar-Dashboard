import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { Link } from "react-router-dom";
import { ChevronRight, Plus } from "lucide-react";
import ItnearyTable from "../components/ItnearyTable";
import ItnearyAttractionModal from "../components/ItnearyAttractionModal";
const ItnearyPage = () => {
  // states 
  const [isModal, setIsModal] = useState(false)
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

          {/* table-section --------------  */}

          <ItnearyTable />


        </div>

      </section>
      {isModal && <ItnearyAttractionModal setIsModal={setIsModal}/>}
    </>
  );
};

export default ItnearyPage;
