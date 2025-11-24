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

const data = [
    { name: "Itneary", pv: 800 },
    { name: "Itneary ", pv: 967 },
    { name: "Tree house", pv: 1098 },
    { name: "Eco cotages", pv: 1200 },
    { name: "Tents", pv: 1108 },
    { name: "Hotels", pv: 1400 },
    { name: "Resorts", pv: 1400 },
    { name: "Home stays", pv: 1400 },
];

const ItnearyBarChart = () => {
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
                    layout="horizontal"   
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

export default ItnearyBarChart;
