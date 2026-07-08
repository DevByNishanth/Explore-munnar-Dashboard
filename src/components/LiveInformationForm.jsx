import React, { useState } from "react";
import { UploadCloud, X, Plus, Calendar, Tag, FileText, Image as ImageIcon, Send } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LiveInformationForm = () => {
  const navigate = useNavigate();

  const [previewUrls, setpreviewUrls] = useState([]);
  const [imgFiles, setImgFiles] = useState([]);
  const [images, setImages] = useState([]); // each item = { file, url }
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    expirationDate: ""
  });
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  //   function to remove a file
  function handleFileRemove(fileToRemove) {
    setImages((prev) =>
      prev.filter((item) => item.file.name !== fileToRemove.file.name)
    );
  }

  // Drag and drop handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    const fakeEvent = { target: { files } };
    handleFileChange(fakeEvent);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = new FormData();
    form.append("heading", formData.title);
    form.append("detail", formData.description);
    form.append("category", formData.category);
    form.append("expirationDate", formData.expirationDate);

    images.forEach((img) => {
      form.append("image", img.file);
    });

    try {
      await axios.post(
        "https://munnar-backend.onrender.com/api/news",
        form,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      navigate(`/liveInformation`);
    } catch (error) {
      console.error(error);
      alert("Upload failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <section className="min-h-screenpy-8 px-4">
        <div className="max-w-full  mx-auto">
          {/* Header */}
          <div className="text-center mb-2">
            <div className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-br from-green-800 to-emerald-600 rounded-lg mb-4 shadow-lg">
              <FileText className="text-white w-6 h-6" />
            </div>
            <h1 className="text-lg font-semibold text-gray-800 mb-">
              Live Information
            </h1>
            <p className="text-gray-500 text-sm">
              Share important updates and information with travelers
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-3xl  shadow-xl ">
            <form onSubmit={handleSubmit} className="p-4 space-y-6 max-h-[calc(100vh-260px)] overflow-auto">

              {/* TITLE */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-gray-700 font-semibold">
                  <FileText className="w-4 h-4 text-emerald-800" />
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter a descriptive title..."
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-green-900 focus:ring-2 focus:ring-green-700 transition-all duration-200 bg-gray-50 hover:bg-white"
                />
              </div>

              {/* IMAGE UPLOAD */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-gray-700 font-semibold">
                  <ImageIcon className="w-4 h-4 text-emerald-800" />
                  Images
                  {/* <span className="text-xs font-normal text-gray-400 ml-auto">
                    Max 4 images
                  </span> */}
                </label>

                {images.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {images.map((item) => (
                      <div
                        key={item.file.name}
                        className="relative group aspect-square rounded-xl overflow-hidden border-2 border-gray-200 hover:border-green-400 transition-all duration-200"
                      >
                        <img
                          src={item.url}
                          alt="preview"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-200" />
                        <button
                          type="button"
                          onClick={() => handleFileRemove(item)}
                          className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-red-600 hover:scale-110"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}

                    {images.length < 4 && (
                      <label className="relative aspect-square rounded-xl border-2 border-dashed border-gray-300 hover:border-green-900 hover:bg-green-500 transition-all duration-200 cursor-pointer flex flex-col items-center justify-center gap-2 group">
                        <Plus className="w-6 h-6 text-gray-400 group-hover:text-green-900 transition-colors" />
                        <span className="text-xs text-gray-400 group-hover:text-green-900 transition-colors">
                          Add Image
                        </span>
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={handleFileChange}
                          className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                      </label>
                    )}
                  </div>
                ) : (
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`relative rounded-2xl border-2 border-dashed transition-all duration-200 p-8 text-center ${isDragging
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-300 hover:border-green-400 hover:bg-gray-50'
                      }`}
                  >
                    <div className="flex flex-col items-center gap-3">
                      <div className={`p-4 rounded-full transition-colors ${isDragging ? 'bg-green-200' : 'bg-gray-100'
                        }`}>
                        <UploadCloud className={`w-8 h-8 ${isDragging ? 'text-emerald-800' : 'text-gray-400'
                          }`} />
                      </div>
                      <div>
                        <p className="text-gray-600 font-medium">
                          <span className="text-green-800 font-semibold">Click to upload</span> or drag & drop
                        </p>
                        <p className="text-sm text-gray-400 mt-1">
                          JPEG, PNG, WEBP, AVIF
                        </p>
                      </div>
                    </div>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleFileChange}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                  </div>
                )}
              </div>

              {/* DESCRIPTION */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-gray-700 font-semibold">
                  <FileText className="w-4 h-4 text-emerald-800" />
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Provide detailed information..."
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-green-900 focus:ring-2 focus:ring-green-700 transition-all duration-200 bg-gray-50 hover:bg-white resize-none max-h-[200px]"
                />
              </div>

              {/* CATEGORY */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-gray-700 font-semibold">
                  <Tag className="w-4 h-4 text-emerald-800" />
                  Category
                </label>
                <div className="relative">
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-green-900 focus:ring-2 focus:ring-green-700 transition-all duration-200 bg-gray-50 hover:bg-white appearance-none cursor-pointer"
                  >
                    <option value="" disabled>
                      Select a category
                    </option>
                    <option value="Roads And Transport Conditions">
                      Roads And Transport Conditions
                    </option>
                    <option value="Emergency Alerts">Emergency Alerts</option>
                    <option value="Local Events & Festivals">
                      Local Events & Festivals
                    </option>
                    <option value="Travel Restrictions & Health Guidelines">
                      Travel Restrictions & Health Guidelines
                    </option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* EXPIRATION DATE */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-gray-700 font-semibold">
                  <Calendar className="w-4 h-4 text-emerald-800" />
                  Expiration Date
                </label>
                <input
                  type="date"
                  name="expirationDate"
                  value={formData.expirationDate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-green-900 focus:ring-2 focus:ring-green-700 transition-all duration-200 bg-gray-50 hover:bg-white"
                />
              </div>

              {/* SUBMIT BUTTON */}

            </form>
            <div className="pt-4">
              <button
                onClick={handleSubmit}
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 px-6 rounded-xl text-white font-semibold text-lg flex items-center justify-center gap-2 transition-all duration-300 ${isSubmitting
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-emerald-800 to-emerald-700 hover:from-green-800 hover:to-emerald-900 shadow-lg hover:shadow-xl hover:-translate-y-0.5'
                  }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Publishing...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Publish Information
                  </>
                )}
              </button>
            </div>
          </div>

        </div>
      </section>
    </>
  );
};

export default LiveInformationForm;