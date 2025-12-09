import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import HotelAddStepper from "../components/HotelAddStepper";
import HotelInformationForm from "../components/HotelInformationForm";
import HotelAddButtonFooter from "../components/HotelAddButtonFooter";
import HotelAddForm2 from "../components/HotelAddForm2";

const HotelAddForm = () => {
  // Auth 
  const apiUrl = import.meta.env.VITE_API_URL;

  // states 
  const [selectedTab, setSelectedTab] = useState("infoPage");

  const [formData, setFormData] = useState({
    name: "",
    images: [],
    description: "",
    pricePerNight: "",
    rating: "",
    distanceFromCenter: "",
    stayType: "",
    location: "",
    isFeatured: "",
    amenities: [],
    experiences: [] // popular faciliteis 
  })

  async function onSave() {
    try {
      const fd = new FormData();

      // ---- Append images ----
      formData.images.forEach((img) => {
        fd.append("images", img);
      });

      // ---- Append normal text fields ----
      fd.append("name", formData.name);
      fd.append("description", formData.description);
      fd.append("pricePerNight", formData.pricePerNight);
      fd.append("rating", formData.rating);
      fd.append("distanceFromCenter", formData.distanceFromCenter);
      fd.append("stayType", formData.stayType);
      fd.append("location", formData.location);
      fd.append("isFeatured", formData.isFeatured);

      // ---- Convert arrays to JSON strings ----
      fd.append("amenities", JSON.stringify(formData.amenities));
      fd.append("experiences", JSON.stringify(formData.experiences));

      // ---- POST request ----
      const res = await fetch(`${apiUrl}/api/hotel`, {
        method: "POST",
        body: fd
      });

      const data = await res.json();
      console.log("Upload success:", data);
      alert("Hotel added successfully!");

    } catch (error) {
      console.error("Error uploading:", error.message);
      alert("Something went wrong");
    }
  }


  // jsx ---------------------------------
  return (
    <>
      <section className="flex w-[100%]">
        <Sidebar />
        <div className="form-container mt-4 w-[100%] ">
          {/* <HotelAddStepper /> */}
          {selectedTab == "infoPage" ? (
            <HotelInformationForm formData={formData} setFormData={setFormData} />
          ) : (
            <HotelAddForm2 />
          )}
          <HotelAddButtonFooter setSelectedTab={setSelectedTab} onSave={onSave} />
        </div>
      </section>
    </>
  );
};

export default HotelAddForm;
