import React, { useEffect, useState, useSyncExternalStore } from "react";
import Sidebar from "../components/Sidebar";
import HotelAddStepper from "../components/HotelAddStepper";
import HotelInformationForm from "../components/HotelInformationForm";
import HotelAddButtonFooter from "../components/HotelAddButtonFooter";
import HotelAddForm2 from "../components/HotelAddForm2";
import { useNavigate, useSearchParams } from "react-router-dom";
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

  const router = useNavigate();

  // states
  const [selectedTab, setSelectedTab] = useState("infoPage");
  const [isLoading, setIsLoading] = useState(false);

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
    isFeatured: false,
    rules: [],
    amenities: [],
    locationRange: "",
    experiences: [], // popular faciliteis
    isVerified: false,
  });

  // functions
  async function onSave() {
    setIsLoading(true);
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
      fd.append("isFeatured", formData.isFeatured);
      fd.append("locationRange", formData.locationRange)

      // ---- Convert arrays to JSON strings ----
      // fd.append("amenities", JSON.stringify(formData.amenities));
      fd.append("amenities", JSON.stringify(filteredAmeniteis));
      fd.append("experiences", JSON.stringify(formData.experiences));
      fd.append("rules", JSON.stringify(formData.rules))
      fd.append("isVerified", formData.isVerified);
      // ---- POST/PUT request ----
      const url = editMode === "true" ? `${apiUrl}/api/hotel/${hotelId}` : `${apiUrl}/api/hotel`;
      const method = editMode === "true" ? "PUT" : "POST";

      const res = await fetch(url, {
        method: method,
        body: fd,
      });

      router("/hotels");
      // window.location.reload();
      const data = await res.json();
      console.log("Upload success:", data);
    } catch (error) {
      console.error("Error uploading:", error);
      alert("Something went wrong");
    } finally {
      setIsLoading(false);
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
        isFeatured: hotel.isFeatured || false,
        amenities: hotel.amenities || [],
        experiences: hotel.experiences || [],
        isVerified: hotel.isVerified || false,
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
          <div className="px-6 py-4 ">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.isVerified}
                onChange={(e) =>
                  setFormData({ ...formData, isVerified: e.target.checked })
                }
                className="w-4 h-4"
              />
              <span className="text-gray-700">Is Verified</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.isFeatured}
                onChange={(e) =>
                  setFormData({ ...formData, isFeatured: e.target.checked })
                }
                className="w-4 h-4"
              />
              <span className="text-gray-700">Is Promoted</span>
            </label>
          </div>
          <HotelAddButtonFooter
            setSelectedTab={setSelectedTab}
            onSave={onSave}
            editMode={editMode}
            isLoading={isLoading}
          />
        </div>
      </section>
    </>
  );
};

export default HotelAddForm;
