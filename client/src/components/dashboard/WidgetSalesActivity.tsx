import { Package, Truck, CheckSquare, Clock, MoreHorizontal } from "lucide-react";

const activities = [
  { label: "Packed", value: "2034", icon: Package },
  { label: "Delivered", value: "1186", icon: CheckSquare },
  { label: "Shipping", value: "879", icon: Truck },
  { label: "Pending", value: "342", icon: Clock },
];

export function WidgetSalesActivity() {
  return (
    <div className="flex h-full flex-col gap-4 rounded-[10px] bg-[#d2ebff] p-4 pb-5">
      <div className="flex items-center justify-between shrink-0">
        <h2 className="text-[14px] font-semibold text-[#2a2b2a]">Sales Activity</h2>
        <button className="rounded-md p-1 hover:bg-white/40 transition-colors">
          <MoreHorizontal size={24} className="text-[#555]" />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-y-5 flex-1">
        {activities.map((item) => (
          <div key={item.label} className="flex items-center gap-3">
            <div className="flex items-center justify-center rounded-lg bg-[#fdfcff] p-2 shrink-0">
              <item.icon size={24} className="text-[#555]" />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[11px] leading-tight text-[#8c8d8c]">{item.label}</span>
              <span className="text-[18px] font-bold leading-tight text-[#2a2b2a]">{item.value}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
