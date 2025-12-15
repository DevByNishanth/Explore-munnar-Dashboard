import React, { useEffect, useState, useSyncExternalStore } from "react";
import Sidebar from "../components/Sidebar";
import HotelAddStepper from "../components/HotelAddStepper";
import HotelInformationForm from "../components/HotelInformationForm";
import HotelAddButtonFooter from "../components/HotelAddButtonFooter";
import HotelAddForm2 from "../components/HotelAddForm2";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
// let data = [
//   { "title": "Room comfort", "data": ["Comfortable beds (Double/Queen/King)", "Clean linens and blankets", "Attached private bathrooms", "Hot water supply (solar/geyser)"] },
//   { "title": "Travel convenience", "data": [] }, { "title": "Food & beverage", "data": [] },
//   { "title": "View and nature", "data": ["Balcony with valley/mountain/lake views", "Garden or plantation view", "Tea estate surroundings"] },
//   { "title": "Connectivity", "data": [] }, { "title": "Family & safety", "data": ["Family-friendly environment", "CCTV surveillance"] }
// ]

const HotelAddForm = () => {
  // Auth
  const apiUrl = import.meta.env.VITE_API_URL;

  // params

  const [searchParams] = useSearchParams();
  const queries = new URLSearchParams(searchParams);
  const hotelId = queries.get("hotelId");
  const editMode = queries.get("editMode");

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
      locationName: "",
      locationUrl: "",
      isFeatured: "",
      amenities: [],
      experiences: [], // popular faciliteis
    });

  // functions
  async function onSave() {

    try {
      const filteredAmeniteis = formData.amenities.filter((item) => {
        return item.data.length > 0;
      });
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
      fd.append("location", formData.locationName);
      fd.append("locationUrl", formData.locationUrl);
      fd.append("isFeatured", formData.isFeatured == "Yes" ? true : false);

      // ---- Convert arrays to JSON strings ----
      // fd.append("amenities", JSON.stringify(formData.amenities));
      fd.append("amenities", JSON.stringify(filteredAmeniteis));
      fd.append("experiences", JSON.stringify(formData.experiences));

      // ---- POST request ----
      const res = await fetch(`${apiUrl}/api/hotel`, {
        method: "POST",
        body: fd,
      });

      const data = await res.json();
      // console.log("Upload success:", data);
    } catch (error) {
      console.error("Error uploading:", error);
      alert("Something went wrong");
    }
  }

  const getHotelById = async () => {
    try {
      const res = await axios.get(`${apiUrl}/api/hotel/${hotelId}`);
      const hotel = res.data.data;
     
    
      setFormData({
        name: hotel.name || "",
        images: [], // files cannot be prefilled
        description: hotel.description || "",
        pricePerNight: hotel.pricePerNight || "",
        rating: hotel.rating || "",
        distanceFromCenter: hotel.distanceFromCenter || "", // not in response
        stayType: hotel.stayType || "",
        locationName: hotel.location || "",
        locationUrl: hotel.locationUrl,
        isFeatured: hotel.isFeatured ? "Yes" : "No",
        amenities: hotel.amenities || [],
        experiences: hotel.experiences || [],
      });

      // optional: store existing images separately for preview
      // setExistingImages(hotel.images || []);
    } catch (error) {
      console.error("Error fetching hotel:", error);
    }
  };

  // side effects
  useEffect(() => {
    if (editMode == "true") {
      getHotelById();
    } else {
      return;
    }
  }, [editMode]);

  // jsx ---------------------------------
  return (
    <>
      <section className="flex w-[100%]">
        <Sidebar />
        <div className="form-container mt-4 w-[100%] ">
          {/* <HotelAddStepper /> */}
          {selectedTab == "infoPage" ? (
            <HotelInformationForm
              formData={formData}
              setFormData={setFormData}
            />
          ) : (
            <HotelAddForm2 />
          )}
          <HotelAddButtonFooter
            setSelectedTab={setSelectedTab}
            onSave={onSave}
            editMode={editMode}
          />
        </div>
      </section>
    </>
  );
};

export default HotelAddForm;
