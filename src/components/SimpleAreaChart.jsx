import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const data = [
    { name: "Jan", uv: 2100 },
    { name: "Feb", uv: 1700 },
    { name: "Mar", uv: 1900 },
    { name: "Apr", uv: 2000 },
    { name: "May", uv: 1600 },
    { name: "Jun", uv: 2300 },
    { name: "Jul", uv: 2600 },
    { name: "Aug", uv: 2800 },
    { name: "Sep", uv: 3100 },
    { name: "Oct", uv: 3500 },
    { name: "Nov", uv: 3000 },
    { name: "Dec", uv: 3600 },
];

const SimpleAreaChart = () => {
    return (
        <div className="w-full bg-white border border-gray-200 px-5 py-2 rounded-xl shadow-sm col-span-7 ">
            <h2 className="text-lg font-semibold mb-4">Recent Movement</h2>

            <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={data} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                    {/* Gradient */}
                    <defs>
                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#4EB59D" stopOpacity={0.4} />
                            <stop offset="95%" stopColor="#4A90E2" stopOpacity={0} />
                        </linearGradient>
                    </defs>

                    {/* Axis styling */}
                    <XAxis
                        dataKey="name"
                        tick={{ fill: "#667085" }}
                        axisLine={false}
                        tickLine={false}
                    />
                    <YAxis
                        tick={{ fill: "#667085" }}
                        axisLine={false}
                        tickLine={false}
                        domain={[1000, 4000]}
                    />

                    <Tooltip cursor={{ stroke: "#E5E7EB", strokeWidth: 1 }} />

                    {/* Smooth curved line + dots */}
                    <Area
                        type="monotone"
                        dataKey="uv"
                        stroke="#45D1AC"
                        strokeWidth={3}
                        fill="url(#colorUv)"
                        dot={{ stroke: "#45D1AC", fill: "white", strokeWidth: 2, r: 4 }}
                        activeDot={{ r: 6 }}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default SimpleAreaChart;
