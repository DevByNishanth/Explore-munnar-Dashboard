import React, { useEffect, useState } from "react";
import { Handshake, Heading2, Plus, UploadCloud, X } from "lucide-react";
import HotelAddModal from "./hotelAddModal";
import AmenityFormModal from "./AmenityFormModal";
import { useLocation, useSearchParams } from "react-router-dom";
import PoliciesForm from "../components/PoliciesForm";
const categoryData = [
  "Tents & Camping Grounds",
  "Eco Cottages",
  "Treehouses",
  "Homestays & Guesthouses",
  "Boutique Resorts & Hotels",
];

const HotelInformationForm = ({ setFormData, formData }) => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const [policies, setPolicies] = useState({
    general:
      "Check-in at 12 PM, valid ID required, only registered guests allowed.\n\nGuests are required to show a photo ID and credit card at check-in. You need to let the property know what time you’ll be arriving in advance.",
    prohibited: "",
    usage: "",
    payment: "",
    guest: "",
  });

  // states
  // const [formData, setFormData] = useState({
  //   name: "",
  //   images: [],
  //   description: "",
  //   pricePerNight: "",
  //   rating: "",
  //   distanceFromCenter: "",
  //   stayType: "",
  //   location: "",
  //   isFeatured: "",
  //   amenities: [],
  //   experiences: [] // popular faciliteis
  // })

  const [imgFiles, setImgFiles] = useState([]);
  const [previewUrls, setpreviewUrls] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(""); // "activities" or "amenities"
  const [isAmenityModal, setIsAmenityModal] = useState(false);
  const [locationUrl, setLocationUrl] = useState(null);
  const [cleanedAmeneties, setCleanedAmeneties] = useState([]);
  // store selected data
  const [popularActivities, setPopularActivities] = useState(
    formData.experiences || []
  );
  const [amenities, setAmenities] = useState([1]);
  const [selectedCategory, setSelectedCategory] = useState(formData.stayType);

  //  handling side effect
  useEffect(() => {
    if (formData?.amenities?.length > 0) {
      const amenitiesData = formData.amenities;
      const cleanedArr = amenitiesData.filter((item) => {
        return item?.data?.length > 0;
      });
      setCleanedAmeneties(cleanedArr);
      // console.log("cleaned array : ", cleanedArr);
    }
  }, [formData]);

  // functions

  const handleOpenModal = (type) => {
    setModalType(type);
    setShowModal(true);
  };

  const handleSave = (selectedItems) => {
    if (modalType === "activities") {
      setPopularActivities(selectedItems);

      // ✅ update formData.experiences
      setFormData((prev) => ({
        ...prev,
        experiences: selectedItems,
      }));
    }

    if (modalType === "amenities") {
      setAmenities(selectedItems);

      // If you want to store amenities in formData (optional)
      setFormData((prev) => ({
        ...prev,
        amenities: selectedItems,
      }));
    }

    setShowModal(false);
  };

  const handleCategoryClick = (item) => {
    if (selectedCategory === item) {
      // Unselect
      setSelectedCategory(null);

      setFormData((prev) => ({
        ...prev,
        stayType: "",
      }));
    } else {
      // Select new stay type
      setSelectedCategory(item);

      setFormData((prev) => ({
        ...prev,
        stayType: item,
      }));
    }
  };

  //   function to upload a new file or list of files
  function handleFilechange(e) {
    if (imgFiles.length + e.target.files.length > 16) {
      alert("Only 16 images are allowed ");
      return;
    }
    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
      "image/avif",
    ];
    const files = Array.from(e.target.files);

    // Filter only allowed file types
    const validFiles = files.filter((file) => allowedTypes.includes(file.type));

    if (validFiles.length === 0) {
      alert("Only JPEG, JPG, PNG, WEBP, or AVIF images are allowed.");
      return;
    }

    const newUrls = validFiles.map((item) => URL.createObjectURL(item));
    setpreviewUrls((prev) => [...prev, ...newUrls]); // ✅ flatten
    setImgFiles((prev) => [...prev, ...validFiles]); // ✅ flatten

    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...validFiles],
    }));
  }

  const handleFileRemove = (index) => {
    // Remove from imgFiles
    setImgFiles((prev) => prev.filter((_, i) => i !== index));

    // Remove from previewUrls
    setpreviewUrls((prev) => prev.filter((_, i) => i !== index));

    // Remove from formData.images
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLocationUrl = (e) => {
    const iframeCode = e.target.value;

    // extract src="...link..." from iframe
    const match = iframeCode.match(/src="([^"]+)"/);

    const extractedUrl = match ? match[1] : ""; // if no match, empty string

    setFormData((prev) => ({
      ...prev,
      locationUrl: extractedUrl,
    }));

    setLocationUrl(extractedUrl);
  };

  const isAmenityChecked = (title, value) => {
    return formData.amenities.some(
      (group) => group.title === title && group.data.includes(value)
    );
  };

  useEffect(() => {
    if (!formData.experiences?.length) return;

    // convert [{ name: 'Free WiFi' }] → ['Free WiFi']
    const normalized = formData.experiences.map((exp) =>
      typeof exp === "string" ? exp : exp.name
    );

    setPopularActivities(normalized);
  }, [formData.experiences]);

  console.log("form data : ", formData);

  return (
    <>
      <section className="mt-4 px-6  ">
        <h1 className="font-medium text-lg ">Hotel Information</h1>
        <div className="form-main-container  w-[100%] h-[calc(100vh-160px)] overflow-y-auto">
          <div className="form-container mt-4 space-y-4 w-[100%] md:w-[90%]  pr-6">
            <div className="img-container">
              <h1 className="text-gray-800 font-medium">Image</h1>

              {imgFiles.length !== 0 ? (
                <div className="img-upload-container w-[100%] border border-gray-300 h-[100px] flex items-center gap-3 px-3 rounded mt-2">
                  {/* Preview Images */}
                  {imgFiles.map((item, index) => {
                    const url = URL.createObjectURL(item);

                    return (
                      <div
                        key={index}
                        className="relative transition-all duration-300 group w-[80px] h-[80px]"
                      >
                        <img
                          src={url}
                          alt="hotel"
                          className="w-full h-full object-cover rounded-md"
                        />

                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-md"></div>

                        <X
                          onClick={() => handleFileRemove(index)}
                          className="text-white absolute cursor-pointer top-1/2 left-1/2
              -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
                          size={20}
                        />
                      </div>
                    );
                  })}

                  {/* ➕ Add New Images Button */}
                  <div className="button-container relative">
                    <button className="bg-gray-100 cursor-pointer hover:bg-gray-200 w-[80px] h-[80px] rounded-lg flex items-center justify-center">
                      <Plus />
                    </button>

                    {/* ✅ THIS IS YOUR INPUT FIELD */}
                    <input
                      type="file"
                      multiple
                      accept=".jpeg, .jpg, .png, .webp, .avif"
                      onChange={handleFilechange}
                      className="absolute top-0 right-0 left-0 bottom-0 opacity-0 cursor-pointer"
                    />
                  </div>
                </div>
              ) : (
                <div className="img-input-container relative mt-2 bg-gray-50 border border-gray-200 rounded-lg p-4 w-[100%]">
                  <UploadCloud className="text-gray-400 w-9 h-9 m-auto" />
                  <h1 className="text-center text-gray-700">
                    <span className="text-blue-500">Click to upload</span> or
                    drag and drop.
                  </h1>
                  <h1 className="text-center text-gray-400">
                    JPEG, JPG, PNG, WEBP, AVIF
                  </h1>

                  {/* ✅ First time upload input field */}
                  <input
                    type="file"
                    accept=".jpeg, .jpg, .png, .webp, .avif"
                    multiple
                    onChange={handleFilechange}
                    className="absolute top-0 right-0 left-0 bottom-0 opacity-0 cursor-pointer"
                  />
                </div>
              )}
            </div>
            <div className="name-container">
              <h1 className="text-gray-800 font-medium">Hotel Name</h1>
              <input
                type="text"
                className="hotelAddInput"
                name="name"
                value={formData.name}
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            <div className="overview-container">
              <h1 className="text-gray-800 font-medium">Overview</h1>
              <textarea
                className="hotelAddInput min-h-[180px] max-h-[220px]"
                name="description"
                value={formData.description}
                onChange={(e) => handleInputChange(e)}
              ></textarea>
            </div>
            <div className="category-container">
              <h1 className="text-gray-800 font-medium">Category</h1>
              <div className="tab-container flex items-center gap-4 flex-wrap mt-4">
                {categoryData.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => handleCategoryClick(item)}
                    className={`px-6 py-2 rounded-full cursor-pointer transition-all duration-200 
                    ${
                      selectedCategory === item
                        ? " text-gray-9009 font-medium bg-gray-200 "
                        : "border border-dashed border-gray-300 text-gray-700 hover:bg-gray-0"
                    }`}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="popular-facilites-container">
              <div className="header flex items-center gap-3">
                <h1 className="text-gray-800 font-medium">
                  Popular Facilities{" "}
                </h1>
                <button
                  onClick={() => handleOpenModal("activities")}
                  className="bg-gray-800 rounded-lg w-[40px] h-[40px] flex items-center justify-center cursor-pointer"
                >
                  <Plus className="text-gray-50" />
                </button>
              </div>
              <div className="data-container mt-4 flex flex-wrap gap-3">
                {popularActivities.length > 0 ? (
                  popularActivities.map((item, index) => (
                    <div
                      key={index}
                      className="relative group border border-dashed border-gray-400  px-2 py-2 rounded-full text-sm font-medium flex items-center"
                    >
                      {item}
                      <button
                        onClick={() =>
                          setPopularActivities((prev) =>
                            prev.filter((i) => i !== item)
                          )
                        }
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 ml-2 text-gray-400 hover:text-red-600"
                      >
                        ✕
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="mt-[-16px]  text-gray-500 text-lg">None</p>
                )}
              </div>
            </div>
            {/* Amenities  */}
            <div className="amenities-container">
              <div className="header flex items-center gap-3">
                <h1 className="text-gray-800 font-medium">Amenities</h1>
                <button
                  onClick={() => setIsAmenityModal(true)}
                  className="bg-gray-800 rounded-lg w-[40px] h-[40px] flex items-center justify-center cursor-pointer"
                >
                  <Plus className="text-gray-50" />
                </button>
              </div>
              <div className="data-container mt-4 flex flex-wrap gap-2">
                {formData.amenities.length > 0 ? (
                  <div className="main-container grid grid-cols-3 gap-8">
                    {cleanedAmeneties?.map((item) => {
                      return (
                        <div className="card">
                          <div className="header border-b border-gray-500 w-fit px-4 pb-2">
                            <h1 className="title text-gray-800 font-medium">
                              {item.title}
                            </h1>
                          </div>
                          <div className="contnet-main-container mt-4 space-y-2 text-gray-400">
                            {item?.data?.map((i) => {
                              return (
                                <div className="content-contaier ">
                                  <div className="flex items-center gap-2">
                                    <input
                                      type="checkbox"
                                      checked
                                      className="accent-amber-700"
                                    />
                                    <h1>{i}</h1>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <h1 className="mt-[-10px] text-lg text-gray-500 border border-dashed border-gray-300 px-4 py-1 rounded-full">
                    None
                  </h1>
                )}
              </div>
            </div>
            <div className="price-container">
              <h1 className="text-gray-800 font-medium">Price per night</h1>
              <input
                type="number"
                className="hotelAddInput"
                name="pricePerNight"
                value={formData.pricePerNight}
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            <div className="price-container">
              <h1 className="text-gray-800 font-medium">Rating</h1>
              <input
                type="number"
                className="hotelAddInput"
                placeholder="eg : 4.5"
                name="rating"
                value={formData.rating}
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            <div className="price-container">
              <h1 className="text-gray-800 font-medium">
                Distance from center
              </h1>
              <input
                type="text"
                className="hotelAddInput"
                placeholder="eg : 2km"
                name="distanceFromCenter"
                value={formData.distanceFromCenter}
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            <div className="price-container">
              <h1 className="text-gray-800 font-medium">Location Range </h1>
              {/* <input
                type="text"
                className="hotelAddInput"
                name="locationRange"
                value={formData.locationRange}
                onChange={(e) => handleInputChange(e)}
              /> */}
              <select className="hotelAddInput">
                <option value="" disabled>
                  Select Location Range
                </option>
                <option value="Chinnakanal">Chinnakanal</option>
                <option value="Munnar Town">Munnar Town</option>
                <option value="Devikulam">Devikulam</option>
                <option value="Lockhart Gap">Lockhart Gap</option>
                <option value="Anachal">Anachal</option>
                <option value="Suryanelli">Suryanelli</option>
                <option value="Pallivasal">Pallivasal</option>
                <option value="Mangulam">Mangulam</option>
              </select>
            </div>
            <div className="price-container">
              <h1 className="text-gray-800 font-medium">Location name </h1>
              <input
                type="text"
                className="hotelAddInput"
                name="locationName"
                value={formData.locationName}
                onChange={(e) => handleInputChange(e)}
              />
            </div>
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
                onChange={(e) => handleLocationUrl(e)}
              />
            </div>
            {locationUrl && (
              <div className="map-container">
                <iframe
                  src={locationUrl}
                  frameborder="0"
                  className="w-[100%] border border-gray-400 rounded"
                  allowfullscreen=""
                  loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            )}

            <PoliciesForm policies={policies} setPolicies={setPolicies} />
            {/* <div className="price-container">
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
            </div> */}
          </div>
        </div>
      </section>

      {isAmenityModal && (
        <AmenityFormModal
          setIsAmenityModal={setIsAmenityModal}
          setForm={setFormData}
          formData={formData}
        />
      )}

      {showModal && (
        <HotelAddModal
          type={modalType}
          existingData={popularActivities}
          onClose={() => setShowModal(false)}
          onSave={handleSave}
        />
      )}
    </>
  );
};

export default HotelInformationForm;
