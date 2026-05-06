import { ChevronDown, TrendingUp, TrendingDown, Filter, ArrowUpDown } from "lucide-react";

const products = [
  {
    id: "PRD-001",
    name: "Wireless Headphones Pro",
    category: "Electronics",
    sales: 1240,
    revenue: "₹52,00,000",
    stock: 340,
    status: "In Stock",
    statusColor: "bg-[#d2ebff] text-[#2a2b2a]",
    trend: "up",
    image: "https://www.figma.com/api/mcp/asset/c1f4953f-dab9-4a23-b250-38c32c5b80a5",
  },
  {
    id: "PRD-002",
    name: "Smart Watch Series 4",
    category: "Wearables",
    sales: 980,
    revenue: "₹40,80,000",
    stock: 120,
    status: "Low Stock",
    statusColor: "bg-[#ffd9d0] text-[#2a2b2a]",
    trend: "down",
    image: "https://www.figma.com/api/mcp/asset/7828aa2a-e120-43b0-bdcb-7793c6ee36a3",
  },
  {
    id: "PRD-003",
    name: "Mechanical Keyboard RGB",
    category: "Accessories",
    sales: 856,
    revenue: "₹35,60,000",
    stock: 450,
    status: "In Stock",
    statusColor: "bg-[#d2ebff] text-[#2a2b2a]",
    trend: "up",
    image: "https://www.figma.com/api/mcp/asset/1f564907-ec75-498c-8957-014d3ea86821",
  },
  {
    id: "PRD-004",
    name: "USB-C Hub 7-in-1",
    category: "Accessories",
    sales: 720,
    revenue: "₹30,00,000",
    stock: 0,
    status: "Out of Stock",
    statusColor: "bg-[#f3f3f3] text-[#8c8d8c]",
    trend: "down",
    image: "https://www.figma.com/api/mcp/asset/9eb67203-e924-4a62-9b5f-566339d7ce8c",
  },
  {
    id: "PRD-005",
    name: "Portable SSD 1TB",
    category: "Storage",
    sales: 654,
    revenue: "₹27,25,000",
    stock: 210,
    status: "In Stock",
    statusColor: "bg-[#d2ebff] text-[#2a2b2a]",
    trend: "up",
    image: "https://www.figma.com/api/mcp/asset/30ebe9bd-88fb-4fd5-ad19-d33345610c0f",
  },
];

const headers = ["Product Name", "Product ID", "Sales", "Revenue", "Stock", "Status"];

export function WidgetTopProducts() {
  return (
    <div className="flex h-full flex-col gap-2.5 rounded-[10px] bg-[#fdfcff] p-4">
      <div className="flex items-center justify-between shrink-0">
        <h2 className="text-[14px] font-semibold text-[#2a2b2a]">Top Products</h2>
        <div className="flex items-center gap-2.5">
          <button className="flex items-center gap-1 rounded-[5px] bg-[#f3f3f3] px-2.5 py-1.5 text-[11px] font-medium text-[#555] hover:bg-[#ebebeb] transition-colors" data-testid="button-filter">
            <Filter size={12} className="shrink-0" />
            Filter
            <ChevronDown size={12} />
          </button>
          <button className="flex items-center gap-1 rounded-[5px] bg-[#f3f3f3] pl-2.5 pr-2 py-1.5 text-[11px] font-medium text-[#555] hover:bg-[#ebebeb] transition-colors" data-testid="button-period">
            This Week
            <ChevronDown size={12} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#f3f3f3]">
              {headers.map((h) => (
                <th key={h} className="px-4 py-2.5 text-left">
                  <div className="flex items-center gap-1">
                    <span className="text-[11px] font-normal text-[#555] whitespace-nowrap">{h}</span>
                    {h !== "Status" && (
                      <ArrowUpDown size={11} className="text-[#8c8d8c] shrink-0" />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-b border-[#f3f3f3] hover:bg-[#fafafa] transition-colors" data-testid={`row-product-${p.id}`}>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 shrink-0 rounded-lg bg-[#f3f3f3] overflow-hidden flex items-center justify-center">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                      />
                    </div>
                    <div className="flex flex-col gap-0.5 min-w-0">
                      <span className="text-[12px] font-semibold text-[#2a2b2a] whitespace-nowrap">{p.name}</span>
                      <span className="text-[11px] text-[#8c8d8c]">{p.category}</span>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <span className="text-[11px] text-[#555]">{p.id}</span>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-1">
                    {p.trend === "up" ? (
                      <TrendingUp size={12} className="text-[#555]" />
                    ) : (
                      <TrendingDown size={12} className="text-[#555]" />
                    )}
                    <span className="text-[12px] font-medium text-[#2a2b2a]">{p.sales.toLocaleString()}</span>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <span className="text-[12px] font-semibold text-[#2a2b2a]">{p.revenue}</span>
                </td>
                <td className="px-4 py-4">
                  <span className="text-[12px] text-[#555]">{p.stock.toLocaleString()}</span>
                </td>
                <td className="px-4 py-4">
                  <span className={`inline-flex items-center rounded px-2 py-0.5 text-[10px] font-medium ${p.statusColor}`}>
                    {p.status}
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
