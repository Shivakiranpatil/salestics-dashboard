import { Link, useLocation } from "wouter";
import {
  LayoutDashboard,
  CalendarDays,
  Package,
  ShoppingBasket,
  Receipt,
  MessageCircle,
  Truck,
  Megaphone,
  LogOut,
  Zap,
} from "lucide-react";

const navItems = [
  { label: "Dashboard",  icon: LayoutDashboard, href: "/",          badge: null },
  { label: "Schedule",   icon: CalendarDays,     href: "/schedule",  badge: null },
  { label: "Products",   icon: Package,          href: "/products",  badge: null },
  { label: "Orders",     icon: ShoppingBasket,   href: "/orders",    badge: null },
  { label: "Invoices",   icon: Receipt,          href: "/invoices",  badge: null },
  { label: "Messages",   icon: MessageCircle,    href: "/messages",  badge: 6    },
  { label: "Shipments",  icon: Truck,            href: "/shipments", badge: null },
  { label: "Campaigns",  icon: Megaphone,        href: "/campaigns", badge: null },
];

export function Sidebar() {
  const [location] = useLocation();

  return (
    <aside className="flex h-full w-[223px] flex-shrink-0 flex-col bg-[#fdfcff] px-4 py-7">
      {/* Logo */}
      <div className="flex items-center gap-2 px-2 py-[9px] mb-7">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#ff683a]">
          <Zap size={14} className="text-white fill-white" />
        </div>
        <span className="text-[20px] font-semibold text-[#2a2b2a] leading-tight">Salestics</span>
      </div>

      {/* Nav */}
      <nav className="flex flex-1 flex-col gap-2">
        {navItems.map((item) => {
          const active = location === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-[8px] px-4 py-2.5 text-[14px] font-medium transition-colors ${
                active
                  ? "bg-[#ff683a] text-white"
                  : "text-[#8c8d8c] hover:bg-[#f3f3f3] hover:text-[#2a2b2a]"
              }`}
              data-testid={`nav-${item.label.toLowerCase()}`}
            >
              <item.icon size={20} />
              <span className="flex-1">{item.label}</span>
              {item.badge !== null && (
                <span className={`flex min-w-[18px] items-center justify-center rounded-full px-[5px] py-[2px] text-[11px] font-medium leading-none ${active ? "bg-white text-[#ff683a]" : "bg-[#ff683a] text-white"}`}>
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Discover promo card */}
      <div className="mb-4 rounded-[10px] bg-[#d2ebff] p-4">
        <div className="mb-2 flex h-7 w-7 items-center justify-center rounded-md bg-[#ff683a]">
          <Zap size={13} className="text-white fill-white" />
        </div>
        <p className="mb-1 text-[14px] font-bold text-[#2a2b2a] leading-tight">Discover New Features!</p>
        <p className="mb-3 text-[11px] text-[#555] leading-snug">Unlock new features and take your sales to the next level</p>
        <button
          className="w-full rounded-[6px] bg-[#ff683a] py-1.5 text-[11px] font-semibold text-white hover:bg-[#e85a2e] transition-colors"
          data-testid="button-explore-upgrades"
        >
          Explore Upgrades
        </button>
      </div>

      {/* Logout */}
      <Link
        href="/logout"
        className="flex items-center gap-3 rounded-[8px] px-4 py-2.5 text-[14px] font-medium text-[#8c8d8c] hover:bg-[#f3f3f3] hover:text-[#2a2b2a] transition-colors"
        data-testid="nav-logout"
      >
        <LogOut size={20} />
        Logout
      </Link>
    </aside>
  );
}
