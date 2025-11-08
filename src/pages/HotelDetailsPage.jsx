import React from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { Pencil, Trash, Trash2 } from "lucide-react";
import HotelPrevImgComponent from "./HotelPrevImgComponent";
import HotelOverviewComponent from "./HotelOverviewComponent";
import HotelPopularActivities from "../components/HotelPopularActivities";
import HotelAllAmenities from "../components/HotelAllAmenities";

const description =
  "When Euclidean space is represented by a Cartesian coordinate system in analytic geometry, Euclidean distance satisfies the Pythagorean relation: the squared distance between two points equals the sum of squares of the difference in each coordinate between the points. When Euclidean space is represented by a Cartesian coordinate system in analytic geometry, Euclidean distance satisfies the Pythagorean relation: the squared distance between two points equals the sum of squares of the difference in each coordinate between the points.When Euclidean space is represented by a Cartesian coordinate system in analytic geometry, Euclidean distance satisfies the Pythagorean relation: the squared distance between two points equals the sum of squares of the difference in each coordinate between the points.When Euclidean space is represented by a Cartesian coordinate system in analytic geometry, Euclidean distance satisfies the Pythagorean relation: the squared distance between two points equals the sum of squares of the difference in each coordinate between the points.When Euclidean space is represented by a Cartesian coordinate system in analytic geometry, Euclidean distance satisfies the Pythagorean relation: the squared distance between two points equals the sum of squares of the difference in each coordinate between the points.When Euclidean space is represented by a Cartesian coordinate system in analytic geometry, Euclidean distance satisfies the Pythagorean relation: the squared distance between two points equals the sum of squares of the difference in each coordinate between the points.When Euclidean space is represented by a Cartesian coordinate system in analytic geometry, Euclidean distance satisfies the Pythagorean relation: the squared distance between two points equals the sum of squares of the difference in each coordinate between the points.";

const HotelDetailsPage = () => {
  const { id } = useParams();
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
              <button className="btn-brown text-white px-4 py-2 rounded cursor-pointer">
                Delete
              </button>
              <button className="btn-green text-white px-4 py-2 rounded cursor-pointer">
                Edit
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
    </>
  );
};

export default HotelDetailsPage;
