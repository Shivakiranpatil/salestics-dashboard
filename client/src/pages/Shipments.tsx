import { useState } from "react";
import {
  Search, ChevronDown, SlidersHorizontal, Plus,
  TrendingUp, TrendingDown, ArrowUpDown,
  ChevronLeft, ChevronRight, Eye, X, Save,
  Truck, Package, CheckCircle2, XCircle, Clock,
  MapPin, ArrowRight, Hash, Building2, AlertTriangle,
} from "lucide-react";

type ShipmentStatus = "In Transit" | "Delivered" | "Pending" | "Failed" | "Returned";

interface Shipment {
  id: string;
  tracking: string;
  customer: string;
  customerInitials: string;
  customerColor: string;
  customerEmail: string;
  origin: string;
  destination: string;
  carrier: string;
  weight: string;
  status: ShipmentStatus;
  eta: string;
  dispatched: string;
  orderId: string;
}

const INITIAL_SHIPMENTS: Shipment[] = [
  { id: "SHP-1041", tracking: "DTDC1041293847", customer: "Emma Brown",     customerInitials: "EB", customerColor: "#d2ebff", customerEmail: "emma@email.com",    origin: "Mumbai",    destination: "Delhi",      carrier: "DTDC",     weight: "1.2 kg", status: "In Transit",  eta: "May 8, 2028",  dispatched: "May 4, 2028",  orderId: "ORD-8541" },
  { id: "SHP-1040", tracking: "BLDT1040847362", customer: "John Smith",     customerInitials: "JS", customerColor: "#e2d7fa", customerEmail: "john@email.com",     origin: "Bengaluru", destination: "Pune",       carrier: "Bluedart",  weight: "0.8 kg", status: "Pending",     eta: "May 9, 2028",  dispatched: "May 5, 2028",  orderId: "ORD-8540" },
  { id: "SHP-1039", tracking: "ECOM1039563920", customer: "Sarah Johnson",  customerInitials: "SJ", customerColor: "#d1fae5", customerEmail: "sarah@email.com",    origin: "Delhi",     destination: "Hyderabad", carrier: "Ecom Exp.", weight: "3.5 kg", status: "Delivered",   eta: "May 2, 2028",  dispatched: "Apr 28, 2028", orderId: "ORD-8539" },
  { id: "SHP-1038", tracking: "DTDC1038193745", customer: "Chris Lee",      customerInitials: "CL", customerColor: "#ffd6c8", customerEmail: "chris@email.com",    origin: "Pune",      destination: "Chennai",    carrier: "DTDC",     weight: "0.5 kg", status: "Failed",      eta: "May 3, 2028",  dispatched: "Apr 29, 2028", orderId: "ORD-8538" },
  { id: "SHP-1037", tracking: "FEDC1037826410", customer: "Nancy Taylor",   customerInitials: "NT", customerColor: "#d1fae5", customerEmail: "nancy@email.com",    origin: "Hyderabad", destination: "Kolkata",    carrier: "FedEx",    weight: "2.1 kg", status: "Delivered",   eta: "Apr 30, 2028", dispatched: "Apr 25, 2028", orderId: "ORD-8537" },
  { id: "SHP-1036", tracking: "BLDT1036473920", customer: "Robert White",   customerInitials: "RW", customerColor: "#d2ebff", customerEmail: "robert@email.com",   origin: "Chennai",   destination: "Jaipur",     carrier: "Bluedart",  weight: "0.9 kg", status: "Returned",    eta: "Apr 28, 2028", dispatched: "Apr 22, 2028", orderId: "ORD-8536" },
  { id: "SHP-1035", tracking: "ECOM1035019284", customer: "Linda Moore",    customerInitials: "LM", customerColor: "#e2d7fa", customerEmail: "linda@email.com",    origin: "Kolkata",   destination: "Ahmedabad",  carrier: "Ecom Exp.", weight: "1.8 kg", status: "In Transit",  eta: "May 7, 2028",  dispatched: "May 3, 2028",  orderId: "ORD-8535" },
  { id: "SHP-1034", tracking: "DTDC1034728491", customer: "Michael Green",  customerInitials: "MG", customerColor: "#d1fae5", customerEmail: "michael@email.com",  origin: "Jaipur",    destination: "Nagpur",     carrier: "DTDC",     weight: "5.0 kg", status: "Delivered",   eta: "Apr 28, 2028", dispatched: "Apr 24, 2028", orderId: "ORD-8534" },
  { id: "SHP-1033", tracking: "BLDT1033562098", customer: "Amy Collins",    customerInitials: "AC", customerColor: "#ffd6c8", customerEmail: "amy@email.com",      origin: "Ahmedabad", destination: "Surat",      carrier: "Bluedart",  weight: "0.4 kg", status: "Delivered",   eta: "Apr 25, 2028", dispatched: "Apr 23, 2028", orderId: "ORD-8533" },
  { id: "SHP-1032", tracking: "FEDC1032381920", customer: "Tom Harris",     customerInitials: "TH", customerColor: "#d2ebff", customerEmail: "tom@email.com",      origin: "Surat",     destination: "Lucknow",    carrier: "FedEx",    weight: "1.5 kg", status: "In Transit",  eta: "May 9, 2028",  dispatched: "May 4, 2028",  orderId: "ORD-8532" },
  { id: "SHP-1031", tracking: "DTDC1031093846", customer: "Jessica Carter", customerInitials: "JC", customerColor: "#ffd6c8", customerEmail: "jessica@email.com",  origin: "Lucknow",   destination: "Indore",     carrier: "DTDC",     weight: "0.7 kg", status: "Returned",    eta: "Apr 26, 2028", dispatched: "Apr 21, 2028", orderId: "ORD-8531" },
  { id: "SHP-1030", tracking: "ECOM1030748291", customer: "David Park",     customerInitials: "DP", customerColor: "#e2d7fa", customerEmail: "david@email.com",    origin: "Nagpur",    destination: "Bhopal",     carrier: "Ecom Exp.", weight: "2.6 kg", status: "Delivered",   eta: "Apr 24, 2028", dispatched: "Apr 20, 2028", orderId: "ORD-8530" },
  { id: "SHP-1029", tracking: "BLDT1029564837", customer: "Olivia Stone",   customerInitials: "OS", customerColor: "#d1fae5", customerEmail: "olivia@email.com",   origin: "Indore",    destination: "Chandigarh", carrier: "Bluedart",  weight: "0.6 kg", status: "Pending",     eta: "May 10, 2028", dispatched: "May 5, 2028",  orderId: "ORD-8529" },
  { id: "SHP-1028", tracking: "FEDC1028392710", customer: "James Wilson",   customerInitials: "JW", customerColor: "#d2ebff", customerEmail: "james@email.com",    origin: "Bhopal",    destination: "Visakhapatnam", carrier: "FedEx", weight: "4.2 kg", status: "In Transit",  eta: "May 8, 2028",  dispatched: "May 3, 2028",  orderId: "ORD-8528" },
];

const STATUS_CONFIG: Record<ShipmentStatus, { label: string; bg: string; text: string; icon: React.ElementType }> = {
  "In Transit": { label: "In Transit", bg: "bg-[#d2ebff]", text: "text-[#2a6fa8]", icon: Truck },
  "Delivered":  { label: "Delivered",  bg: "bg-[#d1fae5]", text: "text-[#065f46]", icon: CheckCircle2 },
  "Pending":    { label: "Pending",    bg: "bg-[#fff3e0]", text: "text-[#c45400]", icon: Clock },
  "Failed":     { label: "Failed",     bg: "bg-[#ffe5e5]", text: "text-[#b91c1c]", icon: XCircle },
  "Returned":   { label: "Returned",   bg: "bg-[#fef3c7]", text: "text-[#92400e]", icon: AlertTriangle },
};

function StatusBadge({ status }: { status: ShipmentStatus }) {
  const { label, bg, text } = STATUS_CONFIG[status];
  return <span className={`inline-flex items-center rounded-[5px] px-2 py-0.5 text-[11px] font-medium whitespace-nowrap ${bg} ${text}`}>{label}</span>;
}

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

function ShipmentDetailModal({ shipment, onClose }: { shipment: Shipment; onClose: () => void }) {
  const { icon: StatusIcon, bg, text } = STATUS_CONFIG[shipment.status];
  const steps = ["Order Placed", "Dispatched", "In Transit", "Delivered"];
  const stepMap: Record<ShipmentStatus, number> = { "Pending": 1, "In Transit": 2, "Delivered": 3, "Failed": -1, "Returned": -1 };
  const currentStep = stepMap[shipment.status];
  const isBad = shipment.status === "Failed" || shipment.status === "Returned";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/40" onClick={onClose}>
      <div className="h-full w-full max-w-[460px] bg-white shadow-2xl flex flex-col overflow-hidden" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#f0f0f0]">
          <div>
            <p className="text-[11px] font-medium text-[#8c8d8c] uppercase tracking-wider mb-0.5">Shipment Details</p>
            <h2 className="text-[18px] font-bold text-[#2a2b2a]">{shipment.id}</h2>
          </div>
          <div className="flex items-center gap-2">
            <StatusBadge status={shipment.status} />
            <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-[#f3f3f3] transition-colors" data-testid="button-close-shipment-detail">
              <X size={16} className="text-[#8c8d8c]" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {/* Tracking Progress */}
          <div className="px-6 py-5 border-b border-[#f5f5f5]">
            <p className="text-[11px] font-semibold text-[#8c8d8c] uppercase tracking-wider mb-4">Tracking Progress</p>
            {isBad ? (
              <div className={`flex items-center gap-2.5 rounded-[8px] px-4 py-3 ${bg} border border-opacity-30`}>
                <StatusIcon size={16} className={text} />
                <div>
                  <p className={`text-[13px] font-semibold ${text}`}>{shipment.status}</p>
                  <p className="text-[11px] text-[#8c8d8c]">{shipment.status === "Failed" ? "Delivery attempt failed. Will retry." : "Package returned to origin."}</p>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-0">
                {steps.map((s, i) => (
                  <div key={s} className="flex items-center flex-1 last:flex-none">
                    <div className="flex flex-col items-center gap-1.5">
                      <div className={`flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-bold border-2 transition-colors ${i <= currentStep ? "bg-[#ff683a] border-[#ff683a] text-white" : "bg-white border-[#e0e0e0] text-[#c0c0c0]"}`}>
                        {i < currentStep ? "✓" : i + 1}
                      </div>
                      <span className={`text-[10px] font-medium whitespace-nowrap ${i <= currentStep ? "text-[#ff683a]" : "text-[#c0c0c0]"}`}>{s}</span>
                    </div>
                    {i < steps.length - 1 && <div className={`flex-1 h-0.5 mb-4 mx-1 ${i < currentStep ? "bg-[#ff683a]" : "bg-[#e8e8e8]"}`} />}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Route */}
          <div className="px-6 py-5 border-b border-[#f5f5f5]">
            <p className="text-[11px] font-semibold text-[#8c8d8c] uppercase tracking-wider mb-3">Route</p>
            <div className="flex items-center gap-3 rounded-[10px] bg-[#fafafa] border border-[#f0f0f0] px-4 py-3">
              <div className="flex items-center gap-1.5 flex-1">
                <MapPin size={14} className="text-[#ff683a] shrink-0" />
                <div>
                  <p className="text-[10px] text-[#8c8d8c]">From</p>
                  <p className="text-[13px] font-bold text-[#2a2b2a]">{shipment.origin}</p>
                </div>
              </div>
              <ArrowRight size={16} className="text-[#c0c0c0] shrink-0" />
              <div className="flex items-center gap-1.5 flex-1 justify-end">
                <div className="text-right">
                  <p className="text-[10px] text-[#8c8d8c]">To</p>
                  <p className="text-[13px] font-bold text-[#2a2b2a]">{shipment.destination}</p>
                </div>
                <MapPin size={14} className="text-[#10b981] shrink-0" />
              </div>
            </div>
          </div>

          {/* Shipment Info */}
          <div className="px-6 py-5 border-b border-[#f5f5f5]">
            <p className="text-[11px] font-semibold text-[#8c8d8c] uppercase tracking-wider mb-3">Shipment Info</p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: Hash,      label: "Tracking No.",  value: shipment.tracking },
                { icon: Building2, label: "Carrier",       value: shipment.carrier },
                { icon: Package,   label: "Weight",        value: shipment.weight },
                { icon: Hash,      label: "Order Ref.",    value: shipment.orderId },
                { icon: Clock,     label: "Dispatched",    value: shipment.dispatched },
                { icon: Clock,     label: "ETA",           value: shipment.eta },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-start gap-2.5 rounded-[8px] bg-[#fafafa] px-3 py-2.5">
                  <Icon size={13} className="text-[#8c8d8c] mt-0.5 shrink-0" />
                  <div>
                    <p className="text-[10px] text-[#8c8d8c]">{label}</p>
                    <p className="text-[12px] font-semibold text-[#2a2b2a] break-all">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Customer */}
          <div className="px-6 py-5">
            <p className="text-[11px] font-semibold text-[#8c8d8c] uppercase tracking-wider mb-3">Customer</p>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[13px] font-bold text-[#2a2b2a]" style={{ backgroundColor: shipment.customerColor }}>{shipment.customerInitials}</div>
              <div>
                <p className="text-[14px] font-semibold text-[#2a2b2a]">{shipment.customer}</p>
                <p className="text-[12px] text-[#8c8d8c]">{shipment.customerEmail}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AddShipmentModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
      <div className="w-full max-w-[460px] bg-white rounded-[12px] shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#f0f0f0]">
          <div><h2 className="text-[16px] font-bold text-[#2a2b2a]">New Shipment</h2><p className="text-[12px] text-[#8c8d8c] mt-0.5">Create a new shipment entry</p></div>
          <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-[#f3f3f3]"><X size={16} className="text-[#8c8d8c]" /></button>
        </div>
        <div className="flex flex-col gap-4 p-6">
          <label className="flex flex-col gap-1.5">
            <span className="text-[12px] font-medium text-[#2a2b2a]">Order ID <span className="text-[#ff683a]">*</span></span>
            <input placeholder="e.g. ORD-8541" className="rounded-[7px] border border-[#e8e8e8] px-3 py-2.5 text-[13px] outline-none focus:border-[#ff683a]" />
          </label>
          <div className="flex gap-3">
            <label className="flex flex-1 flex-col gap-1.5">
              <span className="text-[12px] font-medium text-[#2a2b2a]">Origin <span className="text-[#ff683a]">*</span></span>
              <input placeholder="e.g. Mumbai" className="rounded-[7px] border border-[#e8e8e8] px-3 py-2.5 text-[13px] outline-none focus:border-[#ff683a]" />
            </label>
            <label className="flex flex-1 flex-col gap-1.5">
              <span className="text-[12px] font-medium text-[#2a2b2a]">Destination <span className="text-[#ff683a]">*</span></span>
              <input placeholder="e.g. Delhi" className="rounded-[7px] border border-[#e8e8e8] px-3 py-2.5 text-[13px] outline-none focus:border-[#ff683a]" />
            </label>
          </div>
          <div className="flex gap-3">
            <label className="flex flex-1 flex-col gap-1.5">
              <span className="text-[12px] font-medium text-[#2a2b2a]">Carrier</span>
              <select className="rounded-[7px] border border-[#e8e8e8] px-3 py-2.5 text-[13px] outline-none focus:border-[#ff683a] bg-white">
                <option>DTDC</option><option>Bluedart</option><option>FedEx</option><option>Ecom Exp.</option><option>Delhivery</option>
              </select>
            </label>
            <label className="flex flex-1 flex-col gap-1.5">
              <span className="text-[12px] font-medium text-[#2a2b2a]">Weight</span>
              <input placeholder="e.g. 1.2 kg" className="rounded-[7px] border border-[#e8e8e8] px-3 py-2.5 text-[13px] outline-none focus:border-[#ff683a]" />
            </label>
          </div>
          <label className="flex flex-col gap-1.5">
            <span className="text-[12px] font-medium text-[#2a2b2a]">Expected Delivery Date</span>
            <input type="date" className="rounded-[7px] border border-[#e8e8e8] px-3 py-2.5 text-[13px] outline-none focus:border-[#ff683a]" />
          </label>
        </div>
        <div className="flex gap-3 border-t border-[#f0f0f0] px-6 py-4">
          <button onClick={onClose} className="flex flex-1 items-center justify-center gap-1.5 rounded-[7px] bg-[#ff683a] py-2.5 text-[13px] font-semibold text-white hover:bg-[#e85a2e]"><Save size={14} /> Create Shipment</button>
          <button onClick={onClose} className="flex flex-1 items-center justify-center rounded-[7px] border border-[#e8e8e8] py-2.5 text-[13px] font-medium text-[#555] hover:bg-[#f3f3f3]">Cancel</button>
        </div>
      </div>
    </div>
  );
}

export function Shipments() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(null);
  const perPage = 10;

  const filtered = INITIAL_SHIPMENTS.filter(s => {
    const matchSearch = !search || s.customer.toLowerCase().includes(search.toLowerCase()) || s.id.toLowerCase().includes(search.toLowerCase()) || s.tracking.toLowerCase().includes(search.toLowerCase()) || s.destination.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "All Status" || s.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const paginated = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);

  const stats = {
    total:     INITIAL_SHIPMENTS.length,
    inTransit: INITIAL_SHIPMENTS.filter(s => s.status === "In Transit").length,
    delivered: INITIAL_SHIPMENTS.filter(s => s.status === "Delivered").length,
    failed:    INITIAL_SHIPMENTS.filter(s => s.status === "Failed" || s.status === "Returned").length,
  };

  return (
    <div className="flex flex-col gap-5 min-h-full">
      {showModal && <AddShipmentModal onClose={() => setShowModal(false)} />}
      {selectedShipment && <ShipmentDetailModal shipment={selectedShipment} onClose={() => setSelectedShipment(null)} />}

      <h1 className="text-[22px] font-bold text-[#2a2b2a]">Shipments</h1>

      <div className="grid grid-cols-4 gap-4">
        <StatCard label="Total Shipments" value={String(stats.total)}     change="+4.20%" positive={true}  icon={Truck}        iconBg="bg-[#ff683a]" />
        <StatCard label="In Transit"      value={String(stats.inTransit)} change="+1.50%" positive={true}  icon={Package}      iconBg="bg-[#2a6fa8]" />
        <StatCard label="Delivered"       value={String(stats.delivered)} change="+9.30%" positive={true}  icon={CheckCircle2} iconBg="bg-[#10b981]" />
        <StatCard label="Failed / Return" value={String(stats.failed)}    change="-0.80%" positive={false} icon={XCircle}      iconBg="bg-[#ef4444]" />
      </div>

      <div className="flex flex-col rounded-[10px] border border-[#f0f0f0] bg-[#fdfcff] overflow-hidden">
        <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-[#f0f0f0]">
          <span className="text-[14px] font-semibold text-[#2a2b2a]">Shipment List <span className="text-[#8c8d8c] font-normal">({filtered.length})</span></span>
          <button onClick={() => setShowModal(true)} className="flex items-center gap-1.5 rounded-[7px] bg-[#ff683a] px-3 py-2 text-[12px] font-semibold text-white hover:bg-[#e85a2e]" data-testid="button-add-shipment">
            <Plus size={13} /> New Shipment
          </button>
        </div>

        <div className="flex items-center gap-3 px-5 py-3 border-b border-[#f5f5f5] flex-wrap">
          <div className="flex items-center gap-2 rounded-[7px] border border-[#e8e8e8] bg-[#fdfcff] px-3 py-2 w-[220px]">
            <Search size={13} className="text-[#8c8d8c] shrink-0" />
            <input type="text" value={search} onChange={e => { setSearch(e.target.value); setCurrentPage(1); }} placeholder="Search shipments…" className="flex-1 text-[12px] bg-transparent outline-none text-[#2a2b2a] placeholder:text-[#c0c0c0]" data-testid="input-search-shipment" />
          </div>
          <div className="relative">
            <select value={statusFilter} onChange={e => { setStatusFilter(e.target.value); setCurrentPage(1); }} className="appearance-none rounded-[7px] border border-[#e8e8e8] bg-[#fdfcff] pl-3 pr-7 py-2 text-[12px] font-medium text-[#2a2b2a] outline-none cursor-pointer hover:bg-[#f3f3f3]" data-testid="select-shipment-status">
              {["All Status","In Transit","Delivered","Pending","Failed","Returned"].map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <ChevronDown size={12} className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[#8c8d8c]" />
          </div>
          <button className="flex items-center gap-1.5 rounded-[7px] border border-[#e8e8e8] bg-[#fdfcff] px-3 py-2 text-[12px] font-medium text-[#2a2b2a] hover:bg-[#f3f3f3]">
            <SlidersHorizontal size={13} className="text-[#8c8d8c]" /> Filters
          </button>
          <div className="flex-1" />
          <div className="flex items-center gap-1.5 text-[12px] text-[#8c8d8c]">
            Sort by:
            <div className="relative">
              <select className="appearance-none rounded-[7px] border border-[#e8e8e8] bg-[#fdfcff] pl-3 pr-7 py-2 text-[12px] font-medium text-[#2a2b2a] outline-none cursor-pointer hover:bg-[#f3f3f3]">
                <option>Newest</option><option>Oldest</option><option>ETA</option>
              </select>
              <ChevronDown size={12} className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[#8c8d8c]" />
            </div>
          </div>
        </div>

        {/* Table Header */}
        <div className="grid items-center border-b border-[#f5f5f5] px-5 py-2.5" style={{ gridTemplateColumns: "100px 1.4fr 180px 120px 110px 110px 44px" }}>
          {["Shipment #","Customer","Route","Carrier","ETA","Status",""].map((col, i) => (
            <div key={i} className="flex items-center gap-1">
              <span className="text-[11px] font-medium text-[#8c8d8c] whitespace-nowrap">{col}</span>
              {col && <ArrowUpDown size={10} className="text-[#d0d0d0]" />}
            </div>
          ))}
        </div>

        {paginated.map((s, idx) => (
          <div
            key={s.id}
            className={`grid items-center px-5 py-3 hover:bg-[#fafafa] transition-colors cursor-pointer ${idx < paginated.length - 1 ? "border-b border-[#f5f5f5]" : ""}`}
            style={{ gridTemplateColumns: "100px 1.4fr 180px 120px 110px 110px 44px" }}
            data-testid={`row-shipment-${s.id}`}
            onClick={() => setSelectedShipment(s)}
          >
            <span className="text-[12px] font-mono font-medium text-[#2a2b2a]">{s.id}</span>
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-[#2a2b2a]" style={{ backgroundColor: s.customerColor }}>{s.customerInitials}</div>
              <span className="text-[13px] font-medium text-[#2a2b2a] truncate">{s.customer}</span>
            </div>
            <div className="flex items-center gap-1.5 text-[12px] text-[#555] min-w-0">
              <span className="truncate">{s.origin}</span>
              <ArrowRight size={11} className="text-[#c0c0c0] shrink-0" />
              <span className="truncate">{s.destination}</span>
            </div>
            <span className="text-[12px] text-[#555]">{s.carrier}</span>
            <span className="text-[12px] text-[#555]">{s.eta}</span>
            <StatusBadge status={s.status} />
            <button onClick={e => { e.stopPropagation(); setSelectedShipment(s); }} className="flex h-7 w-7 items-center justify-center rounded-[6px] hover:bg-[#fff0eb] transition-colors" data-testid={`button-view-shipment-${s.id}`}>
              <Eye size={14} className="text-[#8c8d8c]" />
            </button>
          </div>
        ))}

        <div className="flex items-center justify-between border-t border-[#f0f0f0] px-5 py-3">
          <div className="flex items-center gap-2 text-[12px] text-[#8c8d8c]">
            <span>Showing</span>
            <span className="rounded border border-[#e8e8e8] px-2 py-0.5 text-[#2a2b2a]">{Math.min(perPage, filtered.length)}</span>
            <span>out of {filtered.length}</span>
          </div>
          <div className="flex items-center gap-1">
            <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="flex h-7 w-7 items-center justify-center rounded text-[#8c8d8c] hover:bg-[#f3f3f3] disabled:opacity-30"><ChevronLeft size={14} /></button>
            {Array.from({ length: Math.min(3, totalPages) }, (_, i) => i + 1).map(p => (
              <button key={p} onClick={() => setCurrentPage(p)} className={`flex h-7 w-7 items-center justify-center rounded text-[12px] font-medium transition-colors ${currentPage === p ? "bg-[#ff683a] text-white" : "text-[#8c8d8c] hover:bg-[#f3f3f3]"}`}>{p}</button>
            ))}
            {totalPages > 3 && <><span className="text-[12px] text-[#8c8d8c] px-1">…</span><button onClick={() => setCurrentPage(totalPages)} className="flex h-7 w-7 items-center justify-center rounded text-[12px] font-medium text-[#8c8d8c] hover:bg-[#f3f3f3]">{totalPages}</button></>}
            <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="flex h-7 w-7 items-center justify-center rounded text-[#8c8d8c] hover:bg-[#f3f3f3] disabled:opacity-30"><ChevronRight size={14} /></button>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-5 pb-2 text-[12px]">
        <span className="font-semibold text-[#555]">Copyright © 2024 Peterdraw</span>
        {["Privacy Policy","Term and conditions","Contact"].map(t => <span key={t} className="cursor-pointer text-[#8c8d8c] hover:text-[#2a2b2a]">{t}</span>)}
      </div>
    </div>
  );
}
