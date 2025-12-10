import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { Edit, Pencil, Trash, Trash2 } from "lucide-react";
import HotelPrevImgComponent from "./HotelPrevImgComponent";
import HotelOverviewComponent from "./HotelOverviewComponent";
import HotelPopularActivities from "../components/HotelPopularActivities";
import HotelAllAmenities from "../components/HotelAllAmenities";
import BusTimingsActionPopup from '../components/BusTimingsActionPopup'

const description =
  "When Euclidean space is represented by a Cartesian coordinate system in analytic geometry, Euclidean distance satisfies the Pythagorean relation: the squared distance between two points equals the sum of squares of the difference in each coordinate between the points. When Euclidean space is represented by a Cartesian coordinate system in analytic geometry, Euclidean distance satisfies the Pythagorean relation: the squared distance between two points equals the sum of squares of the difference in each coordinate between the points.When Euclidean space is represented by a Cartesian coordinate system in analytic geometry, Euclidean distance satisfies the Pythagorean relation: the squared distance between two points equals the sum of squares of the difference in each coordinate between the points.When Euclidean space is represented by a Cartesian coordinate system in analytic geometry, Euclidean distance satisfies the Pythagorean relation: the squared distance between two points equals the sum of squares of the difference in each coordinate between the points.When Euclidean space is represented by a Cartesian coordinate system in analytic geometry, Euclidean distance satisfies the Pythagorean relation: the squared distance between two points equals the sum of squares of the difference in each coordinate between the points.When Euclidean space is represented by a Cartesian coordinate system in analytic geometry, Euclidean distance satisfies the Pythagorean relation: the squared distance between two points equals the sum of squares of the difference in each coordinate between the points.When Euclidean space is represented by a Cartesian coordinate system in analytic geometry, Euclidean distance satisfies the Pythagorean relation: the squared distance between two points equals the sum of squares of the difference in each coordinate between the points.";

const HotelDetailsPage = () => {
  const { id } = useParams();

  // states 
  const [isDelete, setIsDelete] = useState(false)

  // functions 
  function onclose() {
    setIsDelete(false)
  }
  return (
    <>
      <section className="flex ">
        <Sidebar />
        <div className="main-container mt-4 mx-6 w-[100%]">
          <div className="header flex items-center justify-between">
            <h1 className="font-medium text-[#333333] text-xl">
              Misty Hill Eco Retreat
            </h1>
            <div className="button-container flex gap-2 items-center">
              <Link to={`/hotels/addHotels/?editMode=${true}&hotelId=${id}`} className="btn-green flex items-center gap-2 text-white px-4 py-2 rounded cursor-pointer">
                <Edit className="w-5 h-5" /> Edit
              </Link>
              <button onClick={() => setIsDelete(true)} className="btn-brown flex items-center gap-2 text-white px-4 py-2 rounded cursor-pointer">
                <Trash2 className="w-5 h-5" /> Delete
              </button>

            </div>
          </div>
          <div className="hero-section mt-8 h-[calc(100vh-100px)] overflow-auto pr-4">
            <HotelPrevImgComponent />
            <HotelOverviewComponent description={description} />
            <HotelPopularActivities />
            <HotelAllAmenities />
          </div>
        </div>
      </section>

      {isDelete && <BusTimingsActionPopup onclose={onclose} />}
    </>
  );
};

export default HotelDetailsPage;
