import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { Link } from "react-router-dom";
import { ChevronRight, Plus } from "lucide-react";
import newsImg from "../assets/newsImg.jpeg";
import newsImg2 from "../assets/newsImg2.jpeg";
import newsImg3 from "../assets/newsImg3.jpeg";
import NewsPreview from "../components/NewsPreview";
const liveInformationData = [
  {
    img: newsImg,
    title: " Heavy Rainfall Soaks Munnar Hills",
    description:
      "Continuous downpours have lashed Munnar over the past 24 hours, causing landslides in a few areas and disrupting road connectivity. Tourists are advised to stay indoors as the Kerala Disaster Management Authority has issued an alert for the Idukki district, urging residents to remain cautious amid rising water levels in nearby rivers and tea plantations.",
  },
  {
    img: newsImg2,
    title: " Heavy Rainfall Soaks Munnar Hills",
    description:
      "Continuous downpours have lashed Munnar over the past 24 hours, causing landslides in a few areas and disrupting road connectivity. Tourists are advised to stay indoors as the Kerala Disaster Management Authority has issued an alert for the Idukki district, urging residents to remain cautious amid rising water levels in nearby rivers and tea plantations.",
  },
  {
    img: newsImg3,
    title: " Heavy Rainfall Soaks Munnar Hills",
    description:
      "Continuous downpours have lashed Munnar over the past 24 hours, causing landslides in a few areas and disrupting road connectivity. Tourists are advised to stay indoors as the Kerala Disaster Management Authority has issued an alert for the Idukki district, urging residents to remain cautious amid rising water levels in nearby rivers and tea plantations.",
  },
  {
    img: newsImg3,
    title: " Heavy Rainfall Soaks Munnar Hills",
    description:
      "Continuous downpours have lashed Munnar over the past 24 hours, causing landslides in a few areas and disrupting road connectivity. Tourists are advised to stay indoors as the Kerala Disaster Management Authority has issued an alert for the Idukki district, urging residents to remain cautious amid rising water levels in nearby rivers and tea plantations.",
  },
  {
    img: newsImg2,
    title: " Heavy Rainfall Soaks Munnar Hills",
    description:
      "Continuous downpours have lashed Munnar over the past 24 hours, causing landslides in a few areas and disrupting road connectivity. Tourists are advised to stay indoors as the Kerala Disaster Management Authority has issued an alert for the Idukki district, urging residents to remain cautious amid rising water levels in nearby rivers and tea plantations.",
  },
];
const LiveInformationPage = () => {
  // states
  const [news, setNews] = useState(null);
  const [isPreviewModal, setIsPreviewModal] = useState(false);
  return (
    <>
      <section className="flex items-start">
        <Sidebar />
        <div className="main-container px-6 mt-4 w-[100%]">
          <div className="breadcrumbs-section flex items-center justify-between">
            <h1 className="flex items-center text-gray-600">
              <Link to="/">Dashboard</Link> <ChevronRight />
              <span className="font-medium text-black">Live Information</span>
            </h1>
            <Link
              to="/liveInformation/addNews"
              className="btn-green px-4 py-2 rounded cursor-pointer flex items-center gap-2 text-white"
            >
              <Plus className="text-white" /> Add News
            </Link>
          </div>
          <div className="news-container mt-6 grid grid-cols-3 gap-4 max-h-[calc(100vh-120px)] overflow-auto">
            {liveInformationData.map((item, index) => {
              return (
                <div
                  onClick={() => {
                    setNews(item);
                    setIsPreviewModal(true);
                  }}
                  className="news-card w-full p-2 hover:shadow cursor-pointer rounded-lg shadow-gray-400"
                >
                  <img
                    src={item.img}
                    className="w-[100%] object-cover rounded-lg h-[180px]"
                  />
                  <div className="content-container mt-2">
                    <h1 className="font-medium text-xl">{item.title}</h1>
                    <p className="description mt-2 text-gray-600 text-justify text-[16px]">
                      {item.description.slice(0, 100)}...
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      {isPreviewModal && (
        <NewsPreview news={news} setIsPreviewModal={setIsPreviewModal} />
      )}
    </>
  );
};

export default LiveInformationPage;
