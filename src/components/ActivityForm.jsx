import React, { useState } from "react";
import { UploadCloud } from "lucide-react";

export default function ActivityForm() {
  // const [images, setImages] = useState([null, null, null]);
  // const [mapImage, setMapImage] = useState(null);


  const [formData, setFormData] = useState({
    name: "",
    short_description: "",
    description: "",
    price: "",
    category: "",
    type: "",
    address: "",
    locationURL: "",
    // longitude: "",
    is_featured: false,
  });

  const [images, setImages] = useState([null, null, null]);  // 3 images
  const [mapImage, setMapImage] = useState(null);            // map image


  const activityTypes = ["Seasonal Activities", "Regular Activities"];

  const categories = [
    "Boating & Lake Tours",
    "Ziplines & Adventure Parks",
    "Hot Air Balloon Rides",
    "Flower Gardens & Botanical Parks",
    "Farm & Garden Visits",
    "Factory Tours",
    "Trekking & Nature Trails",
    "Spas & Ayurvedic Centres",
    "Local Cultural Events",
  ];

  // const handleImageChange = (file, index) => {
  //   const copy = [...images];
  //   copy[index] = file;
  //   setImages(copy);
  // };

  const handleChange = (e) => {
    let value = e.target.value;

    // If full iframe code is pasted → extract src="..."
    if (value.includes("<iframe")) {
      const match = value.match(/src="([^"]+)"/);
      if (match && match[1]) {
        value = match[1]; // extracted URL
      }
    }

    setFormData({
      ...formData,
      [e.target.name]: value
    });
  };

  const handleImageChange = (file, index) => {
    let updated = [...images];
    updated[index] = file;
    setImages(updated);
  };

  const handleMapChange = (e) => {
    setMapImage(e.target.files[0]);
  };


  const handleSubmit = async () => {
    const fd = new FormData();

    // Add text fields
    Object.entries(formData).forEach(([key, value]) => {
      fd.append(key, value);
    });

    // Add main 3 images (Postman key: "images")
    images.forEach((img) => {
      if (img) fd.append("images", img);
    });

    // Add map image (Postman key: "locationURL"??)
    if (mapImage) {
      fd.append("locationURL", mapImage);
    }

    // Send request
    try {
      console.log("posting")
      const res = await fetch("https://munnar-backend.onrender.com/api/activity", {
        method: "POST",
        body: fd,
      });

      const data = await res.json();
      console.log("Success:", data);
    } catch (err) {
      console.error(err.message);
    }
  };


  return (
    <div className="bg-white overflow-auto w-[600px] pr-4 h-[calc(100vh-70px)] py-6 space-y-6">

      <h2 className="font-medium text-lg">Activity Information</h2>

      {/* Title */}
      <div className="space-y-1">
        <label className="font-medium">Title</label>
        <input
          type="text"
          name="name"
          className="w-full border rounded-md px-3 py-2 focus:outline-none"
          placeholder="Enter activity title"
          value={formData.name}
          onChange={handleChange}
        />
      </div>

      {/* Short Description */}
      <div className="space-y-1">
        <label className="font-medium">Short Description</label>
        <input
          type="text"
          name="short_description"
          className="w-full border rounded-md px-3 py-2 focus:outline-none"
          placeholder="Write short description"
          value={formData.short_description}
          onChange={handleChange}
        />
      </div>

      {/* Description */}
      <div className="space-y-1">
        <label className="font-medium">Description</label>
        <textarea
          name="description"
          className="w-full border rounded-md px-3 py-2 h-32 focus:outline-none"
          placeholder="Write full description..."
          value={formData.description}
          onChange={handleChange}
        ></textarea>
      </div>

      {/* Price */}
      <div className="space-y-1">
        <label className="font-medium">Price</label>
        <input
          type="number"
          name="price"
          className="w-full border rounded-md px-3 py-2 focus:outline-none"
          placeholder="Enter price"
          value={formData.price}
          onChange={handleChange}
        />
      </div>

      {/* Address */}
      <div className="space-y-1">
        <label className="font-medium">Address</label>
        <input
          type="text"
          name="address"
          className="w-full border rounded-md px-3 py-2 focus:outline-none"
          placeholder="Enter address"
          value={formData.address}
          onChange={handleChange}
        />
      </div>

      {/* Longitude */}
      {/* <div className="space-y-1">
        <label className="font-medium">Longitude</label>
        <input
          type="number"
          name="longitude"
          className="w-full border rounded-md px-3 py-2 focus:outline-none"
          placeholder="Enter longitude"
          value={formData.longitude}
          onChange={handleChange}
        />
      </div> */}

      {/* Location URL (Map) */}
      {/* Location URL */}
      <div className="space-y-1">
        <label className="font-medium">Location URL (Google Maps Embed URL)</label>

        <input
          type="text"
          name="locationURL"
          className="w-full border rounded-md px-3 py-2 focus:outline-none"
          placeholder="Paste Google Maps embed URL"
          value={formData.locationURL}
          onChange={handleChange}
        />

        {/* Preview iframe instead of image */}
        {formData.locationURL && (
          <iframe
            src={formData.locationURL} FF
            className="mt-2 w-full h-40 rounded-md border"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
          ></iframe>
        )}
      </div>



      {/* Category */}
      <div className="space-y-1">
        <label className="font-medium">Category</label>
        <select
          name="type"
          className="w-full border px-3 py-2 rounded-md focus:outline-none"
          value={formData.type}
          onChange={handleChange}
        >
          <option value="">Select category</option>
          {categories.map((item) => (
            <option key={item} value={item}>{item}</option>
          ))}
        </select>
      </div>

      {/* Activity Type */}
      <div className="space-y-1">
        <label className="font-medium">Activity Type</label>
        <select
          name="category"
          className="w-full border px-3 py-2 rounded-md focus:outline-none"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="">Select type</option>
          {activityTypes.map((item) => (
            <option key={item} value={item}>{item}</option>
          ))}
        </select>
      </div>

      {/* Is Featured */}
      <div className="space-y-1">
        <label className="font-medium">Is Featured?</label>
        <select
          name="is_featured"
          className="w-full border px-3 py-2 rounded-md focus:outline-none"
          value={formData.is_featured}
          onChange={handleChange}
        >
          <option value="">Select</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </div>

      {/* 3 Images */}
      <div className="space-y-1">
        <label className="font-medium">Images (3 Required)</label>

        <div className="grid grid-cols-1 gap-4">
          {[0, 1, 2].map((index) => (
            <div
              key={index}
              className="border rounded-md flex flex-col items-center justify-center py-6 cursor-pointer"
            >
              <input
                type="file"
                className="hidden"
                id={`img-${index}`}
                accept="image/*"
                onChange={(e) => handleImageChange(e.target.files[0], index)}
              />
              <label htmlFor={`img-${index}`} className="cursor-pointer text-center">
                <p className="text-blue-600">Upload Image {index + 1}</p>
                <p className="text-xs text-gray-500">JPEG, PNG less than 5MB</p>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Submit */}
      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          className="btn-green cursor-pointer text-white px-5 py-2 rounded-md hover:bg-green-800"
        >
          Submit
        </button>
      </div>
    </div>

  );
}
