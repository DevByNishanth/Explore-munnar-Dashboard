import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronRight, Plus, Search } from "lucide-react";
import PromotionHotelCard from "../components/PromotionHotelCard";
import SelectedHotelsCard from "../components/SelectedHotelsCard";
import axios from "axios";

const HomepageModificationPage = () => {
  // Auth
  const apiUrl = import.meta.env.VITE_API_URL;

  // states
  const [selectedTab, setSelectedTab] = useState("Hotel Collection");
  const [dropdown, setDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [filteredData, setFilteredData] = useState([]);
  // side effects

  useEffect(() => {
    getHotels();
  }, []);

  useEffect(() => {
    if (searchQuery !== "") {
      const filtered = data.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  }, [searchQuery, data]);

  // functions

  async function getHotels() {
    try {
      const response = await axios.post(`${apiUrl}/api/hotels-list`, {
        pageNumber: pageNumber,
      });
      // console.log("hotels : ", response.data.data.hotels)
      setData(response.data.data.hotels);
    } catch (err) {
      console.error("Error occured while fetching hotel list : ", err.message);
    }
  }
  return (
    <>
      <section className="flex items-start">
        <Sidebar />
        <div className="main-container px-6 mt-4 w-[100%]">
          <div className="breadcrumbs-section flex items-center justify-between ">
            <h1 className="flex items-center text-gray-600">
              <Link to="/">Dashboard</Link> <ChevronRight />
              <span className="font-medium text-black">Highlights</span>
            </h1>
          </div>

          {/* tab container ------------------------ */}

          <div className="tab-search-container  mt-6 flex gap-4 items-center justify-between">
            <div className="tab-container  w-fit py-2 rounded-full  text-gray-400">
              <button
                className={`w-fit cursor-pointer ${selectedTab == "Hotel Collection"
                    ? "font-medium  text-black rounded-full"
                    : ""
                  }`}
                onClick={() => {
                  setSelectedTab("Hotel Collection");
                }}
              >
                Hotel Collection
              </button>
              {/* <button
                className={`w-fit px-6 py-2 cursor-pointer ${
                  selectedTab == "Selected Hotels"
                    ? "font-medium bg-white shadow text-black rounded-full"
                    : ""
                }`}
                onClick={() => {
                  setSelectedTab("Selected Hotels");
                }}
              >
                Selected Hotels
              </button> */}
            </div>
            {/* search container -----------------  */}
            <div className="filter-search flex items-center gap-3">
              {selectedTab == "Selected Hotels" && (
                <div className="btn-container  py-2 rounded-lg  border border-gray-400 w-[130px]  relative">
                  <button
                    onClick={() => setDropdown(!dropdown)}
                    className="flex items-center gap-3 px-2 justify-between cursor-pointer w-[100%]"
                  >
                    All{" "}
                    <span>
                      <ChevronDown
                        className={`text-gray-500 ${dropdown ? "rotate-180" : "rotate-0"
                          } transition-all duration-300 `}
                      />
                    </span>
                  </button>
                  {dropdown && (
                    <div className="dropdown-container shadow border border-gray-400 bg-white z-20  absolute top-full left-0 w-[100%]">
                      <button className="px-3 py-2 cursor-pointer hover:bg-gray-100 w-full text-left">
                        All
                      </button>
                      <button className="px-3 py-2 cursor-pointer hover:bg-gray-100 w-full text-left">
                        Promotion
                      </button>
                      <button className="px-3 py-2 cursor-pointer hover:bg-gray-100 w-full text-left">
                        Card view
                      </button>
                    </div>
                  )}
                </div>
              )}

              <div className="search-container relative">
                <input
                  type="text"
                  placeholder="Search hotels by name.."
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                  }}
                  className="border w-[300px] py-2 px-4 text- border-gray-400 rounded-lg  outline-gray-400 "
                />
                <div className="search-icon-container w-fit absolute top-[50%] right-4 translate-y-[-50%]">
                  <Search className="text-gray-400" />
                </div>
              </div>
            </div>
          </div>

          {/* hotel list container ----------------------------  */}

          {selectedTab == "Hotel Collection" ? (
            <PromotionHotelCard data={filteredData} />
          ) : (
            <SelectedHotelsCard />
          )}
        </div>
      </section>
    </>
  );
};

export default HomepageModificationPage;
