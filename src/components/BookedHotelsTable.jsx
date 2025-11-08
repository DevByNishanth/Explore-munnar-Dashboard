import React, { useState } from "react";
import h1 from "../assets/h1.jpg";
import h2 from "../assets/h2.jpg";
import h3 from "../assets/h3.jpg";
import { ArrowUpRight } from "lucide-react";
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
    customer_name: "Nishanth",
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
  return (
    <>
      <section className="mt-6 border border-gray-300 h-[calc(100vh-170px)] overflow-auto  items-center justify-between">
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
            {tableData.map((item, index) => {
              return (
                <tr
                  key={index}
                  className={` ${
                    tableData.length - 1 == index ? "" : "border-b"
                  }   border-gray-200 text-md text-[#333333]  ${
                    index % 2 == 0 ? "bg-gray-50" : ""
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
                      className={`${
                        item.status.toLowerCase() == "pending"
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
              );
            })}
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
