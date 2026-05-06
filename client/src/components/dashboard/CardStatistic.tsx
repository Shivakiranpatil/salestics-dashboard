import { TrendingUp, TrendingDown, MoreHorizontal, LucideIcon } from "lucide-react";

interface CardStatisticProps {
  title: string;
  amount: string;
  change: string;
  changeType: "up" | "down";
  changeSuffix?: string;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
}

export function CardStatistic({
  title,
  amount,
  change,
  changeType,
  changeSuffix = "from last week",
  icon: Icon,
  iconBg,
  iconColor,
}: CardStatisticProps) {
  const isUp = changeType === "up";
  return (
    <div className="flex h-[112px] flex-col gap-3 rounded-[10px] bg-[#fdfcff] p-4" data-testid={`card-${title.toLowerCase().replace(/\s+/g, '-')}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={`flex items-center justify-center rounded-lg p-1.5 ${iconBg}`}>
            <Icon size={18} className={iconColor} />
          </div>
          <span className="text-[12px] font-normal leading-tight text-[#2a2b2a]">{title}</span>
        </div>
        <button className="rounded-md p-1 hover:bg-[#f3f3f3] transition-colors">
          <MoreHorizontal size={24} className="text-[#555]" />
        </button>
      </div>

      <div className="flex items-end gap-2">
        <span className="text-[22px] font-bold leading-tight text-[#2a2b2a]">{amount}</span>
        <div className="flex flex-1 flex-col items-end gap-1.5">
          <div className={`flex items-center gap-1 rounded px-1 py-0.5 ${isUp ? "bg-[#d2ebff]" : "bg-[#ffd9d0]"}`}>
            {isUp ? (
              <TrendingUp size={12} className="text-[#2a2b2a]" />
            ) : (
              <TrendingDown size={12} className="text-[#2a2b2a]" />
            )}
            <span className="text-[10px] text-[#2a2b2a]">{change}</span>
          </div>
          <span className="text-[11px] text-[#8c8d8c] whitespace-nowrap">{changeSuffix}</span>
        </div>
      </div>
    </div>
  );
}
