import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import ReportModal from "../components/ReportModal";
import { Link } from "react-router-dom";
import {
  Bike,
  CalendarCheck2,
  Car,
  CarFront,
  ChartNoAxesCombined,
  CheckCircle2,
  ChevronRight,
  Clock,
  FileText,
  Hotel,
  ReceiptText,
  Table2,
  XCircle,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import ReportsTable from "../components/ReportsTable";

/* ------------------------------------------------------------------ */
/*  Mock report data — swap these shapes for the real API responses.  */
/* ------------------------------------------------------------------ */

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const MONTH_NUM = {
  January: "01", February: "02", March: "03", April: "04", May: "05", June: "06",
  July: "07", August: "08", September: "09", October: "10", November: "11", December: "12",
};

// Monthly seasonality weights used to spread annual totals across the year
const MONTH_WEIGHTS = [0.82, 0.77, 0.92, 1.0, 0.95, 1.06, 1.22, 1.17, 1.1, 1.24, 1.14, 1.29];
const sum = (arr) => arr.reduce((a, b) => a + b, 0);

const MODULE_DEFS = [
  {
    key: "hotel",
    label: "Hotel Bookings",
    short: "HB",
    icon: Hotel,
    total: 6580,
    revenue: 2960000,
    status: { completed: 4870, pending: 1120, cancelled: 590 },
    active: 380,
    weekly: [
      { name: "Mon", value: 92 },
      { name: "Tue", value: 118 },
      { name: "Wed", value: 104 },
      { name: "Thu", value: 131 },
      { name: "Fri", value: 156 },
      { name: "Sat", value: 208 },
      { name: "Sun", value: 176 },
    ],
    rows: [
      { id: "HTL-1048", customer: "Ananya Nair", item: "The Fog Munnar · 3 nights", date: "2026-07-02", status: "Completed", amount: 12400 },
      { id: "HTL-1047", customer: "Nikhil Raj", item: "Amber Dale Resort · 2 nights", date: "2026-07-05", status: "Completed", amount: 9600 },
      { id: "HTL-1046", customer: "Rohan George", item: "Windermere Estate · 3 nights", date: "2026-07-09", status: "Completed", amount: 18800 },
      { id: "HTL-1045", customer: "Meera Suresh", item: "The Fog Munnar · 2 nights", date: "2026-07-14", status: "Pending", amount: 8200 },
      { id: "HTL-1044", customer: "Joel Mathew", item: "Amber Dale Resort · 4 nights", date: "2026-07-19", status: "Completed", amount: 19200 },
      { id: "HTL-1043", customer: "Diya Paul", item: "Zostel Munnar · 1 night", date: "2026-07-24", status: "Cancelled", amount: 3400 },
    ],
  },
  {
    key: "cab",
    label: "Cab Bookings",
    short: "CB",
    icon: Car,
    total: 9240,
    revenue: 3230000,
    status: { completed: 6880, pending: 1560, cancelled: 800 },
    active: 290,
    weekly: [
      { name: "Mon", value: 138 },
      { name: "Tue", value: 121 },
      { name: "Wed", value: 149 },
      { name: "Thu", value: 167 },
      { name: "Fri", value: 192 },
      { name: "Sat", value: 244 },
      { name: "Sun", value: 219 },
    ],
    rows: [
      { id: "CAB-2581", customer: "Vishnu Menon", item: "Munnar → Kochi · Sedan", date: "2026-07-03", status: "Completed", amount: 3150 },
      { id: "CAB-2580", customer: "Meera Suresh", item: "Local sightseeing · SUV", date: "2026-07-08", status: "Completed", amount: 4200 },
      { id: "CAB-2579", customer: "Arjun Thomas", item: "Munnar → Thekkady · Innova", date: "2026-07-12", status: "Completed", amount: 5800 },
      { id: "CAB-2578", customer: "Fathima K", item: "Airport pickup · Sedan", date: "2026-07-16", status: "Pending", amount: 2600 },
      { id: "CAB-2577", customer: "Nikhil Raj", item: "Local sightseeing · Sedan", date: "2026-07-21", status: "Completed", amount: 3600 },
      { id: "CAB-2576", customer: "Rohan George", item: "Munnar → Alleppey · SUV", date: "2026-07-27", status: "Cancelled", amount: 6400 },
    ],
  },
  {
    key: "bike",
    label: "Bike Rentals",
    short: "BR",
    icon: Bike,
    total: 4120,
    revenue: 740000,
    status: { completed: 3110, pending: 690, cancelled: 320 },
    active: 250,
    weekly: [
      { name: "Mon", value: 46 },
      { name: "Tue", value: 38 },
      { name: "Wed", value: 52 },
      { name: "Thu", value: 61 },
      { name: "Fri", value: 74 },
      { name: "Sat", value: 96 },
      { name: "Sun", value: 83 },
    ],
    rows: [
      { id: "BIK-5819", customer: "Arjun Thomas", item: "Royal Enfield Classic · 2 days", date: "2026-07-04", status: "Completed", amount: 2400 },
      { id: "BIK-5818", customer: "Joel Mathew", item: "Honda Activa · 1 day", date: "2026-07-10", status: "Completed", amount: 750 },
      { id: "BIK-5817", customer: "Ananya Nair", item: "TVS Apache · 2 days", date: "2026-07-15", status: "Completed", amount: 1900 },
      { id: "BIK-5816", customer: "Vishnu Menon", item: "Royal Enfield Himalayan · 3 days", date: "2026-07-20", status: "Pending", amount: 3600 },
      { id: "BIK-5815", customer: "Diya Paul", item: "Honda Activa · 1 day", date: "2026-07-25", status: "Completed", amount: 750 },
      { id: "BIK-5814", customer: "Fathima K", item: "TVS Jupiter · 2 days", date: "2026-07-29", status: "Cancelled", amount: 1100 },
    ],
  },
  {
    key: "selfcar",
    label: "Self Car Driving",
    short: "SC",
    icon: CarFront,
    total: 4652,
    revenue: 1470000,
    status: { completed: 3344, pending: 760, cancelled: 548 },
    active: 200,
    weekly: [
      { name: "Mon", value: 57 },
      { name: "Tue", value: 49 },
      { name: "Wed", value: 63 },
      { name: "Thu", value: 71 },
      { name: "Fri", value: 88 },
      { name: "Sat", value: 112 },
      { name: "Sun", value: 97 },
    ],
    rows: [
      { id: "CAR-3294", customer: "Fathima K", item: "Hyundai Creta · 3 days · Diesel", date: "2026-07-05", status: "Completed", amount: 8100 },
      { id: "CAR-3293", customer: "Diya Paul", item: "Maruti Baleno · 2 days · Petrol", date: "2026-07-11", status: "Completed", amount: 4400 },
      { id: "CAR-3292", customer: "Nikhil Raj", item: "Mahindra Thar · 2 days · Diesel", date: "2026-07-17", status: "Completed", amount: 9800 },
      { id: "CAR-3291", customer: "Ananya Nair", item: "Hyundai i20 · 1 day · Petrol", date: "2026-07-22", status: "Pending", amount: 2800 },
      { id: "CAR-3290", customer: "Meera Suresh", item: "Maruti Ertiga · 3 days · Petrol", date: "2026-07-26", status: "Completed", amount: 7200 },
      { id: "CAR-3289", customer: "Joel Mathew", item: "Ford Ecosport · 1 day · Diesel", date: "2026-07-30", status: "Cancelled", amount: 3200 },
    ],
  },
];

// Monochromatic green system (Exploring Munnar brand)
const STATUS_COLORS = {
  Completed: "#216432",
  Pending: "#d69e3e",
  Cancelled: "#be5048",
  Active: "#5882a5",
};

const buildModules = () =>
  MODULE_DEFS.map((def) => {
    const weightSum = sum(MONTH_WEIGHTS);
    const monthly = MONTHS.map((name, i) => ({
      name,
      bookings: Math.round((def.total * MONTH_WEIGHTS[i]) / weightSum),
      revenue: Math.round((def.revenue * MONTH_WEIGHTS[i]) / weightSum),
    }));
    return { ...def, monthly };
  });

const formatCount = (value) => Number(value || 0).toLocaleString("en-IN");
const formatINR = (value) =>
  `₹${Number(value || 0).toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;
const formatCompactINR = (value) => {
  if (value >= 1000000) return `₹${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `₹${(value / 1000).toFixed(1)}K`;
  return `₹${value}`;
};

const getBookingAmount = (booking) => {
  const nights = Math.max(1, Math.ceil((new Date(booking.checkOut) - new Date(booking.checkIn)) / 86400000) || 1);
  return Number(booking.pricePerNight || 0) * nights;
};
const normalizeBookingStatus = (status) => {
  const value = String(status || "Pending").toLowerCase();
  if (value.includes("cancel")) return "Cancelled";
  if (value.includes("complete") || value.includes("confirm") || value === "booked") return "Completed";
  return "Pending";
};

const downloadBookingsCsv = (rows, fileName, allRows = rows) => {
  const keys = [...new Set(allRows.flatMap((row) => Object.keys(row)))];
  const columns = keys.map((key) => [key, (row) => {
    const value = row[key];
    return value && typeof value === "object" ? JSON.stringify(value) : value;
  }]);
  const escapeCell = (value) => {
    const text = String(value ?? "");
    const safeText = /^[=+\-@]/.test(text) ? `'${text}` : text;
    return `"${safeText.replaceAll('"', '""')}"`;
  };
  const csv = [columns.map(([label]) => escapeCell(label)).join(","), ...rows.map((row) => columns.map(([, value]) => escapeCell(value(row))).join(","))].join("\r\n");
  const url = URL.createObjectURL(new Blob([`\uFEFF${csv}`], { type: "text/csv;charset=utf-8" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName.replace(/\.pdf$/i, ".csv");
  link.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
};

/* ------------------------------------------------------------------ */
/*  Small presentational pieces                                        */
/* ------------------------------------------------------------------ */

const KpiCard = ({ label, value, footer, trend, icon, iconClass }) => (
  <div className="rounded-2xl border border-[#e4eee6] bg-white p-4 shadow-sm">
    <div className="flex items-start justify-between gap-2">
      <p className="text-[11px] font-medium uppercase tracking-wide text-[#8a9a8e]">{label}</p>
      <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${iconClass}`}>
        {icon}
      </span>
    </div>
    <p className="text-xl font-semibold tracking-tight text-[#183c27]">{value}</p>
    <p
      className={`mt-1.5 flex items-center gap-1 text-xs font-medium ${trend === "up"
        ? "text-emerald-700"
        : trend === "down"
          ? "text-[#be5048]"
          : "text-[#8a9a8e]"
        }`}
    >
      {trend === "up" && <TrendingUp size={13} />}
      {trend === "down" && <TrendingDown size={13} />}
      {footer}
    </p>
  </div>
);

const DonutCenter = ({ total }) => (
  <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
    <p className="text-2xl font-bold text-[#183c27]">{total}</p>
    <p className="text-[11px] text-[#8a9a8e]">Total</p>
  </div>
);

const StatusLegend = ({ data }) => {
  const grand = data.reduce((s, d) => s + d.value, 0) || 1;
  return (
    <div className="space-y-2.5">
      {data.map((item) => (
        <div key={item.label} className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: item.color }} />
            <span className="text-sm text-[#5b6b5f]">{item.label}</span>
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold text-[#183c27]">{formatCount(item.value)}</p>
            <p className="text-[11px] text-[#8a9a8e]">{Math.round((item.value / grand) * 100)}%</p>
          </div>
        </div>
      ))}
    </div>
  );
};

const ModuleStatusDonut = ({ data }) => (
  <div className="relative h-[220px]">
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="label"
          innerRadius="62%"
          outerRadius="88%"
          paddingAngle={3}
          startAngle={90}
          endAngle={-270}
        >
          {data.map((entry) => (
            <Cell key={entry.label} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => formatCount(value)} />
      </PieChart>
    </ResponsiveContainer>
    <DonutCenter total={formatCount(data.reduce((s, d) => s + d.value, 0))} />
  </div>
);

/* ------------------------------------------------------------------ */
/*  Page                                                              */
/* ------------------------------------------------------------------ */

const ReportsPage = () => {
  const [bookingsByModule, setBookingsByModule] = useState({ hotel: [], cab: [], selfcar: [], bike: [] });
  const apiUrl = import.meta.env.VITE_API_URL;
  useEffect(() => {
    let active = true;
    const endpoints = { hotel: "hotel-booking", cab: "cab-booking", selfcar: "self-drive", bike: "bike-rentals" };
    Promise.all(Object.entries(endpoints).map(async ([key, endpoint]) => {
      try {
        const { data: result } = await axios.get(`${apiUrl}/api/${endpoint}`);
        return [key, Array.isArray(result?.data) ? result.data : []];
      } catch (error) {
        console.error(`Unable to load ${key} booking analytics:`, error);
        return [key, []];
      }
    })).then((entries) => {
      if (active) setBookingsByModule(Object.fromEntries(entries));
    }).catch((error) => console.error("Unable to load booking analytics:", error));
    return () => { active = false; };
  }, [apiUrl]);

  const modules = useMemo(() => {
    const base = buildModules();
    const today = new Date();
    const monday = new Date(today);
    monday.setHours(0, 0, 0, 0);
    monday.setDate(today.getDate() - ((today.getDay() + 6) % 7));
    const currentYear = today.getFullYear();
    base.forEach((module) => {
      const records = bookingsByModule[module.key] || [];
      const bookingsByStatus = records.reduce((counts, booking) => {
        const status = normalizeBookingStatus(booking.status);
        counts[status.toLowerCase()] += 1;
        return counts;
      }, { completed: 0, pending: 0, cancelled: 0 });
      const weekly = Array.from({ length: 7 }, (_, index) => {
        const day = new Date(monday);
        day.setDate(monday.getDate() + index);
        return { name: day.toLocaleDateString("en-IN", { weekday: "short" }), value: 0 };
      });
      const monthly = MONTHS.map((name) => ({ name, bookings: 0, revenue: 0 }));
      records.forEach((booking) => {
        const createdAt = new Date(booking.createdAt || booking.created_at);
        if (Number.isNaN(createdAt.getTime())) return;
        const localDate = new Date(createdAt.getFullYear(), createdAt.getMonth(), createdAt.getDate());
        const dayIndex = Math.floor((localDate - monday) / 86400000);
        if (dayIndex >= 0 && dayIndex < 7) weekly[dayIndex].value += 1;
        if (createdAt.getFullYear() === currentYear) {
          monthly[createdAt.getMonth()].bookings += 1;
          monthly[createdAt.getMonth()].revenue += module.key === "hotel" ? getBookingAmount(booking) : Number(booking.amount || booking.price || 0);
        }
      });
      module.total = records.length;
      module.revenue = records.reduce((total, booking) => total + (module.key === "hotel" ? getBookingAmount(booking) : Number(booking.amount || booking.price || 0)), 0);
      module.status = bookingsByStatus;
      module.weekly = weekly;
      module.monthly = monthly;
      module.bookings = records;
      module.rows = records.map((booking) => ({
        id: booking.id, customer: booking.name, item: module.key === "hotel"
          ? `${booking.hotelName || "Hotel"} · ${booking.location || ""}`
          : module.key === "cab" ? `${booking.pickup_point || ""} → ${booking.drop_point || ""} · ${booking.vehicle_type || ""}`
            : `${booking.from || ""} → ${booking.to || ""} · ${booking.carCategory || booking.vehicle_type || ""}`,
        date: (booking.createdAt || booking.created_at || booking.date || "").slice(0, 10),
        status: booking.status, amount: module.key === "hotel" ? getBookingAmount(booking) : Number(booking.amount || booking.price || 0),
      }));
    });
    return base;
  }, [bookingsByModule]);
  const [modalModule, setModalModule] = useState(null);

  const totals = useMemo(() => {
    const bookings = sum(modules.map((m) => m.total));
    const revenue = sum(modules.map((m) => m.revenue));
    const completed = sum(modules.map((m) => m.status.completed));
    const pending = sum(modules.map((m) => m.status.pending));
    const cancelled = sum(modules.map((m) => m.status.cancelled));
    const pricedBookings = modules.reduce((count, module) => count + module.bookings.filter((booking) => {
      const amount = module.key === "hotel" ? getBookingAmount(booking) : Number(booking.amount || booking.price || 0);
      return amount > 0;
    }).length, 0);
    return {
      bookings,
      revenue,
      completed,
      pending,
      cancelled,
      pricedBookings,
      avgValue: pricedBookings ? Math.round(revenue / pricedBookings) : 0,
      completionRate: bookings ? Math.round((completed / bookings) * 100) : 0,
    };
  }, [modules]);

  const trendData = useMemo(
    () =>
      MONTHS.map((name, i) => ({
        name,
        bookings: modules.reduce((s, m) => s + m.monthly[i].bookings, 0),
        revenue: modules.reduce((s, m) => s + m.monthly[i].revenue, 0),
      })),
    [modules]
  );

  const globalStatusData = [
    { label: "Completed", value: totals.completed, color: STATUS_COLORS.Completed },
    { label: "Pending", value: totals.pending, color: STATUS_COLORS.Pending },
    { label: "Cancelled", value: totals.cancelled, color: STATUS_COLORS.Cancelled },
  ];

  const kpis = [
    { label: "Total Bookings", value: formatCount(totals.bookings), footer: "Across all four booking modules", trend: null, icon: <CalendarCheck2 size={16} />, iconClass: "bg-[#e4f0ff] text-[#5882a5]" },
    { label: "Completed", value: formatCount(totals.completed), footer: `${totals.completionRate}% completion rate`, trend: null, icon: <CheckCircle2 size={16} />, iconClass: "bg-[#ddf9e4] text-[#216432]" },
    { label: "Pending", value: formatCount(totals.pending), footer: "Requires attention", trend: null, icon: <Clock size={16} />, iconClass: "bg-[#fdf3e0] text-[#d69e3e]" },
    { label: "Cancelled", value: formatCount(totals.cancelled), footer: "Across all four booking modules", trend: null, icon: <XCircle size={16} />, iconClass: "bg-[#fbeae8] text-[#be5048]" },
    { label: "Avg Booking Value", value: formatINR(totals.avgValue), footer: `${formatCount(totals.pricedBookings)} bookings with price data`, trend: null, icon: <ReceiptText size={16} />, iconClass: "bg-[#ddf9e4] text-[#318454]" },
  ];

  const filterModuleRows = (mod, filters) =>
    mod.rows.filter((row) => {
      if (mod.key === "hotel") {
        const date = row.date;
        const inMonth = !filters.month || date.startsWith(`${filters.year}-${MONTH_NUM[filters.month]}`);
        const inRange = !filters.fromDate || !filters.toDate || (date >= filters.fromDate && date <= filters.toDate);
        const inStatus = filters.status === "All" || normalizeBookingStatus(row.status) === filters.status;
        return inMonth && inRange && inStatus;
      }
      const inMonth = !filters.month || row.date.startsWith(`${filters.year}-${MONTH_NUM[filters.month]}`);
      const inRange = !filters.fromDate || !filters.toDate || (row.date >= filters.fromDate && row.date <= filters.toDate);
      const inStatus = filters.status === "All" || normalizeBookingStatus(row.status) === filters.status;
      return inMonth && inRange && inStatus;
    });

  const handleGenerateReport = async (filters) => {
    const mod = modalModule;
    if (!mod) return;
    const rows = filterModuleRows(mod, filters);
    const rowIds = new Set(rows.map((row) => String(row.id)));
    const matchingBookings = mod.bookings.filter((booking) => rowIds.has(String(booking.id)));
    const monthSlug = filters.month ? filters.month.toLowerCase() : `${filters.fromDate}-to-${filters.toDate}`;
    downloadBookingsCsv(matchingBookings, `${mod.key}-booking-report-${monthSlug}-${filters.year}.csv`, mod.bookings);
  };

  const [selectedTab, setSelectedtab] = useState("reports")

  // jsx


  return (
    <>
      <section className="flex min-h-screen bg-[#fcfdfb]">
        <Sidebar />
        <main className="w-full max-h-screen overflow-auto px-5 py-5 md:px-8 md:py-7 ">


          <div className="mx-auto max-w-[1400px]">
            {/* Breadcrumbs + title */}
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="mb-2 flex items-center gap-1 text-sm text-[#8a9a8e]">
                  <Link to="/" className="hover:text-[#216432]">
                    Dashboard
                  </Link>
                  <ChevronRight size={16} />
                  <span className="text-[#183c27]">Reports</span>
                </p>
                <h1 className="text-2xl font-semibold tracking-tight text-[#183c27]">Reports &amp; Analytics</h1>
                <p className="mt-1 text-sm text-[#8a9a8e]">
                  Business performance across hotels, cabs, bike rentals and self-drive cars.
                </p>
              </div>
              <span className="hidden rounded-full border border-[#e4eee6] bg-white px-3 py-1.5 text-xs text-[#8a9a8e] sm:inline-flex">
                Last updated: {new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
              </span>
            </div>


            <div className="tabs mt-6 flex items-center gap-4 border-b border-gray-300">
              <button onClick={() => setSelectedtab("reports")} className={`${selectedTab == "reports" ? "border-b-2 border-emerald-600 font-semibold text-emerald-800" : ""} flex items-center gap-2 pb-2 px-3 cursor-pointer `}><span><ChartNoAxesCombined size={17} /></span>Analytics</button>
              <button onClick={() => setSelectedtab("table-view")} className={`${selectedTab == "table-view" ? "border-b-2 border-emerald-600 font-semibold text-emerald-800" : ""} flex items-center gap-2 pb-2 px-3 cursor-pointer`}> <span><Table2 size={17} /></span> Table view</button>
            </div>

            {/*  -------------------------- Analytics section -----------------------  */}

            {selectedTab == "reports" && <div className="analytics-section">
              {/* KPI cards */}
              <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-5">
                {kpis.map((kpi) => (
                  <KpiCard key={kpi.label} {...kpi} />
                ))}
              </div>


              {/* Overall analytics */}
              <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
                {/* Overall business trend */}
                <div className="rounded-2xl border border-[#e4eee6] bg-white p-5 shadow-sm lg:col-span-2">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h2 className="text-base font-semibold text-[#183c27]">Overall Business Trend</h2>
                      <p className="text-xs text-[#8a9a8e]">Bookings and revenue across all modules</p>
                    </div>
                    <div className="flex gap-2">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-[#e4eee6] bg-[#f6faf6] px-3 py-1 text-xs font-medium text-[#183c27]">
                        <span className="h-2 w-2 rounded-full bg-[#164722]" /> Bookings
                      </span>
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-[#e4eee6] bg-[#f6faf6] px-3 py-1 text-xs font-medium text-[#183c27]">
                        <span className="h-2 w-2 rounded-full bg-[#318454]" /> Revenue
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={trendData} margin={{ top: 8, right: 8, left: -8, bottom: 0 }}>
                        <defs>
                          <linearGradient id="fillBookings" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#164722" stopOpacity={0.18} />
                            <stop offset="100%" stopColor="#164722" stopOpacity={0} />
                          </linearGradient>
                          <linearGradient id="fillRevenue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#318454" stopOpacity={0.14} />
                            <stop offset="100%" stopColor="#318454" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#eef2ef" vertical={false} />
                        <XAxis
                          dataKey="name"
                          tick={{ fill: "#8a9a8e", fontSize: 11 }}
                          axisLine={false}
                          tickLine={false}
                          dy={6}
                        />
                        <YAxis
                          yAxisId="bookings"
                          tick={{ fill: "#8a9a8e", fontSize: 11 }}
                          axisLine={false}
                          tickLine={false}
                          tickFormatter={(v) => formatCount(v)}
                          width={46}
                        />
                        <YAxis
                          yAxisId="revenue"
                          orientation="right"
                          tick={{ fill: "#8a9a8e", fontSize: 11 }}
                          axisLine={false}
                          tickLine={false}
                          tickFormatter={(v) => `${(v / 100000).toFixed(1)}L`}
                          width={42}
                        />
                        <Tooltip
                          formatter={(value, name) =>
                            name === "revenue" ? [formatINR(value), "Revenue"] : [formatCount(value), "Bookings"]
                          }
                          contentStyle={{ borderRadius: 12, border: "1px solid #e4eee6", fontSize: 12 }}
                        />
                        <Area
                          yAxisId="bookings"
                          type="monotone"
                          dataKey="bookings"
                          stroke="#164722"
                          strokeWidth={2.5}
                          fill="url(#fillBookings)"
                          dot={false}
                          activeDot={{ r: 5 }}
                        />
                        <Area
                          yAxisId="revenue"
                          type="monotone"
                          dataKey="revenue"
                          stroke="#318454"
                          strokeWidth={2.5}
                          fill="url(#fillRevenue)"
                          dot={false}
                          activeDot={{ r: 5 }}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Global status donut */}
                <div className="rounded-2xl border border-[#e4eee6] bg-white p-5 shadow-sm">
                  <h2 className="text-base font-semibold text-[#183c27]">Global Status</h2>
                  <p className="text-xs text-[#8a9a8e]">Overall status across all modules</p>
                  <div className="relative mt-2 h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={globalStatusData}
                          dataKey="value"
                          nameKey="label"
                          innerRadius="64%"
                          outerRadius="90%"
                          paddingAngle={3}
                          startAngle={90}
                          endAngle={-270}
                        >
                          {globalStatusData.map((entry) => (
                            <Cell key={entry.label} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => formatCount(value)} />
                      </PieChart>
                    </ResponsiveContainer>
                    <DonutCenter
                      total={formatCount(globalStatusData.reduce((s, d) => s + d.value, 0))}
                    />
                  </div>
                  <div className="mt-4">
                    <StatusLegend data={globalStatusData} />
                  </div>
                </div>
              </div>

              {/* Module analytics sections */}
              {modules.map((mod) => {
                const Icon = mod.icon;
                const moduleStatusData = [
                  { label: "Completed", value: mod.status.completed, color: STATUS_COLORS.Completed },
                  { label: "Pending", value: mod.status.pending, color: STATUS_COLORS.Pending },
                  { label: "Cancelled", value: mod.status.cancelled, color: STATUS_COLORS.Cancelled },
                ];
                const totalValue = sum(moduleStatusData.map((d) => d.value));
                return (
                  <section
                    key={mod.key}
                    className="mt-6 overflow-hidden rounded-2xl border border-[#e4eee6] border-t-4 border-t-[#216432] bg-white shadow-sm"
                  >
                    {/* Section header */}
                    <div className="flex flex-col gap-3 border-b border-[#eef2ef] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-center gap-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#ddf9e4] text-[#216432]">
                          <Icon size={20} />
                        </span>
                        <div>
                          <h2 className="text-base font-semibold text-[#183c27]">{mod.label} Analytics</h2>
                          <p className="text-xs text-[#8a9a8e]">
                            Booking counts and revenue for {mod.label.toLowerCase()}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => setModalModule(mod)}
                        className="btn-green inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:opacity-95 cursor-pointer"
                      >
                        <FileText size={16} /> Generate Report
                      </button>
                    </div>

                    {/* Section body */}
                    <div className="grid grid-cols-1 gap-5 p-5 lg:grid-cols-5">
                      {/* Module graph */}
                      <div className="lg:col-span-3">
                        <div className="mb-2 flex items-center justify-between">
                          <p className="text-xs font-semibold uppercase tracking-wide text-[#8a9a8e]">
                            This week · Bookings
                          </p>
                          <p className="text-xs text-[#8a9a8e]">
                            {formatCount(mod.total)} total · {formatCompactINR(mod.revenue)} revenue
                          </p>
                        </div>
                        <div className="h-[270px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={mod.weekly} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
                              <defs>
                                <linearGradient id={`bar-${mod.key}`} x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="0%" stopColor="#216432" />
                                  <stop offset="100%" stopColor="#4b9a6b" />
                                </linearGradient>
                              </defs>
                              <CartesianGrid strokeDasharray="3 3" stroke="#eef2ef" vertical={false} />
                              <XAxis
                                dataKey="name"
                                tick={{ fill: "#8a9a8e", fontSize: 11 }}
                                axisLine={false}
                                tickLine={false}
                                dy={6}
                              />
                              <YAxis
                                tick={{ fill: "#8a9a8e", fontSize: 11 }}
                                axisLine={false}
                                tickLine={false}
                                width={46}
                              />
                              <Tooltip
                                cursor={{ fill: "#f6faf6" }}
                                formatter={(value) => [formatCount(value), "Bookings"]}
                                contentStyle={{ borderRadius: 12, border: "1px solid #e4eee6", fontSize: 12 }}
                              />
                              <Bar dataKey="value" fill={`url(#bar-${mod.key})`} radius={[6, 6, 0, 0]} maxBarSize={38} />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </div>

                      {/* Module pie */}
                      <div className="lg:col-span-2">
                        <div className="mb-2">
                          <p className="text-xs font-semibold uppercase tracking-wide text-[#8a9a8e]">
                            Status distribution
                          </p>
                        </div>
                        <ModuleStatusDonut data={moduleStatusData} />
                        <div className="mt-3">
                          <StatusLegend data={moduleStatusData} />
                        </div>
                        <p className="mt-3 border-t border-[#eef2ef] pt-3 text-xs text-[#8a9a8e]">
                          {formatCount(totalValue)} bookings recorded for {mod.label.toLowerCase()}
                        </p>
                      </div>
                    </div>
                  </section>
                );
              })}
            </div>}

            {selectedTab == "table-view" && <ReportsTable />}

          </div>
        </main>
      </section>

      {/* Generate Report modal */}
      <ReportModal
        open={Boolean(modalModule)}
        moduleLabel={modalModule?.label || ""}
        icon={modalModule?.icon}
        onClose={() => setModalModule(null)}
        onGenerate={handleGenerateReport}
      />
    </>
  );
};

export default ReportsPage;
