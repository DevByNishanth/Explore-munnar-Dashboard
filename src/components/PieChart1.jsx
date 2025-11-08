import { Pie, PieChart, ResponsiveContainer, Tooltip, Cell } from "recharts";

const data01 = [
  { name: "Cab booking", value: 400 },
  { name: "Bike rentals", value: 300 },
  { name: "Car rentals", value: 300 },
];

const COLORS = ["#60d18f", "#a4e893", "#31aa87"];

export default function PieChart1() {
  return (
    <section className="w-full h-[180px] mt-3  flex  justify-center relative">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            dataKey="value"
            isAnimationActive={true}
            data={data01}
            cx="40%"
            cy="50%"
            outerRadius={90} // 👈 smaller radius
            fill="#8884d8"
            labelLine={false}
          >
            {data01.map((entry, index) => (
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
