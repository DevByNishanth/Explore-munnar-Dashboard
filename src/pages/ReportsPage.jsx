import React, { useMemo, useState } from "react";
import Sidebar from "../components/Sidebar";
import {
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Download,
  FileSpreadsheet,
  Filter,
  RotateCcw,
  XCircle,
} from "lucide-react";
import { Link } from "react-router-dom";

// Static report data for the frontend. Replace this array with the reports API response later.
const reportRows = [
  { id: "HTL-1048", module: "Hotel bookings", customer: "Ananya Nair", contact: "+91 98765 43210", item: "The Fog Munnar", date: "2026-08-02", detail: "02 Aug – 05 Aug · 2 guests", status: "Confirmed", amount: 12400 },
  { id: "CAB-2581", module: "Cab bookings", customer: "Vishnu Menon", contact: "+91 98470 11564", item: "Munnar → Kochi", date: "2026-08-03", detail: "Sedan · 3 passengers", status: "Pending", amount: 3150 },
  { id: "BIK-5819", module: "Bike rentals", customer: "Arjun Thomas", contact: "+91 99950 88211", item: "Royal Enfield Classic", date: "2026-08-04", detail: "2 days · Self pick-up", status: "Confirmed", amount: 2400 },
  { id: "CAR-3294", module: "Self-drive cars", customer: "Fathima K", contact: "+91 80895 30129", item: "Hyundai Creta", date: "2026-08-05", detail: "3 days · Diesel", status: "Pending", amount: 8100 },
  { id: "HTL-1047", module: "Hotel bookings", customer: "Nikhil Raj", contact: "+91 94003 67122", item: "Amber Dale Resort", date: "2026-07-28", detail: "28 Jul – 30 Jul · 4 guests", status: "Cancelled", amount: 9600 },
  { id: "CAB-2580", module: "Cab bookings", customer: "Meera Suresh", contact: "+91 85902 22015", item: "Munnar local sightseeing", date: "2026-07-22", detail: "SUV · 5 passengers", status: "Confirmed", amount: 4200 },
  { id: "BIK-5818", module: "Bike rentals", customer: "Joel Mathew", contact: "+91 77361 45435", item: "Honda Activa", date: "2026-07-19", detail: "1 day · Self pick-up", status: "Completed", amount: 750 },
  { id: "CAR-3293", module: "Self-drive cars", customer: "Diya Paul", contact: "+91 95620 77188", item: "Maruti Baleno", date: "2026-07-12", detail: "2 days · Petrol", status: "Completed", amount: 4400 },
  { id: "HTL-1046", module: "Hotel bookings", customer: "Rohan George", contact: "+91 70127 66321", item: "Windermere Estate", date: "2026-06-30", detail: "30 Jun – 03 Jul · 2 guests", status: "Confirmed", amount: 18800 },
];

const modules = ["All modules", "Hotel bookings", "Cab bookings", "Bike rentals", "Self-drive cars"];
const statuses = ["All statuses", "Confirmed", "Pending", "Completed", "Cancelled"];

const formatDate = (value) => new Intl.DateTimeFormat("en-IN", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(`${value}T00:00:00`));
const formatAmount = (value) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(value);

const statusStyle = {
  Confirmed: "bg-emerald-50 text-emerald-700 ring-emerald-100",
  Pending: "bg-amber-50 text-amber-700 ring-amber-100",
  Completed: "bg-sky-50 text-sky-700 ring-sky-100",
  Cancelled: "bg-rose-50 text-rose-700 ring-rose-100",
};

const ReportsPage = () => {
  const [module, setModule] = useState("All modules");
  const [status, setStatus] = useState("All statuses");
  const [month, setMonth] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const filteredRows = useMemo(() => reportRows.filter((row) => {
    const matchesModule = module === "All modules" || row.module === module;
    const matchesStatus = status === "All statuses" || row.status === status;
    const matchesMonth = !month || row.date.startsWith(month);
    const matchesStart = !startDate || row.date >= startDate;
    const matchesEnd = !endDate || row.date <= endDate;
    return matchesModule && matchesStatus && matchesMonth && matchesStart && matchesEnd;
  }), [module, status, month, startDate, endDate]);

  const summary = useMemo(() => ({
    total: filteredRows.length,
    confirmed: filteredRows.filter((row) => row.status === "Confirmed").length,
    pending: filteredRows.filter((row) => row.status === "Pending").length,
    value: filteredRows.filter((row) => row.status !== "Cancelled").reduce((sum, row) => sum + row.amount, 0),
  }), [filteredRows]);

  const clearFilters = () => {
    setModule("All modules"); setStatus("All statuses"); setMonth(""); setStartDate(""); setEndDate("");
  };

  const downloadReport = () => {
    const headers = ["Booking ID", "Module", "Customer", "Contact", "Booking date", "Booking details", "Status", "Amount (INR)"];
    const escapeCsv = (value) => `"${String(value ?? "").replaceAll('"', '""')}"`;
    const csv = [headers, ...filteredRows.map((row) => [row.id, row.module, row.customer, row.contact, formatDate(row.date), `${row.item} — ${row.detail}`, row.status, row.amount])]
      .map((row) => row.map(escapeCsv).join(","))
      .join("\n");
    const link = document.createElement("a");
    link.href = URL.createObjectURL(new Blob(["\ufeff", csv], { type: "text/csv;charset=utf-8;" }));
    link.download = `munnar-booking-report-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(link.href);
  };

  const inputs = "w-full rounded-xl border border-stone-200 bg-white px-3 py-2.5 text-sm text-stone-700 outline-none transition focus:border-[#216432] focus:ring-2 focus:ring-[#216432]/10";

  return (
    <section className="flex min-h-screen bg-[#fcfdfb] ">
      <Sidebar />
      <main className="w-full max-h-[calc(100vh-0px)] overflow-auto px-5 py-5 md:px-8 md:py-7">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="mb-2 flex items-center gap-1 text-sm text-stone-500"><Link to="/" className="hover:text-[#216432]">Dashboard</Link><ChevronRight size={16} /><span>Reports</span></p>
              <h1 className="text-2xl font-semibold tracking-tight text-[#183c27]">Booking reports</h1>
              <p className="mt-1 text-sm text-stone-500">Review and download booking records across all services.</p>
            </div>
            <button onClick={downloadReport} disabled={!filteredRows.length} className="btn-green inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-medium text-white shadow-sm transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-50">
              <Download size={18} /> Download CSV
            </button>
          </div>

          <section className="mt-7 rounded-2xl border border-[#e4eee6] bg-white p-4 shadow-sm md:p-5">
            <div className="flex items-center justify-between gap-4"><div className="flex items-center gap-2"><span className="rounded-lg bg-[#ddf9e4] p-2 text-[#216432]"><Filter size={18} /></span><div><h2 className="font-medium text-stone-800">Report filters</h2><p className="text-xs text-stone-500">Choose the records to include in your export.</p></div></div><button onClick={clearFilters} className="inline-flex items-center gap-1.5 text-sm text-stone-500 hover:text-[#216432]"><RotateCcw size={15} /> Reset</button></div>
            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
              <label className="text-xs font-medium text-stone-600">Booking module<select value={module} onChange={(e) => setModule(e.target.value)} className={`${inputs} mt-1.5`}>{modules.map((item) => <option key={item}>{item}</option>)}</select></label>
              <label className="text-xs font-medium text-stone-600">Status<select value={status} onChange={(e) => setStatus(e.target.value)} className={`${inputs} mt-1.5`}>{statuses.map((item) => <option key={item}>{item}</option>)}</select></label>
              <label className="text-xs font-medium text-stone-600">Month<input type="month" value={month} onChange={(e) => setMonth(e.target.value)} className={`${inputs} mt-1.5`} /></label>
              <label className="text-xs font-medium text-stone-600">From date<input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className={`${inputs} mt-1.5`} /></label>
              <label className="text-xs font-medium text-stone-600">To date<input type="date" value={endDate} min={startDate || undefined} onChange={(e) => setEndDate(e.target.value)} className={`${inputs} mt-1.5`} /></label>
            </div>
            <p className="mt-3 flex items-center gap-1.5 text-xs text-stone-500"><CalendarDays size={14} /> The month filter and date range work together when both are selected.</p>
          </section>

          <section className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {[{ label: "Matching bookings", value: summary.total, icon: <FileSpreadsheet size={19} />, color: "bg-[#ddf9e4] text-[#216432]" }, { label: "Confirmed", value: summary.confirmed, icon: <CheckCircle2 size={19} />, color: "bg-emerald-50 text-emerald-600" }, { label: "Pending action", value: summary.pending, icon: <CalendarDays size={19} />, color: "bg-amber-50 text-amber-600" }, { label: "Booking value", value: formatAmount(summary.value), icon: <CheckCircle2 size={19} />, color: "bg-sky-50 text-sky-600" }].map((card) => <div key={card.label} className="rounded-2xl border border-stone-100 bg-white p-4 shadow-sm"><div className={`mb-4 w-fit rounded-lg p-2 ${card.color}`}>{card.icon}</div><p className="text-sm text-stone-500">{card.label}</p><p className="mt-1 text-xl font-semibold text-stone-800">{card.value}</p></div>)}
          </section>

          <section className="mt-5 overflow-hidden rounded-2xl border border-[#e4eee6] bg-white shadow-sm">
            <div className="flex flex-col justify-between gap-2 border-b border-stone-100 px-5 py-4 sm:flex-row sm:items-center"><div><h2 className="font-medium text-stone-800">Report preview</h2><p className="text-sm text-stone-500">{filteredRows.length} record{filteredRows.length === 1 ? "" : "s"} ready to export</p></div><span className="text-xs text-stone-400">Static preview data</span></div>
            <div className="overflow-x-auto">
              <table className="min-w-[900px] w-full text-left text-sm"><thead className="bg-[#f6faf6] text-xs uppercase tracking-wide text-[#59705d]"><tr>{["Booking ID", "Customer", "Module", "Booking details", "Date", "Status", "Amount"].map((head) => <th key={head} className="whitespace-nowrap px-5 py-3 font-medium">{head}</th>)}</tr></thead>
                <tbody>{filteredRows.map((row) => <tr key={row.id} className="border-t border-stone-100 text-stone-700 hover:bg-[#fafdf9]"><td className="px-5 py-4 font-medium text-[#216432]">{row.id}</td><td className="px-5 py-4"><p className="font-medium text-stone-800">{row.customer}</p><p className="mt-0.5 text-xs text-stone-500">{row.contact}</p></td><td className="px-5 py-4 text-stone-600">{row.module}</td><td className="px-5 py-4"><p className="font-medium text-stone-800">{row.item}</p><p className="mt-0.5 text-xs text-stone-500">{row.detail}</p></td><td className="whitespace-nowrap px-5 py-4 text-stone-600">{formatDate(row.date)}</td><td className="px-5 py-4"><span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ring-1 ${statusStyle[row.status]}`}>{row.status}</span></td><td className="whitespace-nowrap px-5 py-4 font-medium text-stone-800">{formatAmount(row.amount)}</td></tr>)}
                  {!filteredRows.length && <tr><td colSpan="7" className="px-5 py-14 text-center"><XCircle className="mx-auto mb-3 text-stone-300" size={30} /><p className="font-medium text-stone-700">No bookings match these filters</p><button onClick={clearFilters} className="mt-2 text-sm font-medium text-[#216432] hover:underline">Clear filters</button></td></tr>}</tbody>
              </table>
            </div>
          </section>
        </div>
      </main>
    </section>
  );
};

export default ReportsPage;
