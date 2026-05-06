import { TrendingUp, Users, MoreHorizontal } from "lucide-react";

export function WidgetCustomerGrowth() {
  return (
    <div className="flex h-full flex-col justify-between rounded-[10px] bg-[#e2d7fa] p-4">
      <div className="flex items-center justify-between shrink-0">
        <h2 className="text-[14px] font-semibold text-[#2a2b2a]">Customer Growth</h2>
        <button className="rounded-md p-1 hover:bg-white/30 transition-colors">
          <MoreHorizontal size={24} className="text-[#555]" />
        </button>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex items-end justify-between">
          <span className="text-[32px] font-bold leading-none text-[#2a2b2a]">83%</span>
          <div className="flex flex-col items-end gap-0.5">
            <div className="flex items-center gap-0.5 rounded bg-[#fdfcff] px-1 py-0.5 w-fit">
              <TrendingUp size={12} className="text-[#555]" />
              <span className="text-[10px] text-[#555]">+2%</span>
            </div>
            <span className="text-[11px] text-[#8c8d8c] whitespace-nowrap">from last month</span>
          </div>
        </div>

        <div className="overflow-hidden rounded-md bg-[#fdfcff] h-9">
          <div className="h-full bg-[#ff683a] rounded-md" style={{ width: "83%" }} />
        </div>

        <div className="flex items-center gap-2">
          <Users size={20} className="text-[#555] shrink-0" />
          <span className="text-[16px] font-semibold text-[#2a2b2a]">185,854</span>
          <span className="text-[11px] text-[#555]">+3,542 users</span>
        </div>
      </div>
    </div>
  );
}
