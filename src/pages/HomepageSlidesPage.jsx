import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { Link } from "react-router-dom";
import { ChevronRight, Plus, Trash2, X, UploadCloud, Image as ImageIcon, Check, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import axios from "axios";
import ErrorPopup from "../components/ErrorPopup";

const HomepageSlidesPage = () => {
  const apiUrl = import.meta.env.VITE_API_URL;

  // State Management
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  // Form fields
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [position, setPosition] = useState(0);
  const [isActive, setIsActive] = useState(true);

  // Delete Confirmation State
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [slideToDelete, setSlideToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Toast State
  const [toast, setToast] = useState(null);

  // Auto-dismiss toast after 3.5s
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 3500);
    return () => clearTimeout(timer);
  }, [toast]);

  // Drag and Drop State
  const [isDragging, setIsDragging] = useState(false);

  // Fetch Slides
  const fetchSlides = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${apiUrl}/api/homepage-slides`);
      if (response.data && response.data.success) {
        // Sort slides by position to display in order
        const sorted = (response.data.data || []).sort((a, b) => (a.position || 0) - (b.position || 0));
        setSlides(sorted);
      } else {
        setErrorMsg("Failed to fetch slides");
      }
    } catch (error) {
      console.error("Error fetching homepage slides:", error);
      setErrorMsg("Error occurred while fetching slides: " + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSlides();
  }, [apiUrl]);

  // Handle image file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate type
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/avif"];
    if (!allowedTypes.includes(file.type)) {
      setErrorMsg("Only image formats allowed (JPEG, JPG, PNG, WEBP, AVIF)");
      return;
    }

    // Validate size (max 5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      setErrorMsg("Image size must be less than 5MB");
      return;
    }

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  // Drag & drop handlers
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

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const fakeEvent = { target: { files: [file] } };
      handleFileChange(fakeEvent);
    }
  };

  // Reset form fields
  const resetForm = () => {
    setImageFile(null);
    setImagePreview("");
    setTitle("");
    setSubtitle("");
    setPosition(slides.length);
    setIsActive(true);
  };

  // Submit slide
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageFile) {
      setErrorMsg("Please select or drag an image file.");
      return;
    }

    setSubmitting(true);
    const formData = new FormData();
    formData.append("image", imageFile);
    // formData.append("title", title);
    // formData.append("subtitle", subtitle);
    // formData.append("position", position);
    // formData.append("is_active", isActive);

    try {
      const response = await axios.post(`${apiUrl}/api/homepage-slides`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200 || response.status === 201) {
        setShowAddModal(false);
        resetForm();
        fetchSlides();
      } else {
        setErrorMsg("Failed to upload slide.");
      }
    } catch (error) {
      console.error("Error creating homepage slide:", error);
      setErrorMsg("Upload failed: " + (error.response?.data?.message || error.message));
    } finally {
      setSubmitting(false);
    }
  };

  // Trigger Delete confirmation
  const confirmDelete = (slide) => {
    setSlideToDelete(slide);
    setShowDeleteConfirm(true);
  };

  // Execute slide deletion
  const handleDelete = async () => {
    if (!slideToDelete) return;
    setIsDeleting(true);

    try {
      const response = await axios.delete(`${apiUrl}/api/homepage-slides/${slideToDelete.id}`);
      if (response.status === 200 && response.data.success) {
        setShowDeleteConfirm(false);
        setSlideToDelete(null);
        setToast({ type: "success", message: "Slide deleted successfully." });
        fetchSlides();
      } else {
        setToast({ type: "error", message: "Failed to delete slide." });
      }
    } catch (error) {
      console.error("Error deleting homepage slide:", error);
      setToast({ type: "error", message: "Delete failed: " + (error.response?.data?.message || error.message) });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <section className="flex items-start min-h-screen ">
        <Sidebar />

        {/* Main Content Area */}
        <div className="main-container px-6 mt-4 w-full max-h-screen overflow-auto pb-10">

          {/* Breadcrumbs & Action Header */}
          <div className="breadcrumbs-section flex items-center justify-between">
            <div className="flex items-center gap-2 text-gray-600">
              <Link to="/">Dashboard</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="font-medium text-black">Homepage Slides</span>
            </div>

            <button
              onClick={() => {
                resetForm();
                setShowAddModal(true);
              }}
              className="btn-green text-white py-2 rounded px-4 flex items-center gap-2 cursor-pointer shadow hover:opacity-90 transition-all"
            >
              <Plus className="w-5 h-5" />
              Add Slide
            </button>
          </div>

          {/* Page Info */}
          <div className="mt-4 mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Manage Homepage Slides</h1>
            <p className="text-gray-500 text-sm">
              Upload, sort, and manage the slides appearing on the website's homepage.
            </p>
          </div>

          {/* Slides Grid or Loading */}
          {loading ? (
            <div className="flex flex-col items-center justify-center h-[50vh] ">
              <div className="loader"></div>
              <p className="text-gray-500 mt-4 font-medium animate-pulse">Loading slides...</p>
            </div>
          ) : slides.length === 0 ? (
            <div className="bg-white rounded-2xl  shadow-sm border border-gray-200 p-12 text-center max-w-2xl mx-auto mt-8">
              <div className="inline-flex mt-3 items-center justify-center w-16 h-16 bg-gray-100 text-gray-400 rounded-full mb-4">
                <ImageIcon className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">No slides found</h3>
              <p className="text-gray-500 mt-1">
                You haven't uploaded any homepage slides yet. Add a new slide to get started.
              </p>
              <button
                onClick={() => {
                  resetForm();
                  setShowAddModal(true);
                }}
                className="mt-6 btn-green mb-3 text-white py-2 px-6 rounded-lg cursor-pointer hover:opacity-90 inline-flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Upload First Slide
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 h-[500px]  overflow-auto mt-4 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {slides.map((slide) => (
                <div
                  key={slide.id}
                  className="bg-white rounded-2xl  h-[500px]  overflow-hidden border border-gray-400 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col group relative"
                >

                  {/* Slide Image Container */}
                  <div className="relative h-full  w-full  bg-gray-100 overflow-hidden">
                    <img
                      src={slide.imageUrl}
                      alt={slide.title || "Homepage Slide"}
                      className="w-[100%] h-[100%] object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Delete Icon */}
                    <button
                      onClick={() => confirmDelete(slide)}
                      className="absolute top-3 right-3 z-10 bg-white/90 hover:bg-red-600 hover:text-white text-red-600 p-2 rounded-full shadow-md transition-all duration-200 hover:scale-110 cursor-pointer"
                      title="Delete Slide"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Slide Details */}
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div className="mt-4 pt-3 border-t border-gray-100 text-xs text-gray-400">
                      <span>Created: {new Date(slide.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Add Slide Modal */}
      {showAddModal && (
        <>
          <div className="fixed inset-0 bg-black/10 backdrop-blur-xs z-50 transition-opacity"></div>
          <div className="fixed inset-0  overflow-y-auto z-50 flex items-center justify-center p-4 ">
            <section className="w-[70%] bg-white rounded-2xl shadow-2xl border border-gray-400 overflow-hidden transform transition-all duration-300">

              {/* Modal Header */}
              <header className="px-6 py-4 bg-gray-200 border-b border-gray-100 flex items-center justify-between">
                <h2 className="font-bold text-lg text-gray-800 flex items-center gap-2">
                  <ImageIcon className="w-5 h-5 text-emerald-800" />
                  Add Homepage Slide
                </h2>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </header>

              {/* Modal Form */}
              <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">

                {/* Image Upload Zone */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Slide Image <span className="text-red-500">*</span>
                  </label>

                  {imagePreview ? (
                    <div className="relative aspect-video rounded-xl overflow-hidden border border-gray-300 shadow-inner group">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button
                          type="button"
                          onClick={() => {
                            setImageFile(null);
                            setImagePreview("");
                          }}
                          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition-all flex items-center gap-1 shadow-lg hover:scale-105"
                        >
                          <X className="w-4 h-4" /> Remove Image
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      className={`relative rounded-xl border-2 border-dashed transition-all duration-200 p-6 text-center cursor-pointer ${isDragging
                        ? "border-emerald-500 bg-emerald-50/50"
                        : "border-gray-300 hover:border-emerald-700 hover:bg-gray-50"
                        }`}
                    >
                      <div className="flex flex-col items-center gap-2">
                        <div className={`p-3 rounded-full transition-colors ${isDragging ? "bg-emerald-100" : "bg-gray-100"}`}>
                          <UploadCloud className={`w-8 h-8 ${isDragging ? "text-emerald-800" : "text-gray-400"}`} />
                        </div>
                        <div>
                          <p className="text-gray-700 text-sm font-medium">
                            <span className="text-emerald-800 font-semibold">Click to upload</span> or drag & drop
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            Supports JPEG, PNG, WEBP, AVIF (Max 5MB)
                          </p>
                        </div>
                      </div>
                      <input
                        type="file"
                        required
                        accept="image/*"
                        onChange={handleFileChange}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />
                    </div>
                  )}
                </div>

                {/* Title */}
                {/* <div className="space-y-1">
                  <label className="block text-sm font-semibold text-gray-700">Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter slide main title (optional)"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none focus:border-emerald-800 focus:ring-1 focus:ring-emerald-800 transition bg-gray-50 hover:bg-white"
                  />
                </div> */}

                {/* Subtitle */}
                {/* <div className="space-y-1">
                  <label className="block text-sm font-semibold text-gray-700">Subtitle</label>
                  <input
                    type="text"
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    placeholder="Enter slide subtitle (optional)"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none focus:border-emerald-800 focus:ring-1 focus:ring-emerald-800 transition bg-gray-50 hover:bg-white"
                  />
                </div> */}

                {/* Position & Active Status Grid */}
                {/* <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-sm font-semibold text-gray-700">Position</label>
                    <input
                      type="number"
                      min="0"
                      value={position}
                      onChange={(e) => setPosition(parseInt(e.target.value) || 0)}
                      placeholder="Sort order number"
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none focus:border-emerald-800 focus:ring-1 focus:ring-emerald-800 transition bg-gray-50 hover:bg-white"
                    />
                  </div>

                  <div className="flex items-center mt-6 pl-2">
                    <label className="inline-flex items-center gap-3 cursor-pointer group">
                      <div className="relative">
                        <input
                          type="checkbox"
                          checked={isActive}
                          onChange={(e) => setIsActive(e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-2 peer-focus:ring-emerald-300 dark:peer-focus:ring-emerald-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-800"></div>
                      </div>
                      <span className="text-sm font-semibold text-gray-700 group-hover:text-black transition-colors">
                        Active Status
                      </span>
                    </label>
                  </div>
                </div> */}

                {/* Actions Footer */}
                <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-5 py-2 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition cursor-pointer text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-5 py-2 btn-green text-white font-medium rounded-lg shadow hover:opacity-90 transition cursor-pointer text-sm flex items-center gap-1.5 disabled:opacity-50"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      "Upload Slide"
                    )}
                  </button>
                </div>
              </form>
            </section>
          </div>
        </>
      )}

      {/* Delete Confirmation Popup */}
      {showDeleteConfirm && slideToDelete && (
        <>
          <div className="fixed inset-0 bg-black/55 z-[60]"></div>
          <section className="bg-white w-[35%] pb-6  fixed top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 rounded-2xl z-[70] shadow-2xl border border-gray-100 overflow-hidden">
            <header className="py-4 bg-gray-100 flex px-3 items-center justify-between border-b border-gray-100">
              <h1 className="font-bold text-lg text-gray-800">Delete Slide</h1>
              <X
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setSlideToDelete(null);
                }}
                className="cursor-pointer text-gray-400 hover:text-gray-600 transition"
              />
            </header>

            <div className="my-5 flex flex-col mt-2 items-center">
              <div className="img-container bg-amber-50 flex items-center justify-center rounded-full h-16 w-16 mb-4 border border-amber-100 text-amber-800">
                <Trash2 className="h-8 w-8" />
              </div>
              <h2 className="text-lg font-bold text-gray-800 text-center">
                Are you sure?
              </h2>
              <p className="text-gray-500 text-sm text-center mt-2 px-4">
                This will delete the homepage slide permanently. This action cannot be undone.
              </p>
            </div>

            <div className="btn-container flex items-center justify-end px-4  gap-3 mt-6">
              <button
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setSlideToDelete(null);
                }}
                disabled={isDeleting}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg w-1/2 py-2 px-4 cursor-pointer text-sm transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="bg-amber-900 hover:bg-amber-950 text-white font-medium rounded-lg w-1/2 py-2 px-4 cursor-pointer text-sm transition flex items-center justify-center gap-1.5"
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  "Delete"
                )}
              </button>
            </div>
          </section>
        </>
      )}

      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed top-5 right-5 z-[100] flex items-center gap-2.5 px-4 py-3 rounded-xl shadow-lg text-white text-sm font-medium ${toast.type === "success" ? "bg-emerald-600" : "bg-red-600"}`}
        >
          {toast.type === "success" ? (
            <CheckCircle2 className="w-5 h-5 shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 shrink-0" />
          )}
          <span>{toast.message}</span>
          <button
            onClick={() => setToast(null)}
            className="ml-2 text-white/80 hover:text-white transition-colors cursor-pointer"
            title="Dismiss"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Error Popup */}
      {errorMsg && (
        <ErrorPopup
          errMessage={errorMsg}
          onClose={() => setErrorMsg("")}
        />
      )}
    </>
  );
};

export default HomepageSlidesPage;
