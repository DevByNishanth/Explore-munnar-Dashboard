import React, { useEffect, useState, useRef } from "react";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Edit, Plus, Trash } from "lucide-react";
import HotelAddModal from "../components/hotelAddModal";


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

    // ---------------- STATES ----------------
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
        experiences: [],
    });
    const [locationUrl, setLocationUrl] = useState(null);

    const [selectedCategory, setSelectedCategory] = useState(formData.stayType);
    const [oldImages, setOldImages] = useState([]);        // backend images
    const [previewImages, setPreviewImages] = useState([]); // preview URLs
    const [deletedImages, setDeletedImages] = useState([]); // removed images
    const [editIndex, setEditIndex] = useState(null);
    const [showModal, setShowModal] = useState(false);


    const fileInputRef = useRef(null);

    const { id } = useParams();

    // ---------------- FETCH HOTEL ----------------
    useEffect(() => {
        getHotelById();
    }, [id]);

    const getHotelById = async () => {
        try {
            const res = await axios.get(`${apiUrl}/api/hotel/${id}`);
            const hotel = res.data.data;
            console.log("hotel data : ", hotel)
            setFormData({
                name: hotel.name || "",
                images: [],
                description: hotel.description || "",
                pricePerNight: hotel.pricePerNight || "",
                rating: hotel.rating || "",
                distanceFromCenter: hotel.distanceFromCenter || "",
                stayType: hotel.stayType || "",
                locationName: hotel.location || "",
                locationUrl: hotel.location_url || "",
                isFeatured: hotel.isFeatured ? "Yes" : "No",
                amenities: hotel.amenities || [],
                experiences: hotel.experiences || [],
            });

            setOldImages(hotel.images || []);
            setPreviewImages(hotel.images?.map((img) => img.url) || []);
        } catch (error) {
            console.error("Error fetching hotel:", error);
        }
    };

    // ---------------- EDIT IMAGE ----------------
    const handleEditClick = (index) => {
        setEditIndex(index);
        fileInputRef.current.click();
    };

    const handleReplaceImage = (e) => {
        const file = e.target.files[0];
        if (!file || editIndex === null) return;

        const previewUrl = URL.createObjectURL(file);

        // Replace preview
        const updatedPreviews = [...previewImages];
        updatedPreviews[editIndex] = previewUrl;
        setPreviewImages(updatedPreviews);

        // Replace actual image object
        const updatedImages = [...oldImages];
        updatedImages[editIndex] = file;
        setOldImages(updatedImages);

        setEditIndex(null);
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


    // ---------------- DELETE IMAGE ----------------
    const handleDeleteImage = (index) => {
        setDeletedImages((prev) => [...prev, oldImages[index]]);

        setOldImages((prev) => prev.filter((_, i) => i !== index));
        setPreviewImages((prev) => prev.filter((_, i) => i !== index));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
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


    const handleExperienceChange = (e, value) => {
        const isChecked = e.target.checked;

        setFormData((prev) => {
            if (isChecked) {
                // ADD (avoid duplicates)
                if (prev.experiences.some((exp) => exp.name === value)) {
                    return prev;
                }

                return {
                    ...prev,
                    experiences: [...prev.experiences, { name: value }],
                };
            } else {
                // REMOVE
                return {
                    ...prev,
                    experiences: prev.experiences.filter(
                        (exp) => exp.name !== value
                    ),
                };
            }
        });
    };


    console.log("edit data : ", formData)
    // ---------------- UI ----------------
    return (


        <>
            <section className="flex w-full">
                <Sidebar />

                <div className="w-full p-6">
                    <h1 className="text-lg font-medium mb-4">Edit Hotel</h1>

                    <div className="main-container w-[90%] space-y-4 max-h-[calc(100vh-90px)] overflow-auto hide-scrollbar">
                        <div className="input-container">
                            <h1 className="text-gray-800 font-medium mb-3">Images</h1>
                            {/* Hidden file input for edit */}
                            <input
                                type="file"
                                accept="image/*"
                                ref={fileInputRef}
                                className="hidden"
                                onChange={handleReplaceImage}
                            />

                            {/* Image Gallery */}
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

                                        {/* Hover Overlay */}
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
                            </div>
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
                                         ${formData.stayType === item
                                                ? " text-gray-9009 font-medium bg-gray-200 "
                                                : "border border-dashed border-gray-300 text-gray-700 hover:bg-gray-0"
                                            }`}
                                    >
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="category-container">
                            <div className="header flex items-center gap-3">
                                <h1 className="text-gray-800 font-medium">
                                    Popular Facilities{" "}
                                </h1>
                                <button
                                    onClick={() => setShowModal(true)}
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
                                                (exp) => exp.name === item
                                            )}
                                            onChange={(e) => handleExperienceChange(e, item)}
                                        />
                                        <p>{item}</p>
                                    </label>
                                ))}
                            </div>
                        </div>
                        {/* price per night --------------------------------------------------  */}

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

                        {/* --------------ratings contaner ---------------  */}

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
                        {/* <div className="price-container">
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
                        </div> */}
                        <div className="price-container">
                            <h1 className="text-gray-800 font-medium">
                                Location name{" "}
                            </h1>
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
                    </div>
                </div>
            </section>

        </>

    );
};

export default EditHotelPage;
