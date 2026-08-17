import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { Link } from "react-router-dom";
import {
  ChevronRight,
  Star,
  MessageSquareText,
  Calendar,
  BedDouble,
  BadgeCheck,
  Clock,
  ThumbsUp,
  Image as ImageIcon,
} from "lucide-react";
import axios from "axios";
import ErrorPopup from "../components/ErrorPopup";
import NoData from "../components/NoData";

const STATUS_STYLES = {
  approved: "bg-emerald-100 text-emerald-800 border-emerald-200",
  pending: "bg-amber-100 text-amber-800 border-amber-200",
  rejected: "bg-red-100 text-red-800 border-red-200",
  default: "bg-gray-100 text-gray-700 border-gray-200",
};

const statusStyle = (status) => STATUS_STYLES[String(status || "").toLowerCase()] || STATUS_STYLES.default;

const ReviewsPage = () => {
  const apiUrl = import.meta.env.VITE_API_URL;

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  // Fetch reviews
  const fetchReviews = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${apiUrl}/api/admin/reviews`);
      if (response.data && response.data.success) {
        setReviews(response.data.data || []);
        setErrorMsg("");
      } else {
        setErrorMsg("Failed to fetch reviews");
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
      setErrorMsg("Error occurred while fetching reviews: " + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [apiUrl]);

  // Derived stats
  const stats = reviews.reduce(
    (acc, review) => {
      acc.total += 1;
      acc.ratingSum += review.rating || 0;
      if (String(review.status || "").toLowerCase() === "approved") acc.approved += 1;
      else acc.pending += 1;
      return acc;
    },
    { total: 0, ratingSum: 0, approved: 0, pending: 0 }
  );
  const avgRating = stats.total ? (stats.ratingSum / stats.total).toFixed(1) : "0.0";

  return (
    <>
      <section className="flex items-start min-h-screen">
        <Sidebar />

        {/* Main Content Area */}
        <div className="main-container px-6 mt-4 w-full max-h-screen overflow-auto pb-10">
          {/* Breadcrumbs */}
          <div className="breadcrumbs-section flex items-center gap-2 text-gray-600">
            <Link to="/">Dashboard</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="font-medium text-black">Reviews</span>
          </div>

          {/* Page Info */}
          <div className="mt-4 mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Manage Reviews</h1>
            <p className="text-gray-500 text-sm">
              Review, monitor, and manage guest feedback for all hotels.
            </p>
          </div>

          {/* Stats Row */}
          {!loading && reviews.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                  <MessageSquareText className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800 leading-none">{stats.total}</p>
                  <p className="text-xs text-gray-500 mt-1">Total Reviews</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                  <Star className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800 leading-none">{avgRating}</p>
                  <p className="text-xs text-gray-500 mt-1">Average Rating</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <BadgeCheck className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800 leading-none">{stats.approved}</p>
                  <p className="text-xs text-gray-500 mt-1">Approved</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800 leading-none">{stats.pending}</p>
                  <p className="text-xs text-gray-500 mt-1">Pending / Others</p>
                </div>
              </div>
            </div>
          )}

          {/* Reviews Grid or Loading */}
          {loading ? (
            <div className="flex flex-col items-center justify-center h-[50vh]">
              <div className="loader"></div>
              <p className="text-gray-500 mt-4 font-medium animate-pulse">Loading reviews...</p>
            </div>
          ) : reviews.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center max-w-2xl mx-auto mt-8">
              <div className="inline-flex mt-3 items-center justify-center w-16 h-16 bg-gray-100 text-gray-400 rounded-full mb-4">
                <ImageIcon className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">No reviews found</h3>
              <p className="text-gray-500 mt-1">
                Guest reviews will appear here once they're submitted.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col overflow-hidden group"
                >
                  {/* Card Header */}
                  <div className="p-5 pb-0 flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-11 h-11 rounded-full btn-green text-white flex items-center justify-center font-semibold text-lg shrink-0">
                        {(review.username || "U").charAt(0).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-semibold text-gray-800 truncate">{review.username || "Anonymous"}</h3>
                        <p className="text-xs text-gray-400">
                          {review.createdAt
                            ? new Date(review.createdAt).toLocaleDateString(undefined, {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              })
                            : ""}
                        </p>
                      </div>
                    </div>

                    {/* Status Badge */}
                    <span
                      className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border shrink-0 ${statusStyle(review.status)}`}
                    >
                      {review.status || "PENDING"}
                    </span>
                  </div>

                  {/* Rating */}
                  <div className="px-5 mt-4 flex items-center gap-2">
                    <div className="flex items-center gap-0.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-4 h-4 ${
                            star <= Math.round(review.rating || 0)
                              ? "text-amber-400 fill-amber-400"
                              : "text-gray-300 fill-gray-200"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-semibold text-gray-700">
                      {(review.rating || 0).toFixed(1)}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div className="px-5 mt-3 flex-1">
                    {review.title && (
                      <h4 className="font-semibold text-gray-900 leading-snug">{review.title}</h4>
                    )}
                    <p className="text-sm text-gray-500 mt-1.5 leading-relaxed line-clamp-3">
                      {review.description || "No description provided."}
                    </p>
                  </div>

                  {/* Meta Row */}
                  <div className="px-5 mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-gray-500">
                    {review.travelledMonth && (
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-emerald-800" />
                        {review.travelledMonth}
                      </span>
                    )}
                    {review.roomType && (
                      <span className="flex items-center gap-1.5">
                        <BedDouble className="w-3.5 h-3.5 text-emerald-800" />
                        {review.roomType}
                      </span>
                    )}
                  </div>

                  {/* Rating Breakdown */}
                  {review.ratings && (
                    <div className="mt-4 p-4 pt-3 bg-gray-50 border-t border-gray-100">
                      <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide mb-2">
                        Rating Breakdown
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {Object.entries(review.ratings)
                          .filter(([key]) => key !== "id" && key !== "reviewId")
                          .map(([key, value]) => (
                            <span
                              key={key}
                              className="inline-flex items-center gap-1 text-[11px] font-medium text-gray-600 bg-white border border-gray-200 rounded-full px-2.5 py-1"
                            >
                              <ThumbsUp className="w-3 h-3 text-emerald-800" />
                              {key.charAt(0).toUpperCase() + key.slice(1)}: {Number(value).toFixed(1)}
                            </span>
                          ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Error Popup */}
      {errorMsg && (
        <ErrorPopup
          errMessage={errorMsg}
          onClose={() => setErrorMsg("")}
        />
      )}
    </>
  );
};

export default ReviewsPage;
