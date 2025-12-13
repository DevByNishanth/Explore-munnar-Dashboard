import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import HotelAddStepper from "../components/HotelAddStepper";
import HotelInformationForm from "../components/HotelInformationForm";
import HotelAddButtonFooter from "../components/HotelAddButtonFooter";
import HotelAddForm2 from "../components/HotelAddForm2";

// let data = [
//   { "title": "Room comfort", "data": ["Comfortable beds (Double/Queen/King)", "Clean linens and blankets", "Attached private bathrooms", "Hot water supply (solar/geyser)"] },
//   { "title": "Travel convenience", "data": [] }, { "title": "Food & beverage", "data": [] },
//   { "title": "View and nature", "data": ["Balcony with valley/mountain/lake views", "Garden or plantation view", "Tea estate surroundings"] },
//   { "title": "Connectivity", "data": [] }, { "title": "Family & safety", "data": ["Family-friendly environment", "CCTV surveillance"] }
// ]


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
      fd.append("isFeatured", formData.isFeatured == "Yes" ? true : false);

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
    } catch (error) {
      console.error("Error uploading:", error);
      alert("Something went wrong");
    }
  }


  console.log("amenities : ", formData)

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
