import React, { useState } from "react";
import { UploadCloud, X, Plus } from "lucide-react";

const LiveInformationForm = () => {
  const [previewUrls, setpreviewUrls] = useState([]);
  const [imgFiles, setImgFiles] = useState([]);
  // functions
  //   function to upload a new file or list of files
  function handleFilechange(e) {
    if (imgFiles.length + e.target.files.length > 4) {
      alert("Only 4 images are allowed ");
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
      <section className="mt-6">
        <div className="header">
          <h1 className="font-medium text-lg">Live Information</h1>
        </div>
        <div className="form-container w-[380px] mt-4">
          <form className="space-y-4 relative h-[calc(100vh-120px)]">
            <div className="title-container">
              <h1 className="text-gray-800 font-medium mb-2">Title</h1>

              <input
                type="text"
                className="border border-gray-400 rounded px-3 py-2 w-full outline-none"
              />
            </div>
            <div className="img-container">
              <h1 className="text-gray-800 font-medium mb-2">Image</h1>

              {imgFiles.length !== 0 ? (
                <div className="img-upload-container w-[100%] border border-gray-300 h-[70px] flex items-center gap-3  px-3 rounded mt-2">
                  {imgFiles.map((item) => {
                    const url = URL.createObjectURL(item);
                    return (
                      <div className="relative transition-all duration-300 group w-[80px] h-[60%]">
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
                    <button className="bg-gray-100 cursor-pointer hover:bg-gray-200 w-[80px] h-[60%] rounded-lg flex items-center justify-center">
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
                <div className="img-input-container  relative mt-2 bg-gray-50 border border-gray-200 rounded-lg text-sm px-4 w-[100%]">
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

            <div className="description-container">
              <h1 className="text-gray-800 font-medium mb-2">Description</h1>

              <textarea className="border max-h-[140px] border-gray-400 rounded px-3 py-2 w-full outline-none" />
            </div>
            <div className="input-container">
              <h1 className="text-gray-800 font-medium mb-2">Category</h1>
              <select className="w-[100%] outline-none border rounded border-gray-400 py-2 px-3">
                <option value="" disabled>
                  Select Category
                </option>
                <option value="roadsAndtransportConditions">
                  Roads and Transport conditions
                </option>
                <option value="emergencyAlerts">Emergency Alerts</option>
                <option value="localEventsAndFestivals">
                  Local Events and festivals
                </option>
                <option value="travelRestictionsAndHealthGuidelines">
                  Travel Restrictions & Health Guidelines
                </option>
              </select>
            </div>
            <div className="btn-container flex justify-end absolute bottom-4 right-0">
              <button className="text-white btn-green px-4 py-2 rounded cursor-pointer">
                Update
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default LiveInformationForm;
