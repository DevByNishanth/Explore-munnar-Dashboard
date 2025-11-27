import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const Calendar = () => {
    const today = new Date();
    const [currentMonth, setCurrentMonth] = useState(today.getMonth());
    const [currentYear, setCurrentYear] = useState(today.getFullYear());
    const [selectedDate, setSelectedDate] = useState(null);

    const monthName = new Date(currentYear, currentMonth).toLocaleString("default", {
        month: "long",
    });

    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const startingDay = firstDayOfMonth.getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    let calendarDays = [];
    for (let i = 0; i < startingDay; i++) calendarDays.push(null);
    for (let d = 1; d <= daysInMonth; d++) calendarDays.push(d);

    const prevMonth = () => {
        if (currentMonth === 0) {
            setCurrentMonth(11);
            setCurrentYear((prev) => prev - 1);
        } else setCurrentMonth((prev) => prev - 1);
    };

    const nextMonth = () => {
        if (currentMonth === 11) {
            setCurrentMonth(0);
            setCurrentYear((prev) => prev + 1);
        } else setCurrentMonth((prev) => prev + 1);
    };

    const handleSelectDate = (day) => {
        if (day) {
            setSelectedDate(new Date(currentYear, currentMonth, day));
        }
    };

    return (
        <div className="w-full border border-gray-200 bg-white rounded-lg shadow-sm p-6">
            {/* Month navigation */}
            <div className="flex justify-between items-center mb-5">
                <button onClick={prevMonth}>
                    <ChevronLeft className="text-gray-500 hover:text-gray-700 w-4 h-4" />
                </button>

                <h1 className="text-sm font-medium text-gray-700">
                    {monthName} {currentYear}
                </h1>

                <button onClick={nextMonth}>
                    <ChevronRight className="text-gray-500 hover:text-gray-700 w-4 h-4" />
                </button>
            </div>

            {/* Days of week */}
            <div className="grid grid-cols-7 text-center text-black font-medium text-[12px] mb-1">
                {days.map((day) => (
                    <div key={day}>{day}</div>
                ))}
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7  translate-x-6 text-center gap-y-1">
                {calendarDays.map((day, index) => {
                    const isToday =
                        day &&
                        day === today.getDate() &&
                        currentMonth === today.getMonth() &&
                        currentYear === today.getFullYear();

                    const isSelected =
                        selectedDate &&
                        day === selectedDate.getDate() &&
                        currentMonth === selectedDate.getMonth() &&
                        currentYear === selectedDate.getFullYear();

                    return (
                        <div
                            key={index}
                            onClick={() => handleSelectDate(day)}
                            className={`h-7 w-7 flex items-center justify-center rounded-md text-[12px] cursor-pointer
                ${day ? "text-gray-600 font-medium" : ""}
                ${isToday ? "border border-blue-400" : ""}
                ${isSelected ? "bg-[#236651] text-white" : ""}
                ${!day ? "pointer-events-none" : ""}
              `}
                        >
                            {day}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Calendar;
