import { ChevronDown } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import noData from '../assets/noData.svg'

const tableheader = [
  "Customer Name",
  "From",
  "To",
  "Phone",
  "Date",
  "Time",
  "passenger",
  "Vehicle Type",
  "Status",
];

const tableData = [
  {
    name: "Nishanth",
    from: "Munnar",
    to: "Idukki",
    phone: 1234567890,
    date: "10/10/25",
    time: "12 pm",
    passengerCount: 2,
    vehicleType: "Sedan",
    status: "Pending",
  },
  {
    name: "Surya chandran",
    from: "Munnar",
    to: "Idukki",
    phone: 1234567890,
    date: "10/10/25",
    time: "12 pm",
    passengerCount: 2,
    vehicleType: "Sedan",
    status: "Booked",
  },
  {
    name: "Nishanth",
    from: "Munnar",
    to: "Idukki",
    phone: 1234567890,
    date: "10/10/25",
    time: "12 pm",
    passengerCount: 2,
    vehicleType: "Sedan",
    status: "Canceled",
  },
  {
    name: "Nishanth",
    from: "Munnar",
    to: "Idukki",
    phone: 1234567890,
    date: "10/10/25",
    time: "12 pm",
    passengerCount: 2,
    vehicleType: "Sedan",
    status: "Canceled",
  },
  {
    name: "Nishanth",
    from: "Munnar",
    to: "Idukki",
    phone: 1234567890,
    date: "10/10/25",
    time: "12 pm",
    passengerCount: 2,
    vehicleType: "Sedan",
    status: "Canceled",
  },
  {
    name: "Nishanth",
    from: "Munnar",
    to: "Idukki",
    phone: 1234567890,
    date: "10/10/25",
    time: "12 pm",
    passengerCount: 2,
    vehicleType: "Sedan",
    status: "Canceled",
  },
  {
    name: "Nishanth",
    from: "Munnar",
    to: "Idukki",
    phone: 1234567890,
    date: "10/10/25",
    time: "12 pm",
    passengerCount: 2,
    vehicleType: "Sedan",
    status: "Canceled",
  },
  {
    name: "Nishanth",
    from: "Munnar",
    to: "Idukki",
    phone: 1234567890,
    date: "10/10/25",
    time: "12 pm",
    passengerCount: 2,
    vehicleType: "Sedan",
    status: "Canceled",
  },
  {
    name: "Nishanth",
    from: "Munnar",
    to: "Idukki",
    phone: 1234567890,
    date: "10/10/25",
    time: "12 pm",
    passengerCount: 2,
    vehicleType: "Sedan",
    status: "Canceled",
  },
  {
    name: "Nishanth",
    from: "Munnar",
    to: "Idukki",
    phone: 1234567890,
    date: "10/10/25",
    time: "12 pm",
    passengerCount: 2,
    vehicleType: "Sedan",
    status: "Canceled",
  },
  {
    name: "Nishanth",
    from: "Munnar",
    to: "Idukki",
    phone: 1234567890,
    date: "10/10/25",
    time: "12 pm",
    passengerCount: 2,
    vehicleType: "Sedan",
    status: "Canceled",
  },
  {
    name: "Nishanth",
    from: "Munnar",
    to: "Idukki",
    phone: 1234567890,
    date: "10/10/25",
    time: "12 pm",
    passengerCount: 2,
    vehicleType: "Sedan",
    status: "Canceled",
  },
  {
    name: "Nishanth",
    from: "Munnar",
    to: "Idukki",
    phone: 1234567890,
    date: "10/10/25",
    time: "12 pm",
    passengerCount: 2,
    vehicleType: "Sedan",
    status: "Canceled",
  },
  {
    name: "Nishanth",
    from: "Munnar",
    to: "Idukki",
    phone: 1234567890,
    date: "10/10/25",
    time: "12 pm",
    passengerCount: 2,
    vehicleType: "Sedan",
    status: "Canceled",
  },
  {
    name: "Nishanth",
    from: "Munnar",
    to: "Idukki",
    phone: 1234567890,
    date: "10/10/25",
    time: "12 pm",
    passengerCount: 2,
    vehicleType: "Sedan",
    status: "Canceled",
  },
  {
    name: "Nishanth",
    from: "Munnar",
    to: "Idukki",
    phone: 1234567890,
    date: "10/10/25",
    time: "12 pm",
    passengerCount: 2,
    vehicleType: "Sedan",
    status: "Canceled",
  },
  {
    name: "Nishanth",
    from: "Munnar",
    to: "Idukki",
    phone: 1234567890,
    date: "10/10/25",
    time: "12 pm",
    passengerCount: 2,
    vehicleType: "Sedan",
    status: "Canceled",
  },
  {
    name: "Nishanth",
    from: "Munnar",
    to: "Idukki",
    phone: 1234567890,
    date: "10/10/25",
    time: "12 pm",
    passengerCount: 2,
    vehicleType: "Sedan",
    status: "Canceled",
  },
  {
    name: "Nishanth",
    from: "Munnar",
    to: "Idukki",
    phone: 1234567890,
    date: "10/10/25",
    time: "12 pm",
    passengerCount: 2,
    vehicleType: "Sedan",
    status: "Canceled",
  },
  {
    name: "Nishanth",
    from: "Munnar",
    to: "Idukki",
    phone: 1234567890,
    date: "10/10/25",
    time: "12 pm",
    passengerCount: 2,
    vehicleType: "Sedan",
    status: "Canceled",
  },
  {
    name: "Nishanth",
    from: "Munnar",
    to: "Idukki",
    phone: 1234567890,
    date: "10/10/25",
    time: "12 pm",
    passengerCount: 2,
    vehicleType: "Sedan",
    status: "Canceled",
  },
  {
    name: "Nishanth",
    from: "Munnar",
    to: "Idukki",
    phone: 1234567890,
    date: "10/10/25",
    time: "12 pm",
    passengerCount: 2,
    vehicleType: "Sedan",
    status: "Canceled",
  },
  {
    name: "Nishanth",
    from: "Munnar",
    to: "Idukki",
    phone: 1234567890,
    date: "10/10/25",
    time: "12 pm",
    passengerCount: 2,
    vehicleType: "Sedan",
    status: "Canceled",
  },
  {
    name: "Nishanth",
    from: "Munnar",
    to: "Idukki",
    phone: 1234567890,
    date: "10/10/25",
    time: "12 pm",
    passengerCount: 2,
    vehicleType: "Sedan",
    status: "Canceled",
  },
  {
    name: "Nishanth",
    from: "Munnar",
    to: "Idukki",
    phone: 1234567890,
    date: "10/10/25",
    time: "12 pm",
    passengerCount: 2,
    vehicleType: "Sedan",
    status: "Canceled",
  },
  {
    name: "Nishanth",
    from: "Munnar",
    to: "Idukki",
    phone: 1234567890,
    date: "10/10/25",
    time: "12 pm",
    passengerCount: 2,
    vehicleType: "Sedan",
    status: "Canceled",
  },
  {
    name: "Nishanth",
    from: "Munnar",
    to: "Idukki",
    phone: 1234567890,
    date: "10/10/25",
    time: "12 pm",
    passengerCount: 2,
    vehicleType: "Sedan",
    status: "Canceled",
  },
  {
    name: "Nishanth",
    from: "Munnar",
    to: "Idukki",
    phone: 1234567890,
    date: "10/10/25",
    time: "12 pm",
    passengerCount: 2,
    vehicleType: "Sedan",
    status: "Canceled",
  },
  {
    name: "Nishanth",
    from: "Munnar",
    to: "Idukki",
    phone: 1234567890,
    date: "10/10/25",
    time: "12 pm",
    passengerCount: 2,
    vehicleType: "Sedan",
    status: "Canceled",
  },
  {
    name: "Nishanth",
    from: "Munnar",
    to: "Idukki",
    phone: 1234567890,
    date: "10/10/25",
    time: "12 pm",
    passengerCount: 2,
    vehicleType: "Sedan",
    status: "Canceled",
  },
  {
    name: "Nishanth",
    from: "Munnar",
    to: "Idukki",
    phone: 1234567890,
    date: "10/10/25",
    time: "12 pm",
    passengerCount: 2,
    vehicleType: "Sedan",
    status: "Canceled",
  },
];

const CabBookingTable = () => {

  // states
  const [openDropDownIndex, setOpenDropdownIndex] = useState(null);
  const [isStautusDropdown, setIsStatusDropdown] = useState(false);
  const [status, setStatus] = useState(null);
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredData, setFilteredData] = useState([])
  const [selectedStatus, setSelectedStatus] = useState(null)

  // ref's
  const dropdownRef = useRef(null);

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
    handleSearch()
  }, [searchQuery])

  useEffect(() => {
    handlerFilter()
  }, [status])

  // ------------------------------------ Functions --------------------------------- 

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
      return (
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    });
    setFilteredData(filteredData);
  }

  // status filter handler ----------------> 

  const handlerFilter = () => {
    if (status == null) {
      return;
    } else if (status.toLowerCase() == "all") {
      setFilteredData(tableData);
      return;
    }
    const filteredData = tableData.filter(item => item.status.toLowerCase() == status.toLowerCase())
    setFilteredData(filteredData)
  }

  return (
    <>
      <div className="header mt-4 flex ">
        <div className="button-container flex items-center gap-4">
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
                  onClick={() => { setStatus("all"); setIsStatusDropdown(false) }}
                  className="px-2 text-left py-2 hover:bg-gray-50 w-[100%] cursor-pointer"
                >
                  All
                </button>
                <button
                  onClick={() => { setStatus("pending"); setIsStatusDropdown(false) }}
                  className="px-2 text-left py-2 hover:bg-gray-50 w-[100%] cursor-pointer"
                >
                  Pending
                </button>
                <button
                  onClick={() => { setStatus("booked"); setIsStatusDropdown(false) }}
                  className="px-2 text-left py-2 hover:bg-gray-50 w-[100%] cursor-pointer"
                >
                  Booked
                </button>
                <button
                  onClick={() => { setStatus("canceled"); setIsStatusDropdown(false) }}
                  className="px-2 text-left py-2 hover:bg-gray-50 w-[100%] cursor-pointer"
                >
                  Canceled
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <section className="mt-6 border border-gray-300  max-h-[calc(100vh-240px)] overflow-auto  items-center justify-between">
        <table className="w-[100%] px-4">
          <thead className="w-[100%] bg-[#124523] text-white rounded-xl sticky top-0 z-15">
            {tableheader.map((item, index) => {
              return (
                <td key={index} className="py-2 px-2">
                  {item}
                </td>
              );
            })}
          </thead>
          <tbody className="">
            {filteredData.length !== 0 ? (
              filteredData.map((item, index) => {
                return (
                  <tr
                    key={index}
                    className={` ${tableData.length - 1 == index ? "" : "border-b"
                      }   border-gray-200 text-md text-[#333333]  ${index % 2 == 0 ? "bg-gray-50" : ""
                      } `}
                  >
                    <td className="pl-3 py-2">{item.name}</td>
                    <td className="pl-3">{item.from}</td>
                    <td className="pl-3">{item.to}</td>
                    <td className="pl-3">{item.phone}</td>
                    <td className="pl-3">{item.date}</td>
                    <td className="pl-3">{item.time}</td>
                    <td className="pl-3">{item.passengerCount}</td>
                    <td className="pl-3">{item.vehicleType}</td>
                    <td className="pl-3 py-2">
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
                              onClick={() => handleStatusChange(index, "Pending")}
                            >
                              Pending
                            </button>
                            <button
                              className="hover:bg-gray-100 text-left cursor-pointer w-[100%] px-2 py-2"
                              onClick={() => handleStatusChange(index, "Booked")}
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
                  </tr>
                );
              })
            ) : <tr className="">
              <div>
                <img src={noData} className="w-[300px] translate-x-[390px] mt-8" />
                <h1 className="text-gray-600 translate-x-[480px] mt-4">No data found</h1>
              </div>
            </tr>}
          </tbody>
        </table>
      </section>
    </>
  );
};

export default CabBookingTable;
