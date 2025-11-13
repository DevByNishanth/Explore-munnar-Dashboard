import React from "react";
import Sidebar from "../components/Sidebar";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import ItnearyTable from "../components/ItnearyTable";
const ItnearyPage = () => {
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
          </div>

          {/* table-section --------------  */}

          <ItnearyTable />


        </div>

      </section>
    </>
  );
};

export default ItnearyPage;
