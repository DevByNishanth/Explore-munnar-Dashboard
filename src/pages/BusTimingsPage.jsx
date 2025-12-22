import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { ChevronRight, Plus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import BusTimingsTable from "../components/BusTimingsTable";
import BusTimingsForm from "../components/BusTimingsForm";

const BusTimingsPage = () => {
  const [isForm, setIsForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState(null);

  const navigate = useNavigate();

  const onClose = () => {
    setIsForm(false);
    setEditMode(false);
    setEditData(null);
    navigate(`/BusTimings`);
  };

  const handleEdit = (item) => {
    setEditMode(true);
    setEditData(item);
    setIsForm(true);
    navigate(`/BusTimings?editMode=true`);
  };

  return (
    <>
      <section className="flex items-start">
        <Sidebar />
        <div className="main-container px-6 mt-4 w-[100%]">
          <div className="breadcrumbs-section flex items-center justify-between">
            <div className="flex items-center gap-2 text-gray-600">
              <Link to="/">Dashboard</Link> <ChevronRight />
              <Link to="/BusTimings" className="font-medium text-black">
                Bus Timings
              </Link>
            </div>

            <button
              onClick={() => {
                setIsForm(true);
                setEditMode(false);
                setEditData(null);
              }}
              className="btn-green text-white py-2 rounded px-3 flex items-center gap-2"
            >
              <Plus />
              Add Timing
            </button>
          </div>

          <BusTimingsTable handleEdit={handleEdit} />
        </div>
      </section>

      {isForm && (
        <BusTimingsForm
          onClose={onClose}
          editMode={editMode}
          editData={editData}
        />
      )}
    </>
  );
};

export default BusTimingsPage;
