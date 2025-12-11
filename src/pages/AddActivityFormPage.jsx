import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { Link, useSearchParams } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import ActivityForm from "../components/ActivityForm";
import axios from "axios";
import ErrorPopup from "../components/ErrorPopup";
const AddActivityFormPage = () => {
  // Auth 
  const apiUrl = import.meta.env.VITE_API_URL

  // De-structuring url 

  const [searchParams] = useSearchParams();
  const id = searchParams.get('id')
  const editMode = searchParams.get("editMode")

  // states 

  const [data, setData] = useState({})

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


  // functions 

  async function fetchData() {
    if (editMode !== "true") return
    try {
      const response = await axios.get(`${apiUrl}/api/activity/${id}`);
      console.log("form data response : ", response.data.data)
      setData(response.data.data)
    } catch (err) {
      console.error("Error occured while fetching data's for edit form : ", err.message)
    }
  }

  // handling side effects 

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    if (editMode == "true" && data && Object.keys(data).length > 0) {
      setFormData({
        name: data.name || "",
        short_description: data.short_description || "",
        description: data.description || "",
        price: data.price || "",
        category: data.category || "",
        type: data.type || "",
        address: data.address || "",
        locationURL: data.location_url || "",
        is_featured: data.is_featured || false
      })
    }
  }, [data, editMode])


  return (
    <>
      <section className="flex items-start">
        <Sidebar />
        <div className="main-container px-6 mt-4 w-[100%]">
          {/* Breadcrumb  ------------------------------------------  */}
          <div className="breadcrumbs-section flex justify-between">
            <h1 className="flex items-center text-gray-600">
              <Link to="/activities">Activities</Link> <ChevronRight />
              <span className="font-medium text-black">Add Activity</span>
            </h1>
          </div>
          <ActivityForm formData={formData} setFormData={setFormData} editMode={editMode} id={id}/>
        </div>

      </section>
      
    </>
  );
};

export default AddActivityFormPage;
