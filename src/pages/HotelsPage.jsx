import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { ChevronRight, Plus } from "lucide-react";
import AddedHotels from "../components/AddedHotels";
import { Link } from "react-router-dom";
import axios from "axios";

const HotelsPage = () => {
  // Auth 
  const apiUrl = import.meta.env.VITE_API_URL

  // states 
  const [searchQuery, setSearchQuery] = useState("")
  const [data, setData] = useState([])
  const [pageNumber, setPageNumber] = useState(1)
  const [filteredData, setFilteredData] = useState([])

  // side effects 
  useEffect(() => {
    getHotels()
  }, [])

  console.log("filtered data : ", filteredData)

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
        "pageNumber": pageNumber
      });
      // console.log("hotels : ", response.data.data.hotels)
      setData(response.data.data.hotels)
    } catch (err) {
      console.error("Error occured while fetching hotel list : ", err.message)
    }
  }

  return (
    <>
      <section className="flex w-[100%]">
        <Sidebar />
        <div className="hotelPage-container pt-4 bg-white px-6 w-[100%]">
          <div className="breadcrumb-section ">
            <div className="w-[100%] flex items-center justify-between">
              <h1 className="flex items-center text-gray-600">
                <Link to="/">Dashboard</Link> <ChevronRight />
                <span className="font-medium text-black">Hotels</span>
              </h1>
              <Link
                to={"/hotels/addHotels"}
                className="text-white px-4 py-2 rounded-md cursor-pointer btn-green flex items-center gap-2"
              >
                <Plus />
                Add Hotel
              </Link>
            </div>
            <div className="flex items-center justify-between mt-2">
              <h1 className="font-medium text-[#333333] text-xl mt-4">
                Manage Your Hotels
              </h1>
              <div className="search-container border border-gray-400 rounded-lg">
                <input type="text" onChange={(e) => { setSearchQuery(e.target.value) }} placeholder="Search hotels by name.." className="px-4 py-2 outline-none" />
              </div>
            </div>
          </div>
          {/* hotel listing  */}
          <AddedHotels data={filteredData} />
        </div>
      </section>
    </>
  );
};

export default HotelsPage;
