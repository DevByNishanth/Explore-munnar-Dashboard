import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import HotelAddStepper from "../components/HotelAddStepper";
import HotelInformationForm from "../components/HotelInformationForm";
import HotelAddButtonFooter from "../components/HotelAddButtonFooter";
import HotelAddForm2 from "../components/HotelAddForm2";

const HotelAddForm = () => {
  const [selectedTab, setSelectedTab] = useState("infoPage");
  return (
    <>
      <section className="flex w-[100%]">
        <Sidebar />
        <div className="form-container mt-4 w-[100%] ">
          {/* <HotelAddStepper /> */}
          {selectedTab == "infoPage" ? (
            <HotelInformationForm />
          ) : (
            <HotelAddForm2 />
          )}
          <HotelAddButtonFooter setSelectedTab={setSelectedTab} />
        </div>
      </section>
    </>
  );
};

export default HotelAddForm;
