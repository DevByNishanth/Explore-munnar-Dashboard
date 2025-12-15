import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { ChevronRight, Plus } from "lucide-react";
import { Link, useNavigate, useViewTransitionState } from "react-router-dom";
import BusTimingsTable from "../components/BusTimingsTable";
import BusTimingsForm from "../components/BusTimingsForm";
const BusTimingsPage = () => {
  // states
  const [isForm, setIsForm] = useState(false);

  // router dom elements
  const navigate = useNavigate();

  // functions
  const onClose = () => {
    setIsForm(false);
    navigate(`/BusTimings`);
  };

  // handling editClick
  const handleEdit = () => {
    navigate(`/BusTimings?editMode="true"`);
    setIsForm(true);
  };
  return (
    <>
      <section className="flex items-start">
        <Sidebar />
        <div className="main-container px-6 mt-4 w-[100%]">
          {/* breadcrum-section  */}
          <div className="breadcrumbs-section flex items-center justify-between">
            <div className="flex items-center justify-between w-[100%]  text-gray-600">
              <div className="flex items-center">
                <Link to="/">Dashboard</Link> <ChevronRight />
                <Link to="/BusTimings" className="font-medium text-black">
                  Bus Timings
                </Link>{" "}
              </div>
              <button
                onClick={() => {
                  setIsForm(true);
                }}
                className="btn-green text-white py-2 rounded px-3 flex items-center gap-2 cursor-pointer"
              >
                <Plus />
                Add Timing
              </button>
            </div>
          </div>
          {/* table section  */}
          <BusTimingsTable handleEdit={handleEdit} />
        </div>
      </section>

      {isForm && <BusTimingsForm onClose={onClose} />}
    </>
  );
};

export default BusTimingsPage;
