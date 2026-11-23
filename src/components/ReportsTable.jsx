import React, { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import {
  Bike,
  Calendar,
  Car,
  CarFront,
  ChevronDown,
  Hotel,
  Search,
  X,
} from "lucide-react";

const MODULES = [
  { key: "hotel", label: "Hotel bookings", icon: Hotel, endpoint: "hotel-booking" },
  { key: "cab", label: "Cab bookings", icon: Car, endpoint: "cab-booking" },
  { key: "selfCar", label: "Self car drive", icon: CarFront, endpoint: "self-drive" },
  { key: "bike", label: "Bike rentals", icon: Bike, endpoint: "bike-rentals" },
];

const COLUMNS = {
  hotel: ["Hotel", "Name", "Phone", "E mail", "Check-in", "Check-Out", "Status"],
  cab: ["Customer Name", "From", "To", "Phone", "Date", "Time", "Passenger", "Vehicle Type", "Status"],
  selfCar: ["Name", "From", "To", "Phone", "Date", "Time", "Days", "Fuel Type", "Car Category", "Driver", "Status"],
  bike: ["Name", "From", "To", "Phone", "Date", "Time", "Days", "Driver Needed", "Status"],
};

const EMPTY_FILTERS = { search: "", dateFrom: "", dateTo: "", status: "All" };
const toDateInput = (value) => {
  if (!value) return "";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? String(value).slice(0, 10) : date.toISOString().slice(0, 10);
};
const formatDate = (value) => {
  const date = toDateInput(value);
  if (!date) return "—";
  const [year, month, day] = date.split("-");
  return `${day}/${month}/${year}`;
};
const normalizeStatus = (status) => {
  const value = String(status || "Pending").toLowerCase();
  if (value.includes("cancel")) return "Cancelled";
  if (value.includes("complete") || value.includes("confirm") || value === "booked") return "Completed";
  return "Pending";
};

const mapBooking = (key, booking) => {
  if (key === "hotel") {
    return {
      id: booking.id,
      hotel: booking.hotelName || "—",
      name: booking.name || [booking.firstName, booking.lastName].filter(Boolean).join(" ") || "—",
      phone: booking.phone || "—",
      email: booking.email || "—",
      checkIn: formatDate(booking.checkIn),
      checkOut: formatDate(booking.checkOut),
      dateValue: toDateInput(booking.checkIn),
      status: booking.status || "Pending",
    };
  }
  if (key === "cab") {
    return {
      id: booking.id,
      name: booking.name || "—",
      from: booking.pickup_point || "—",
      to: booking.drop_point || "—",
      phone: booking.mobile_number || booking.phone || "—",
      date: formatDate(booking.date),
      dateValue: toDateInput(booking.date),
      time: booking.time || "—",
      passenger: booking.no_of_passengers ?? "—",
      vehicleType: booking.vehicle_type || "—",
      status: booking.status || "Pending",
    };
  }
  if (key === "selfCar") {
    return {
      id: booking.id,
      name: booking.name || "—",
      from: booking.from || "—",
      to: booking.to || "—",
      phone: booking.phone || "—",
      date: formatDate(booking.date),
      dateValue: toDateInput(booking.date),
      time: booking.time || "—",
      days: booking.days ?? "—",
      fuelType: booking.fueltype || booking.fuelType || "—",
      carCategory: booking.carCategory || "—",
      driver: booking.driverNeeded || "—",
      status: booking.status || "Pending",
    };
  }
  return {
    id: booking.id,
    name: booking.name || "—",
    from: booking.from || "—",
    to: booking.to || "—",
    phone: booking.phone || "—",
    date: formatDate(booking.date),
    dateValue: toDateInput(booking.date),
    time: booking.time || "—",
    days: booking.noOfDays ?? booking.days ?? "—",
    driverNeeded: booking.driverNeeded || "—",
    status: booking.status || "Pending",
  };
};

const StatusBadge = ({ status }) => {
  const normalized = normalizeStatus(status);
  const tone = normalized === "Pending" ? "text-amber-700 bg-amber-50"
    : normalized === "Completed" ? "text-green-700 bg-green-50" : "text-gray-600 bg-gray-100";
  return <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${tone}`}>{status || "Pending"}</span>;
};

const FilterBar = ({ filters, updateFilter, resetFilters, resultCount, totalCount }) => {
  const [statusOpen, setStatusOpen] = useState(false);
  const dropdownRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) setStatusOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const hasFilters = filters.search || filters.dateFrom || filters.dateTo || filters.status !== "All";
  return (
    <div className="mt-4 mb-3 flex flex-wrap items-end gap-3">
      <div className="relative min-w-[220px] max-w-[340px] flex-1">
        <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input type="text" placeholder="Search bookings..." value={filters.search}
          onChange={(event) => updateFilter("search", event.target.value)}
          className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-9 pr-4 text-sm text-gray-700 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20" />
      </div>
      <div className="relative">
        <Calendar size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input aria-label="From date" type="date" value={filters.dateFrom}
          onChange={(event) => updateFilter("dateFrom", event.target.value)}
          className="rounded-xl border border-gray-200 bg-white py-2.5 pl-8 pr-3 text-sm text-gray-700 outline-none focus:border-emerald-500 [color-scheme:light]" />
      </div>
      <span className="pb-0.5 text-xs font-medium text-gray-400">to</span>
      <div className="relative">
        <Calendar size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input aria-label="To date" type="date" min={filters.dateFrom || undefined} value={filters.dateTo}
          onChange={(event) => updateFilter("dateTo", event.target.value)}
          className="rounded-xl border border-gray-200 bg-white py-2.5 pl-8 pr-3 text-sm text-gray-700 outline-none focus:border-emerald-500 [color-scheme:light]" />
      </div>
      <div className="relative" ref={dropdownRef}>
        <button type="button" onClick={() => setStatusOpen((open) => !open)}
          className={`flex cursor-pointer items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium ${filters.status !== "All" ? "border-emerald-300 bg-emerald-50 text-emerald-700" : "border-gray-200 bg-white text-gray-600"}`}>
          {filters.status === "All" ? "Status" : filters.status}<ChevronDown size={14} className={statusOpen ? "rotate-180" : ""} />
        </button>
        {statusOpen && <div className="absolute left-0 top-full z-30 mt-1 w-36 rounded-xl border border-gray-200 bg-white py-1 shadow-lg">
          {["All", "Pending", "Completed", "Cancelled"].map((status) => (
            <button type="button" key={status} onClick={() => { updateFilter("status", status); setStatusOpen(false); }}
              className={`w-full cursor-pointer px-4 py-2 text-left text-sm ${filters.status === status ? "bg-emerald-50 font-medium text-emerald-700" : "text-gray-600 hover:bg-gray-50"}`}>{status}</button>
          ))}
        </div>}
      </div>
      {hasFilters && <button type="button" onClick={resetFilters} className="flex cursor-pointer items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-500 hover:text-red-500"><X size={14} />Reset</button>}
      <span className="ml-auto pb-0.5 text-xs text-gray-400">Showing {resultCount} of {totalCount}</span>
    </div>
  );
};

const ReportsTable = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [selectedTab, setSelectedTab] = useState("hotel");
  const [bookings, setBookings] = useState({ hotel: [], cab: [], selfCar: [], bike: [] });
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ hotel: { ...EMPTY_FILTERS }, cab: { ...EMPTY_FILTERS }, selfCar: { ...EMPTY_FILTERS }, bike: { ...EMPTY_FILTERS } });

  useEffect(() => {
    let active = true;
    Promise.all(MODULES.map(async ({ key, endpoint }) => {
      try {
        const { data } = await axios.get(`${apiUrl}/api/${endpoint}`);
        return [key, Array.isArray(data?.data) ? data.data : []];
      } catch (error) {
        console.error(`Unable to load ${key} report table:`, error);
        return [key, []];
      }
    })).then((entries) => {
      if (active) {
        setBookings(Object.fromEntries(entries));
        setLoading(false);
      }
    });
    return () => { active = false; };
  }, [apiUrl]);

  const module = MODULES.find(({ key }) => key === selectedTab);
  const rawRows = bookings[selectedTab].map((booking) => mapBooking(selectedTab, booking));
  const currentFilters = filters[selectedTab];
  const visibleRows = useMemo(() => rawRows.filter((row) => {
    const query = currentFilters.search.trim().toLowerCase();
    if (query && !Object.values(row).some((value) => String(value ?? "").toLowerCase().includes(query))) return false;
    if (currentFilters.dateFrom && (!row.dateValue || row.dateValue < currentFilters.dateFrom)) return false;
    if (currentFilters.dateTo && (!row.dateValue || row.dateValue > currentFilters.dateTo)) return false;
    if (currentFilters.status !== "All" && normalizeStatus(row.status) !== currentFilters.status) return false;
    return true;
  }), [rawRows, currentFilters]);

  const updateFilter = (key, value) => setFilters((previous) => ({
    ...previous,
    [selectedTab]: { ...previous[selectedTab], [key]: value },
  }));
  const resetFilters = () => setFilters((previous) => ({ ...previous, [selectedTab]: { ...EMPTY_FILTERS } }));

  return (
    <section>
      <div className="mt-3 flex w-fit max-w-full flex-wrap items-center gap-1 rounded-full bg-gray-100 p-2 text-sm">
        {MODULES.map(({ key, label, icon: Icon }) => (
          <button type="button" onClick={() => setSelectedTab(key)} key={key}
            className={`flex cursor-pointer items-center gap-2 rounded-full px-4 py-2 ${selectedTab === key ? "bg-emerald-700 text-white" : "text-gray-600 hover:bg-white"}`}>
            <Icon size={18} /><span>{label}</span>
          </button>
        ))}
      </div>
      <FilterBar filters={currentFilters} updateFilter={updateFilter} resetFilters={resetFilters}
        resultCount={visibleRows.length} totalCount={rawRows.length} />
      <section className="max-h-[calc(100vh-320px)] overflow-auto rounded-xl border border-gray-200 bg-white">
        <table className="w-full min-w-max border-collapse text-left">
          <thead className="sticky top-0 z-10 bg-[#124523] text-white">
            <tr>{COLUMNS[selectedTab].map((column) => <th key={column} className="whitespace-nowrap px-3 py-3 text-xs font-semibold">{column}</th>)}</tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={COLUMNS[selectedTab].length} className="px-4 py-10 text-center text-sm text-gray-500">Loading bookings…</td></tr>
            ) : visibleRows.length ? visibleRows.map((row, index) => (
              <tr key={row.id ?? index} className={`border-b border-gray-100 text-sm text-[#333] ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}>
                {selectedTab === "hotel" && <>
                  <td className="whitespace-nowrap px-3 py-3 font-medium text-green-700">{row.hotel}</td><td className="whitespace-nowrap px-3 py-3">{row.name}</td><td className="whitespace-nowrap px-3 py-3">{row.phone}</td><td className="px-3 py-3">{row.email}</td><td className="whitespace-nowrap px-3 py-3">{row.checkIn}</td><td className="whitespace-nowrap px-3 py-3">{row.checkOut}</td>
                </>}
                {selectedTab === "cab" && <>
                  <td className="whitespace-nowrap px-3 py-3 font-medium">{row.name}</td><td className="px-3 py-3">{row.from}</td><td className="px-3 py-3">{row.to}</td><td className="whitespace-nowrap px-3 py-3">{row.phone}</td><td className="whitespace-nowrap px-3 py-3">{row.date}</td><td className="whitespace-nowrap px-3 py-3">{row.time}</td><td className="px-3 py-3">{row.passenger}</td><td className="whitespace-nowrap px-3 py-3">{row.vehicleType}</td>
                </>}
                {selectedTab === "selfCar" && <>
                  <td className="whitespace-nowrap px-3 py-3 font-medium">{row.name}</td><td className="px-3 py-3">{row.from}</td><td className="px-3 py-3">{row.to}</td><td className="whitespace-nowrap px-3 py-3">{row.phone}</td><td className="whitespace-nowrap px-3 py-3">{row.date}</td><td className="whitespace-nowrap px-3 py-3">{row.time}</td><td className="px-3 py-3">{row.days}</td><td className="px-3 py-3">{row.fuelType}</td><td className="px-3 py-3">{row.carCategory}</td><td className="px-3 py-3">{row.driver}</td>
                </>}
                {selectedTab === "bike" && <>
                  <td className="whitespace-nowrap px-3 py-3 font-medium">{row.name}</td><td className="px-3 py-3">{row.from}</td><td className="px-3 py-3">{row.to}</td><td className="whitespace-nowrap px-3 py-3">{row.phone}</td><td className="whitespace-nowrap px-3 py-3">{row.date}</td><td className="whitespace-nowrap px-3 py-3">{row.time}</td><td className="px-3 py-3">{row.days}</td><td className="px-3 py-3">{row.driverNeeded}</td>
                </>}
                <td className="whitespace-nowrap px-3 py-3"><StatusBadge status={row.status} /></td>
              </tr>
            )) : (
              <tr><td colSpan={COLUMNS[selectedTab].length} className="px-4 py-10 text-center text-sm text-gray-500">
                {rawRows.length ? "No bookings match the selected filters." : `No ${module.label.toLowerCase()} found.`}
              </td></tr>
            )}
          </tbody>
        </table>
      </section>
    </section>
  );
};

export default ReportsTable;
