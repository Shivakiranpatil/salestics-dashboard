import { TrendingUp, TrendingDown, ChevronDown } from "lucide-react";
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
  { month: "Jan", earnings: 28000, expenditure: 16000 },
  { month: "Feb", earnings: 42000, expenditure: 25000 },
  { month: "Mar", earnings: 35000, expenditure: 20000 },
  { month: "Apr", earnings: 58000, expenditure: 32000 },
  { month: "May", earnings: 52000, expenditure: 28000 },
  { month: "Jun", earnings: 70000, expenditure: 40000 },
  { month: "Jul", earnings: 63000, expenditure: 36000 },
  { month: "Aug", earnings: 84378, expenditure: 51954 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg bg-[#2a2b2a] px-3 py-2 shadow-lg">
        <p className="text-[10px] text-[#8c8d8c] mb-0.5">{label}</p>
        <p className="text-sm font-bold text-white">₹{payload[0]?.value?.toLocaleString("en-IN")}</p>
      </div>
    );
  }
  return null;
};

export function WidgetSalesOverview() {
  return (
    <div className="flex h-full flex-col gap-4 rounded-[10px] bg-[#fdfcff] p-4">
      <div className="flex items-center justify-between shrink-0">
        <h2 className="text-[14px] font-semibold text-[#2a2b2a]">Sales Overview</h2>
        <button className="flex items-center gap-1 rounded-[5px] bg-[#f3f3f3] px-2.5 py-1.5 text-[11px] font-medium text-[#555] hover:bg-[#ebebeb] transition-colors">
          Last 8 Months
          <ChevronDown size={14} />
        </button>
      </div>

      <div className="flex items-center justify-between shrink-0">
        <div className="flex items-start gap-6">
          <div className="flex flex-col gap-2">
            <span className="text-[12px] text-[#8c8d8c]">Total Earnings</span>
            <span className="text-[22px] font-bold text-[#2a2b2a]">₹84,378</span>
            <div className="flex items-center gap-1 rounded px-1 py-0.5 bg-[#d2ebff] w-fit">
              <TrendingUp size={12} className="text-[#2a2b2a]" />
              <span className="text-[9px] text-[#2a2b2a]">+2.34%</span>
            </div>
          </div>
          <div className="self-stretch w-px bg-[#e1e1e1]" />
          <div className="flex flex-col gap-2">
            <span className="text-[12px] text-[#8c8d8c]">Total Expenditure</span>
            <span className="text-[22px] font-bold text-[#2a2b2a]">₹51,954</span>
            <div className="flex items-center gap-1 rounded px-1 py-0.5 bg-[#ffd9d0] w-fit">
              <TrendingDown size={12} className="text-[#2a2b2a]" />
              <span className="text-[9px] text-[#2a2b2a]">-1.85%</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-1.5">
            <div className="h-1.5 w-1.5 rounded-sm bg-[#d2ebff]" />
            <span className="text-[12px] text-[#878a94]">Earnings</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-1.5 w-1.5 rounded-sm bg-[#ff683a]" />
            <span className="text-[12px] text-[#878a94]">Expenditure</span>
          </div>
        </div>
      </div>

      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barCategoryGap="28%" barGap={3}>
            <CartesianGrid vertical={false} stroke="#f0f0f0" strokeDasharray="0" />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: "#8c8d8c", fontFamily: "Plus Jakarta Sans" }}
            />
            <YAxis hide />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(0,0,0,0.04)", radius: 4 }} />
            <Bar dataKey="earnings" fill="#d2ebff" radius={[3, 3, 0, 0]} />
            <Bar dataKey="expenditure" fill="#ff683a" radius={[3, 3, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
