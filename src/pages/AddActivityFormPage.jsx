import React from "react";
import Sidebar from "../components/Sidebar";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import ActivityForm from "../components/ActivityForm";
const AddActivityFormPage = () => {
  return (
    <>
      <section className="flex items-start">
        <Sidebar />
        <div className="main-container px-6 mt-4 w-[100%]">
          {/* Breadcrumb  ------------------------------------------  */}
          <div className="breadcrumbs-section flex justify-between">
            <h1 className="flex items-center text-gray-600">
              <Link to="/activities">Activities</Link> <ChevronRight />
              <span className="font-medium text-black">Add Activity</span>
            </h1>
          </div>
           <ActivityForm />
        </div>
       
      </section>
    </>
  );
};

export default AddActivityFormPage;
