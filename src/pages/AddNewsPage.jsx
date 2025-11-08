import React from "react";
import Sidebar from "../components/Sidebar";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronRight, Plus } from "lucide-react";
import LiveInformationForm from "../components/LiveInformationForm";

const AddNewsPage = () => {

  return (
    <>
      <section className="flex items-start">
        <Sidebar />
        <div className="main-container px-6 mt-4 w-[100%]">
          <div className="breadcrumbs-section flex items-center justify-between">
            <h1 className="flex items-center text-gray-600">
              <Link to="/">Dashboard</Link> <ChevronRight />
              <Link to="/liveInformation">Live Information</Link>{" "}
              <ChevronRight />
              <span className="font-medium text-black">Add Information</span>
            </h1>
          </div>
          <LiveInformationForm/>
        </div>
      </section>
    </>
  );
};

export default AddNewsPage;
