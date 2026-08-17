import React, { useState } from "react";
import { FileText, Loader2, RotateCcw, X } from "lucide-react";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const YEARS = ["2024", "2025", "2026", "2027"];

const STATUSES = ["All", "Completed", "Pending", "Cancelled"];

const fieldClass =
  "w-full px-4 py-2 border border-gray-200 rounded-lg outline-none focus:border-emerald-800 focus:ring-1 focus:ring-emerald-800 transition bg-gray-50 hover:bg-white text-sm";

const ReportModal = ({ open, moduleLabel, icon: Icon, onClose, onGenerate }) => {
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("2026");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [status, setStatus] = useState("All");
  const [error, setError] = useState("");
  const [generating, setGenerating] = useState(false);

  if (!open) return null;

  const reset = () => {
    setMonth("");
    setYear("2026");
    setFromDate("");
    setToDate("");
    setStatus("All");
    setError("");
  };

  const handleClose = () => {
    if (generating) return;
    reset();
    onClose();
  };

  const handleGenerate = async () => {
    if (!month && !(fromDate && toDate)) {
      setError("Please select a month or a date range to generate the report.");
      return;
    }
    if (fromDate && toDate && fromDate > toDate) {
      setError("The 'From' date must be earlier than the 'To' date.");
      return;
    }
    setError("");
    setGenerating(true);
    try {
      await onGenerate({ month, year, fromDate, toDate, status });
      reset();
      onClose();
    } catch (err) {
      setError(err?.message || "Failed to generate the report. Please try again.");
    } finally {
      setGenerating(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/30 backdrop-blur-[2px] z-50"></div>
      <div className="fixed inset-0 overflow-y-auto z-50 flex items-center justify-center p-4">
        <section className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-gray-300 overflow-hidden transform transition-all duration-300">
          {/* Modal Header */}
          <header className="px-6 py-4 bg-gray-200 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-bold text-lg text-gray-800 flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#ddf9e4] text-[#216432]">
                {Icon && <Icon className="w-5 h-5" />}
              </span>
              Generate {moduleLabel} Report
            </h2>
            <button
              onClick={handleClose}
              disabled={generating}
              className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100 cursor-pointer disabled:opacity-40"
            >
              <X className="w-5 h-5" />
            </button>
          </header>

          {/* Modal Body */}
          <div className="p-6 space-y-4">
            <p className="text-sm text-gray-500">
              Choose the filters for the {moduleLabel.toLowerCase()} report. The generated PDF will
              contain only the matching records.
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block text-sm font-semibold text-gray-700">Month</label>
                <select value={month} onChange={(e) => setMonth(e.target.value)} className={fieldClass}>
                  <option value="">Any month</option>
                  {MONTHS.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-semibold text-gray-700">Year</label>
                <select value={year} onChange={(e) => setYear(e.target.value)} className={fieldClass}>
                  {YEARS.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-semibold text-gray-700">From date</label>
                <input
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  className={fieldClass}
                />
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-semibold text-gray-700">To date</label>
                <input
                  type="date"
                  value={toDate}
                  min={fromDate || undefined}
                  onChange={(e) => setToDate(e.target.value)}
                  className={fieldClass}
                />
              </div>

              <div className="space-y-1 col-span-2">
                <label className="block text-sm font-semibold text-gray-700">Status</label>
                <select value={status} onChange={(e) => setStatus(e.target.value)} className={fieldClass}>
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {error && (
              <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            <button
              type="button"
              onClick={reset}
              disabled={generating}
              className="text-xs text-gray-500 hover:text-[#216432] inline-flex items-center gap-1 cursor-pointer disabled:opacity-40"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset filters
            </button>
          </div>

          {/* Modal Footer */}
          <div className="px-6 pb-6 pt-1 border-t border-gray-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={handleClose}
              disabled={generating}
              className="px-5 py-2 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition cursor-pointer text-sm disabled:opacity-40"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleGenerate}
              disabled={generating}
              className="px-5 py-2 btn-green text-white font-medium rounded-lg shadow hover:opacity-90 transition cursor-pointer text-sm flex items-center gap-1.5 disabled:opacity-50"
            >
              {generating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Generating Report...
                </>
              ) : (
                <>
                  <FileText className="w-4 h-4" />
                  Generate Report
                </>
              )}
            </button>
          </div>
        </section>
      </div>
    </>
  );
};

export default ReportModal;
