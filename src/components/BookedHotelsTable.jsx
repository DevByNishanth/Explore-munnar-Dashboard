import React, { useEffect, useRef, useState } from "react";
import h1 from "../assets/h1.jpg";
import h2 from "../assets/h2.jpg";
import h3 from "../assets/h3.jpg";
import noData from '../assets/noData.svg'
import { ArrowUpRight, ChevronDown } from "lucide-react";
import HotelCanvas from "./HotelCanvas";
const tableheader = [
  "Hotel",
  "Name",
  "Phone",
  "E mail",
  "Check-in",
  "Check-Out",
  "Status",
  "Action",
];

const tableData = [
  {
    customer_name: "Nishanth",
    hotel_name: "Hilton Garden Inn",
    hotelImg: h1,
    phone: 1234567890,
    mail: "nishanth@gmail.com",
    status: "pending",
    adults: 3,
    checkIn: "10am",
    checkOut: "11pm",
    price: 3000,
    hotelNumber: 1234567890,
    kids: 2,
    address:
      "Beach Road, Near Lighthouse Junction Kovalam, Thiruvananthapuram, Kerala 695527",
  },
  {
    customer_name: "Surya chandran",
    hotel_name: "Hilton Garden Inn",
    hotelImg: h2,
    phone: 1234567890,
    mail: "nishanth@gmail.com",
    status: "Booked",
    checkIn: "10am",
    adults: 3,
    checkOut: "11pm",
    price: 3000,
    hotelNumber: 1234567890,
    kids: 2,
    address:
      "Beach Road, Near Lighthouse Junction Kovalam, Thiruvananthapuram, Kerala 695527",
  },
  {
    customer_name: "Nishanth",
    hotel_name: "Hilton Garden Inn",
    hotelImg: h3,
    phone: 1234567890,
    mail: "nishanth@gmail.com",
    status: "Booked",
    checkIn: "10am",
    checkOut: "11pm",
    adults: 3,
    price: 3000,
    hotelNumber: 1234567890,
    kids: 2,
    address:
      "Beach Road, Near Lighthouse Junction Kovalam, Thiruvananthapuram, Kerala 695527",
  },
  {
    customer_name: "Nishanth",
    hotel_name: "Hilton Garden Inn",
    hotelImg: h3,
    phone: 1234567890,
    mail: "nishanth@gmail.com",
    status: "Booked",
    adults: 3,
    checkIn: "10am",
    checkOut: "11pm",
    price: 3000,
    hotelNumber: 1234567890,
    kids: 2,
    address:
      "Beach Road, Near Lighthouse Junction Kovalam, Thiruvananthapuram, Kerala 695527",
  },
  {
    customer_name: "Nishanth",
    hotel_name: "Hilton Garden Inn",
    hotelImg: h3,
    phone: 1234567890,
    mail: "nishanth@gmail.com",
    status: "Booked",
    adults: 3,
    checkIn: "10am",
    checkOut: "11pm",
    price: 3000,
    hotelNumber: 1234567890,
    kids: 2,
    address:
      "Beach Road, Near Lighthouse Junction Kovalam, Thiruvananthapuram, Kerala 695527",
  },
  {
    customer_name: "Nishanth",
    hotel_name: "Hilton Garden Inn",
    hotelImg: h3,
    phone: 1234567890,
    mail: "nishanth@gmail.com",
    status: "Booked",
    checkIn: "10am",
    checkOut: "11pm",
    price: 3000,
    hotelNumber: 1234567890,
    kids: 2,
    adults: 3,
    address:
      "Beach Road, Near Lighthouse Junction Kovalam, Thiruvananthapuram, Kerala 695527",
  },
  {
    customer_name: "Nishanth",
    hotel_name: "Hilton Garden Inn",
    hotelImg: h3,
    phone: 1234567890,
    mail: "nishanth@gmail.com",
    adults: 3,
    status: "Booked",
    checkIn: "10am",
    checkOut: "11pm",
    price: 3000,
    kids: 2,
    hotelNumber: 1234567890,
    address:
      "Beach Road, Near Lighthouse Junction Kovalam, Thiruvananthapuram, Kerala 695527",
  },
];

const BookedHotelsTable = () => {
  // states
  const [isCanvas, setIsCanvas] = useState(false);
  const [canvasData, setCanvasData] = useState(null);
  const [isStautusDropdown, setIsStatusDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredData, setFilteredData] = useState([])
  const [selectedStatus, setSelectedStatus] = useState(null)
  const [status, setStatus] = useState(null)


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


  // functions 

  // Search handler ----------------->
  const handleSearch = () => {
    if (searchQuery == "") {
      setFilteredData(tableData);
      return;
    }
    const filteredData = tableData.filter((item) => {
      return (
        item.customer_name.toLowerCase().includes(searchQuery.toLowerCase()) || item.hotel_name.toLowerCase().includes(searchQuery.toLowerCase())
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
      <div className="input-container mt-4 flex gap-3 items-center">
        <input
          type="text"
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by hotel name or customer name .."
          className="w-[400px] rounded-lg border border-gray-300 py-2 px-4 outline-none"
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
      <section className="mt-4 border border-gray-300 h-[calc(100vh-220px)] overflow-auto  items-center justify-between">
        <table className="w-[100%] px-4">
          <thead className="w-[100%] bg-[#124523] text-white rounded-xl sticky top-0">
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
                return <tr
                  key={index}
                  className={` ${tableData.length - 1 == index ? "" : "border-b"
                    }   border-gray-200 text-md text-[#333333]  ${index % 2 == 0 ? "bg-gray-50" : ""
                    } `}
                >
                  <td className="container-1 pl-2 py-3">
                    <div className="flex items-center gap-4">
                      <img
                        src={item.hotelImg}
                        className="w-[120px] h-[60px] rounded-lg object-fit "
                      />
                      <div>
                        <h1 className="text-green-700">#1234</h1>
                        <h1>{item.hotel_name.slice(0, 15)}..</h1>
                      </div>
                    </div>
                  </td>
                  <td className="pl-3">{item.customer_name}</td>
                  <td className="pl-3">{item.phone}</td>
                  <td className="pl-3">{item.mail}</td>
                  <td className="pl-3">{item.checkIn}</td>
                  <td className="pl-3">{item.checkOut}</td>
                  <td className="pl-3">
                    <button
                      className={`${item.status.toLowerCase() == "pending"
                        ? "text-rose-600  "
                        : "text-green-600 -white"
                        } text-center py-1 rounded-lg `}
                    >
                      {item.status}
                    </button>
                  </td>
                  <td className="pl-2">
                    <div className="flex justify-center">
                      <ArrowUpRight
                        onClick={() => {
                          setCanvasData(item);
                          setIsCanvas(true);
                        }}
                        className="cursor-pointer"
                      />
                    </div>
                  </td>
                </tr>
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
      {isCanvas && (
        <HotelCanvas
          setIsCanvas={setIsCanvas}
          isCanvas={isCanvas}
          canvasData={canvasData}
        />
      )}
    </>
  );
};

export default BookedHotelsTable;
