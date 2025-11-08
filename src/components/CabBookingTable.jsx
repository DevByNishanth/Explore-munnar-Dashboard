import { ChevronDown } from "lucide-react";
import React, { useState } from "react";
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
    name: "Nishanth",
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

  return (
    <>
      <section className="mt-6 border border-gray-300  max-h-[calc(100vh-170px)] overflow-auto  items-center justify-between">
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
            })}
          </tbody>
        </table>
      </section>
    </>
  );
};

export default CabBookingTable;
