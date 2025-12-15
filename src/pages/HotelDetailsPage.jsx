import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { Edit, Pencil, Trash, Trash2 } from "lucide-react";
import HotelPrevImgComponent from "./HotelPrevImgComponent";
import HotelOverviewComponent from "./HotelOverviewComponent";
import HotelPopularActivities from "../components/HotelPopularActivities";
import HotelAllAmenities from "../components/HotelAllAmenities";
import BusTimingsActionPopup from "../components/BusTimingsActionPopup";
import LoadingPage from "../pages/LoadingPage";
import axios from "axios";

const description =
  "When Euclidean space is represented by a Cartesian coordinate system in analytic geometry, Euclidean distance satisfies the Pythagorean relation: the squared distance between two points equals the sum of squares of the difference in each coordinate between the points. When Euclidean space is represented by a Cartesian coordinate system in analytic geometry, Euclidean distance satisfies the Pythagorean relation: the squared distance between two points equals the sum of squares of the difference in each coordinate between the points.When Euclidean space is represented by a Cartesian coordinate system in analytic geometry, Euclidean distance satisfies the Pythagorean relation: the squared distance between two points equals the sum of squares of the difference in each coordinate between the points.When Euclidean space is represented by a Cartesian coordinate system in analytic geometry, Euclidean distance satisfies the Pythagorean relation: the squared distance between two points equals the sum of squares of the difference in each coordinate between the points.When Euclidean space is represented by a Cartesian coordinate system in analytic geometry, Euclidean distance satisfies the Pythagorean relation: the squared distance between two points equals the sum of squares of the difference in each coordinate between the points.When Euclidean space is represented by a Cartesian coordinate system in analytic geometry, Euclidean distance satisfies the Pythagorean relation: the squared distance between two points equals the sum of squares of the difference in each coordinate between the points.When Euclidean space is represented by a Cartesian coordinate system in analytic geometry, Euclidean distance satisfies the Pythagorean relation: the squared distance between two points equals the sum of squares of the difference in each coordinate between the points.";

const HotelDetailsPage = () => {
  // Auth and tokens
  const apiUrl = import.meta.env.VITE_API_URL;

  // router dom elements
  const navigate = useNavigate();

  // params
  const { id } = useParams();

  // states
  const [isDelete, setIsDelete] = useState(false);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // functions
  function onclose() {
    setIsDelete(false);
  }

  // Get hotels
  async function handleFetchHotels() {
    try {
      setIsLoading(true);
      const res = await axios.get(`${apiUrl}/api/hotel/${id}`);
      // console.log("hotel data fetched : ", res.data.data);
      setData(res.data.data);
      setIsLoading(false);
    } catch (err) {
      console.error("error occured while fetching hotel data : ", err.message);
      setIsLoading(false);
    }
  }

  // Delete Hotel
  const handleDelete = async () => {
    try {
      const response = await axios.delete(`${apiUrl}/api/hotel/${id}`);
      navigate("/hotels");
      window.location.reload()
    } catch (err) {
      console.error("Error occured while deleting hotel : ", err.message);
    }
  };

  // side effects
  useEffect(() => {
    handleFetchHotels();
  }, []);

  return (
    <>
      <section className="flex ">
        <Sidebar />
        <div className="main-container mt-4 mx-6 w-[100%]">
          <div className="header flex items-center justify-between">
            <h1 className="font-medium text-[#333333] text-xl">{data?.name}</h1>
            <div className="button-container flex gap-2 items-center">
              <Link
                to={`/hotels/editHotel/${id}`}
                className="btn-green flex items-center gap-2 text-white px-4 py-2 rounded cursor-pointer"
              >
                <Edit className="w-5 h-5" /> Edit
              </Link>
              <button
                onClick={() => setIsDelete(true)}
                className="btn-brown flex items-center gap-2 text-white px-4 py-2 rounded cursor-pointer"
              >
                <Trash2 className="w-5 h-5" /> Delete
              </button>
            </div>
          </div>
          <div className="hero-section mt-8 h-[calc(100vh-100px)] overflow-auto pr-4">
            <HotelPrevImgComponent data={data} />
            <HotelOverviewComponent description={description} data={data} />
            <HotelPopularActivities data={data} />
            <HotelAllAmenities data={data} />
          </div>
        </div>
      </section>

      {isDelete && (
        <BusTimingsActionPopup onclose={onclose} handleDelete={handleDelete} />
      )}
      {isLoading && <LoadingPage />}
    </>
  );
};

export default HotelDetailsPage;
