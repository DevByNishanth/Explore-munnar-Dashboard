import React, { useState } from "react";
import { Plus, UploadCloud, X } from "lucide-react";
import HotelAddModal from "./hotelAddModal";
import AmenityFormModal from "./AmenityFormModal";

const categoryData = [
  "Tents & Camping Grounds",
  "Eco Cottages",
  "Treehouses",
  "Homestays & Guesthouses",
  "Boutique Resorts & Hotels",
];

const HotelInformationForm = () => {
  // states
  const [imgFiles, setImgFiles] = useState([]);
  const [previewUrls, setpreviewUrls] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(""); // "activities" or "amenities"
  const [isAmenityModal, setIsAmenityModal] = useState(false)

  // store selected data
  const [popularActivities, setPopularActivities] = useState([]);
  const [amenities, setAmenities] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  // functions

  const handleOpenModal = (type) => {
    setModalType(type);
    setShowModal(true);
  };

  const handleSave = (selectedItems) => {
    if (modalType === "activities") setPopularActivities(selectedItems);
    if (modalType === "amenities") setAmenities(selectedItems);
    setShowModal(false);
  };

  const handleCategoryClick = (item) => {
    if (selectedCategory === item) {
      setSelectedCategory(null); // unselect if same clicked again
    } else {
      setSelectedCategory(item); // select new one
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
  }

  //   function to remeve a file
  const handleFileRemove = (file) => {
    const removeFile = file.name;
    setImgFiles((prev) => prev.filter((item) => item.name !== removeFile));
    setpreviewUrls((prev) =>
      prev.filter((url, index) => imgFiles[index].name !== removeFile)
    );
  };

  return (
    <>
      <section className="mt-4 px-6">
        <h1 className="font-medium text-lg ">Hotel Information</h1>
        <div className="form-main-container w-[100%] h-[calc(100vh-160px)] overflow-y-auto">
          <div className="form-container mt-4 space-y-4 w-[80%]  pr-6">
            <div className="img-container">
              <h1 className="text-gray-800 font-medium">Image</h1>

              {imgFiles.length !== 0 ? (
                <div className="img-upload-container w-[100%] border border-gray-300 h-[100px] flex items-center gap-3  px-3 rounded mt-2">
                  {imgFiles.map((item) => {
                    const url = URL.createObjectURL(item);
                    return (
                      <div className="relative transition-all duration-300 group w-[80px] h-[80px]">
                        <img
                          src={url}
                          alt="hotel"
                          className="w-full h-full object-cover rounded-md"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-md"></div>
                        <X
                          onClick={() => handleFileRemove(item)}
                          className="text-white absolute cursor-pointer  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
                          size={20}
                        />
                      </div>
                    );
                  })}
                  <div className="button-container relative">
                    <button className="bg-gray-100 cursor-pointer hover:bg-gray-200 w-[80px] h-[80px] rounded-lg flex items-center justify-center">
                      <Plus />
                    </button>
                    <input
                      type="file"
                      multiple
                      onChange={(e) => {
                        handleFilechange(e);
                      }}
                      className="absolute top-0 right-0 left-0 bottom-0 opacity-0 "
                    />
                  </div>
                </div>
              ) : (
                <div className="img-input-container  relative mt-2 bg-gray-50 border border-gray-200 rounded-lg p-4 w-[100%]">
                  <UploadCloud className="text-gray-400 w-9 h-9 m-auto" />
                  <h1 className="text-gray-700 text-center">
                    <span className="text-blue-500">Click to upload</span> or
                    drag and drop.
                  </h1>
                  <h1 className="text-gray-400 text-center">
                    JPEG, JPG, PNG less than 5MB
                  </h1>
                  <input
                    type="file"
                    accept=".jpeg, .jpg, .avif, .png"
                    multiple
                    onChange={(e) => {
                      handleFilechange(e);
                    }}
                    className="absolute top-0 right-0 left-0 bottom-0 opacity-0 "
                  />
                </div>
              )}
            </div>
            <div className="name-container">
              <h1 className="text-gray-800 font-medium">Hotel Name</h1>
              <input type="text" className="hotelAddInput" />
            </div>
            <div className="overview-container">
              <h1 className="text-gray-800 font-medium">Overview</h1>
              <textarea className="hotelAddInput min-h-[180px] max-h-[220px]"></textarea>
            </div>
            <div className="category-container">
              <h1 className="text-gray-800 font-medium">Category</h1>
              <div className="tab-container flex items-center gap-4 flex-wrap mt-4">
                {categoryData.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => handleCategoryClick(item)}
                    className={`px-6 py-2 rounded-full cursor-pointer transition-all duration-200 
              ${selectedCategory === item
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
            <div className="amenities-container">
              <div className="header flex items-center gap-3">
                <h1 className="text-gray-800 font-medium">Amenities</h1>
                <button onClick={() => setIsAmenityModal(true)} className="bg-gray-800 rounded-lg w-[40px] h-[40px] flex items-center justify-center cursor-pointer">
                  <Plus className="text-gray-50" />
                </button>
              </div>
              <div className="data-container mt-4 flex flex-wrap gap-2">
                {amenities.length > 0 ? (
                  amenities.map((item, index) => (
                    <div
                      key={index}
                      className="relative group border border-dashed border-gray-400  px-2 py-2 rounded-full text-sm font-medium flex items-center"
                    >
                      {item}
                      <button
                        onClick={() =>
                          setAmenities((prev) => prev.filter((i) => i !== item))
                        }
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 ml-2 text-gray-600 hover:text-red-600"
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
          </div>
        </div>
      </section>


      {isAmenityModal && <AmenityFormModal setIsAmenityModal={setIsAmenityModal}/>}

      {showModal && (
        <HotelAddModal
          type={modalType}
          onClose={() => setShowModal(false)}
          onSave={handleSave}
        />
      )}

    </>
  );
};

export default HotelInformationForm;
