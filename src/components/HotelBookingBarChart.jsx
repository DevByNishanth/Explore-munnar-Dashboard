import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import NoData from "./NoData";

const HotelBookingBarChart = ({ month }) => {
  const apiURL = import.meta.env.VITE_API_URL;
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiURL}/api/dashboard/hotel-bookings-chart?month=${month.toLowerCase()}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        console.log("API Response:", result); // Debugging log
        if (Array.isArray(result)) {
          setData(result);
        } else if (result && Array.isArray(result.data)) {
          setData(result.data);
        } else {
          console.error("API response is not an array:", result);
          setData([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (month) {
      fetchData();
    }
  }, [month]);

  if (data.length === 0) {
    return (
      <section
        className="w-full h-[410px] flex items-center justify-center outline-none focus:outline-none"
        style={{ outline: "none" }}
      >
        <NoData />
      </section>
    );
  }

  return (
    <section
      className="w-full  h-[410px] outline-none focus:outline-none"
      style={{ outline: "none" }}
    >
      <ResponsiveContainer
        width="100%"
        height="100%"
        style={{ outline: "none" }}
      >
        <BarChart
          data={data}
          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="pv" fill="#31aa87" barSize={35} radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </section>
  );
};

export default HotelBookingBarChart;
