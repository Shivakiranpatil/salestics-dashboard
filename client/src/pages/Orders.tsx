import { useState } from "react";
import {
  Search, ChevronDown, SlidersHorizontal, Plus,
  TrendingUp, TrendingDown, ArrowUpDown,
  ChevronLeft, ChevronRight, Eye, X,
  ShoppingBag, Clock, CheckCircle2, XCircle,
  MapPin, CreditCard, Package, Hash,
} from "lucide-react";

type OrderStatus = "Processing" | "Completed" | "Cancelled" | "Pending";
type PaymentMethod = "Credit Card" | "PayPal" | "Bank Transfer" | "Cash";

interface OrderItem { name: string; qty: number; price: number; }
interface Order {
  id: string;
  customer: string;
  customerInitials: string;
  customerColor: string;
  email: string;
  address: string;
  date: string;
  items: number;
  lineItems: OrderItem[];
  total: number;
  payment: PaymentMethod;
  status: OrderStatus;
}

const INITIAL_ORDERS: Order[] = [
  { id: "ORD-8541", customer: "Emma Brown",     customerInitials: "EB", customerColor: "#d2ebff", email: "emma@email.com",    address: "12 Park Ave, Mumbai",         date: "Apr 1, 2028",  items: 3, lineItems: [{ name: "Air Max Sneakers", qty: 1, price: 95 }, { name: "Sports Cap", qty: 2, price: 25 }, { name: "Running Socks (pack)", qty: 1, price: 100 }], total: 245.00, payment: "Credit Card",   status: "Completed"  },
  { id: "ORD-8540", customer: "John Smith",     customerInitials: "JS", customerColor: "#e2d7fa", email: "john@email.com",     address: "7 MG Road, Bengaluru",        date: "Apr 1, 2028",  items: 1, lineItems: [{ name: "Slim Fit Chinos", qty: 1, price: 75 }],                                                                                                 total: 75.00,  payment: "PayPal",        status: "Processing" },
  { id: "ORD-8539", customer: "Sarah Johnson",  customerInitials: "SJ", customerColor: "#d1fae5", email: "sarah@email.com",    address: "34 Brigade Rd, Delhi",        date: "Mar 31, 2028", items: 5, lineItems: [{ name: "Classic Polo Tee", qty: 2, price: 60 }, { name: "Denim Jacket", qty: 1, price: 180 }, { name: "Canvas Backpack", qty: 1, price: 112.5 }, { name: "Leather Belt", qty: 2, price: 0 }], total: 412.50, payment: "Credit Card",   status: "Completed"  },
  { id: "ORD-8538", customer: "Chris Lee",      customerInitials: "CL", customerColor: "#ffd6c8", email: "chris@email.com",    address: "22 Linking Rd, Pune",         date: "Mar 31, 2028", items: 2, lineItems: [{ name: "Wireless Earbuds Pro", qty: 1, price: 80 }, { name: "Phone Case", qty: 2, price: 25 }], total: 130.00, payment: "Bank Transfer", status: "Pending"    },
  { id: "ORD-8537", customer: "Nancy Taylor",   customerInitials: "NT", customerColor: "#d1fae5", email: "nancy@email.com",    address: "5 FC Road, Hyderabad",        date: "Mar 30, 2028", items: 4, lineItems: [{ name: "Slim Fit Chinos", qty: 2, price: 150 }, { name: "Canvas Backpack", qty: 1, price: 112.5 }, { name: "Sports Watch", qty: 1, price: 57.5 }], total: 320.00, payment: "Credit Card",   status: "Completed"  },
  { id: "ORD-8536", customer: "Robert White",   customerInitials: "RW", customerColor: "#d2ebff", email: "robert@email.com",   address: "90 Jubilee Hills, Chennai",   date: "Mar 30, 2028", items: 1, lineItems: [{ name: "Air Max Sneakers", qty: 1, price: 89.99 }], total: 89.99,  payment: "PayPal",        status: "Cancelled"  },
  { id: "ORD-8535", customer: "Linda Moore",    customerInitials: "LM", customerColor: "#e2d7fa", email: "linda@email.com",    address: "18 Banjara Hills, Kolkata",   date: "Mar 29, 2028", items: 2, lineItems: [{ name: "Classic Polo Tee", qty: 3, price: 90 }, { name: "Running Socks (pack)", qty: 1, price: 85 }], total: 175.00, payment: "Credit Card",   status: "Processing" },
  { id: "ORD-8534", customer: "Michael Green",  customerInitials: "MG", customerColor: "#d1fae5", email: "michael@email.com",  address: "3 Connaught Pl, Jaipur",      date: "Mar 29, 2028", items: 6, lineItems: [{ name: "Denim Jacket", qty: 2, price: 360 }, { name: "Classic Polo Tee", qty: 3, price: 90 }, { name: "Leather Belt", qty: 2, price: 60 }, { name: "Canvas Backpack", qty: 1, price: 50 }], total: 560.00, payment: "Bank Transfer", status: "Completed"  },
  { id: "ORD-8533", customer: "Amy Collins",    customerInitials: "AC", customerColor: "#ffd6c8", email: "amy@email.com",      address: "60 Koregaon Pk, Ahmedabad",   date: "Mar 28, 2028", items: 1, lineItems: [{ name: "Sports Watch", qty: 1, price: 49.99 }], total: 49.99,  payment: "Cash",          status: "Completed"  },
  { id: "ORD-8532", customer: "Tom Harris",     customerInitials: "TH", customerColor: "#d2ebff", email: "tom@email.com",      address: "11 Indiranagar, Surat",       date: "Mar 28, 2028", items: 3, lineItems: [{ name: "Wireless Earbuds Pro", qty: 1, price: 80 }, { name: "Air Max Sneakers", qty: 1, price: 95 }, { name: "Sports Cap", qty: 2, price: 40 }], total: 215.00, payment: "Credit Card",   status: "Pending"    },
  { id: "ORD-8531", customer: "Jessica Carter", customerInitials: "JC", customerColor: "#ffd6c8", email: "jessica@email.com",  address: "44 Whitefield, Lucknow",      date: "Mar 27, 2028", items: 2, lineItems: [{ name: "Canvas Backpack", qty: 1, price: 49 }, { name: "Sports Cap", qty: 2, price: 50 }], total: 99.00,  payment: "PayPal",        status: "Cancelled"  },
  { id: "ORD-8530", customer: "David Park",     customerInitials: "DP", customerColor: "#e2d7fa", email: "david@email.com",    address: "8 Residency Rd, Nagpur",      date: "Mar 27, 2028", items: 4, lineItems: [{ name: "Denim Jacket", qty: 1, price: 180 }, { name: "Slim Fit Chinos", qty: 2, price: 150 }, { name: "Classic Polo Tee", qty: 1, price: 20 }], total: 350.00, payment: "Credit Card",   status: "Completed"  },
  { id: "ORD-8529", customer: "Olivia Stone",   customerInitials: "OS", customerColor: "#d1fae5", email: "olivia@email.com",   address: "29 Satellite, Indore",        date: "Mar 26, 2028", items: 1, lineItems: [{ name: "Sports Watch", qty: 1, price: 120 }], total: 120.00, payment: "Bank Transfer", status: "Processing" },
  { id: "ORD-8528", customer: "James Wilson",   customerInitials: "JW", customerColor: "#d2ebff", email: "james@email.com",    address: "15 Andheri, Bhopal",          date: "Mar 26, 2028", items: 7, lineItems: [{ name: "Air Max Sneakers", qty: 2, price: 190 }, { name: "Denim Jacket", qty: 2, price: 360 }, { name: "Classic Polo Tee", qty: 3, price: 90 }, { name: "Canvas Backpack", qty: 1, price: 40 }], total: 680.00, payment: "Credit Card",   status: "Completed"  },
];

const STATUS_STEPS: Record<OrderStatus, number> = { Pending: 0, Processing: 1, Completed: 3, Cancelled: -1 };

function StatusBadge({ status }: { status: OrderStatus }) {
  const styles: Record<OrderStatus, string> = {
    Processing: "bg-[#d2ebff] text-[#2a6fa8]",
    Completed:  "bg-[#d1fae5] text-[#065f46]",
    Cancelled:  "bg-[#ffe5e5] text-[#b91c1c]",
    Pending:    "bg-[#fff3e0] text-[#c45400]",
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
        <span className="text-[11px] text-[#8c8d8c]">from last week</span>
      </div>
    </div>
  );
}

function OrderDetailModal({ order, onClose }: { order: Order; onClose: () => void }) {
  const subtotal = order.lineItems.reduce((s, i) => s + i.price, 0);
  const tax = +(subtotal * 0.18).toFixed(2);
  const steps = ["Placed", "Processing", "Shipped", "Delivered"];
  const step = STATUS_STEPS[order.status];
  const isCancelled = order.status === "Cancelled";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/40" onClick={onClose}>
      <div
        className="h-full w-full max-w-[480px] bg-white shadow-2xl flex flex-col overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#f0f0f0]">
          <div>
            <p className="text-[11px] font-medium text-[#8c8d8c] uppercase tracking-wider mb-0.5">Order Details</p>
            <h2 className="text-[18px] font-bold text-[#2a2b2a]">{order.id}</h2>
          </div>
          <div className="flex items-center gap-2">
            <StatusBadge status={order.status} />
            <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-[#f3f3f3] transition-colors" data-testid="button-close-order-detail">
              <X size={16} className="text-[#8c8d8c]" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {/* Order Progress */}
          {!isCancelled && (
            <div className="px-6 py-5 border-b border-[#f5f5f5]">
              <p className="text-[11px] font-semibold text-[#8c8d8c] uppercase tracking-wider mb-4">Order Progress</p>
              <div className="flex items-center gap-0">
                {steps.map((s, i) => (
                  <div key={s} className="flex items-center flex-1 last:flex-none">
                    <div className="flex flex-col items-center gap-1.5">
                      <div className={`flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-bold border-2 transition-colors ${i <= step ? "bg-[#ff683a] border-[#ff683a] text-white" : "bg-white border-[#e0e0e0] text-[#c0c0c0]"}`}>
                        {i < step ? "✓" : i + 1}
                      </div>
                      <span className={`text-[10px] font-medium whitespace-nowrap ${i <= step ? "text-[#ff683a]" : "text-[#c0c0c0]"}`}>{s}</span>
                    </div>
                    {i < steps.length - 1 && (
                      <div className={`flex-1 h-0.5 mb-4 mx-1 ${i < step ? "bg-[#ff683a]" : "bg-[#e8e8e8]"}`} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          {isCancelled && (
            <div className="mx-6 mt-5 rounded-[8px] bg-[#fff5f5] border border-[#ffd5d5] px-4 py-3 flex items-center gap-2">
              <XCircle size={16} className="text-[#ef4444] shrink-0" />
              <span className="text-[12px] text-[#b91c1c] font-medium">This order has been cancelled.</span>
            </div>
          )}

          {/* Customer Info */}
          <div className="px-6 py-5 border-b border-[#f5f5f5]">
            <p className="text-[11px] font-semibold text-[#8c8d8c] uppercase tracking-wider mb-3">Customer</p>
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[13px] font-bold text-[#2a2b2a]" style={{ backgroundColor: order.customerColor }}>{order.customerInitials}</div>
              <div>
                <p className="text-[14px] font-semibold text-[#2a2b2a]">{order.customer}</p>
                <p className="text-[12px] text-[#8c8d8c]">{order.email}</p>
              </div>
            </div>
            <div className="flex items-start gap-2 text-[12px] text-[#555]">
              <MapPin size={13} className="text-[#8c8d8c] mt-0.5 shrink-0" />
              <span>{order.address}</span>
            </div>
          </div>

          {/* Order Meta */}
          <div className="px-6 py-5 border-b border-[#f5f5f5]">
            <p className="text-[11px] font-semibold text-[#8c8d8c] uppercase tracking-wider mb-3">Order Info</p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: Hash,       label: "Order ID",   value: order.id },
                { icon: Clock,      label: "Date",       value: order.date },
                { icon: CreditCard, label: "Payment",    value: order.payment },
                { icon: Package,    label: "Items",      value: `${order.items} item${order.items !== 1 ? "s" : ""}` },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-start gap-2.5 rounded-[8px] bg-[#fafafa] px-3 py-2.5">
                  <Icon size={13} className="text-[#8c8d8c] mt-0.5 shrink-0" />
                  <div>
                    <p className="text-[10px] text-[#8c8d8c]">{label}</p>
                    <p className="text-[12px] font-semibold text-[#2a2b2a]">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Line Items */}
          <div className="px-6 py-5 border-b border-[#f5f5f5]">
            <p className="text-[11px] font-semibold text-[#8c8d8c] uppercase tracking-wider mb-3">Items Ordered</p>
            <div className="flex flex-col gap-2">
              {order.lineItems.map((item, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-[#f5f5f5] last:border-0">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-[6px] bg-[#fff0eb]">
                      <Package size={13} className="text-[#ff683a]" />
                    </div>
                    <div>
                      <p className="text-[12px] font-medium text-[#2a2b2a]">{item.name}</p>
                      <p className="text-[11px] text-[#8c8d8c]">Qty: {item.qty}</p>
                    </div>
                  </div>
                  <span className="text-[13px] font-semibold text-[#2a2b2a]">₹{item.price.toLocaleString("en-IN")}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Totals */}
          <div className="px-6 py-5">
            <div className="flex flex-col gap-2">
              <div className="flex justify-between text-[12px] text-[#555]">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between text-[12px] text-[#555]">
                <span>GST (18%)</span>
                <span>₹{tax.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between text-[12px] text-[#555]">
                <span>Shipping</span>
                <span className="text-[#22c55e] font-medium">Free</span>
              </div>
              <div className="flex justify-between text-[14px] font-bold text-[#2a2b2a] pt-2 border-t border-[#f0f0f0] mt-1">
                <span>Total</span>
                <span className="text-[#ff683a]">₹{order.total.toLocaleString("en-IN")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Orders() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const perPage = 10;

  const filtered = INITIAL_ORDERS.filter(o => {
    const matchSearch = !search || o.customer.toLowerCase().includes(search.toLowerCase()) || o.id.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "All Status" || o.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const paginated = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);

  const stats = {
    total: INITIAL_ORDERS.length,
    pending: INITIAL_ORDERS.filter(o => o.status === "Processing" || o.status === "Pending").length,
    completed: INITIAL_ORDERS.filter(o => o.status === "Completed").length,
    cancelled: INITIAL_ORDERS.filter(o => o.status === "Cancelled").length,
  };

  return (
    <div className="flex flex-col gap-5 min-h-full">
      {selectedOrder && <OrderDetailModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />}
      <h1 className="text-[22px] font-bold text-[#2a2b2a]">Orders</h1>

      <div className="grid grid-cols-4 gap-4">
        <StatCard label="Total Orders" value={String(stats.total)}     change="+5.12%" positive={true}  icon={ShoppingBag}  iconBg="bg-[#ff683a]" />
        <StatCard label="In Progress"  value={String(stats.pending)}   change="+2.30%" positive={true}  icon={Clock}        iconBg="bg-[#f59e0b]" />
        <StatCard label="Completed"    value={String(stats.completed)} change="+8.14%" positive={true}  icon={CheckCircle2} iconBg="bg-[#10b981]" />
        <StatCard label="Cancelled"    value={String(stats.cancelled)} change="-1.20%" positive={false} icon={XCircle}      iconBg="bg-[#ef4444]" />
      </div>

      <div className="flex flex-col rounded-[10px] border border-[#f0f0f0] bg-[#fdfcff] overflow-hidden">
        <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-[#f0f0f0]">
          <span className="text-[14px] font-semibold text-[#2a2b2a]">Order List <span className="text-[#8c8d8c] font-normal">({filtered.length})</span></span>
          <button className="flex items-center gap-1.5 rounded-[7px] bg-[#ff683a] px-3 py-2 text-[12px] font-semibold text-white hover:bg-[#e85a2e]" data-testid="button-add-order">
            <Plus size={13} /> New Order
          </button>
        </div>

        <div className="flex items-center gap-3 px-5 py-3 border-b border-[#f5f5f5] flex-wrap">
          <div className="flex items-center gap-2 rounded-[7px] border border-[#e8e8e8] bg-[#fdfcff] px-3 py-2 w-[200px]">
            <Search size={13} className="text-[#8c8d8c] shrink-0" />
            <input type="text" value={search} onChange={e => { setSearch(e.target.value); setCurrentPage(1); }} placeholder="Search orders…" className="flex-1 text-[12px] bg-transparent outline-none text-[#2a2b2a] placeholder:text-[#c0c0c0]" data-testid="input-search-order" />
          </div>
          <div className="relative">
            <select value={statusFilter} onChange={e => { setStatusFilter(e.target.value); setCurrentPage(1); }} className="appearance-none rounded-[7px] border border-[#e8e8e8] bg-[#fdfcff] pl-3 pr-7 py-2 text-[12px] font-medium text-[#2a2b2a] outline-none cursor-pointer hover:bg-[#f3f3f3]" data-testid="select-order-status">
              {["All Status","Processing","Completed","Cancelled","Pending"].map(s => <option key={s} value={s}>{s}</option>)}
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
              <select className="appearance-none rounded-[7px] border border-[#e8e8e8] bg-[#fdfcff] pl-3 pr-7 py-2 text-[12px] font-medium text-[#2a2b2a] outline-none cursor-pointer hover:bg-[#f3f3f3]" data-testid="select-order-sort">
                <option>Newest</option><option>Oldest</option><option>Total</option>
              </select>
              <ChevronDown size={12} className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[#8c8d8c]" />
            </div>
          </div>
        </div>

        {/* Table Header */}
        <div className="grid items-center border-b border-[#f5f5f5] px-5 py-2.5" style={{ gridTemplateColumns: "110px 1.6fr 110px 60px 100px 130px 100px 44px" }}>
          {["Order #","Customer","Date","Items","Total","Payment","Status",""].map((col, i) => (
            <div key={i} className="flex items-center gap-1">
              <span className="text-[11px] font-medium text-[#8c8d8c] whitespace-nowrap">{col}</span>
              {col && <ArrowUpDown size={10} className="text-[#d0d0d0]" />}
            </div>
          ))}
        </div>

        {paginated.map((o, idx) => (
          <div key={o.id} className={`grid items-center px-5 py-3 hover:bg-[#fafafa] transition-colors cursor-pointer ${idx < paginated.length - 1 ? "border-b border-[#f5f5f5]" : ""}`} style={{ gridTemplateColumns: "110px 1.6fr 110px 60px 100px 130px 100px 44px" }} data-testid={`row-order-${o.id}`} onClick={() => setSelectedOrder(o)}>
            <span className="text-[12px] font-mono font-medium text-[#2a2b2a]">{o.id}</span>
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-[#2a2b2a]" style={{ backgroundColor: o.customerColor }}>{o.customerInitials}</div>
              <span className="text-[13px] font-medium text-[#2a2b2a] truncate">{o.customer}</span>
            </div>
            <span className="text-[12px] text-[#555]">{o.date}</span>
            <span className="text-[12px] text-[#2a2b2a]">{o.items}</span>
            <span className="text-[12px] font-medium text-[#2a2b2a]">₹{o.total.toLocaleString("en-IN")}</span>
            <span className="text-[12px] text-[#555]">{o.payment}</span>
            <StatusBadge status={o.status} />
            <button onClick={e => { e.stopPropagation(); setSelectedOrder(o); }} className="flex h-7 w-7 items-center justify-center rounded-[6px] hover:bg-[#fff0eb] transition-colors" data-testid={`button-view-order-${o.id}`}>
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
            {totalPages > 3 && <><span className="flex h-7 w-7 items-center justify-center text-[12px] text-[#8c8d8c]">…</span><button onClick={() => setCurrentPage(totalPages)} className="flex h-7 w-7 items-center justify-center rounded text-[12px] font-medium text-[#8c8d8c] hover:bg-[#f3f3f3]">{totalPages}</button></>}
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
