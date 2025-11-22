import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { Link } from "react-router-dom";
import { Ban, ChevronRight, Search } from "lucide-react";
import man from "../assets/man.jpg";
import man1 from "../assets/man1.jpg";
import man2 from "../assets/man2.jpg";
import BlockUserDialog from "../components/BlockUserDialog";

const data = [
  {
    profileImg: man,
    firstName: "Nishanth",
    lastName: "A",
    email: "nishanth@gmail.com",
    phone: 1234567890,
  },
  {
    profileImg: man2,
    firstName: "Surya",
    lastName: "Chandran",
    email: "nishanth@gmail.com",
    phone: 1234567890,
  },
  {
    profileImg: man1,
    firstName: "Surya",
    lastName: "Kumar",
    email: "nishanth@gmail.com",
    phone: 1234567890,
  },
  {
    profileImg: null,
    firstName: "Nishanth",
    lastName: "A",
    email: "nishanth@gmail.com",
    phone: 1234567890,
  },
  {
    profileImg: null,
    firstName: "Nishanth",
    lastName: "A",
    email: "nishanth@gmail.com",
    phone: 1234567890,
  },
  {
    profileImg: man2,
    firstName: "Ashish",
    lastName: "Shukla",
    email: "nishanth@gmail.com",
    phone: 1234567890,
  },
  {
    profileImg: null,
    firstName: "Nishanth",
    lastName: "A",
    email: "nishanth@gmail.com",
    phone: 1234567890,
  },
  {
    profileImg: man1,
    firstName: "Nishanth",
    lastName: "A",
    email: "nishanth@gmail.com",
    phone: 1234567890,
  },
  {
    profileImg: man,
    firstName: "Nishanth",
    lastName: "A",
    email: "nishanth@gmail.com",
    phone: 1234567890,
  },
  {
    profileImg: man2,
    firstName: "Surya",
    lastName: "Chandran",
    email: "nishanth@gmail.com",
    phone: 1234567890,
  },
  {
    profileImg: man1,
    firstName: "Surya",
    lastName: "Kumar",
    email: "nishanth@gmail.com",
    phone: 1234567890,
  },
  {
    profileImg: null,
    firstName: "Nishanth",
    lastName: "A",
    email: "nishanth@gmail.com",
    phone: 1234567890,
  },
  {
    profileImg: null,
    firstName: "Nishanth",
    lastName: "A",
    email: "nishanth@gmail.com",
    phone: 1234567890,
  },
  {
    profileImg: man2,
    firstName: "Ashish",
    lastName: "Shukla",
    email: "nishanth@gmail.com",
    phone: 1234567890,
  },
  {
    profileImg: null,
    firstName: "Nishanth",
    lastName: "A",
    email: "nishanth@gmail.com",
    phone: 1234567890,
  },
  {
    profileImg: man1,
    firstName: "Nishanth",
    lastName: "A",
    email: "nishanth@gmail.com",
    phone: 1234567890,
  },
];

const colors = [
  "bg-red-400",
  "bg-blue-400",
  "bg-green-400",
  "bg-yellow-400",
  "bg-purple-400",
  "bg-pink-400",
  "bg-orange-400",
];

const UsersPage = () => {
  // states
  const [isConfirmModal, setIsConfirmModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  useEffect(() => {
    hanldeSearch();
  }, [searchQuery]);

  // functions
  const hanldeSearch = () => {
    if (searchQuery == "") {
      setFilteredData(data);
      return;
    }
    const filtered = data.filter((item) => {
      return item.firstName.toLowerCase().includes(searchQuery.toLowerCase());
    });
    setFilteredData(filtered);
  };

  return (
    <>
      <section className="flex w-[100%]">
        <Sidebar />
        <div className="main-container mt-4 md:mx-6 w-[100%]">
          <div className="breadcrumbs-section flex items-center justify-between">
            <h1 className="flex items-center text-gray-600">
              <Link to="/">Dashboard</Link>
              <ChevronRight />
              <span className="font-medium text-black">Users</span>
            </h1>
          </div>

          <div className="searchbar-container w-fit mt-6 relative">
            <input
              type="text"
              placeholder="Search by name.."
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border w-[340px] px-4 py-2 rounded-md border-gray-400 outline-none"
            />
            <Search className="absolute top-[50%] translate-y-[-50%] right-3 text-gray-400 w-6 h-6" />
          </div>
          {/* --------- user table section -------------  */}
          <div className="card-container mt-3 sm:grid grid-cols-4 gap-4 max-h-[calc(100vh-150px)] overflow-auto">
            {filteredData.map((item) => {
              return (
                <div className="card w-full border border-gray-300 rounded-lg relative">
                  <div className="absolute top-0 right-0 w-0 h-0 border-t-[40px] border-t-green-900 border-l-[40px] border-l-transparent rounded-tr-lg"></div>
                  <div className="content-container p-3 flex items-center gap-3 ">
                    {item.profileImg !== null ? (
                      <img
                        src={item.profileImg}
                        className="w-12 h-12 rounded-full"
                      />
                    ) : (
                      <div
                        className={`${
                          colors[Math.floor(Math.random() * colors.length)]
                        } 
                w-10 h-10 rounded-full flex items-center justify-center font-medium text-black`}
                      >
                        <p>{item.firstName.slice(0, 1)}</p>
                      </div>
                    )}
                    <div className="content">
                      <h1 className="text-gray-700">{item.firstName}</h1>
                      <h1 className="text-gray-600">{item.lastName}</h1>
                      <h1 className="text-green-800">{item.phone}</h1>
                    </div>
                  </div>
                  <div className="footer-container mb-2 mx-4">
                    <button
                      onClick={() => setIsConfirmModal(true)}
                      className="flex items-center gap-2 border border-gray-200 px-4 rounded-full cursor-pointer hover:bg-gray-100 py-2 text-black text-sm"
                    >
                      {" "}
                      <Ban className="w-5 h-5 text-red-600" /> Block user
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      {isConfirmModal && (
        <BlockUserDialog setIsConfirmModal={setIsConfirmModal} />
      )}
    </>
  );
};

export default UsersPage;
