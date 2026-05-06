import { MoreHorizontal, ChevronDown, Cpu, ShoppingBag, User, Package, Bell } from "lucide-react";

const activities = [
  {
    id: 1,
    actor: "System",
    time: "08:05 AM",
    message: "Completed an automatic data backup, ensuring that all sales and inventory data are securely stored.",
    icon: Cpu,
    iconBg: "bg-[#ff683a]",
    iconColor: "text-white",
    hasExpand: true,
  },
  {
    id: 2,
    actor: "Sarah Johnson",
    time: "10:22 AM",
    message: "Processed a bulk order of 150 units from TechMart Inc., totaling ₹12,750. Order #4521 has been confirmed and is now in the packing stage.",
    icon: ShoppingBag,
    iconBg: "bg-[#e2d7fa]",
    iconColor: "text-[#555]",
    hasExpand: true,
  },
  {
    id: 3,
    actor: "Carlos M.",
    time: "11:45 AM",
    message: "Updated the stock inventory for 5 product categories. Added 200 units of Wireless Headphones and removed discontinued items from the catalog.",
    icon: Package,
    iconBg: "bg-[#d2ebff]",
    iconColor: "text-[#555]",
    hasExpand: true,
  },
  {
    id: 4,
    actor: "New User",
    time: "01:14 PM",
    message: "Customer Alex Kim just registered.",
    icon: User,
    iconBg: "bg-[#ffd9d0]",
    iconColor: "text-[#555]",
    hasExpand: false,
  },
  {
    id: 5,
    actor: "Alert",
    time: "03:30 PM",
    message: "Low stock warning: USB-C Hub 7-in-1 is out of stock.",
    icon: Bell,
    iconBg: "bg-[#f3f3f3]",
    iconColor: "text-[#555]",
    hasExpand: false,
  },
];

export function WidgetRecentActivity() {
  return (
    <div className="flex h-full flex-col gap-3 rounded-[10px] bg-[#fdfcff] p-4">
      <div className="flex items-center justify-between shrink-0">
        <h2 className="text-[14px] font-semibold text-[#2a2b2a]">Recent Activity</h2>
        <button className="rounded-md p-1 hover:bg-[#f3f3f3] transition-colors" data-testid="button-activity-more">
          <MoreHorizontal size={24} className="text-[#555]" />
        </button>
      </div>

      <div className="flex flex-1 flex-col justify-between min-h-0 gap-4">
        {activities.map((item) => (
          <div key={item.id} className="flex gap-2 shrink-0" data-testid={`activity-item-${item.id}`}>
            <div className="flex flex-col items-center shrink-0">
              <div className={`flex h-[34px] w-[34px] items-center justify-center rounded-[20px] ${item.iconBg} shrink-0`}>
                <item.icon size={16} className={item.iconColor} />
              </div>
              {item.id !== activities.length && (
                <div className="mt-1 w-px flex-1 bg-[#e1e1e1]" style={{ minHeight: 8 }} />
              )}
            </div>
            <div className="flex flex-1 min-w-0 flex-col gap-0.5 pb-1">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[12px] font-extrabold text-[#2a2b2a] whitespace-nowrap">{item.actor}</span>
                <span className="text-[10px] text-[#8c8d8c] whitespace-nowrap">{item.time}</span>
                {item.hasExpand && (
                  <button className="flex items-center justify-center rounded-[2px] bg-[#f3f3f3] p-0.5">
                    <ChevronDown size={12} className="text-[#555]" />
                  </button>
                )}
              </div>
              <p className="text-[11px] leading-relaxed text-[#555] line-clamp-2">{item.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
