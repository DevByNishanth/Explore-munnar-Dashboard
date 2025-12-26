import { ArrowUpRight, Edit, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import BusTimingsActionPopup from "./BusTimingsActionPopup";
import axios from "axios";
import NoData from "./NoData";

const tableheader = [
  "Route",
  "Depature",
  "Arrival time",
  "Bus type",
  "Duration",
  "Price",
  "Action",
];


const BusTimingsTable = ({ handleEdit }) => {
  // Auth
  const apiUrl = import.meta.env.VITE_API_URL;

  // states
  const [isModal, setIsModal] = useState(false);
  const [toggleState, setToggleState] = useState(null);
  const [data, setData] = useState([]);
  const [selectedId, setSelectedId] = useState(null)

  // side effects
  useEffect(() => {
    getBusTimings();
  }, [apiUrl]);

  // functions
  const handleModal = (actionName, item) => {
    setSelectedId(item.id)
    setToggleState(actionName);
    setIsModal(true);
  };

  function onclose() {
    setIsModal(false);
  }

  async function getBusTimings() {
    try {
      const res = await axios.get(`${apiUrl}/api/bus-timing`);
      setData(res.data.data);
      console.log("bus timings ", res.data.data);
    } catch (err) {
      console.error("Error occured while fetching bus timings : ", err.message);
    }
  }
  async function handleDelete() {
    try {
      const res = await axios.delete(`${apiUrl}/api/bus-timing/${selectedId}`)
      window.location.reload()
    } catch (err) {
      console.error("Error occured while deleting Bus timing : ", err.message)
    }
  }
  return (
    <>
      <div className="main-section  mt-8 ">
        <section className="w-[100%]  h-[calc(100vh-110px)] overflow-auto ">
          <table className="w-[100%]">
            <tr className={`btn-green text-white w-[100%]  sticky top-0`}>
              {tableheader.map((item, index) => {
                return (
                  <td
                    className={`text-md py-3 px-4 ${index == 0 ? "roundedd-tl-lg" : ""
                      } ${index == tableheader.length - 1 ? "roundedd-tr-lg" : ""
                      } `}
                  >
                    {item}
                  </td>
                );
              })}
            </tr>
            <tbody className="border border-gray-400">
              {data.length > 0 ? (
                data.map((item, index) => {
                  return (
                    <tr
                      className={`text-[#333333] ${index % 2 == 0
                        ? "bg-gray-100 border-b border-gray-200"
                        : ""
                        } text-md `}
                    >
                      <td className="pl-3 py-2">{item.from} - {item.to}</td>
                      <td className="pl-3 py-2">{item.departure_time}</td>
                      <td className="pl-3 py-2">{item.arrival_time}</td>
                      <td className="pl-3 py-2">{item.bus_type}</td>
                      <td className="pl-3 py-2">{item.duration}</td>
                      <td className="pl-3 py-2">{item.price}</td>
                      <td className="pl-3 py-2">
                        <div className="btn-container flex gap-3 items-center ml-2">
                          <button onClick={() => handleEdit(item)}>
                            <Edit className="text-green-800 w-5 h-5 cursor-pointer" />
                          </button>
                          <button
                            onClick={() => {
                              handleModal("delete", item);
                            }}
                          >
                            <Trash2 className="text-amber-800 w-5 h-5 cursor-pointer" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={tableheader.length}>
                    <NoData />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </section>
      </div>
      {isModal && (
        <BusTimingsActionPopup toggleState={toggleState} onclose={onclose} handleDelete={handleDelete} />
      )}
    </>
  );
};

export default BusTimingsTable;
