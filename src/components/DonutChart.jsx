import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const greenShades = [
    "#376D5C", // light mint
    "#45538A",
    "#AA5563",
];

const DonutChart = ({ data, totalLabel = "Total" }) => {
    const total = data.reduce((sum, item) => sum + item.value, 0);

    return (
        <div className="w-full h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        innerRadius="60%"
                        outerRadius="80%"
                        paddingAngle={3}
                        dataKey="value"
                        startAngle={90}
                        endAngle={-270}
                    >
                        {data.map((entry, index) => (
                            <Cell key={index} fill={greenShades[index % greenShades.length]} />
                        ))}
                    </Pie>

                    {/* Center text */}
                    <text
                        x="50%"
                        y="50%"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="fill-gray-700"
                        style={{ fontSize: "18px", fontWeight: "600" }}
                    >
                        {total}
                    </text>

                    <text
                        x="50%"
                        y="58%"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="fill-gray-400"
                        style={{ fontSize: "12px" }}
                    >
                        {totalLabel}
                    </text>
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default DonutChart;
