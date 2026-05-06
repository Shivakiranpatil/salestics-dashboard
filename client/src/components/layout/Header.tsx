import { Search, Bell, ChevronDown } from "lucide-react";

export function Header({ title = "Dashboard" }: { title?: string }) {
  return (
    <header className="flex items-center justify-between py-1">
      <div className="flex flex-col gap-1.5">
        <h1 className="text-[22px] font-bold leading-tight text-[#2a2b2a]">{title}</h1>
      </div>

      <div className="flex items-center gap-3">
        <button className="rounded-md bg-[#fdfcff] p-[9px] shadow-sm hover:bg-[#f3f3f3] transition-colors">
          <Search size={22} className="text-[#555]" />
        </button>
        <button className="relative rounded-md bg-[#fdfcff] p-[9px] shadow-sm hover:bg-[#f3f3f3] transition-colors">
          <Bell size={22} className="text-[#555]" />
          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-[#ff683a]" />
        </button>

        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[#d2ebff] text-sm font-semibold text-[#2a2b2a]">
            RW
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-base font-semibold leading-tight text-[#2a2b2a]">Rafael Williams</span>
            <span className="text-[11px] font-normal text-[#8c8d8c]">Admin</span>
          </div>
          <button className="rounded-md bg-[#fdfcff] p-1.5 shadow-sm hover:bg-[#f3f3f3] transition-colors">
            <ChevronDown size={16} className="text-[#555]" />
          </button>
        </div>
      </div>
    </header>
  );
}
