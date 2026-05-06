import { MoreHorizontal } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  { name: "Website Sales", value: 45, color: "#ff683a", products: "9,000 products", revenue: "₹4,50,000" },
  { name: "Mobile App Sales", value: 25, color: "#e2d7fa", products: "5,000 products", revenue: "₹2,50,000" },
  { name: "In-Store Sales", value: 20, color: "#d2ebff", products: "4,000 products", revenue: "₹2,00,000" },
  { name: "Partner Sales", value: 10, color: "#ffd9d0", products: "2,000 products", revenue: "₹1,00,000" },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const d = payload[0].payload;
    return (
      <div className="rounded-lg bg-[#2a2b2a] px-3 py-2 shadow-lg text-white">
        <p className="text-[11px] font-semibold">{d.name}</p>
        <p className="text-[10px] text-[#8c8d8c]">{d.value}%</p>
      </div>
    );
  }
  return null;
};

export function WidgetSalesDistribution() {
  return (
    <div className="flex h-full flex-col gap-4 rounded-[10px] bg-[#fdfcff] p-4">
      <div className="flex items-center justify-between shrink-0">
        <h2 className="text-[14px] font-semibold text-[#2a2b2a]">Sales Distribution</h2>
        <button className="rounded-md p-1 hover:bg-[#f3f3f3] transition-colors">
          <MoreHorizontal size={24} className="text-[#555]" />
        </button>
      </div>

      <div className="relative mx-auto h-[180px] w-[180px] shrink-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={58}
              outerRadius={88}
              dataKey="value"
              startAngle={90}
              endAngle={-270}
              strokeWidth={2}
              stroke="#fdfcff"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none gap-0.5">
          <span className="text-[10px] text-[#8c8d8c] text-center">Total Product Sales</span>
          <span className="text-[18px] font-bold text-[#2a2b2a]">20,000</span>
          <span className="text-[10px] text-[#8c8d8c]">₹10,00,000</span>
        </div>
      </div>

      <div className="flex flex-col gap-4 py-2 flex-1">
        {data.map((item) => (
          <div key={item.name} className="flex items-center gap-3">
            <div className="h-2 w-2 flex-shrink-0 rounded-sm" style={{ background: item.color }} />
            <div className="flex flex-1 flex-col gap-0.5 min-w-0">
              <span className="text-[12px] font-semibold text-[#2a2b2a] truncate">{item.name}</span>
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] text-[#8c8d8c]">{item.products}</span>
                <span className="text-[11px] text-[#8c8d8c]">·</span>
                <span className="text-[11px] text-[#8c8d8c]">{item.revenue}</span>
              </div>
            </div>
            <span className="text-[12px] font-extrabold text-[#2a2b2a] shrink-0">{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
