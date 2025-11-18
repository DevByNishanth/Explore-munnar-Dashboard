import { ArrowUpRight, ChevronDown } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import ItnearyCanvas from "./ItnearyCanvas";
import noData from '../assets/noData.svg'

const tableHeader = [
  "Name",
  "Phone",
  "Email",
  "Comming From",
  "Start Date",
  "End Date",
  "Satus",
  "Action",
];
const tableData = [
  {
    name: "Nishanth",
    phone: "1234567890",
    mail: "nishanth@gmail.com",
    comingFrom: "Coimbatore",
    startDate: "12/10/2015",
    endDate: "20/10/2015",
    status: "booked",
  },
  {
    name: "Surya chandran",
    phone: "1234567890",
    mail: "nishanth@gmail.com",
    comingFrom: "Coimbatore",
    startDate: "12/10/2015",
    endDate: "20/10/2015",
    status: "pending",
  },
  {
    name: "Himanshu",
    phone: "1234567890",
    mail: "nishanth@gmail.com",
    comingFrom: "Coimbatore",
    startDate: "12/10/2015",
    endDate: "20/10/2015",
    status: "canceled",
  },
  {
    name: "Nishanth",
    phone: "1234567890",
    mail: "nishanth@gmail.com",
    comingFrom: "Coimbatore",
    startDate: "12/10/2015",
    endDate: "20/10/2015",
    status: "booked",
  },
  {
    name: "Nishanth",
    phone: "1234567890",
    mail: "nishanth@gmail.com",
    comingFrom: "Coimbatore",
    startDate: "12/10/2015",
    endDate: "20/10/2015",
    status: "pending",
  },
  {
    name: "Nishanth",
    phone: "1234567890",
    mail: "nishanth@gmail.com",
    comingFrom: "Coimbatore",
    startDate: "12/10/2015",
    endDate: "20/10/2015",
    status: "canceled",
  },
  {
    name: "Nishanth",
    phone: "1234567890",
    mail: "nishanth@gmail.com",
    comingFrom: "Coimbatore",
    startDate: "12/10/2015",
    endDate: "20/10/2015",
    status: "booked",
  },
  {
    name: "Nishanth",
    phone: "1234567890",
    mail: "nishanth@gmail.com",
    comingFrom: "Coimbatore",
    startDate: "12/10/2015",
    endDate: "20/10/2015",
    status: "pending",
  },
  {
    name: "Nishanth",
    phone: "1234567890",
    mail: "nishanth@gmail.com",
    comingFrom: "Coimbatore",
    startDate: "12/10/2015",
    endDate: "20/10/2015",
    status: "booked",
  },
  {
    name: "Nishanth",
    phone: "1234567890",
    mail: "nishanth@gmail.com",
    comingFrom: "Coimbatore",
    startDate: "12/10/2015",
    endDate: "20/10/2015",
    status: "canceled",
  },
  {
    name: "Nishanth",
    phone: "1234567890",
    mail: "nishanth@gmail.com",
    comingFrom: "Coimbatore",
    startDate: "12/10/2015",
    endDate: "20/10/2015",
    status: "booked",
  },
  {
    name: "Nishanth",
    phone: "1234567890",
    mail: "nishanth@gmail.com",
    comingFrom: "Coimbatore",
    startDate: "12/10/2015",
    endDate: "20/10/2015",
    status: "pending",
  },
  {
    name: "Nishanth",
    phone: "1234567890",
    mail: "nishanth@gmail.com",
    comingFrom: "Coimbatore",
    startDate: "12/10/2015",
    endDate: "20/10/2015",
    status: "canceled",
  },
  {
    name: "Nishanth",
    phone: "1234567890",
    mail: "nishanth@gmail.com",
    comingFrom: "Coimbatore",
    startDate: "12/10/2015",
    endDate: "20/10/2015",
    status: "booked",
  },
  {
    name: "Nishanth",
    phone: "1234567890",
    mail: "nishanth@gmail.com",
    comingFrom: "Coimbatore",
    startDate: "12/10/2015",
    endDate: "20/10/2015",
    status: "pending",
  },
  {
    name: "Nishanth",
    phone: "1234567890",
    mail: "nishanth@gmail.com",
    comingFrom: "Coimbatore",
    startDate: "12/10/2015",
    endDate: "20/10/2015",
    status: "booked",
  },
];

const ItnearyTable = () => {
  // states
  const [openDropDownIndex, setOpenDropdownIndex] = useState(null);
  const [status, setStatus] = useState("all");
  const [isCanvas, setIsCanvas] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [isStautusDropdown, setIsStatusDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // ref's
  const dropdownRef = useRef(null);

  // useEffect call's

  // handle click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsStatusDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // search functionality call
  useEffect(() => {
    handleSearch();
  }, [searchQuery]);

  // filter functions call
  useEffect(() => {
    handlerFilter();
  }, [status]);

  // functions
  const handleStatusClick = (index) => {
    setOpenDropdownIndex(openDropDownIndex == index ? null : index);
  };

  const handleStatusChange = (index, newStatus) => {
    const updatedData = [...tableData];
    updatedData[index].status = newStatus;
    // setTableData(updatedData);
    setOpenDropdownIndex(null);
  };
  // Search handler ----------------->
  const handleSearch = () => {
    if (searchQuery == "") {
      setFilteredData(tableData);
      return;
    }
    const filteredData = tableData.filter((item) => {
      return item.name.toLowerCase().includes(searchQuery.toLowerCase());
    });
    setFilteredData(filteredData);
  };

  const handlerFilter = () => {
    if (status == null) {
      return;
    } else if (status.toLowerCase() == "all") {
      setFilteredData(tableData);
      return;
    }
    const filteredData = tableData.filter(
      (item) => item.status.toLowerCase() == status.toLowerCase()
    );
    setFilteredData(filteredData);
  };
  return (
    <>
      <section className="mt-6">
        {/* header section --------------  */}

        <div className="header flex gap-2 items-center">
          <input
            type="text"
            placeholder="Search by name.."
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border outline-none w-[300px] rounded-lg border-gray-300 px-4 py-2"
          />
          <div className="dropdown-container relative z-20 ">
            <button
              onClick={() => {
                setIsStatusDropdown(!isStautusDropdown);
              }}
              className="status-btn border py-2  border-gray-300 w-[120px] rounded-lg flex gap-2 items-center justify-between px-2"
            >
              {status ? status : "Status"}{" "}
              <ChevronDown
                className={`${isStautusDropdown ? "rotate-180" : "rotate-0"
                  } transition-all duration-300 `}
              />
            </button>
            {isStautusDropdown && (
              <div
                ref={dropdownRef}
                className="dropdown absolute top-full w-[100%] bg-white border border-gray-300 shadow-lg rounded"
              >
                <button
                  onClick={() => {
                    setStatus("all");
                    setIsStatusDropdown(false);
                  }}
                  className="px-2 text-left py-2 hover:bg-gray-50 w-[100%] cursor-pointer"
                >
                  All
                </button>
                <button
                  onClick={() => {
                    setStatus("pending");
                    setIsStatusDropdown(false);
                  }}
                  className="px-2 text-left py-2 hover:bg-gray-50 w-[100%] cursor-pointer"
                >
                  Pending
                </button>
                <button
                  onClick={() => {
                    setStatus("booked");
                    setIsStatusDropdown(false);
                  }}
                  className="px-2 text-left py-2 hover:bg-gray-50 w-[100%] cursor-pointer"
                >
                  Booked
                </button>
                <button
                  onClick={() => {
                    setStatus("canceled");
                    setIsStatusDropdown(false);
                  }}
                  className="px-2 text-left py-2 hover:bg-gray-50 w-[100%] cursor-pointer"
                >
                  Canceled
                </button>
              </div>
            )}
          </div>
        </div>

        {/* table section ----------------------  */}

        <div className="table-container mt-6 w-[100%] overflow-auto  h-[calc(100vh-195px)]">
          <table className="w-[100%] border border-gray-300 rounded-lg">
            <thead className="text-white btn-green sticky top-0 z-10">
              {tableHeader.map((item, index) => {
                return (
                  <td key={index} className="pl-4 py-2">
                    {item}
                  </td>
                );
              })}
            </thead>
            <tbody>
              {filteredData.length !== 0 ? (
                filteredData.map((item, index) => {
                  return (
                    <tr>
                      <td className="pl-4 py-2">{item.name}</td>
                      <td className="pl-4 py-2">{item.phone}</td>
                      <td className="pl-4 py-2">{item.mail}</td>
                      <td className="pl-4 py-2">{item.comingFrom}</td>
                      <td className="pl-4 py-2">{item.startDate}</td>
                      <td className="pl-4 py-2">{item.endDate}</td>
                      <td className="pl-4 py-2">
                        <div className="relative">
                          <button
                            onClick={() => handleStatusClick(index)}
                            className={`flex items-center justify-between  rounded-lg  gap-2 w-[120px] text-sm ${item.status.toLowerCase() == "pending"
                              ? "px-2 py-1  text-black bg-red-200 "
                              : item.status.toLowerCase() == "booked"
                                ? " bg-green-200 text-black px-2 py-1 "
                                : "bg-gray-200 px-2 py-1  text-black"
                              }`}
                          >
                            {item.status}
                            <ChevronDown
                              className={`cursor-pointer transition-all duration-300 ${openDropDownIndex == index ? "rotate-180" : ""
                                } `}
                            />
                          </button>
                          {openDropDownIndex == index && (
                            <div className="absolute top-full shadow-lg shadow-gray-400 rounded left-0 bg-white w-[120px] z-10 ">
                              <button
                                className="hover:bg-gray-100 text-left cursor-pointer w-[100%] px-2 py-2"
                                onClick={() =>
                                  handleStatusChange(index, "Pending")
                                }
                              >
                                Pending
                              </button>
                              <button
                                className="hover:bg-gray-100 text-left cursor-pointer w-[100%] px-2 py-2"
                                onClick={() =>
                                  handleStatusChange(index, "Booked")
                                }
                              >
                                Booked
                              </button>
                              <button
                                className="hover:bg-gray-100 text-left cursor-pointer w-[100%] px-2 py-2"
                                onClick={() => {
                                  handleStatusChange(index, "Canceled");
                                }}
                              >
                                Canceled
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="pl-4 py-2">
                        <ArrowUpRight
                          className="cursor-pointer"
                          onClick={() => setIsCanvas(true)}
                        />
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr className="">
                  <div>
                    <img
                      src={noData}
                      className="w-[300px] translate-x-[390px] mt-8"
                    />
                    <h1 className="text-gray-600 translate-x-[480px] mb-4">
                      No data found
                    </h1>
                  </div>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* child components -------------------  */}

      {isCanvas && (
        <ItnearyCanvas isCanvas={isCanvas} setIsCanvas={setIsCanvas} />
      )}
    </>
  );
};

export default ItnearyTable;
