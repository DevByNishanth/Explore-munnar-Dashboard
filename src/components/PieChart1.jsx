import React, { useEffect, useState } from "react";
import { Pie, PieChart, ResponsiveContainer, Tooltip, Cell } from "recharts";

const COLORS = ["#60d18f", "#a4e893", "#31aa87"];

export default function PieChart1() {
  const apiURL = import.meta.env.VITE_API_URL;
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiURL}/api/dashboard/transport-bookings-chart`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        console.log("PieChart API Response:", result);
        if (Array.isArray(result)) {
          setData(result);
        } else if (result && Array.isArray(result.data)) {
          setData(result.data);
        } else {
          console.error("PieChart API response is not an array:", result);
          setData([]);
        }
      } catch (error) {
        console.error("Error fetching pie chart data:", error);
      }
    };
    fetchData();
  }, [apiURL]);

  return (
    <section className="w-full h-[180px] mt-3  flex  justify-center relative">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            dataKey="value"
            isAnimationActive={true}
            data={data}
            cx="40%"
            cy="50%"
            outerRadius={90} // 👈 smaller radius
            fill="#8884d8"
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
      <div className="details-container absolute bottom-3 right-3">
        <div className="box-1 flex items-center gap-2">
          <div className="box bg-[#60d18f] w-3 h-3"></div>
          <h1 className="text-[12px] text-gray-400">Cab</h1>
        </div>
        <div className="box-1 flex items-center gap-2">
          <div className="box bg-[#a4e893] w-3 h-3"></div>
          <h1 className="text-[12px] text-gray-400">Bike Rental</h1>
        </div>
        <div className="box-1 flex items-center gap-2">
          <div className="box bg-[#31aa87] w-3 h-3"></div>
          <h1 className="text-[12px] text-gray-400">Car Rental</h1>
        </div>
      </div>
    </section>
  );
}
