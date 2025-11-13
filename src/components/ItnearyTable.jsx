import { ArrowUpRight, ChevronDown } from "lucide-react";
import React, { useState } from "react";
import ItnearyCanvas from "./ItnearyCanvas";



const tableHeader = ["Name", "Phone", "Email", "Comming From", "Start Date", "End Date", "Action"];
const tableData = [
  { name: "Nishanth", phone: "1234567890", mail: "nishanth@gmail.com", comingFrom: "Coimbatore", startDate: "12/10/2015", endDate: "20/10/2015" },
  { name: "Surya chandran", phone: "1234567890", mail: "nishanth@gmail.com", comingFrom: "Coimbatore", startDate: "12/10/2015", endDate: "20/10/2015" },
  { name: "Himanshu", phone: "1234567890", mail: "nishanth@gmail.com", comingFrom: "Coimbatore", startDate: "12/10/2015", endDate: "20/10/2015" },
  { name: "Nishanth", phone: "1234567890", mail: "nishanth@gmail.com", comingFrom: "Coimbatore", startDate: "12/10/2015", endDate: "20/10/2015" },
  { name: "Nishanth", phone: "1234567890", mail: "nishanth@gmail.com", comingFrom: "Coimbatore", startDate: "12/10/2015", endDate: "20/10/2015" },
  { name: "Nishanth", phone: "1234567890", mail: "nishanth@gmail.com", comingFrom: "Coimbatore", startDate: "12/10/2015", endDate: "20/10/2015" },
  { name: "Nishanth", phone: "1234567890", mail: "nishanth@gmail.com", comingFrom: "Coimbatore", startDate: "12/10/2015", endDate: "20/10/2015" },
  { name: "Nishanth", phone: "1234567890", mail: "nishanth@gmail.com", comingFrom: "Coimbatore", startDate: "12/10/2015", endDate: "20/10/2015" },
  { name: "Nishanth", phone: "1234567890", mail: "nishanth@gmail.com", comingFrom: "Coimbatore", startDate: "12/10/2015", endDate: "20/10/2015" },
  { name: "Nishanth", phone: "1234567890", mail: "nishanth@gmail.com", comingFrom: "Coimbatore", startDate: "12/10/2015", endDate: "20/10/2015" },
  { name: "Nishanth", phone: "1234567890", mail: "nishanth@gmail.com", comingFrom: "Coimbatore", startDate: "12/10/2015", endDate: "20/10/2015" },
  { name: "Nishanth", phone: "1234567890", mail: "nishanth@gmail.com", comingFrom: "Coimbatore", startDate: "12/10/2015", endDate: "20/10/2015" },
  { name: "Nishanth", phone: "1234567890", mail: "nishanth@gmail.com", comingFrom: "Coimbatore", startDate: "12/10/2015", endDate: "20/10/2015" },
  { name: "Nishanth", phone: "1234567890", mail: "nishanth@gmail.com", comingFrom: "Coimbatore", startDate: "12/10/2015", endDate: "20/10/2015" },
  { name: "Nishanth", phone: "1234567890", mail: "nishanth@gmail.com", comingFrom: "Coimbatore", startDate: "12/10/2015", endDate: "20/10/2015" },
  { name: "Nishanth", phone: "1234567890", mail: "nishanth@gmail.com", comingFrom: "Coimbatore", startDate: "12/10/2015", endDate: "20/10/2015" },
]

const ItnearyTable = () => {
  // states 
  const [status, setStatus] = useState("pending");
  const [isCanvas, setIsCanvas] = useState(false)


  return (
    <>
      <section className="mt-6">

        {/* header section --------------  */}

        <div className="header flex gap-2 items-center">
          <input type="text" placeholder="Search by Name.." className="border w-[300px] border-gray-400 rounded-md px-4 py-2 outline-none" />
          <div className="btn-container">
            <button className="border border-gray-400 cursor-pointer rounded-md py-2 px-4 flex items-center gap-3">{status} <ChevronDown /></button>
          </div>
        </div>

        {/* table section ----------------------  */}

        <div className="table-container mt-6 w-[100%] overflow-auto  h-[calc(100vh-195px)]">
          <table className="w-[100%] border border-gray-300 rounded-lg">
            <thead className="text-white btn-green sticky top-0">
              {tableHeader.map((item, index) => {
                return <td className="pl-4 py-2">{item}</td>
              })}
            </thead>
            <tbody>
              {tableData.map((item, index) => {
                return <tr>
                  <td className="pl-4 py-2">{item.name}</td>
                  <td className="pl-4 py-2">{item.phone}</td>
                  <td className="pl-4 py-2">{item.mail}</td>
                  <td className="pl-4 py-2">{item.comingFrom}</td>
                  <td className="pl-4 py-2">{item.startDate}</td>
                  <td className="pl-4 py-2">{item.endDate}</td>
                  <td className="pl-4 py-2">
                    <ArrowUpRight className="cursor-pointer" onClick={() => setIsCanvas(true)} />
                  </td>
                </tr>
              })}
            </tbody>
          </table>
        </div>

      </section >

      {/* child components -------------------  */}

      {isCanvas && <ItnearyCanvas isCanvas={isCanvas} setIsCanvas={setIsCanvas} />}

    </>
  );
};

export default ItnearyTable;
