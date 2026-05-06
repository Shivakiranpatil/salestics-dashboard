import { useState, useRef, useEffect } from "react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine, ReferenceDot,
} from "recharts";
import {
  Search, SlidersHorizontal, ChevronDown, Plus,
  TrendingUp, TrendingDown, ArrowUpDown,
  ChevronLeft, ChevronRight, X, Save,
  MousePointerClick, BarChart3, Percent, Eye,
  Package, Check, IndianRupee, Target, Users, Wallet,
} from "lucide-react";
import { ALL_PRODUCTS } from "@/data/products";

/* ── Types ── */
type CampaignStatus = "Active" | "Planned" | "Completed";

interface Campaign {
  id: number;
  name: string;
  start: string;
  end: string;
  impressions: number | null;
  engagements: number | null;
  creator: string;
  creatorInitials: string;
  creatorColor: string;
  cost: number;
  status: CampaignStatus;
  enabled: boolean;
  /* new */
  products: string[];
  ctr: number | null;
  conversionRate: number | null;
  amountSpent: number | null;
}

/* ── Static Data ── */
const CHART_DATA = [
  { date: "Apr 15", value: 28 },
  { date: "Apr 16", value: 42 },
  { date: "Apr 17", value: 52 },
  { date: "Apr 18", value: 75 },
  { date: "Apr 19", value: 62 },
  { date: "Apr 20", value: 48 },
  { date: "Apr 21", value: 38 },
  { date: "Apr 22", value: 33 },
];

const INITIAL_CAMPAIGNS: Campaign[] = [
  { id: 1,  name: "Spring Collection Launch",    start: "Apr 1, 2028",  end: "Apr 30, 2028", impressions: 500000, engagements: 35000, creator: "Emma Brown",    creatorInitials: "EB", creatorColor: "#d2ebff", cost: 15000, status: "Active",    enabled: true,  products: ["Classic Leather Jacket","Running Sneakers"],     ctr: 5.9,  conversionRate: 2.6, amountSpent: 125000 },
  { id: 2,  name: "Summer Sale Extravaganza",     start: "May 1, 2028",  end: "May 31, 2028", impressions: null,   engagements: null,  creator: "John Smith",   creatorInitials: "JS", creatorColor: "#e2d7fa", cost: 12000, status: "Planned",   enabled: true,  products: ["Designer Handbag"],                               ctr: null, conversionRate: null, amountSpent: null },
  { id: 3,  name: "Influencer Collaboration",     start: "Mar 15, 2028", end: "Apr 15, 2028", impressions: 200000, engagements: 10000, creator: "Joe Adam",      creatorInitials: "JA", creatorColor: "#ffd6c8", cost: 8000,  status: "Completed", enabled: false, products: ["Wireless Earbuds"],                               ctr: 3.2,  conversionRate: 1.8, amountSpent: 68000 },
  { id: 4,  name: "Eco-Friendly Campaign",        start: "Feb 1, 2028",  end: "Mar 1, 2028",  impressions: 150000, engagements: 7500,  creator: "Sarah Johnson",creatorInitials: "SJ", creatorColor: "#d1fae5", cost: 5000,  status: "Completed", enabled: false, products: [],                                                 ctr: 2.8,  conversionRate: 1.2, amountSpent: 42000 },
  { id: 5,  name: "Flash Sale Weekend",           start: "Apr 20, 2028", end: "Apr 22, 2028", impressions: 100000, engagements: 7500,  creator: "Chris Lee",    creatorInitials: "CL", creatorColor: "#ffd6c8", cost: 3500,  status: "Active",    enabled: true,  products: ["Designer Sunglasses","Classic Leather Jacket"],   ctr: 7.1,  conversionRate: 3.4, amountSpent: 29000 },
  { id: 6,  name: "New Arrivals Showcase",        start: "Apr 15, 2028", end: "May 15, 2028", impressions: 200000, engagements: 10000, creator: "Robert White", creatorInitials: "RW", creatorColor: "#d2ebff", cost: 10000, status: "Active",    enabled: true,  products: ["Running Sneakers","Smart Watch"],                 ctr: 4.5,  conversionRate: 2.1, amountSpent: 84000 },
  { id: 7,  name: "Luxury Accessories Promotion", start: "Mar 1, 2028",  end: "Mar 31, 2028", impressions: 100000, engagements: 5000,  creator: "Nancy Taylor", creatorInitials: "NT", creatorColor: "#d1fae5", cost: 4500,  status: "Completed", enabled: false, products: ["Designer Handbag","Designer Sunglasses"],        ctr: 3.9,  conversionRate: 2.0, amountSpent: 37500 },
  { id: 8,  name: "Autumn Preview",               start: "Aug 1, 2028",  end: "Aug 31, 2028", impressions: null,   engagements: null,  creator: "Linda Moore",  creatorInitials: "LM", creatorColor: "#e2d7fa", cost: 9000,  status: "Planned",   enabled: false, products: [],                                                 ctr: null, conversionRate: null, amountSpent: null },
  { id: 9,  name: "Winter Warmth Collection",     start: "Nov 1, 2028",  end: "Nov 30, 2028", impressions: null,   engagements: null,  creator: "Michael Green",creatorInitials: "MG", creatorColor: "#d1fae5", cost: 7500,  status: "Planned",   enabled: false, products: [],                                                 ctr: null, conversionRate: null, amountSpent: null },
  { id: 10, name: "Holiday Gift Guide",           start: "Dec 1, 2028",  end: "Dec 25, 2028", impressions: null,   engagements: null,  creator: "Jessica Carter",creatorInitials: "JC",creatorColor: "#ffd6c8", cost: 9500,  status: "Planned",   enabled: false, products: [],                                                 ctr: null, conversionRate: null, amountSpent: null },
  { id: 11, name: "Back to School Drive",         start: "Jul 15, 2028", end: "Aug 15, 2028", impressions: null,   engagements: null,  creator: "Tom Harris",   creatorInitials: "TH", creatorColor: "#d2ebff", cost: 6000,  status: "Planned",   enabled: false, products: [],                                                 ctr: null, conversionRate: null, amountSpent: null },
  { id: 12, name: "Valentine's Day Special",      start: "Feb 1, 2028",  end: "Feb 14, 2028", impressions: 320000, engagements: 18000, creator: "Amy Collins",  creatorInitials: "AC", creatorColor: "#ffd6c8", cost: 11000, status: "Completed", enabled: false, products: ["Designer Handbag"],                               ctr: 6.3,  conversionRate: 3.1, amountSpent: 91000 },
];

const CAMPAIGN_OPTIONS = ["New Arrivals Showcase", "Spring Collection Launch", "Flash Sale Weekend", "Summer Sale Extravaganza"];
const DATE_RANGES = ["15 - 22 Apr 2028", "1 - 30 Apr 2028", "1 - 31 May 2028"];

/* ── Helpers ── */
function fmtINR(n: number) {
  return "₹" + n.toLocaleString("en-IN");
}

/* ── Status Badge ── */
function StatusBadge({ status }: { status: CampaignStatus }) {
  const styles: Record<CampaignStatus, string> = {
    Active:    "bg-[#ff683a] text-white",
    Planned:   "bg-[#e2d7fa] text-[#5b21b6]",
    Completed: "bg-[#d1fae5] text-[#065f46]",
  };
  return (
    <span className={`inline-flex items-center rounded-[5px] px-2 py-0.5 text-[11px] font-medium whitespace-nowrap ${styles[status]}`}>
      {status}
    </span>
  );
}

/* ── Toggle Switch ── */
function Toggle({ enabled, onChange }: { enabled: boolean; onChange: () => void }) {
  return (
    <button
      role="switch"
      aria-checked={enabled}
      onClick={onChange}
      className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors focus:outline-none ${enabled ? "bg-[#ff683a]" : "bg-[#d0d0d0]"}`}
    >
      <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform ${enabled ? "translate-x-4" : "translate-x-0"}`} />
    </button>
  );
}

/* ── Stat Card ── */
function StatCard({ label, value, change, positive, icon: Icon, iconBg }: {
  label: string; value: string; change: string; positive: boolean;
  icon: React.ElementType; iconBg: string;
}) {
  return (
    <div className="flex flex-col gap-2.5 rounded-[10px] border border-[#f0f0f0] bg-[#fdfcff] p-4">
      <div className="flex items-start justify-between">
        <span className="text-[11px] text-[#8c8d8c]">{label}</span>
        <div className={`flex h-8 w-8 items-center justify-center rounded-[8px] ${iconBg}`}>
          <Icon size={15} className="text-white" />
        </div>
      </div>
      <p className="text-[26px] font-bold text-[#2a2b2a] leading-none">{value}</p>
      <div className="flex items-center gap-1">
        {positive ? <TrendingUp size={13} className="text-[#22c55e] shrink-0" /> : <TrendingDown size={13} className="text-[#ef4444] shrink-0" />}
        <span className={`text-[11px] font-medium ${positive ? "text-[#22c55e]" : "text-[#ef4444]"}`}>{change}</span>
        <span className="text-[11px] text-[#8c8d8c]">from last week</span>
      </div>
    </div>
  );
}

/* ── Custom Tooltip ── */
function ChartTooltip({ active, payload, label }: { active?: boolean; payload?: { value: number }[]; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-[7px] bg-white border border-[#e8e8e8] px-3 py-2 shadow-lg">
      <p className="text-[11px] text-[#8c8d8c] mb-0.5">{label}</p>
      <p className="text-[13px] font-bold text-[#2a2b2a]">{payload[0].value}%</p>
    </div>
  );
}

/* ── Product Multi-Select ── */
function ProductSelect({ selected, onChange }: { selected: string[]; onChange: (s: string[]) => void }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handler(e: MouseEvent) { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const filtered = ALL_PRODUCTS.filter(p =>
    !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase())
  );

  function toggle(name: string) {
    onChange(selected.includes(name) ? selected.filter(s => s !== name) : [...selected, name]);
  }

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between rounded-[7px] border border-[#e8e8e8] bg-[#fdfcff] px-3 py-2.5 text-[13px] outline-none focus:border-[#ff683a] hover:border-[#ff683a] transition-colors text-left"
        data-testid="button-select-products"
      >
        <span className={selected.length === 0 ? "text-[#c0c0c0]" : "text-[#2a2b2a]"}>
          {selected.length === 0 ? "Select products…" : selected.length === 1 ? selected[0] : `${selected.length} products selected`}
        </span>
        <ChevronDown size={13} className={`text-[#8c8d8c] shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {/* Selected chips */}
      {selected.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-2">
          {selected.map(name => (
            <span key={name} className="flex items-center gap-1 rounded-[5px] bg-[#fff0eb] border border-[#ffd0bc] px-2 py-0.5 text-[11px] font-medium text-[#ff683a]">
              {name}
              <button type="button" onClick={() => toggle(name)} className="hover:text-[#c0392b]"><X size={10} /></button>
            </span>
          ))}
        </div>
      )}

      {open && (
        <div className="absolute left-0 top-full z-50 mt-1.5 w-full rounded-[8px] border border-[#e8e8e8] bg-white shadow-lg overflow-hidden">
          <div className="flex items-center gap-2 border-b border-[#f0f0f0] px-3 py-2">
            <Search size={12} className="text-[#8c8d8c] shrink-0" />
            <input
              autoFocus
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search products…"
              className="flex-1 text-[12px] outline-none bg-transparent text-[#2a2b2a] placeholder:text-[#c0c0c0]"
              data-testid="input-product-search"
            />
          </div>
          <div className="max-h-[200px] overflow-y-auto">
            {filtered.length === 0 ? (
              <p className="px-4 py-3 text-[12px] text-[#8c8d8c]">No products found</p>
            ) : (
              filtered.map(p => {
                const isSelected = selected.includes(p.name);
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => toggle(p.name)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 text-left hover:bg-[#fafafa] transition-colors ${isSelected ? "bg-[#fff8f6]" : ""}`}
                    data-testid={`product-option-${p.id}`}
                  >
                    <div className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-[3px] border transition-colors ${isSelected ? "bg-[#ff683a] border-[#ff683a]" : "border-[#d0d0d0]"}`}>
                      {isSelected && <Check size={10} className="text-white" strokeWidth={3} />}
                    </div>
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[6px] text-[10px] font-bold" style={{ backgroundColor: p.color + "33", color: p.color }}>
                      {p.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[12px] font-medium text-[#2a2b2a] truncate">{p.name}</p>
                      <p className="text-[10px] text-[#8c8d8c]">{p.category} · ₹{p.price.toLocaleString("en-IN")}</p>
                    </div>
                    <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-[4px] shrink-0 ${p.status === "In Stock" ? "bg-[#d1fae5] text-[#065f46]" : p.status === "Low Stock" ? "bg-[#fff3e0] text-[#c45400]" : "bg-[#ffe5e5] text-[#b91c1c]"}`}>
                      {p.status}
                    </span>
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Add Campaign Modal ── */
const EMPTY_FORM = {
  name: "", start: "", end: "", budget: "", location: "", status: "Planned" as CampaignStatus,
  products: [] as string[],
};

const INDIA_CITIES = [
  "All India","Mumbai","Delhi","Bengaluru","Hyderabad","Ahmedabad","Chennai",
  "Kolkata","Pune","Jaipur","Lucknow","Surat","Kanpur","Nagpur","Indore",
  "Thane","Bhopal","Visakhapatnam","Patna","Vadodara","Ghaziabad","Ludhiana",
  "Agra","Nashik","Faridabad","Meerut","Rajkot","Varanasi","Coimbatore","Chandigarh",
];

function AddCampaignModal({ onAdd, onClose }: { onAdd: (c: Campaign) => void; onClose: () => void }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function set(field: string, val: string) {
    setForm(f => ({ ...f, [field]: val }));
    setErrors(e => ({ ...e, [field]: "" }));
  }

  function validate() {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Campaign name is required";
    if (!form.start)       errs.start = "Start date is required";
    if (!form.end)         errs.end = "End date is required";
    if (!form.budget || isNaN(parseFloat(form.budget))) errs.budget = "Enter a valid budget";
    return errs;
  }

  function handleSubmit() {
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    const COLORS = ["#d2ebff","#e2d7fa","#d1fae5","#ffd6c8"];
    onAdd({
      id: Date.now(),
      name: form.name.trim(),
      start: new Date(form.start).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      end:   new Date(form.end).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      impressions: null,
      engagements: null,
      creator: "Rafael Williams",
      creatorInitials: "RW",
      creatorColor: COLORS[Math.floor(Math.random() * COLORS.length)],
      cost: parseFloat(form.budget),
      status: form.status,
      enabled: form.status === "Active",
      products: form.products,
      ctr: null,
      conversionRate: null,
      amountSpent: null,
    });
  }

  const inputCls = (field: string) =>
    `rounded-[8px] border px-3 py-2.5 text-[13px] outline-none transition-colors w-full bg-white ${errors[field] ? "border-red-400 bg-red-50" : "border-[#e8e8e8] focus:border-[#ff683a]"}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
      <div className="w-full max-w-[480px] bg-white rounded-[14px] shadow-2xl flex flex-col">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#f0f0f0]">
          <div>
            <h2 className="text-[16px] font-bold text-[#2a2b2a]">Add Campaign</h2>
            <p className="text-[12px] text-[#8c8d8c] mt-0.5">Create a new marketing campaign</p>
          </div>
          <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-[#f3f3f3] transition-colors" data-testid="button-add-campaign-close">
            <X size={16} className="text-[#8c8d8c]" />
          </button>
        </div>

        {/* Body */}
        <div className="flex flex-col gap-4 p-6">

          {/* Campaign Name */}
          <label className="flex flex-col gap-1.5">
            <span className="text-[12px] font-semibold text-[#2a2b2a]">Campaign Name <span className="text-[#ff683a]">*</span></span>
            <input
              value={form.name}
              onChange={e => set("name", e.target.value)}
              placeholder="e.g. Summer Sale Launch"
              className={inputCls("name")}
              data-testid="input-campaign-name"
            />
            {errors.name && <span className="text-[11px] text-red-500">{errors.name}</span>}
          </label>

          {/* Products */}
          <label className="flex flex-col gap-1.5">
            <span className="text-[12px] font-semibold text-[#2a2b2a] flex items-center gap-1.5">
              <Package size={12} className="text-[#ff683a]" /> Select Products
            </span>
            <ProductSelect
              selected={form.products}
              onChange={products => setForm(f => ({ ...f, products }))}
            />
          </label>

          {/* Budget */}
          <label className="flex flex-col gap-1.5">
            <span className="text-[12px] font-semibold text-[#2a2b2a]">Budget (₹) <span className="text-[#ff683a]">*</span></span>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8c8d8c] text-[13px] font-medium">₹</span>
              <input
                type="number"
                min="0"
                value={form.budget}
                onChange={e => set("budget", e.target.value)}
                placeholder="0"
                className={`${inputCls("budget")} pl-7`}
                data-testid="input-campaign-budget"
              />
            </div>
            {errors.budget && <span className="text-[11px] text-red-500">{errors.budget}</span>}
          </label>

          {/* Start / End Date */}
          <div className="flex gap-3">
            <label className="flex flex-1 flex-col gap-1.5">
              <span className="text-[12px] font-semibold text-[#2a2b2a]">Start Date <span className="text-[#ff683a]">*</span></span>
              <input
                type="date"
                value={form.start}
                onChange={e => set("start", e.target.value)}
                className={inputCls("start")}
                data-testid="input-campaign-start"
              />
              {errors.start && <span className="text-[11px] text-red-500">{errors.start}</span>}
            </label>
            <label className="flex flex-1 flex-col gap-1.5">
              <span className="text-[12px] font-semibold text-[#2a2b2a]">End Date <span className="text-[#ff683a]">*</span></span>
              <input
                type="date"
                value={form.end}
                onChange={e => set("end", e.target.value)}
                min={form.start}
                className={inputCls("end")}
                data-testid="input-campaign-end"
              />
              {errors.end && <span className="text-[11px] text-red-500">{errors.end}</span>}
            </label>
          </div>

          {/* Target Location + Status row */}
          <div className="flex gap-3">
            <label className="flex flex-1 flex-col gap-1.5">
              <span className="text-[12px] font-semibold text-[#2a2b2a] flex items-center gap-1.5">
                <Target size={12} className="text-[#7c3aed]" /> Target Location
              </span>
              <div className="relative">
                <select
                  value={form.location}
                  onChange={e => set("location", e.target.value)}
                  className="appearance-none rounded-[8px] border border-[#e8e8e8] bg-white pl-3 pr-8 py-2.5 text-[13px] outline-none focus:border-[#ff683a] w-full cursor-pointer transition-colors"
                  data-testid="select-campaign-location"
                >
                  <option value="">Select city…</option>
                  {INDIA_CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <ChevronDown size={12} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8c8d8c]" />
              </div>
            </label>
            <label className="flex flex-1 flex-col gap-1.5">
              <span className="text-[12px] font-semibold text-[#2a2b2a]">Status</span>
              <div className="relative">
                <select
                  value={form.status}
                  onChange={e => set("status", e.target.value as CampaignStatus)}
                  className="appearance-none rounded-[8px] border border-[#e8e8e8] bg-white pl-3 pr-8 py-2.5 text-[13px] outline-none focus:border-[#ff683a] w-full cursor-pointer transition-colors"
                  data-testid="select-campaign-status"
                >
                  <option value="Planned">Planned</option>
                  <option value="Active">Active</option>
                </select>
                <ChevronDown size={12} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8c8d8c]" />
              </div>
            </label>
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 border-t border-[#f0f0f0] px-6 py-4">
          <button onClick={handleSubmit} className="flex flex-1 items-center justify-center gap-1.5 rounded-[8px] bg-[#ff683a] py-2.5 text-[13px] font-semibold text-white hover:bg-[#e85a2e] transition-colors" data-testid="button-add-campaign-submit">
            <Save size={14} /> Add Campaign
          </button>
          <button onClick={onClose} className="flex flex-1 items-center justify-center rounded-[8px] border border-[#e8e8e8] py-2.5 text-[13px] font-medium text-[#555] hover:bg-[#f3f3f3] transition-colors" data-testid="button-add-campaign-cancel">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Main Page ── */
export function Campaigns() {
  const [campaigns, setCampaigns] = useState<Campaign[]>(INITIAL_CAMPAIGNS);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [sortBy, setSortBy] = useState("Newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(CAMPAIGN_OPTIONS[0]);
  const [selectedRange, setSelectedRange] = useState(DATE_RANGES[0]);

  const perPage = 10;

  function toggleCampaign(id: number) {
    setCampaigns(prev => prev.map(c => c.id === id ? { ...c, enabled: !c.enabled } : c));
  }

  function handleAdd(c: Campaign) {
    setCampaigns(prev => [c, ...prev]);
    setShowModal(false);
  }

  const filtered = campaigns.filter(c => {
    const matchSearch = !search || c.name.toLowerCase().includes(search.toLowerCase()) || c.creator.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "All Status" || c.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "Cost") return b.cost - a.cost;
    if (sortBy === "Oldest") return a.id - b.id;
    return b.id - a.id;
  });

  const totalPages = Math.max(1, Math.ceil(sorted.length / perPage));
  const paginated = sorted.slice((currentPage - 1) * perPage, currentPage * perPage);

  function fmtNum(n: number | null) {
    if (n === null) return <span className="text-[#c0c0c0]">—</span>;
    return n.toLocaleString();
  }
  function fmtPct(n: number | null) {
    if (n === null) return <span className="text-[#c0c0c0]">—</span>;
    return `${n.toFixed(1)}%`;
  }

  return (
    <div className="flex flex-col gap-5 min-h-full">
      {showModal && <AddCampaignModal onAdd={handleAdd} onClose={() => setShowModal(false)} />}

      <h1 className="text-[22px] font-bold text-[#2a2b2a] leading-tight">Campaigns</h1>

      {/* ── Top section: stats + chart ── */}
      <div className="flex gap-5 items-stretch">
        <div className="grid grid-cols-2 gap-4 w-[340px] shrink-0">
          <StatCard label="Impressions"     value="1,450,000" change="+2.24%" positive={true}  icon={Eye}               iconBg="bg-[#ff683a]" />
          <StatCard label="Engagements"     value="85,000"    change="+3.12%" positive={true}  icon={BarChart3}         iconBg="bg-[#7c3aed]" />
          <StatCard label="Click Rates"     value="5.9%"      change="-0.16%" positive={false} icon={MousePointerClick} iconBg="bg-[#0ea5e9]" />
          <StatCard label="Conversion Rate" value="2.6%"      change="+2.60%" positive={true}  icon={Percent}           iconBg="bg-[#10b981]" />
        </div>

        <div className="flex flex-1 flex-col gap-4 rounded-[10px] border border-[#f0f0f0] bg-[#fdfcff] p-4">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <span className="text-[14px] font-semibold text-[#2a2b2a]">Campaign Performance</span>
            <div className="flex items-center gap-2">
              <div className="relative">
                <select value={selectedCampaign} onChange={e => setSelectedCampaign(e.target.value)} className="appearance-none rounded-[7px] border border-[#e8e8e8] bg-[#fdfcff] pl-3 pr-7 py-1.5 text-[11px] font-medium text-[#2a2b2a] outline-none focus:border-[#ff683a] cursor-pointer" data-testid="select-campaign-chart">
                  {CAMPAIGN_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
                <ChevronDown size={11} className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[#8c8d8c]" />
              </div>
              <div className="relative">
                <select value={selectedRange} onChange={e => setSelectedRange(e.target.value)} className="appearance-none rounded-[7px] border border-[#e8e8e8] bg-[#fdfcff] pl-3 pr-7 py-1.5 text-[11px] font-medium text-[#2a2b2a] outline-none focus:border-[#ff683a] cursor-pointer" data-testid="select-date-range">
                  {DATE_RANGES.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
                <ChevronDown size={11} className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[#8c8d8c]" />
              </div>
            </div>
          </div>
          <div className="flex-1" style={{ minHeight: 160 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={CHART_DATA} margin={{ top: 20, right: 8, left: -24, bottom: 0 }}>
                <defs>
                  <linearGradient id="perfGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#7c3aed" stopOpacity={0.18} />
                    <stop offset="95%" stopColor="#7c3aed" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                <XAxis dataKey="date" tick={{ fontSize: 10, fill: "#8c8d8c" }} tickLine={false} axisLine={false} />
                <YAxis domain={[0, 100]} tickFormatter={v => `${v}%`} tick={{ fontSize: 10, fill: "#8c8d8c" }} tickLine={false} axisLine={false} ticks={[0, 25, 50, 75, 100]} />
                <Tooltip content={<ChartTooltip />} />
                <ReferenceLine x="Apr 18" stroke="#7c3aed" strokeDasharray="4 4" strokeWidth={1.5} />
                <Area type="monotone" dataKey="value" stroke="#7c3aed" strokeWidth={2} fill="url(#perfGradient)" dot={false} activeDot={{ r: 4, fill: "#7c3aed", stroke: "#fff", strokeWidth: 2 }} />
                <ReferenceDot x="Apr 18" y={75} r={5} fill="#7c3aed" stroke="#fff" strokeWidth={2} label={{ value: "75%", position: "top", fontSize: 11, fontWeight: 700, fill: "#7c3aed", dy: -4 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* ── Campaign List ── */}
      <div className="flex flex-col rounded-[10px] border border-[#f0f0f0] bg-[#fdfcff] overflow-hidden">

        <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-[#f0f0f0]">
          <span className="text-[14px] font-semibold text-[#2a2b2a]">Campaign List <span className="text-[#8c8d8c] font-normal">({sorted.length})</span></span>
          <button onClick={() => setShowModal(true)} className="flex items-center gap-1.5 rounded-[7px] bg-[#ff683a] px-3 py-2 text-[12px] font-semibold text-white hover:bg-[#e85a2e] transition-colors" data-testid="button-add-campaign">
            <Plus size={13} /> Add Campaign
          </button>
        </div>

        <div className="flex items-center gap-3 px-5 py-3 border-b border-[#f5f5f5] flex-wrap">
          <div className="flex items-center gap-2 rounded-[7px] border border-[#e8e8e8] bg-[#fdfcff] px-3 py-2 w-[180px]">
            <Search size={13} className="text-[#8c8d8c] shrink-0" />
            <input type="text" value={search} onChange={e => { setSearch(e.target.value); setCurrentPage(1); }} placeholder="Search campaign" className="flex-1 text-[12px] bg-transparent outline-none text-[#2a2b2a] placeholder:text-[#c0c0c0]" data-testid="input-search-campaign" />
          </div>
          <div className="relative">
            <select value={statusFilter} onChange={e => { setStatusFilter(e.target.value); setCurrentPage(1); }} className="appearance-none rounded-[7px] border border-[#e8e8e8] bg-[#fdfcff] pl-3 pr-7 py-2 text-[12px] font-medium text-[#2a2b2a] outline-none cursor-pointer hover:bg-[#f3f3f3] transition-colors" data-testid="select-status-filter">
              <option value="All Status">All Status</option>
              <option value="Active">Active</option>
              <option value="Planned">Planned</option>
              <option value="Completed">Completed</option>
            </select>
            <ChevronDown size={12} className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[#8c8d8c]" />
          </div>
          <button className="flex items-center gap-1.5 rounded-[7px] border border-[#e8e8e8] bg-[#fdfcff] px-3 py-2 text-[12px] font-medium text-[#2a2b2a] hover:bg-[#f3f3f3] transition-colors" data-testid="button-filters">
            <SlidersHorizontal size={13} className="text-[#8c8d8c]" /> Filters
          </button>
          <div className="flex-1" />
          <div className="flex items-center gap-1.5 text-[12px] text-[#8c8d8c]">
            Sort by:
            <div className="relative">
              <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="appearance-none rounded-[7px] border border-[#e8e8e8] bg-[#fdfcff] pl-3 pr-7 py-2 text-[12px] font-medium text-[#2a2b2a] outline-none cursor-pointer hover:bg-[#f3f3f3] transition-colors" data-testid="select-sort">
                <option value="Newest">Newest</option>
                <option value="Oldest">Oldest</option>
                <option value="Cost">Cost</option>
              </select>
              <ChevronDown size={12} className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[#8c8d8c]" />
            </div>
          </div>
        </div>

        {/* Table — extended columns */}
        <div className="overflow-x-auto">
          <div className="min-w-[1100px]">
            <div className="grid items-center border-b border-[#f5f5f5] px-5 py-2.5" style={{ gridTemplateColumns: "40px 2fr 100px 100px 100px 90px 90px 130px 100px 90px 100px" }}>
              {["","Campaign","Start","End","Impressions","CTR","Conv.","Spent (₹)","Creator","Cost","Status"].map((col, i) => (
                <div key={i} className="flex items-center gap-1">
                  <span className="text-[11px] font-medium text-[#8c8d8c] whitespace-nowrap">{col}</span>
                  {col && <ArrowUpDown size={10} className="text-[#d0d0d0] shrink-0" />}
                </div>
              ))}
            </div>

            {paginated.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-2 py-10 text-[#8c8d8c]">
                <p className="text-[14px] font-medium">No campaigns found</p>
                <p className="text-[12px]">Try adjusting your search or filters</p>
              </div>
            ) : (
              paginated.map((c, idx) => (
                <div
                  key={c.id}
                  className={`grid items-center px-5 py-3 hover:bg-[#fafafa] transition-colors ${idx < paginated.length - 1 ? "border-b border-[#f5f5f5]" : ""}`}
                  style={{ gridTemplateColumns: "40px 2fr 100px 100px 100px 90px 90px 130px 100px 90px 100px" }}
                  data-testid={`row-campaign-${c.id}`}
                >
                  <Toggle enabled={c.enabled} onChange={() => toggleCampaign(c.id)} />

                  {/* Campaign name + product pills */}
                  <div className="min-w-0 pr-3">
                    <p className="text-[13px] font-medium text-[#2a2b2a] truncate">{c.name}</p>
                    {(c.products ?? []).length > 0 && (
                      <div className="flex gap-1 mt-1 flex-wrap">
                        {(c.products ?? []).slice(0, 2).map(p => (
                          <span key={p} className="text-[9px] rounded-[3px] bg-[#fff0eb] text-[#ff683a] border border-[#ffd0bc] px-1.5 py-0.5 truncate max-w-[80px]">{p}</span>
                        ))}
                        {(c.products ?? []).length > 2 && (
                          <span className="text-[9px] rounded-[3px] bg-[#f3f3f3] text-[#8c8d8c] px-1.5 py-0.5">+{(c.products ?? []).length - 2}</span>
                        )}
                      </div>
                    )}
                  </div>

                  <span className="text-[11px] text-[#555]">{c.start}</span>
                  <span className="text-[11px] text-[#555]">{c.end}</span>
                  <span className="text-[12px] text-[#2a2b2a]">{fmtNum(c.impressions)}</span>

                  {/* CTR */}
                  <span className={`text-[12px] font-medium ${c.ctr !== null ? "text-[#0ea5e9]" : "text-[#c0c0c0]"}`}>
                    {fmtPct(c.ctr)}
                  </span>

                  {/* Conversion */}
                  <span className={`text-[12px] font-medium ${c.conversionRate !== null ? "text-[#10b981]" : "text-[#c0c0c0]"}`}>
                    {fmtPct(c.conversionRate)}
                  </span>

                  {/* Amount Spent */}
                  <span className={`text-[12px] font-medium ${c.amountSpent !== null ? "text-[#f59e0b]" : "text-[#c0c0c0]"}`}>
                    {c.amountSpent !== null ? fmtINR(c.amountSpent) : "—"}
                  </span>

                  {/* Creator */}
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-[#2a2b2a]" style={{ backgroundColor: c.creatorColor }}>
                      {c.creatorInitials}
                    </div>
                    <span className="text-[11px] text-[#555] truncate">{c.creator}</span>
                  </div>

                  <span className="text-[12px] font-medium text-[#2a2b2a]">₹{c.cost.toLocaleString("en-IN")}</span>
                  <StatusBadge status={c.status} />
                </div>
              ))
            )}
          </div>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-[#f0f0f0] px-5 py-3">
          <div className="flex items-center gap-2 text-[12px] text-[#8c8d8c]">
            <span>Showing</span>
            <span className="rounded border border-[#e8e8e8] px-2 py-0.5 text-[#2a2b2a]">{perPage}</span>
            <span>out of {sorted.length}</span>
          </div>
          <div className="flex items-center gap-1">
            <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="flex h-7 w-7 items-center justify-center rounded text-[#8c8d8c] hover:bg-[#f3f3f3] disabled:opacity-30 transition-colors" data-testid="button-page-prev">
              <ChevronLeft size={14} />
            </button>
            {Array.from({ length: Math.min(3, totalPages) }, (_, i) => i + 1).map(p => (
              <button key={p} onClick={() => setCurrentPage(p)} className={`flex h-7 w-7 items-center justify-center rounded text-[12px] font-medium transition-colors ${currentPage === p ? "bg-[#ff683a] text-white" : "text-[#8c8d8c] hover:bg-[#f3f3f3]"}`} data-testid={`button-page-${p}`}>{p}</button>
            ))}
            {totalPages > 3 && (
              <>
                <span className="flex h-7 w-7 items-center justify-center text-[12px] text-[#8c8d8c]">…</span>
                <button onClick={() => setCurrentPage(totalPages)} className={`flex h-7 w-7 items-center justify-center rounded text-[12px] font-medium transition-colors ${currentPage === totalPages ? "bg-[#ff683a] text-white" : "text-[#8c8d8c] hover:bg-[#f3f3f3]"}`} data-testid="button-page-last">{totalPages}</button>
              </>
            )}
            <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="flex h-7 w-7 items-center justify-center rounded text-[#8c8d8c] hover:bg-[#f3f3f3] disabled:opacity-30 transition-colors" data-testid="button-page-next">
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center gap-5 pb-2 text-[12px]">
        <span className="font-semibold text-[#555]">Copyright © 2024 Peterdraw</span>
        {["Privacy Policy","Term and conditions","Contact"].map(t => <span key={t} className="cursor-pointer text-[#8c8d8c] hover:text-[#2a2b2a]">{t}</span>)}
      </div>
    </div>
  );
}
