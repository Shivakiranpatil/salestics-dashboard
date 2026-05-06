import { useState } from "react";
import {
  Search, ChevronDown, SlidersHorizontal, Plus,
  TrendingUp, TrendingDown, ArrowUpDown,
  ChevronLeft, ChevronRight, Eye, Download, X, Save,
  FileText, CheckCircle2, AlertCircle, IndianRupee,
  Building2, User, Calendar, Hash,
} from "lucide-react";

type InvoiceStatus = "Paid" | "Pending" | "Overdue";

interface InvoiceLine { description: string; qty: number; rate: number; }
interface Invoice {
  id: string;
  client: string;
  clientInitials: string;
  clientColor: string;
  clientEmail: string;
  clientAddress: string;
  issueDate: string;
  dueDate: string;
  lines: InvoiceLine[];
  amount: number;
  status: InvoiceStatus;
}

const INITIAL_INVOICES: Invoice[] = [
  { id: "INV-2841", client: "Emma Brown",     clientInitials: "EB", clientColor: "#d2ebff", clientEmail: "emma@email.com",    clientAddress: "12 Park Ave, Mumbai 400001",         issueDate: "Apr 1, 2028",  dueDate: "Apr 15, 2028", lines: [{ description: "Air Max Sneakers × 2",    qty: 2, rate: 950 }, { description: "Sports Cap",              qty: 1, rate: 550 }], amount: 2450.00, status: "Paid"    },
  { id: "INV-2840", client: "John Smith",     clientInitials: "JS", clientColor: "#e2d7fa", clientEmail: "john@email.com",     clientAddress: "7 MG Road, Bengaluru 560001",        issueDate: "Apr 1, 2028",  dueDate: "Apr 15, 2028", lines: [{ description: "Slim Fit Chinos × 5",     qty: 5, rate: 150 }],                                                  amount: 750.00,  status: "Pending" },
  { id: "INV-2839", client: "Sarah Johnson",  clientInitials: "SJ", clientColor: "#d1fae5", clientEmail: "sarah@email.com",    clientAddress: "34 Brigade Rd, Delhi 110001",        issueDate: "Mar 28, 2028", dueDate: "Apr 11, 2028", lines: [{ description: "Denim Jacket",             qty: 5, rate: 600 }, { description: "Classic Polo Tee × 3",   qty: 3, rate: 375 }], amount: 4125.00, status: "Paid"    },
  { id: "INV-2838", client: "Chris Lee",      clientInitials: "CL", clientColor: "#ffd6c8", clientEmail: "chris@email.com",    clientAddress: "22 Linking Rd, Pune 411001",         issueDate: "Mar 25, 2028", dueDate: "Apr 8, 2028",  lines: [{ description: "Wireless Earbuds Pro",    qty: 5, rate: 200 }, { description: "Phone Case × 2",         qty: 2, rate: 150 }], amount: 1300.00, status: "Overdue" },
  { id: "INV-2837", client: "Nancy Taylor",   clientInitials: "NT", clientColor: "#d1fae5", clientEmail: "nancy@email.com",    clientAddress: "5 FC Road, Hyderabad 500001",        issueDate: "Mar 22, 2028", dueDate: "Apr 5, 2028",  lines: [{ description: "Canvas Backpack × 4",    qty: 4, rate: 500 }, { description: "Sports Watch × 2",       qty: 2, rate: 600 }], amount: 3200.00, status: "Paid"    },
  { id: "INV-2836", client: "Robert White",   clientInitials: "RW", clientColor: "#d2ebff", clientEmail: "robert@email.com",   clientAddress: "90 Jubilee Hills, Chennai 600001",   issueDate: "Mar 20, 2028", dueDate: "Apr 3, 2028",  lines: [{ description: "Air Max Sneakers",        qty: 1, rate: 899 }],                                                  amount: 899.00,  status: "Overdue" },
  { id: "INV-2835", client: "Linda Moore",    clientInitials: "LM", clientColor: "#e2d7fa", clientEmail: "linda@email.com",    clientAddress: "18 Banjara Hills, Kolkata 700001",   issueDate: "Mar 18, 2028", dueDate: "Apr 1, 2028",  lines: [{ description: "Classic Polo Tee × 5",   qty: 5, rate: 200 }, { description: "Running Socks × 5",      qty: 5, rate: 150 }], amount: 1750.00, status: "Paid"    },
  { id: "INV-2834", client: "Michael Green",  clientInitials: "MG", clientColor: "#d1fae5", clientEmail: "michael@email.com",  clientAddress: "3 Connaught Pl, Jaipur 302001",      issueDate: "Mar 15, 2028", dueDate: "Mar 29, 2028", lines: [{ description: "Denim Jacket × 8",        qty: 8, rate: 700 }],                                                  amount: 5600.00, status: "Paid"    },
  { id: "INV-2833", client: "Amy Collins",    clientInitials: "AC", clientColor: "#ffd6c8", clientEmail: "amy@email.com",      clientAddress: "60 Koregaon Pk, Ahmedabad 380001",   issueDate: "Mar 12, 2028", dueDate: "Mar 26, 2028", lines: [{ description: "Sports Watch",            qty: 1, rate: 499 }],                                                  amount: 499.00,  status: "Pending" },
  { id: "INV-2832", client: "Tom Harris",     clientInitials: "TH", clientColor: "#d2ebff", clientEmail: "tom@email.com",      clientAddress: "11 Indiranagar, Surat 395001",       issueDate: "Mar 10, 2028", dueDate: "Mar 24, 2028", lines: [{ description: "Wireless Earbuds Pro",    qty: 5, rate: 200 }, { description: "Air Max Sneakers × 1",   qty: 1, rate: 950 }, { description: "Sports Cap",qty: 2,rate: 100 }], amount: 2150.00, status: "Pending" },
  { id: "INV-2831", client: "Jessica Carter", clientInitials: "JC", clientColor: "#ffd6c8", clientEmail: "jessica@email.com",  clientAddress: "44 Whitefield, Lucknow 226001",      issueDate: "Mar 8, 2028",  dueDate: "Mar 22, 2028", lines: [{ description: "Canvas Backpack × 2",    qty: 2, rate: 495 }],                                                  amount: 990.00,  status: "Overdue" },
  { id: "INV-2830", client: "David Park",     clientInitials: "DP", clientColor: "#e2d7fa", clientEmail: "david@email.com",    clientAddress: "8 Residency Rd, Nagpur 440001",      issueDate: "Mar 5, 2028",  dueDate: "Mar 19, 2028", lines: [{ description: "Denim Jacket × 5",        qty: 5, rate: 700 }],                                                  amount: 3500.00, status: "Paid"    },
];

function StatusBadge({ status }: { status: InvoiceStatus }) {
  const styles: Record<InvoiceStatus, string> = {
    Paid:    "bg-[#d1fae5] text-[#065f46]",
    Pending: "bg-[#fff3e0] text-[#c45400]",
    Overdue: "bg-[#ffe5e5] text-[#b91c1c]",
  };
  return <span className={`inline-flex items-center rounded-[5px] px-2 py-0.5 text-[11px] font-medium whitespace-nowrap ${styles[status]}`}>{status}</span>;
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
        <span className="text-[11px] text-[#8c8d8c]">from last month</span>
      </div>
    </div>
  );
}

function InvoiceDetailModal({ invoice, onClose }: { invoice: Invoice; onClose: () => void }) {
  const subtotal = invoice.lines.reduce((s, l) => s + l.qty * l.rate, 0);
  const gst = +(subtotal * 0.18).toFixed(2);
  const total = subtotal + gst;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/40" onClick={onClose}>
      <div
        className="h-full w-full max-w-[520px] bg-white shadow-2xl flex flex-col overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#f0f0f0]">
          <div>
            <p className="text-[11px] font-medium text-[#8c8d8c] uppercase tracking-wider mb-0.5">Invoice Preview</p>
            <h2 className="text-[18px] font-bold text-[#2a2b2a]">{invoice.id}</h2>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 rounded-[7px] border border-[#e8e8e8] px-3 py-1.5 text-[12px] font-medium text-[#555] hover:bg-[#f3f3f3] transition-colors">
              <Download size={12} /> Download
            </button>
            <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-[#f3f3f3] transition-colors" data-testid="button-close-invoice-detail">
              <X size={16} className="text-[#8c8d8c]" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {/* Invoice Document */}
          <div className="m-6 rounded-[12px] border border-[#f0f0f0] bg-white overflow-hidden">

            {/* Invoice Top Band */}
            <div className="flex items-start justify-between px-6 py-5 bg-[#fff8f5] border-b border-[#f0e8e3]">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="flex h-7 w-7 items-center justify-center rounded-[6px] bg-[#ff683a]">
                    <span className="text-white font-bold text-[11px]">S</span>
                  </div>
                  <span className="text-[15px] font-bold text-[#2a2b2a]">Salestics</span>
                </div>
                <p className="text-[11px] text-[#8c8d8c]">salestics.in · GST: 27AABCS1429B1ZB</p>
                <p className="text-[11px] text-[#8c8d8c]">Mumbai, Maharashtra 400001</p>
              </div>
              <div className="text-right">
                <p className="text-[22px] font-bold text-[#ff683a] leading-none">INVOICE</p>
                <p className="text-[13px] font-mono font-semibold text-[#2a2b2a] mt-1">{invoice.id}</p>
                <StatusBadge status={invoice.status} />
              </div>
            </div>

            {/* Bill To / Dates */}
            <div className="grid grid-cols-2 gap-4 px-6 py-5 border-b border-[#f5f5f5]">
              <div>
                <p className="text-[10px] font-semibold text-[#8c8d8c] uppercase tracking-wider mb-2 flex items-center gap-1">
                  <User size={10} /> Bill To
                </p>
                <p className="text-[13px] font-bold text-[#2a2b2a]">{invoice.client}</p>
                <p className="text-[11px] text-[#8c8d8c]">{invoice.clientEmail}</p>
                <p className="text-[11px] text-[#8c8d8c] mt-0.5">{invoice.clientAddress}</p>
              </div>
              <div>
                <p className="text-[10px] font-semibold text-[#8c8d8c] uppercase tracking-wider mb-2 flex items-center gap-1">
                  <Calendar size={10} /> Dates
                </p>
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between text-[12px]">
                    <span className="text-[#8c8d8c]">Issue Date</span>
                    <span className="font-medium text-[#2a2b2a]">{invoice.issueDate}</span>
                  </div>
                  <div className="flex justify-between text-[12px]">
                    <span className="text-[#8c8d8c]">Due Date</span>
                    <span className={`font-semibold ${invoice.status === "Overdue" ? "text-[#ef4444]" : "text-[#2a2b2a]"}`}>{invoice.dueDate}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Line Items Table */}
            <div className="px-6 py-4 border-b border-[#f5f5f5]">
              <div className="grid text-[10px] font-semibold text-[#8c8d8c] uppercase tracking-wider pb-2 border-b border-[#f0f0f0] mb-2" style={{ gridTemplateColumns: "1fr 60px 90px 90px" }}>
                <span>Description</span>
                <span className="text-center">Qty</span>
                <span className="text-right">Rate</span>
                <span className="text-right">Amount</span>
              </div>
              {invoice.lines.map((line, i) => (
                <div key={i} className="grid items-center py-2.5 border-b border-[#f9f9f9] last:border-0" style={{ gridTemplateColumns: "1fr 60px 90px 90px" }}>
                  <span className="text-[12px] font-medium text-[#2a2b2a]">{line.description}</span>
                  <span className="text-[12px] text-[#555] text-center">{line.qty}</span>
                  <span className="text-[12px] text-[#555] text-right">₹{line.rate.toLocaleString("en-IN")}</span>
                  <span className="text-[12px] font-semibold text-[#2a2b2a] text-right">₹{(line.qty * line.rate).toLocaleString("en-IN")}</span>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="px-6 py-5">
              <div className="flex flex-col gap-2 max-w-[200px] ml-auto">
                <div className="flex justify-between text-[12px] text-[#555]">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-[12px] text-[#555]">
                  <span>GST (18%)</span>
                  <span>₹{gst.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-[14px] font-bold text-[#2a2b2a] pt-2 border-t border-[#f0f0f0]">
                  <span>Total</span>
                  <span className="text-[#ff683a]">₹{total.toLocaleString("en-IN")}</span>
                </div>
              </div>

              {invoice.status === "Paid" && (
                <div className="mt-4 flex items-center gap-2 rounded-[8px] bg-[#f0fdf4] border border-[#bbf7d0] px-4 py-3">
                  <CheckCircle2 size={15} className="text-[#22c55e] shrink-0" />
                  <span className="text-[12px] text-[#166534] font-medium">Payment received — Thank you!</span>
                </div>
              )}
              {invoice.status === "Overdue" && (
                <div className="mt-4 flex items-center gap-2 rounded-[8px] bg-[#fff5f5] border border-[#ffd5d5] px-4 py-3">
                  <AlertCircle size={15} className="text-[#ef4444] shrink-0" />
                  <span className="text-[12px] text-[#b91c1c] font-medium">Payment overdue — please settle at the earliest.</span>
                </div>
              )}

              <p className="text-[10px] text-[#c0c0c0] mt-4 text-center">Thank you for your business · Salestics POS · salestics.in</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AddInvoiceModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
      <div className="w-full max-w-[460px] bg-white rounded-[12px] shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#f0f0f0]">
          <div><h2 className="text-[16px] font-bold text-[#2a2b2a]">New Invoice</h2><p className="text-[12px] text-[#8c8d8c] mt-0.5">Create a new invoice</p></div>
          <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-[#f3f3f3]"><X size={16} className="text-[#8c8d8c]" /></button>
        </div>
        <div className="flex flex-col gap-4 p-6">
          <label className="flex flex-col gap-1.5">
            <span className="text-[12px] font-medium text-[#2a2b2a]">Client Name <span className="text-[#ff683a]">*</span></span>
            <input placeholder="e.g. Emma Brown" className="rounded-[7px] border border-[#e8e8e8] px-3 py-2.5 text-[13px] outline-none focus:border-[#ff683a]" />
          </label>
          <div className="flex gap-3">
            <label className="flex flex-1 flex-col gap-1.5">
              <span className="text-[12px] font-medium text-[#2a2b2a]">Issue Date</span>
              <input type="date" className="rounded-[7px] border border-[#e8e8e8] px-3 py-2.5 text-[13px] outline-none focus:border-[#ff683a]" />
            </label>
            <label className="flex flex-1 flex-col gap-1.5">
              <span className="text-[12px] font-medium text-[#2a2b2a]">Due Date</span>
              <input type="date" className="rounded-[7px] border border-[#e8e8e8] px-3 py-2.5 text-[13px] outline-none focus:border-[#ff683a]" />
            </label>
          </div>
          <div className="flex gap-3">
            <label className="flex flex-1 flex-col gap-1.5">
              <span className="text-[12px] font-medium text-[#2a2b2a]">Amount (₹)</span>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8c8d8c] text-[13px]">₹</span>
                <input type="number" placeholder="0" className="rounded-[7px] border border-[#e8e8e8] pl-7 pr-3 py-2.5 text-[13px] outline-none focus:border-[#ff683a] w-full" />
              </div>
            </label>
            <label className="flex flex-1 flex-col gap-1.5">
              <span className="text-[12px] font-medium text-[#2a2b2a]">Status</span>
              <select className="rounded-[7px] border border-[#e8e8e8] px-3 py-2.5 text-[13px] outline-none focus:border-[#ff683a] bg-white">
                <option>Pending</option><option>Paid</option>
              </select>
            </label>
          </div>
        </div>
        <div className="flex gap-3 border-t border-[#f0f0f0] px-6 py-4">
          <button onClick={onClose} className="flex flex-1 items-center justify-center gap-1.5 rounded-[7px] bg-[#ff683a] py-2.5 text-[13px] font-semibold text-white hover:bg-[#e85a2e]"><Save size={14} /> Create Invoice</button>
          <button onClick={onClose} className="flex flex-1 items-center justify-center rounded-[7px] border border-[#e8e8e8] py-2.5 text-[13px] font-medium text-[#555] hover:bg-[#f3f3f3]">Cancel</button>
        </div>
      </div>
    </div>
  );
}

export function Invoices() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const perPage = 10;

  const filtered = INITIAL_INVOICES.filter(inv => {
    const matchSearch = !search || inv.client.toLowerCase().includes(search.toLowerCase()) || inv.id.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "All Status" || inv.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const paginated = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);

  const totalAmount   = INITIAL_INVOICES.reduce((s, i) => s + i.amount, 0);
  const paidAmount    = INITIAL_INVOICES.filter(i => i.status === "Paid").reduce((s, i) => s + i.amount, 0);
  const pendingAmount = INITIAL_INVOICES.filter(i => i.status === "Pending").reduce((s, i) => s + i.amount, 0);
  const overdueAmount = INITIAL_INVOICES.filter(i => i.status === "Overdue").reduce((s, i) => s + i.amount, 0);

  function fmtK(n: number) { return n >= 1000 ? `₹${(n / 1000).toFixed(1)}k` : `₹${n}`; }

  return (
    <div className="flex flex-col gap-5 min-h-full">
      {showModal && <AddInvoiceModal onClose={() => setShowModal(false)} />}
      {selectedInvoice && <InvoiceDetailModal invoice={selectedInvoice} onClose={() => setSelectedInvoice(null)} />}
      <h1 className="text-[22px] font-bold text-[#2a2b2a]">Invoices</h1>

      <div className="grid grid-cols-4 gap-4">
        <StatCard label="Total Invoiced" value={fmtK(totalAmount)}   change="+12.4%" positive={true}  icon={FileText}     iconBg="bg-[#7c3aed]" />
        <StatCard label="Paid"           value={fmtK(paidAmount)}    change="+8.20%" positive={true}  icon={CheckCircle2} iconBg="bg-[#10b981]" />
        <StatCard label="Pending"        value={fmtK(pendingAmount)} change="+3.10%" positive={true}  icon={IndianRupee}  iconBg="bg-[#f59e0b]" />
        <StatCard label="Overdue"        value={fmtK(overdueAmount)} change="-2.40%" positive={false} icon={AlertCircle}  iconBg="bg-[#ef4444]" />
      </div>

      <div className="flex flex-col rounded-[10px] border border-[#f0f0f0] bg-[#fdfcff] overflow-hidden">
        <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-[#f0f0f0]">
          <span className="text-[14px] font-semibold text-[#2a2b2a]">Invoice List <span className="text-[#8c8d8c] font-normal">({filtered.length})</span></span>
          <button onClick={() => setShowModal(true)} className="flex items-center gap-1.5 rounded-[7px] bg-[#ff683a] px-3 py-2 text-[12px] font-semibold text-white hover:bg-[#e85a2e]" data-testid="button-add-invoice">
            <Plus size={13} /> New Invoice
          </button>
        </div>

        <div className="flex items-center gap-3 px-5 py-3 border-b border-[#f5f5f5] flex-wrap">
          <div className="flex items-center gap-2 rounded-[7px] border border-[#e8e8e8] bg-[#fdfcff] px-3 py-2 w-[200px]">
            <Search size={13} className="text-[#8c8d8c] shrink-0" />
            <input type="text" value={search} onChange={e => { setSearch(e.target.value); setCurrentPage(1); }} placeholder="Search invoices…" className="flex-1 text-[12px] bg-transparent outline-none text-[#2a2b2a] placeholder:text-[#c0c0c0]" data-testid="input-search-invoice" />
          </div>
          <div className="relative">
            <select value={statusFilter} onChange={e => { setStatusFilter(e.target.value); setCurrentPage(1); }} className="appearance-none rounded-[7px] border border-[#e8e8e8] bg-[#fdfcff] pl-3 pr-7 py-2 text-[12px] font-medium text-[#2a2b2a] outline-none cursor-pointer hover:bg-[#f3f3f3]" data-testid="select-invoice-status">
              {["All Status","Paid","Pending","Overdue"].map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <ChevronDown size={12} className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[#8c8d8c]" />
          </div>
          <button className="flex items-center gap-1.5 rounded-[7px] border border-[#e8e8e8] bg-[#fdfcff] px-3 py-2 text-[12px] font-medium text-[#2a2b2a] hover:bg-[#f3f3f3]">
            <SlidersHorizontal size={13} className="text-[#8c8d8c]" /> Filters
          </button>
        </div>

        {/* Table Header */}
        <div className="grid items-center border-b border-[#f5f5f5] px-5 py-2.5" style={{ gridTemplateColumns: "110px 1.6fr 120px 120px 120px 100px 80px" }}>
          {["Invoice #","Client","Issue Date","Due Date","Amount","Status",""].map((col, i) => (
            <div key={i} className="flex items-center gap-1">
              <span className="text-[11px] font-medium text-[#8c8d8c] whitespace-nowrap">{col}</span>
              {col && <ArrowUpDown size={10} className="text-[#d0d0d0]" />}
            </div>
          ))}
        </div>

        {paginated.map((inv, idx) => (
          <div key={inv.id} className={`grid items-center px-5 py-3 hover:bg-[#fafafa] transition-colors cursor-pointer ${idx < paginated.length - 1 ? "border-b border-[#f5f5f5]" : ""}`} style={{ gridTemplateColumns: "110px 1.6fr 120px 120px 120px 100px 80px" }} data-testid={`row-invoice-${inv.id}`} onClick={() => setSelectedInvoice(inv)}>
            <span className="text-[12px] font-mono font-medium text-[#2a2b2a]">{inv.id}</span>
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-[#2a2b2a]" style={{ backgroundColor: inv.clientColor }}>{inv.clientInitials}</div>
              <span className="text-[13px] font-medium text-[#2a2b2a] truncate">{inv.client}</span>
            </div>
            <span className="text-[12px] text-[#555]">{inv.issueDate}</span>
            <span className="text-[12px] text-[#555]">{inv.dueDate}</span>
            <span className="text-[13px] font-semibold text-[#2a2b2a]">₹{inv.amount.toLocaleString("en-IN")}</span>
            <StatusBadge status={inv.status} />
            <div className="flex items-center gap-1" onClick={e => e.stopPropagation()}>
              <button onClick={() => setSelectedInvoice(inv)} className="flex h-7 w-7 items-center justify-center rounded-[6px] hover:bg-[#fff0eb] transition-colors" data-testid={`button-view-invoice-${inv.id}`}><Eye size={13} className="text-[#8c8d8c]" /></button>
              <button className="flex h-7 w-7 items-center justify-center rounded-[6px] hover:bg-[#f3f3f3] transition-colors"><Download size={13} className="text-[#8c8d8c]" /></button>
            </div>
          </div>
        ))}

        <div className="flex items-center justify-between border-t border-[#f0f0f0] px-5 py-3">
          <div className="flex items-center gap-2 text-[12px] text-[#8c8d8c]">
            <span>Showing</span><span className="rounded border border-[#e8e8e8] px-2 py-0.5 text-[#2a2b2a]">{Math.min(perPage, filtered.length)}</span><span>out of {filtered.length}</span>
          </div>
          <div className="flex items-center gap-1">
            <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="flex h-7 w-7 items-center justify-center rounded text-[#8c8d8c] hover:bg-[#f3f3f3] disabled:opacity-30"><ChevronLeft size={14} /></button>
            {Array.from({ length: Math.min(3, totalPages) }, (_, i) => i + 1).map(p => (
              <button key={p} onClick={() => setCurrentPage(p)} className={`flex h-7 w-7 items-center justify-center rounded text-[12px] font-medium transition-colors ${currentPage === p ? "bg-[#ff683a] text-white" : "text-[#8c8d8c] hover:bg-[#f3f3f3]"}`}>{p}</button>
            ))}
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
