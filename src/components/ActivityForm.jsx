import React, { useState } from "react";
import { UploadCloud } from "lucide-react";

export default function ActivityForm() {
  const [images, setImages] = useState([null, null, null]);
  const [mapImage, setMapImage] = useState(null);

  const activityTypes = ["Seasonal Activity", "Regular Activity"];

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

  const handleImageChange = (file, index) => {
    const copy = [...images];
    copy[index] = file;
    setImages(copy);
  };

  return (
    <div className=" bg-white overflow-auto w-[600px] pr-4 h-[calc(100vh-70px)] py-6 space-y-6">
      <h2 className="font-medium text-lg">Activity Information</h2>

      {/* Title */}
      <div className="space-y-1">
        <label className="font-medium">Title</label>
        <input
          type="text"
          className="w-full border rounded-md px-3 py-2 focus:outline-none"
          placeholder="Enter activity title"
        />
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
              <label
                htmlFor={`img-${index}`}
                className="cursor-pointer text-center"
              >
                <UploadCloud className="mx-auto mb-2" />
                <p className="text-blue-600">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-gray-500">
                  JPEG, JPG, PNG less than 5MB
                </p>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Overview */}
      <div className="space-y-1">
        <label className="font-medium">Overview</label>
        <textarea
          className="w-full border rounded-md px-3 py-2 h-32 focus:outline-none"
          placeholder="Write overview..."
        ></textarea>
      </div>

      {/* Map Image */}
      <div className="space-y-1">
        <label className="font-medium">Location (Map Image)</label>

        <div className="border rounded-md flex flex-col items-center justify-center py-6 cursor-pointer">
          <input
            type="file"
            className="hidden"
            id="mapImg"
            accept="image/*"
            onChange={(e) => setMapImage(e.target.files[0])}
          />
          <label htmlFor="mapImg" className="cursor-pointer text-center">
            <UploadCloud className="mx-auto mb-2" />
            <p className="text-blue-600">Click to upload or drag and drop</p>
            <p className="text-xs text-gray-500">Upload map image</p>
          </label>
        </div>
      </div>

      {/* Activity Type */}
      <div className="space-y-1">
        <label className="font-medium">Activity Type</label>
        <select className="w-full border px-3 py-2 rounded-md focus:outline-none">
          <option value="">Select</option>
          {activityTypes.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
      </div>

      {/* Category */}
      <div className="space-y-1">
        <label className="font-medium">Category</label>
        <select className="w-full border px-3 py-2 rounded-md focus:outline-none">
          <option value="">Select category</option>
          {categories.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
      </div>

      {/* Button */}
      <div className="flex justify-end">
        <button className="btn-green cursor-pointer text-white px-5 py-2 rounded-md hover:bg-green-800">
          Submit
        </button>
      </div>
    </div>
  );
}
