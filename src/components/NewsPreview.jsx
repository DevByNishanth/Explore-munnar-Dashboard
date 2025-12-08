import { Trash2 } from "lucide-react";
import React from "react";

const NewsPreview = ({ news, setIsPreviewModal }) => {
  return (
    <>
      <div
        onClick={() => setIsPreviewModal(false)}
        className="tint-container fixed inset-0 bg-black/45"
      ></div>
      <section className="w-[40%] p-4 h-[100vh] bg-white top-0 right-0 absolute">
        <div className="header">
          <img
            src={news.imageUrl}
            className="w-[100%] h-[240px] object-cover rounded-lg"
          />
        </div>
        <div className="content-container overflow-auto w-[100%] h-[calc(100vh-320px)] mt-4">
          <h1 className="mb-2 font-medium text-xl">{news.heading}</h1>
          {/* <h1 className="text-gray-600">{news.detail}</h1> */}

          {news.detail.split('. ').map((sentence, index) => {
            return <h1 className="text-gray-600 text-justify mb-2">{sentence}.</h1>
          })}
        </div>
        <div className="btn-container flex justify-end">
          <button className="bg-amber-700 flex items-center gap-2 text-white px-4 py-2 rounded-md cursor-pointer">
              <Trash2 className="text-white w-5 h-5"/>
            Delete
          </button>
        </div>
      </section>
    </>
  );
};

export default NewsPreview;
