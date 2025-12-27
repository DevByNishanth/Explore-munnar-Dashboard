import { ArrowUpRight, ChevronDown } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import ItnearyCanvas from "./ItnearyCanvas";
import NoData from "./NoData";
import axios from "axios";

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
  // Auth 
  const apiUrl = import.meta.env.VITE_API_URL

  // states
  const [openDropDownIndex, setOpenDropdownIndex] = useState(null);
  const [status, setStatus] = useState("");
  const [isCanvas, setIsCanvas] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [isStautusDropdown, setIsStatusDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState([])
  const [canvasItem, setCanvasItem] = useState({})


  console.log("can uitem : ", canvasItem)
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

  useEffect(() => {
    fetchData()
  }, [])

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
      setFilteredData(data);
      return;
    }
    const filteredData = data?.filter((item) => {
      return item?.full_name.toLowerCase().includes(searchQuery.toLowerCase());
    });
    setFilteredData(filteredData);
  };

  const handlerFilter = () => {
    if (status == null) {
      return;
    } else if (status.toLowerCase() == "") {
      setFilteredData(data);
      return;
    }
    const filteredData = data.filter(
      (item) => item.status.toLowerCase() == status.toLowerCase()
    );
    setFilteredData(filteredData);
  };

  async function fetchData() {
    try {
      const res = await axios.post(`${apiUrl}/api/itineraries/list`, {
        "page": 1,
        "limit": 10,
        "search": "",
        "status": status
      });
      console.log("Itneary list : ", res.data.data.itineraries)
      setData(res.data.data.itineraries)

      setFilteredData(res.data.data.itineraries)
    } catch (err) {
      console.error("Error occured while fetching Itneary list : ", err.message)
    }
  }

  function handleCanvas(item) {
    console.log("canvas item : ", item)
    setCanvasItem(item)
    setIsCanvas(true);
  }

  const formatDate = (date) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("en-IN");
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
                    setStatus("");
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

        <div className="table-container mt-6 w-[100%] overflow-auto  h-[calc(100vh-240px)]">
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
                      <td className="pl-4 py-2">{item.full_name}</td>
                      <td className="pl-4 py-2">{item.mobile_number}</td>
                      <td className="pl-4 py-2">{item.mail_id}</td>
                      <td className="pl-4 py-2">{item.coming_from}</td>
                      <td className="pl-4 py-2">{formatDate(item.start_date)}</td>
                      <td className="pl-4 py-2">{formatDate(item.end_date)}</td>
                      <td className="pl-4 py-2">
                        <div className="relative">
                          <button
                            onClick={() => handleStatusClick(index)}
                            className={`flex items-center justify-center py-2 text-center  rounded-lg  gap-2 w-[120px] text-sm ${item.status.toLowerCase() == "pending"
                              ? "px-2 py-1  text-black bg-red-200 "
                              : item.status.toLowerCase() == "booked"
                                ? " bg-green-200 text-black px-2 py-1 "
                                : "bg-gray-200 px-2 py-1  text-black"
                              }`}
                          >
                            {item.status}
                            {/* <ChevronDown
                              className={`cursor-pointer transition-all duration-300 ${openDropDownIndex == index ? "rotate-180" : ""
                                } `}
                            /> */}
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
                        <div
                          onClick={() => { handleCanvas(item); }}
                          className="bg-gray-200 cursor-pointer w-8 h-8 flex items-center justify-center rounded-full"
                        >
                          <ArrowUpRight className="cursor-pointer w-5 h-5 text-black" />
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={tableHeader.length}>
                    <NoData />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* child components -------------------  */}

      {isCanvas && (
        <ItnearyCanvas isCanvas={isCanvas} setIsCanvas={setIsCanvas} setCanvasItem={setCanvasItem} canvasItem={canvasItem} fetchData={fetchData} />
      )}
    </>
  );
};

export default ItnearyTable;
