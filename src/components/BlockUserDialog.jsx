import React from "react";
import block from "../assets/block.svg";
const BlockUserDialog = ({ setIsConfirmModal }) => {
  return (
    <>
      <div
        onClick={() => setIsConfirmModal(false)}
        className="fixed bg-black/40 inset-0"
      ></div>
      <section className="w-[400px] rounded-xl  p-4 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-70%] bg-white ">
        <div className="img-container">
          <img src={block} className="h-[120px] w-[120px] m-auto mt-4" />
        </div>
        <div className="content-conainer mt-2  text-center">
          <h1 className="font-medium text-xl text-gray-700">Hang on a sec !</h1>
          <h1 className="text-sm mt-2 text-gray-600">
            Blocking this user will stop them from contacting you and will limit
            their ability to view your activity. Proceed?
          </h1>
        </div>
        <div className="btn-section mt-3 flex items-center gap-3">
          <button
            onClick={() => setIsConfirmModal(false)}
            className="bg-gray-50 cursor-pointer border border-gray-300 text-black rounded-xl w-[50%] py-2"
          >
            Let Me Rethink
          </button>
          <button className="btn-green cursor-pointer text-white rounded-xl w-[50%] py-2">
            Proceed{" "}
          </button>
        </div>
      </section>
    </>
  );
};

export default BlockUserDialog;
