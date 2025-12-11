import React, { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import { Link } from "react-router-dom";
import { ChevronRight, Plus } from "lucide-react";
import SeasonalActivitesCard from "./components/SeasonalActivitesCard";
import activityImg1 from "./assets/activityImg1.jpg";
import activityImg2 from "./assets/activityImg2.jpg";
import activityImg3 from "./assets/activityImg3.jpeg";
import axios from "axios";

const allData = [
  {
    img: activityImg1,
    title: "Spring Blossom Festival",
    description:
      "Celebrate the arrival of spring with our vibrant Blossom Festival. Enjoy colorful flower displays, local art exhibits, and traditional performances that capture the beauty and renewal of the season. Visitors can also participate in hands-on workshops, taste seasonal foods, and take guided nature walks through blooming gardens.",
    category: "seasonalActivities",
    id: 1,
  },
  {
    img: activityImg2,
    title: "Winter Wonderland Experience",
    description:
      "Embrace the magic of winter with our enchanting Winter Wonderland Experience. This activity features snow sculpting contests, cozy bonfire gatherings, and ice skating under twinkling lights. Warm up with gourmet hot chocolate and freshly baked treats while enjoying live music and festive decorations throughout the park.",
    category: "regularActivities",
    id: 2,
  },
  {
    img: activityImg3,
    title: "Summer Adventure Challenge",
    description:
      "Join the ultimate Summer Adventure Challenge and explore the great outdoors like never before. From kayaking across crystal-clear lakes to hiking scenic mountain trails, this activity offers something for every thrill-seeker. Guided by experienced instructors, participants can test their endurance, teamwork, and love for adventure in a safe and exhilarating environment.",
    category: "seasonalActivities",
    id: 3,
  },
  {
    img: activityImg1,
    title: "Spring Blossom Festival",
    description:
      "Celebrate the arrival of spring with our vibrant Blossom Festival. Enjoy colorful flower displays, local art exhibits, and traditional performances that capture the beauty and renewal of the season. Visitors can also participate in hands-on workshops, taste seasonal foods, and take guided nature walks through blooming gardens.",
    category: "seasonalActivities",
    id: 1,
  },
  {
    img: activityImg2,
    title: "Winter Wonderland Experience",
    description:
      "Embrace the magic of winter with our enchanting Winter Wonderland Experience. This activity features snow sculpting contests, cozy bonfire gatherings, and ice skating under twinkling lights. Warm up with gourmet hot chocolate and freshly baked treats while enjoying live music and festive decorations throughout the park.",
    category: "regularActivities",
    id: 2,
  },
  {
    img: activityImg3,
    title: "Summer Adventure Challenge",
    description:
      "Join the ultimate Summer Adventure Challenge and explore the great outdoors like never before. From kayaking across crystal-clear lakes to hiking scenic mountain trails, this activity offers something for every thrill-seeker. Guided by experienced instructors, participants can test their endurance, teamwork, and love for adventure in a safe and exhilarating environment.",
    category: "seasonalActivities",
    id: 3,
  },
  {
    img: activityImg1,
    title: "Spring Blossom Festival",
    description:
      "Celebrate the arrival of spring with our vibrant Blossom Festival. Enjoy colorful flower displays, local art exhibits, and traditional performances that capture the beauty and renewal of the season. Visitors can also participate in hands-on workshops, taste seasonal foods, and take guided nature walks through blooming gardens.",
    category: "seasonalActivities",
    id: 1,
  },
  {
    img: activityImg2,
    title: "Winter Wonderland Experience",
    description:
      "Embrace the magic of winter with our enchanting Winter Wonderland Experience. This activity features snow sculpting contests, cozy bonfire gatherings, and ice skating under twinkling lights. Warm up with gourmet hot chocolate and freshly baked treats while enjoying live music and festive decorations throughout the park.",
    category: "regularActivities",
    id: 2,
  },
  {
    img: activityImg3,
    title: "Summer Adventure Challenge",
    description:
      "Join the ultimate Summer Adventure Challenge and explore the great outdoors like never before. From kayaking across crystal-clear lakes to hiking scenic mountain trails, this activity offers something for every thrill-seeker. Guided by experienced instructors, participants can test their endurance, teamwork, and love for adventure in a safe and exhilarating environment.",
    category: "seasonalActivities",
    id: 3,
  },
  {
    img: activityImg1,
    title: "Spring Blossom Festival",
    description:
      "Celebrate the arrival of spring with our vibrant Blossom Festival. Enjoy colorful flower displays, local art exhibits, and traditional performances that capture the beauty and renewal of the season. Visitors can also participate in hands-on workshops, taste seasonal foods, and take guided nature walks through blooming gardens.",
    category: "seasonalActivities",
    id: 1,
  },
  {
    img: activityImg2,
    title: "Winter Wonderland Experience",
    description:
      "Embrace the magic of winter with our enchanting Winter Wonderland Experience. This activity features snow sculpting contests, cozy bonfire gatherings, and ice skating under twinkling lights. Warm up with gourmet hot chocolate and freshly baked treats while enjoying live music and festive decorations throughout the park.",
    category: "regularActivities",
    id: 2,
  },
  {
    img: activityImg3,
    title: "Summer Adventure Challenge",
    description:
      "Join the ultimate Summer Adventure Challenge and explore the great outdoors like never before. From kayaking across crystal-clear lakes to hiking scenic mountain trails, this activity offers something for every thrill-seeker. Guided by experienced instructors, participants can test their endurance, teamwork, and love for adventure in a safe and exhilarating environment.",
    category: "seasonalActivities",
    id: 3,
  },
];

const ActivitiesPage = () => {
  // Auth 
  const apiUrl = import.meta.env.VITE_API_URL;

  // states
  const [data, setData] = useState([])
  const [bookingSelectedTab, setSelectedTab] = useState("Seasonal Activities");
  const [formatedData, setFormatedData] = useState(null);


  // useEffect call's

  useEffect(() => {
    async function fetchActivities() {
      try {
        const response = await axios.post(`${apiUrl}/api/activities-list`, {
          search: "",
          pageNumber: 1,
          category: bookingSelectedTab,
          type: ""
        });
        // console.log("activity list : ", response);
        setData(response.data.data.activities)
      } catch (err) {
        console.error("Error occured while fetching acitvities list : ", err.message || err)
      }
    }
    fetchActivities()
  }, [bookingSelectedTab])

  useEffect(() => {
    handleCardRendering();
  }, [bookingSelectedTab, data]);

  // functions
  const handleCardRendering = () => {
    if (bookingSelectedTab.toLowerCase() == "all") {
      setFormatedData(data);
      return;
    }
    const selectedBtn = bookingSelectedTab.toLowerCase();
    const filteredData = data.filter(
      (item) => item.category.toLowerCase() == selectedBtn
    );
    // console.log("filtered : , ", filteredData)
    setFormatedData(filteredData);
  };


  console.log("filtered data: ", formatedData)
  console.log("data: ", data)

  return (
    <>
      <section className="flex items-start">
        <Sidebar />
        <div className="main-container px-6 mt-4 w-[100%]">
          {/* Breadcrumb  ------------------------------------------  */}
          <div className="breadcrumbs-section flex justify-between">
            <h1 className="flex items-center text-gray-600">
              <Link to="/">Dashboard</Link> <ChevronRight />
              <span className="font-medium text-black">Activites</span>
            </h1>
            <Link
              to={"/activities/addActivity"}
              className="flex items-center text-white btn-green px-4 py-2 rounded cursor-pointer gap-3"
            >
              <Plus /> Add Activity
            </Link>
          </div>
          {/* tabs */}
          <div className="tab-container  w-fit px-2 py-2 border-b-gray-200 bg-gray-100 rounded-full mt-6 flex gap-2 text-gray-400">
            <button
              className={`w-fit px-4 py-2 cursor-pointer ${bookingSelectedTab == "All"
                ? "font-medium bg-white shadow text-black rounded-full"
                : ""
                }`}
              onClick={() => {
                setSelectedTab("All");
              }}
            >
              All
            </button>
            <button
              className={`w-fit px-4 py-2 cursor-pointer ${bookingSelectedTab == "Seasonal Activities"
                ? "font-medium bg-white shadow text-black rounded-full"
                : ""
                }`}
              onClick={() => {
                setSelectedTab("Seasonal Activities");
              }}
            >
              Seasonal Activities
            </button>
            <button
              onClick={() => {
                setSelectedTab("Regular Activities");
              }}
              className={`w-fit px-4 py-2 cursor-pointer  ${bookingSelectedTab == "Regular Activities"
                ? "font-medium bg-white shadow text-black rounded-full"
                : ""
                }`}
            >
              Regular Activities
            </button>
          </div>
          <div className="card-container grid grid-cols-3 gap-4 mt-6 h-[calc(100vh-180px)] overflow-auto">
            <SeasonalActivitesCard formatedData={formatedData} />
          </div>
        </div>
      </section>
    </>
  );
};

export default ActivitiesPage;
