import { MoreHorizontal } from "lucide-react";

const orders = [
  { id: "#ORD-001", customer: "Alice Johnson", product: "Women's Jacket", date: "May 1, 2025", amount: "₹10,200", status: "Delivered" },
  { id: "#ORD-002", customer: "Bob Martinez", product: "Running Sneakers", date: "May 2, 2025", amount: "₹7,499", status: "Shipping" },
  { id: "#ORD-003", customer: "Carol White", product: "Smart Watch", date: "May 2, 2025", amount: "₹20,900", status: "Packed" },
  { id: "#ORD-004", customer: "David Lee", product: "Leather Handbag", date: "May 3, 2025", amount: "₹14,750", status: "Pending" },
  { id: "#ORD-005", customer: "Emma Davis", product: "Men's Polo Shirt", date: "May 3, 2025", amount: "₹3,800", status: "Delivered" },
  { id: "#ORD-006", customer: "Frank Wilson", product: "Ankle Boots", date: "May 4, 2025", amount: "₹11,250", status: "Shipping" },
  { id: "#ORD-007", customer: "Grace Kim", product: "Accessories Bundle", date: "May 4, 2025", amount: "₹5,200", status: "Pending" },
];

const statusColors: Record<string, string> = {
  Delivered: "bg-[#d2ebff] text-[#2a2b2a]",
  Shipping: "bg-[#e2d7fa] text-[#2a2b2a]",
  Packed: "bg-[#f3f3f3] text-[#555]",
  Pending: "bg-[#ffd9d0] text-[#2a2b2a]",
};

export function RecentOrders() {
  return (
    <div className="flex flex-col gap-4 rounded-[10px] bg-[#fdfcff] p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-[#2a2b2a]">Recent Orders</h2>
        <button className="rounded-md p-1 hover:bg-[#f3f3f3] transition-colors">
          <MoreHorizontal size={24} className="text-[#555]" />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-[#e1e1e1]">
              <th className="pb-3 text-[11px] font-medium text-[#8c8d8c]">Order ID</th>
              <th className="pb-3 text-[11px] font-medium text-[#8c8d8c]">Customer</th>
              <th className="pb-3 text-[11px] font-medium text-[#8c8d8c]">Product</th>
              <th className="pb-3 text-[11px] font-medium text-[#8c8d8c]">Date</th>
              <th className="pb-3 text-right text-[11px] font-medium text-[#8c8d8c]">Amount</th>
              <th className="pb-3 text-center text-[11px] font-medium text-[#8c8d8c]">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, i) => (
              <tr key={order.id} className={`border-b border-[#f3f3f3] ${i % 2 === 1 ? "bg-[#fafafa]" : ""}`}>
                <td className="py-3 text-xs font-medium text-[#2a2b2a]">{order.id}</td>
                <td className="py-3 text-xs text-[#555]">{order.customer}</td>
                <td className="py-3 text-xs text-[#555]">{order.product}</td>
                <td className="py-3 text-xs text-[#8c8d8c]">{order.date}</td>
                <td className="py-3 text-right text-xs font-semibold text-[#2a2b2a]">{order.amount}</td>
                <td className="py-3 text-center">
                  <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium ${statusColors[order.status]}`}>
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
