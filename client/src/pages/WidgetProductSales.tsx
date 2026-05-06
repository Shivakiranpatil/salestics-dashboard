import { ChevronDown } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Area,
  AreaChart,
  CartesianGrid,
} from "recharts";

// Time-series data with dates and orders per category
const timeSeriesData = [
  { date: "Jan 1",  women: 420, men: 300, acc: 180, foot: 220, bags: 80  },
  { date: "Jan 15", women: 380, men: 260, acc: 240, foot: 190, bags: 95  },
  { date: "Feb 1",  women: 550, men: 380, acc: 320, foot: 180, bags: 100 },
  { date: "Feb 15", women: 490, men: 350, acc: 410, foot: 210, bags: 88  },
  { date: "Mar 1",  women: 480, men: 350, acc: 580, foot: 250, bags: 70  },
  { date: "Mar 15", women: 520, men: 330, acc: 520, foot: 230, bags: 82  },
  { date: "Apr 1",  women: 600, men: 420, acc: 750, foot: 200, bags: 120 },
  { date: "Apr 15", women: 570, men: 410, acc: 680, foot: 215, bags: 110 },
  { date: "May 1",  women: 520, men: 390, acc: 620, foot: 220, bags: 90  },
  { date: "May 15", women: 480, men: 360, acc: 540, foot: 200, bags: 85  },
  { date: "Jun 1",  women: 450, men: 330, acc: 450, foot: 180, bags: 80  },
  { date: "Jun 15", women: 470, men: 345, acc: 490, foot: 195, bags: 78  },
  { date: "Jul 1",  women: 580, men: 440, acc: 550, foot: 240, bags: 110 },
  { date: "Jul 15", women: 560, men: 425, acc: 510, foot: 228, bags: 105 },
  { date: "Aug 1",  women: 500, men: 360, acc: 480, foot: 210, bags: 90  },
];

const categories = [
  {
    dataKey: "women",
    icon: (
      <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round">
        <path d="M8 1.5C6.5 1.5 5.5 2.8 5.5 3.8L2.5 5.5L3.5 14H12.5L13.5 5.5L10.5 3.8C10.5 2.8 9.5 1.5 8 1.5Z" />
        <path d="M5.5 3.8Q8 6 10.5 3.8" />
      </svg>
    ),
    percentage: "35%",
    label: "Women's\nClothing",
    highlighted: false,
    lineColor: "#7ab8e8",
    fillColor: "#d2ebff",
    footer: null,
  },
  {
    dataKey: "men",
    icon: (
      <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round">
        <path d="M5.5 2L2.5 5L5.5 6V14H10.5V6L13.5 5L10.5 2C10 3 9 3.5 8 3.5C7 3.5 6 3 5.5 2Z" />
      </svg>
    ),
    percentage: "25%",
    label: "Men's\nClothing",
    highlighted: false,
    lineColor: "#9b7ed4",
    fillColor: "#e2d7fa",
    footer: null,
  },
  {
    dataKey: "acc",
    icon: (
      <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.3">
        <circle cx="8" cy="8" r="3" />
        <circle cx="8" cy="8" r="6.5" />
        <path d="M8 1.5V0.5M8 15.5V14.5M0.5 8H1.5M14.5 8H15.5" strokeLinecap="round" />
      </svg>
    ),
    percentage: "20%",
    label: "Accessories",
    highlighted: true,
    lineColor: "#ff683a",
    fillColor: "#ffd9d0",
    footer: { value: "24", label: "Products" },
  },
  {
    dataKey: "foot",
    icon: (
      <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round">
        <path d="M2 9.5Q2 12.5 5 13H11Q14 12.5 14 9.5V9Q11 7.5 8 7.5Q5 7.5 2 9Z" />
        <path d="M5.5 7.5V5.5Q5.5 3.5 7 3.5H9Q10.5 3.5 10.5 5.5V7.5" />
      </svg>
    ),
    percentage: "15%",
    label: "Footwear",
    highlighted: false,
    lineColor: "#9b7ed4",
    fillColor: "#e2d7fa",
    footer: null,
  },
  {
    dataKey: "bags",
    icon: (
      <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round">
        <path d="M3.5 5H12.5L13.5 14H2.5Z" />
        <path d="M6 5Q6 3 8 3Q10 3 10 5" />
      </svg>
    ),
    percentage: "5%",
    label: "Bags &\nPurses",
    highlighted: false,
    lineColor: "#9b7ed4",
    fillColor: "#e2d7fa",
    footer: null,
  },
];

const CustomTooltip = ({ active, payload, label, lineColor }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg bg-[#2a2b2a] px-2.5 py-1.5 shadow-lg border border-white/10">
        <p className="text-[9px] text-[#8c8d8c] mb-0.5">{label}</p>
        <p className="text-[11px] font-bold text-white">
          {payload[0]?.value?.toLocaleString()} orders
        </p>
      </div>
    );
  }
  return null;
};

export const WidgetProductSales = (): JSX.Element => {
  return (
    <div className="flex h-full flex-col rounded-[10px] bg-[#fdfcff] overflow-hidden">

      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 shrink-0">
        <h2 className="text-[14px] font-semibold text-[#2a2b2a] whitespace-nowrap">
          Product Sales Category
        </h2>
        <button className="flex items-center gap-0.5 rounded-[5px] bg-[#f3f3f3] pl-2.5 pr-2 py-1.5 text-[11px] font-medium text-[#555] hover:bg-[#ebebeb] transition-colors">
          Last 8 Months
          <ChevronDown size={12} className="ml-0.5" />
        </button>
      </div>

      {/* 5-column grid */}
      <div className="flex-1 min-h-0 grid grid-cols-5">
        {categories.map((cat, i) => (
          <div
            key={i}
            className={`flex flex-col border-l border-[#e1e1e1] first:border-l-0 overflow-hidden ${cat.highlighted ? "bg-[#f6f7f6]" : "bg-transparent"}`}
          >
            {/* Info header */}
            <div className={`flex flex-col gap-1 px-3 pt-2 pb-1 shrink-0 ${cat.highlighted ? "shadow-sm" : ""}`}>
              <span className="text-[#8c8d8c]">{cat.icon}</span>
              <span className={`text-[14px] font-extrabold leading-tight ${cat.highlighted ? "text-[#ff683a]" : "text-[#2a2b2a]"}`}>
                {cat.percentage}
              </span>
              <span className="text-[11px] font-normal leading-tight text-[#8c8d8c] whitespace-pre-line">
                {cat.label}
              </span>
              {cat.footer ? (
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="text-[11px] font-semibold text-[#2a2b2a]">{cat.footer.value}</span>
                  <span className="text-[10px] text-[#8c8d8c]">{cat.footer.label}</span>
                </div>
              ) : (
                <div className="h-4" />
              )}
            </div>

            {/* Time-series area chart */}
            <div className="flex-1 min-h-0">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={timeSeriesData}
                  margin={{ top: 4, right: 0, bottom: 0, left: 0 }}
                >
                  <defs>
                    <linearGradient id={`fill-${i}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={cat.fillColor} stopOpacity={0.8} />
                      <stop offset="100%" stopColor={cat.fillColor} stopOpacity={0.1} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="date" hide />
                  <YAxis hide domain={["auto", "auto"]} />
                  <Tooltip
                    content={<CustomTooltip />}
                    cursor={{ stroke: cat.lineColor, strokeWidth: 1, strokeDasharray: "3 3" }}
                  />
                  <Area
                    type="monotone"
                    dataKey={cat.dataKey}
                    stroke={cat.lineColor}
                    strokeWidth={1.5}
                    fill={`url(#fill-${i})`}
                    dot={false}
                    activeDot={{ r: 3, fill: cat.lineColor, strokeWidth: 0 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
