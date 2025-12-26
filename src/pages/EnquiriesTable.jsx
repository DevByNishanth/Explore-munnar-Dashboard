import React, { useState, useRef } from "react";
import { ChevronDown, Edit } from "lucide-react";
import axios from "axios";
import NoData from "../components/NoData";

const tableheader = [
    "First Name",
    "Last Name",
    "Phone number",
    "E mail",
    "Status",
    "Action",
];

const tableData = [
    { id: 1, firstName: "Nishanth", lastName: "A", phoneNumber: "1234567890", mail: "nishanth@gmail.com", status: "Pending" },
    { id: 2, firstName: "Venkatesh", lastName: "C", phoneNumber: "1234567890", mail: "nishanth@gmail.com", status: "Done" },
    { id: 3, firstName: "Abhishek", lastName: "K", phoneNumber: "1234567890", mail: "abhishek@gmail.com", status: "Pending" },
];

const EnquiriesTable = () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [modalStatus, setModalStatus] = useState("");
    const [modalNote, setModalNote] = useState("");
    const [selectedId, setSelectedId] = useState(null);
    const [enquiries, setEnquiries] = useState(tableData);
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");
    const [isStatusDropdown, setIsStatusDropdown] = useState(false);
    const [openRowId, setOpenRowId] = useState(null);

    const dropdownRef = useRef(null);

    const updateStatus = async (id, newStatus) => {
        try {
            await axios.put(`${apiUrl}/api/enquiries/${id}`, { status: newStatus });

            setEnquiries((prev) =>
                prev.map((item) =>
                    item.id === id ? { ...item, status: newStatus } : item
                )
            );

            setOpenRowId(null);
        } catch (error) {
            console.error("Failed to update status", error);
        }
    };

    function openEdit(item) {
        setSelectedId(item.id);
        setModalStatus(item.status);
        setModalNote("");
        setIsEditModalOpen(true);
    }

    async function handleUpdate() {
        if (!selectedId) return;
        try {
            await axios.put(`${apiUrl}/api/enquiries/${selectedId}`, {
                status: modalStatus,
                note: modalNote,
            });
            setEnquiries((prev) =>
                prev.map((item) =>
                    item.id === selectedId ? { ...item, status: modalStatus } : item
                )
            );
            setIsEditModalOpen(false);
            setSelectedId(null);
            setModalNote("");
        } catch (err) {
            console.error("Failed to update enquiry", err);
        }
    }

    const filteredData = enquiries.filter((item) => {
        const nameMatch =
            item.firstName.toLowerCase().includes(search.toLowerCase()) ||
            item.lastName.toLowerCase().includes(search.toLowerCase());

        const statusMatch = status
            ? item.status.toLowerCase() === status
            : true;

        return nameMatch && statusMatch;
    });

    return (
        <>
            {/* FILTER SECTION (UNCHANGED UI) */}
            <div className="filter-sections mt-3 flex items-center gap-4">
                <input
                    type="text"
                    placeholder="Search by name.."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border border-gray-400 rounded-md px-3 py-2 outline-none w-[300px]"
                />

                <div className="dropdown-container relative z-20">
                    <button
                        onClick={() => setIsStatusDropdown(!isStatusDropdown)}
                        className="status-btn border py-2 border-gray-300 w-[120px] rounded-lg flex gap-2 items-center justify-center"
                    >
                        {status ? status : "Status"}
                        <ChevronDown
                            className={`${isStatusDropdown ? "rotate-180" : ""
                                } transition-all duration-300`}
                        />
                    </button>

                    {isStatusDropdown && (
                        <div
                            ref={dropdownRef}
                            className="dropdown absolute top-full w-full bg-white border border-gray-300 shadow-lg rounded"
                        >
                            <button
                                onClick={() => {
                                    setStatus("");
                                    setIsStatusDropdown(false);
                                }}
                                className="px-2 py-2 w-full text-left hover:bg-gray-50"
                            >
                                All
                            </button>
                            <button
                                onClick={() => {
                                    setStatus("pending");
                                    setIsStatusDropdown(false);
                                }}
                                className="px-2 py-2 w-full text-left hover:bg-gray-50"
                            >
                                Pending
                            </button>
                            <button
                                onClick={() => {
                                    setStatus("done");
                                    setIsStatusDropdown(false);
                                }}
                                className="px-2 py-2 w-full text-left hover:bg-gray-50"
                            >
                                Done
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* TABLE */}
            <section className="mt-3 border border-gray-300 max-h-[calc(100vh-200px)] overflow-auto">
                <table className="w-full">
                    <thead className="bg-[#124523] text-white sticky top-0">
                        <tr>
                            {tableheader.map((item, index) => (
                                <td key={index} className="py-2 px-2">
                                    {item}
                                </td>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {filteredData.map((item, index) => (
                            <tr
                                key={item.id}
                                className={`border-b border-gray-200 ${index % 2 === 0 ? "bg-gray-50" : ""
                                    }`}
                            >
                                <td className="pl-3 py-2">{item.firstName}</td>
                                <td className="pl-3 py-2">{item.lastName}</td>
                                <td className="pl-3 py-2">{item.phoneNumber}</td>
                                <td className="pl-3 py-2">{item.mail}</td>

                                {/* STATUS DROPDOWN (CUSTOM) */}
                                <td className="pl-3 py-2 relative">
                                    <button
                                        onClick={() =>
                                            setOpenRowId(
                                                openRowId === item.id ? null : item.id
                                            )
                                        }
                                        className={`w-[140px] py-1 rounded-lg flex items-center justify-between px-2
                      ${item.status.toLowerCase() === "pending"
                                                ? "bg-red-300"
                                                : "bg-green-200"
                                            }`}
                                    >
                                        {item.status}
                                        <ChevronDown />
                                    </button>

                                    {openRowId === item.id && (
                                        <div className="absolute top-full z-10 mt-1 w-[140px] bg-white border rounded shadow">
                                            <button
                                                onClick={() => updateStatus(item.id, "Pending")}
                                                className="w-full text-left px-3 py-2 hover:bg-gray-100"
                                            >
                                                Pending
                                            </button>
                                            <button
                                                onClick={() => updateStatus(item.id, "Done")}
                                                className="w-full text-left px-3 py-2 hover:bg-gray-100"
                                            >
                                                Done
                                            </button>
                                        </div>
                                    )}
                                </td>
                                <td className="pl-3 py-2">
                                    <button
                                        onClick={() => openEdit(item)}
                                        className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center"
                                    >
                                        <Edit className="w-4 h-4 text-gray-700" />
                                    </button>
                                </td>
                            </tr>
                        ))}

                        {filteredData.length === 0 && (
                            <tr>
                                <td colSpan={tableheader.length}>
                                    <NoData />
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </section>
            {isEditModalOpen && (
                <div className="fixed inset-0 bg-black/50 z-30 flex items-center justify-center">
                    <div className="bg-white w-[420px] rounded-lg shadow-lg p-5">
                        <h1 className="text-lg font-medium text-[#333333]">Update Enquiry</h1>
                        <div className="mt-4">
                            <label className="text-sm text-gray-600">Note</label>
                            <input
                                type="text"
                                value={modalNote}
                                onChange={(e) => setModalNote(e.target.value)}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none mt-1"
                                placeholder="Add a note..."
                            />
                        </div>
                        <div className="mt-4">
                            <label className="text-sm text-gray-600">Status</label>
                            <select
                                value={modalStatus}
                                onChange={(e) => setModalStatus(e.target.value)}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none mt-1"
                            >
                                <option value="Pending">Pending</option>
                                <option value="Done">Done</option>
                            </select>
                        </div>
                        <div className="mt-5 flex justify-end gap-3">
                            <button
                                onClick={() => setIsEditModalOpen(false)}
                                className="px-4 py-2 rounded-md border border-gray-300 text-gray-700"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleUpdate}
                                className="btn-green text-white px-4 py-2 rounded-md"
                            >
                                Update
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default EnquiriesTable;
