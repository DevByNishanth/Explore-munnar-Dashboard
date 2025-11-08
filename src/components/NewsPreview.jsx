import React from "react";

const NewsPreview = ({ news, setIsPreviewModal }) => {
  return (
    <>
      <div
        onClick={() => setIsPreviewModal(false)}
        className="tint-container fixed inset-0 bg-black/45"
      ></div>
      <section className="w-[35%] p-4 h-[100vh] bg-white top-0 right-0 absolute">
        <div className="header">
          <img
            src={news.img}
            className="w-[100%] h-[240px] object-cover rounded-lg"
          />
        </div>
        <div className="content-container overflow-auto w-[100%] h-[calc(100vh-320px)] mt-4">
          <h1 className="mb-2 font-medium text-xl">{news.title}</h1>
          <h1 className="text-gray-600">{news.description}</h1>
        </div>
        <div className="btn-container flex justify-end">
          <button className="bg-red-400 hover:bg-red-500 text-white px-4 py-2 rounded-md cursor-pointer">
            Remove
          </button>
        </div>
      </section>
    </>
  );
};

export default NewsPreview;
