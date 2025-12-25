import React, { useEffect, useState, useRef } from "react";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Edit, Plus, Trash } from "lucide-react";
import HotelAddModal from "../components/HotelAddModal";
import AmenityFormModal from "../components/AmenityFormModal";

const categoryData = [
  "Tents & Camping Grounds",
  "Eco Cottages",
  "Treehouses",
  "Homestays & Guesthouses",
  "Boutique Resorts & Hotels",
];

const activityOptions = [
  "Free WiFi",
  "Campfire",
  "Couple Friendly",
  "Private Bath",
  "Breakfast",
];

const EditHotelPage = () => {
  const apiUrl = import.meta.env.VITE_API_URL;

  const [formData, setFormData] = useState({
    name: "",
    images: [],
    description: "",
    pricePerNight: "",
    rating: "",
    distanceFromCenter: "",
    stayType: "",
    locationName: "", // mapped to backend `location`
    locationUrl: "", // mapped to backend `location_url`
    isFeatured: "",
    amenities: [], // [{ title, data: [] }]
    experiences: [],
  });

  const [locationUrl, setLocationUrl] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");

  // image handling locally
  const [oldImages, setOldImages] = useState([]); // existing images from backend: [{id, url}]
  const [newImages, setNewImages] = useState([]); // File[]
  const [previewImages, setPreviewImages] = useState([]); // string[]
  const [deletedImages, setDeletedImages] = useState([]); // ids of images removed

  const [editIndex, setEditIndex] = useState(null);
  const [showActivitiesModal, setShowActivitiesModal] = useState(false);
  const [isAmenityModal, setIsAmenityModal] = useState(false);

  const fileInputRef = useRef(null);
  const { id } = useParams();

  // ---------------- FETCH HOTEL ----------------
  useEffect(() => {
    const getHotelById = async () => {
      try {
        const res = await axios.get(`${apiUrl}/api/hotel/${id}`);
        const hotel = res.data.data;

        const normalizedAmenities =
          (hotel.amenities || []).map((group) => ({
            title: group.name,
            data: group.data
              ? group.data
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean)
              : [],
          })) || [];

        setFormData({
          name: hotel.name || "",
          images: [],
          description: hotel.description || "",
          pricePerNight: hotel.pricePerNight || "",
          rating: hotel.rating || "",
          distanceFromCenter: hotel.distanceFromCenter || "",
          stayType: hotel.stayType || "",
          locationName: hotel.location || "", // map from backend field
          locationUrl: hotel.location_url || "",
          isFeatured: hotel.isFeatured ? "Yes" : "No",
          amenities: normalizedAmenities,
          experiences: hotel.experiences || [],
        });

        setSelectedCategory(hotel.stayType || "");

        const backendImages = hotel.images || []; // [{ id, url }]
        setOldImages(backendImages);
        setNewImages([]);
        setDeletedImages([]);
        setPreviewImages(backendImages.map((img) => img.url));
        setLocationUrl(hotel.location_url || "");
      } catch (error) {
        console.error("Error fetching hotel:", error);
      }
    };

    getHotelById();
  }, [apiUrl, id]);

  // ---------------- IMAGE HANDLERS ----------------
  const handleEditClick = (index) => {
    setEditIndex(index);
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleAddImageClick = () => {
    setEditIndex(null);
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleReplaceImage = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);

    if (editIndex !== null) {
      const isOld = editIndex < oldImages.length;

      if (isOld) {
        // mark old one as deleted and remove from oldImages
        const removed = oldImages[editIndex];
        if (removed?.id) {
          setDeletedImages((prev) => [...prev, removed.id]);
        }
        setOldImages((prev) => prev.filter((_, i) => i !== editIndex));
      } else {
        // replace one of the new images
        const newIndex = editIndex - oldImages.length;
        setNewImages((prev) => prev.filter((_, i) => i !== newIndex));
      }

      setNewImages((prev) => [...prev, file]);

      const previews = [...previewImages];
      previews[editIndex] = previewUrl;
      setPreviewImages(previews);
      setEditIndex(null);
    } else {
      setNewImages((prev) => [...prev, file]);
      setPreviewImages((prev) => [...prev, previewUrl]);
    }

    e.target.value = "";
  };

  const handleDeleteImage = (index) => {
    if (index < oldImages.length) {
      const removed = oldImages[index];
      if (removed?.id) {
        setDeletedImages((prev) => [...prev, removed.id]);
      }
      setOldImages((prev) => prev.filter((_, i) => i !== index));
    } else {
      const newIndex = index - oldImages.length;
      setNewImages((prev) => prev.filter((_, i) => i !== newIndex));
    }
    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
  };

  // ---------------- LOCATION URL ----------------
  const handleLocationUrl = (e) => {
    const iframeCode = e.target.value;
    const match = iframeCode.match(/src="([^"]+)"/);
    const extractedUrl = match ? match[1] : iframeCode;

    setFormData((prev) => ({
      ...prev,
      locationUrl: extractedUrl,
    }));
    setLocationUrl(extractedUrl);
  };

  // ---------------- GENERIC INPUTS ----------------
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCategoryClick = (item) => {
    if (selectedCategory === item) {
      setSelectedCategory("");
      setFormData((prev) => ({ ...prev, stayType: "" }));
    } else {
      setSelectedCategory(item);
      setFormData((prev) => ({ ...prev, stayType: item }));
    }
  };

  const handleExperienceChange = (e, value) => {
    const isChecked = e.target.checked;

    setFormData((prev) => {
      if (isChecked) {
        if (prev.experiences.some((exp) => exp.name === value)) return prev;
        return {
          ...prev,
          experiences: [...prev.experiences, { name: value }],
        };
      }
      return {
        ...prev,
        experiences: prev.experiences.filter((exp) => exp.name !== value),
      };
    });
  };

  // ---------------- AMENITIES ----------------
  const openAmenityModal = () => setIsAmenityModal(true);

  const handleActivitiesModalSave = (selectedItems) => {
    setFormData((prev) => ({
      ...prev,
      experiences: selectedItems,
    }));
    setShowActivitiesModal(false);
  };

  const handleAmenityModalSave = (newFormData) => {
    setFormData(newFormData);
  };

  const buildAmenitiesPayload = () => {
    return (formData.amenities || [])
      .filter((g) => (g.data || []).length > 0)
      .map((g) => ({
        title: g.title,
        data: g.data || [],
      }));
  };

  // ---------------- SUBMIT ----------------
  const handleSubmit = async () => {
    try {
      const amenitiesPayload = buildAmenitiesPayload();

      const jsonPayload = {
        name: formData.name,
        description: formData.description,
        pricePerNight: Number(formData.pricePerNight),
        rating: Number(formData.rating),
        distanceFromCenter: formData.distanceFromCenter,
        stayType: formData.stayType,
        location: formData.locationName,
        locationUrl: formData.locationUrl,
        isFeatured: formData.isFeatured === "Yes",
        amenities: amenitiesPayload,

        experiences: formData.experiences.map((exp) =>
          typeof exp === "string" ? exp : exp.name
        ),

        deletedImages,
        // add isHighlighted here if your backend expects it
        // isHighlighted: isHighlighted,
      };

      const fd = new FormData();
      Object.entries(jsonPayload).forEach(([key, value]) => {
        fd.append(
          key,
          typeof value === "object" ? JSON.stringify(value) : String(value)
        );
      });

      // Send only NEW files; backend keeps old ones except in deletedImages
      newImages.forEach((file) => {
        fd.append("images", file); // field name must match backend upload field
      });

      await axios.put(`${apiUrl}/api/hotel/${id}`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    } catch (err) {
      console.error("Error updating hotel:", err);
    }
  };

  // ---------------- UI ----------------
  return (
    <>
      <section className="flex w-full">
        <Sidebar />

        <div className="w-full p-6">
          <h1 className="text-lg font-medium mb-4">Edit Hotel</h1>

          <div className="main-container w-[90%] space-y-4 max-h-[calc(100vh-90px)] overflow-auto pr-6">
            {/* IMAGES */}
            <div className="input-container">
              <h1 className="text-gray-800 font-medium mb-3">Images</h1>

              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                className="hidden"
                onChange={handleReplaceImage}
              />

              <div className="flex gap-4 flex-wrap">
                {previewImages.map((img, index) => (
                  <div
                    key={index}
                    className="relative group w-[120px] h-[120px]"
                  >
                    <img
                      src={img}
                      alt="hotel"
                      className="w-full h-full object-cover rounded-md"
                    />

                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition rounded-md flex items-center justify-center gap-4">
                      <button
                        onClick={() => handleEditClick(index)}
                        className="text-white text-xl cursor-pointer bg-green-400 rounded-full w-10 h-10 flex items-center justify-center"
                        title="Edit"
                      >
                        <Edit className="w-[80%]" />
                      </button>

                      <button
                        onClick={() => handleDeleteImage(index)}
                        className="text-white bg-red-400 rounded-full w-10 h-10 flex items-center justify-center text-xl cursor-pointer"
                        title="Delete"
                      >
                        <Trash className="w-[80%]" />
                      </button>
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={handleAddImageClick}
                  className="w-[120px] h-[120px] border-2 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center text-gray-500 hover:border-gray-400 hover:bg-gray-50"
                >
                  <Plus className="mb-1" />
                  <span className="text-xs">Add Image</span>
                </button>
              </div>
            </div>

            {/* NAME */}
            <div className="name-container">
              <h1 className="text-gray-800 font-medium">Hotel Name</h1>
              <input
                type="text"
                className="hotelAddInput"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>

            {/* OVERVIEW */}
            <div className="overview-container">
              <h1 className="text-gray-800 font-medium">Overview</h1>
              <textarea
                className="hotelAddInput min-h-[180px] max-h-[220px]"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
              ></textarea>
            </div>

            {/* CATEGORY */}
            <div className="category-container">
              <h1 className="text-gray-800 font-medium">Category</h1>
              <div className="tab-container flex items-center gap-4 flex-wrap mt-4">
                {categoryData.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => handleCategoryClick(item)}
                    className={`px-6 py-2 rounded-full cursor-pointer transition-all duration-200 
                      ${formData.stayType === item
                        ? "text-gray-900 font-medium bg-gray-200"
                        : "border border-dashed border-gray-300 text-gray-700 hover:bg-gray-50"
                      }`}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* POPULAR FACILITIES */}
            <div className="category-container">
              <div className="header flex items-center gap-3">
                <h1 className="text-gray-800 font-medium">
                  Popular Facilities
                </h1>
                <button
                  onClick={() => setShowActivitiesModal(true)}
                  className="bg-gray-800 rounded-lg w-[40px] h-[40px] flex items-center justify-center cursor-pointer"
                >
                  <Plus className="text-gray-50" />
                </button>
              </div>
              <div className="tab-container space-y-2 mt-4">
                {activityOptions.map((item, index) => (
                  <label
                    key={index}
                    className="flex items-center gap-2 ml-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      className="scale-120 accent-amber-700"
                      checked={formData.experiences.some(
                        (exp) =>
                          (typeof exp === "string" ? exp : exp.name) === item
                      )}
                      onChange={(e) => handleExperienceChange(e, item)}
                    />
                    <p>{item}</p>
                  </label>
                ))}
              </div>
            </div>

            {/* AMENITIES */}
            <div className="amenities-container">
              <div className="header flex items-center gap-3">
                <h1 className="text-gray-800 font-medium">Amenities</h1>
                <button
                  onClick={openAmenityModal}
                  className="bg-gray-800 rounded-lg w-[40px] h-[40px] flex items-center justify-center cursor-pointer"
                >
                  <Plus className="text-gray-50" />
                </button>
              </div>

              <div className="data-container mt-4 flex flex-wrap gap-2">
                {formData.amenities.filter((g) => (g.data || []).length > 0)
                  .length > 0 ? (
                  <div className="main-container grid grid-cols-3 gap-8">
                    {formData.amenities
                      .filter((group) => (group.data || []).length > 0)
                      .map((item, idx) => (
                        <div key={idx} className="card">
                          <div className="header border-b border-gray-500 w-fit px-4 pb-2">
                            <h1 className="title text-gray-800 font-medium">
                              {item.title}
                            </h1>
                          </div>
                          <div className="contnet-main-container mt-4 space-y-2 text-gray-400">
                            {item.data.map((i, j) => (
                              <div key={j} className="content-contaier ">
                                <div className="flex items-center gap-2">
                                  <input
                                    type="checkbox"
                                    checked
                                    readOnly
                                    className="accent-amber-700"
                                  />
                                  <h1>{i}</h1>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                  </div>
                ) : (
                  <h1 className="mt-[-10px] text-lg text-gray-500 border border-dashed border-gray-300 px-4 py-1 rounded-full">
                    None
                  </h1>
                )}
              </div>
            </div>

            {/* PRICE */}
            <div className="price-container">
              <h1 className="text-gray-800 font-medium">Price per night</h1>
              <input
                type="number"
                className="hotelAddInput"
                name="pricePerNight"
                value={formData.pricePerNight}
                onChange={handleInputChange}
              />
            </div>

            {/* RATING */}
            <div className="price-container">
              <h1 className="text-gray-800 font-medium">Rating</h1>
              <input
                type="number"
                className="hotelAddInput"
                placeholder="eg : 4.5"
                name="rating"
                value={formData.rating}
                onChange={handleInputChange}
              />
            </div>

            {/* LOCATION NAME */}
            <div className="price-container">
              <h1 className="text-gray-800 font-medium">Location name</h1>
              <input
                type="text"
                className="hotelAddInput"
                name="locationName"
                value={formData.locationName}
                onChange={handleInputChange}
              />
            </div>

            {/* LOCATION MAP LINK */}
            <div className="price-container">
              <h1 className="text-gray-800 font-medium">
                Location map link{" "}
                <span className="text-gray-400 font-light">(Iframe)</span>
              </h1>
              <input
                type="text"
                className="hotelAddInput"
                name="locationUrl"
                value={formData.locationUrl}
                onChange={handleLocationUrl}
              />
            </div>

            {locationUrl && (
              <div className="map-container">
                <iframe
                  src={locationUrl}
                  frameBorder="0"
                  className="w-[100%] border border-gray-400 rounded"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            )}

            {/* FEATURED */}
            <div className="price-container">
              <h1 className="text-gray-800 font-medium">Featured</h1>

              <div className="input-container ml-4 mt-2 flex items-center gap-5">
                <div className="flex gap-2 items-center">
                  <input
                    type="radio"
                    className="scale-120 accent-amber-700"
                    name="isFeatured"
                    value="Yes"
                    checked={formData.isFeatured === "Yes"}
                    onChange={handleInputChange}
                  />
                  <label className="text-gray-600">Yes</label>
                </div>

                <div className="flex gap-2 items-center">
                  <input
                    type="radio"
                    className="scale-120 accent-amber-700"
                    name="isFeatured"
                    value="No"
                    checked={formData.isFeatured === "No"}
                    onChange={handleInputChange}
                  />
                  <label className="text-gray-600">No</label>
                </div>
              </div>
            </div>

            {/* SAVE / UPDATE BUTTON */}
            <div className="flex justify-end py-4">
              <button
                onClick={handleSubmit}
                className="px-6 py-2 rounded-md bg-amber-700 text-white hover:bg-amber-800"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Activities modal */}
      {showActivitiesModal && (
        <HotelAddModal
          type="activities"
          existingData={formData.experiences.map((exp) =>
            typeof exp === "string" ? exp : exp.name
          )}
          onClose={() => setShowActivitiesModal(false)}
          onSave={handleActivitiesModalSave}
        />
      )}

      {/* Amenity modal */}
      {isAmenityModal && (
        <AmenityFormModal
          setIsAmenityModal={setIsAmenityModal}
          setForm={setFormData}
          formData={formData}
          onSave={handleAmenityModalSave}
        />
      )}
    </>
  );
};

export default EditHotelPage;
