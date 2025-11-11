import React, { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
const tableheader = [
  "Name",
  "From",
  "To",
  "Phone",
  "Date",
  "Time",
  "Days",
  "Driver Needed",
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
    days: 2,
    driverNeeded: "No",
    status: "Pending",
  },
  {
    name: "Nishanth",
    from: "Munnar",
    to: "Idukki",
    phone: 1234567890,
    date: "10/10/25",
    time: "12 pm",
    passengerCount: 2,
    driverNeeded: "No",
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
    driverNeeded: "No",
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
    driverNeeded: "No",
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
    driverNeeded: "No",
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
    driverNeeded: "No",
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
    driverNeeded: "No",
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
    driverNeeded: "No",
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
    driverNeeded: "No",
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
    driverNeeded: "No",
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
    driverNeeded: "No",
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
    driverNeeded: "No",
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
    driverNeeded: "No",
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
    driverNeeded: "No",
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
    driverNeeded: "No",
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
    driverNeeded: "No",
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
    driverNeeded: "No",
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
    driverNeeded: "No",
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
    driverNeeded: "No",
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
    driverNeeded: "No",
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
    driverNeeded: "No",
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
    driverNeeded: "No",
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
    driverNeeded: "No",
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
    driverNeeded: "No",
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
    driverNeeded: "No",
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
    driverNeeded: "No",
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
    driverNeeded: "No",
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
    driverNeeded: "No",
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
    driverNeeded: "No",
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
    driverNeeded: "No",
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
    driverNeeded: "No",
    status: "Canceled",
  },
];
const BookedBikeRentalsTable = () => {
  // states
  const [openDropDownIndex, setOpenDropdownIndex] = useState(null);
  const [status, setStatus] = useState(null);
  const [isStautusDropdown, setIsStatusDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  // ref's
  const dropdownRef = useRef(null);

  // useEffect's

  useEffect(() => {
    handleSearch();
  }, [searchTerm]);

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

  // search by name function
  const handleSearch = () => {
    console.log("search functionality : ", searchTerm);
    if (searchTerm == "") {
      setFilteredData(tableData);
      return;
    }
    const filteredData = tableData.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filteredData);
  };

  return (
    <>
      <section>
        <div className="header mt-4 flex ">
          <div className="button-container flex items-center gap-4">
            <input
              type="text"
              placeholder="Search by name.."
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
              className="border outline-none w-[300px] rounded-lg border-gray-300 px-4 py-2"
            />
            <div className="dropdown-container relative z-20">
              <button
                onClick={() => {
                  setIsStatusDropdown(!isStautusDropdown);
                }}
                className="status-btn border py-2  border-gray-300 w-[120px] rounded-lg flex gap-2 items-center justify-center"
              >
                {status ? status : "Status"}{" "}
                <ChevronDown
                  className={`${
                    isStautusDropdown ? "rotate-180" : "rotate-0"
                  } transition-all duration-300 `}
                />
              </button>
              {isStautusDropdown && (
                <div
                  ref={dropdownRef}
                  className="dropdown absolute top-full w-[100%] bg-white border border-gray-300 shadow-lg rounded"
                >
                  <button
                    onClick={() => setStatus("pending")}
                    className="px-2 text-left py-2 hover:bg-gray-50 w-[100%] cursor-pointer"
                  >
                    Pending
                  </button>
                  <button
                    onClick={() => setStatus("booked")}
                    className="px-2 text-left py-2 hover:bg-gray-50 w-[100%] cursor-pointer"
                  >
                    Booked
                  </button>
                  <button
                    onClick={() => setStatus("canceled")}
                    className="px-2 text-left py-2 hover:bg-gray-50 w-[100%] cursor-pointer"
                  >
                    Canceled
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <section className="mt-3 border border-gray-300  max-h-[calc(100vh-220px)] overflow-auto  items-center justify-between">
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
              {filteredData.map((item, index) => {
                return (
                  <tr
                    key={index}
                    className={` ${
                      tableData.length - 1 == index ? "" : "border-b"
                    }   border-gray-200 text-md text-[#333333]  ${
                      index % 2 == 0 ? "bg-gray-50" : ""
                    } `}
                  >
                    <td className="pl-3 py-2">{item.name}</td>
                    <td className="pl-3">{item.from}</td>
                    <td className="pl-3">{item.to}</td>
                    <td className="pl-3">{item.phone}</td>
                    <td className="pl-3">{item.date}</td>
                    <td className="pl-3">{item.time}</td>
                    <td className="pl-3">{item.days}</td>
                    <td className="pl-3">{item.driverNeeded}</td>
                    <td className="pl-3 py-2">
                      <div className="relative">
                        <button
                          onClick={() => handleStatusClick(index)}
                          className={`flex items-center justify-between  rounded-lg  gap-2 w-[120px] text-sm ${
                            item.status.toLowerCase() == "pending"
                              ? "px-2 py-1  text-black bg-red-200 "
                              : item.status.toLowerCase() == "booked"
                              ? " bg-green-200 text-black px-2 py-1 "
                              : "bg-gray-200 px-2 py-1  text-black"
                          }`}
                        >
                          {item.status}
                          <ChevronDown
                            className={`cursor-pointer transition-all duration-300 ${
                              openDropDownIndex == index ? "rotate-180" : ""
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
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>
      </section>
    </>
  );
};

export default BookedBikeRentalsTable;
