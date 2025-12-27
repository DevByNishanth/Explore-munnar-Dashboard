import React, { useState } from "react";
import { UploadCloud, X, Plus } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LiveInformationForm = () => {
  const navigate = useNavigate()

  const [previewUrls, setpreviewUrls] = useState([]);
  const [imgFiles, setImgFiles] = useState([]);
  const [images, setImages] = useState([]); // each item = { file, url }
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // functions
  //   function to upload a new file or list of files
  const handleFileChange = (e) => {
    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
      "image/avif",
    ];

    const selectedFiles = Array.from(e.target.files);

    if (images.length + selectedFiles.length > 4) {
      alert("Only 4 images allowed");
      return;
    }

    const validFiles = selectedFiles.filter((file) =>
      allowedTypes.includes(file.type)
    );

    if (validFiles.length === 0) {
      alert("Only image formats allowed (JPEG, JPG, PNG, WEBP, AVIF)");
      return;
    }

    const mapped = validFiles.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));

    setImages((prev) => [...prev, ...mapped]);
  };

  //   function to remeve a file
  function handleFileRemove(fileToRemove) {
    setImages((prev) =>
      prev.filter((item) => item.file.name !== fileToRemove.file.name)
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("heading", formData.title);
    form.append("detail", formData.description);
    form.append("category", formData.category);

    images.forEach((img) => {
      form.append("image", img.file);
    });

    try {
      const res = await axios.post(
        "https://munnar-backend.onrender.com/api/news",
        form,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      navigate(`/liveInformation`)
      // console.log(res.data);
    } catch (error) {
      console.error(error);
      alert("Upload failed");
    }
  };

  return (
    <>
      <section className="mt-6">
        <div className="header">
          <h1 className="font-medium text-lg">Live Information</h1>
        </div>

        <div className="form-container w-[380px] mt-4">
          <form
            className="space-y-4 relative h-[calc(100vh-120px)]"
            onSubmit={handleSubmit}
          >
            {/* TITLE */}
            <div className="title-container">
              <h1 className="text-gray-800 font-medium mb-2">Title</h1>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="border border-gray-400 rounded px-3 py-2 w-full outline-none"
              />
            </div>

            {/* IMAGE UPLOAD */}
            <div className="img-container">
              <h1 className="text-gray-800 font-medium mb-2">Image</h1>

              {images.length > 0 ? (
                <div className="img-upload-container w-full border border-gray-300 h-[70px] flex items-center gap-3 px-3 rounded mt-2">
                  {images.map((item) => (
                    <div
                      key={item.file.name}
                      className="relative group w-[80px] h-[60%]"
                    >
                      <img
                        src={item.url}
                        alt="preview"
                        className="w-full h-full object-cover rounded-md"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition"></div>

                      <X
                        onClick={() => handleFileRemove(item)}
                        className="absolute text-white cursor-pointer top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100"
                        size={20}
                      />
                    </div>
                  ))}

                  {/* ADD MORE BUTTON */}
                  {/* <div className="relative">
                    <button
                      type="button"
                      className="bg-gray-100 hover:bg-gray-200 w-[80px] h-[60%] rounded-lg flex justify-center items-center"
                    >
                      <Plus />
                    </button>
                    <input
                      type="file"
                      multiple
                      onChange={handleFileChange}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                  </div> */}
                </div>
              ) : (
                <div className="img-input-container relative mt-2 bg-gray-50 border border-gray-200 rounded-lg text-sm px-4 w-full text-center py-4">
                  <UploadCloud className="text-gray-400 w-9 h-9 mx-auto" />
                  <p>
                    <span className="text-blue-500">Click to upload</span> or
                    drag & drop
                  </p>
                  <p className="text-gray-400">JPEG, PNG, WEBP, AVIF</p>

                  <input
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </div>
              )}
            </div>

            {/* DESCRIPTION */}
            <div className="description-container">
              <h1 className="text-gray-800 font-medium mb-2">Description</h1>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="border max-h-[140px] border-gray-400 rounded px-3 py-2 w-full outline-none"
              />
            </div>

            {/* CATEGORY */}
            <div className="input-container">
              <h1 className="text-gray-800 font-medium mb-2">Category</h1>

              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full outline-none border rounded border-gray-400 py-2 px-3"
              >
                <option value="" disabled>
                  Select Category
                </option>
                <option value="Roads And Transport Conditions">
                  Roads And Transport conditions
                </option>
                <option value="Emergency Alerts">Emergency Alerts</option>
                <option value="Local Events & Festivals">
                  Local Events and Festivals
                </option>
                <option value="Travel Restrictions & Health Guidelines">
                  Travel Restrictions & Health Guidelines
                </option>
                <option value="Travel Restrictions & Health Guidelines">
                  Travel Restrictions & Health Guidelines
                </option>
              </select>
            </div>

            {/* SUBMIT */}
            <div className="btn-container flex justify-end absolute bottom-4 right-0">
              <button className="text-white b px-4 py-2 btn-green rounded cursor-pointer">
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
