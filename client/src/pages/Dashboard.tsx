import { Coins, ShoppingCart, TrendingUp, BarChart2 } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { CardStatistic } from "@/components/dashboard/CardStatistic";
import { WidgetSalesOverview } from "@/components/dashboard/WidgetSalesOverview";
import { WidgetProductSales } from "@/pages/WidgetProductSales";
import { WidgetSalesActivity } from "@/components/dashboard/WidgetSalesActivity";
import { WidgetCustomerGrowth } from "@/components/dashboard/WidgetCustomerGrowth";
import { WidgetSalesDistribution } from "@/components/dashboard/WidgetSalesDistribution";
import { WidgetVisitors } from "@/components/dashboard/WidgetVisitors";
import { WidgetTopProducts } from "@/components/dashboard/WidgetTopProducts";
import { WidgetRecentActivity } from "@/components/dashboard/WidgetRecentActivity";

const stats = [
  {
    title: "Total Revenue",
    amount: "₹4,360",
    change: "+2.34%",
    changeType: "up" as const,
    icon: Coins,
    iconBg: "bg-[#e2d7fa]",
    iconColor: "text-[#7c5cbf]",
  },
  {
    title: "Total Orders",
    amount: "3,054",
    change: "+5.12%",
    changeType: "up" as const,
    icon: ShoppingCart,
    iconBg: "bg-[#d2ebff]",
    iconColor: "text-[#2a7abf]",
  },
  {
    title: "Monthly Growth",
    amount: "13%",
    change: "-1.20%",
    changeType: "down" as const,
    icon: TrendingUp,
    iconBg: "bg-[#e2d7fa]",
    iconColor: "text-[#7c5cbf]",
  },
  {
    title: "Conversion Rate",
    amount: "20%",
    change: "+0.88%",
    changeType: "up" as const,
    icon: BarChart2,
    iconBg: "bg-[#d2ebff]",
    iconColor: "text-[#2a7abf]",
  },
];

export function Dashboard() {
  return (
    <div className="flex flex-col gap-5 h-full">
      <Header title="Dashboard" />

      {/* Stat Cards */}
      <div className="grid grid-cols-4 gap-5 shrink-0">
        {stats.map((stat) => (
          <CardStatistic key={stat.title} {...stat} />
        ))}
      </div>

      {/* Middle Section: two equal columns */}
      <div className="grid grid-cols-2 gap-5">
        {/* Left column */}
        <div className="flex flex-col gap-5">
          <div className="h-[402px]">
            <WidgetSalesOverview />
          </div>
          <div className="h-[278px]">
            <WidgetProductSales />
          </div>
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-5">
          {/* 2-col grid for top-right area */}
          <div className="grid grid-cols-2 gap-5 h-[402px]">
            {/* Left side of right column */}
            <div className="flex flex-col gap-5">
              <div className="h-[182px]">
                <WidgetSalesActivity />
              </div>
              <div className="flex-1">
                <WidgetCustomerGrowth />
              </div>
            </div>
            {/* Sales Distribution - right of right column */}
            <div className="h-[402px]">
              <WidgetSalesDistribution />
            </div>
          </div>
          {/* Visitors spans full width of right column */}
          <div className="h-[278px]">
            <WidgetVisitors />
          </div>
        </div>
      </div>

      {/* Bottom Section: Top Products + Recent Activity */}
      <div className="grid gap-5 shrink-0" style={{ gridTemplateColumns: "1fr 275px" }}>
        <div className="h-[436px]">
          <WidgetTopProducts />
        </div>
        <div className="h-[436px]">
          <WidgetRecentActivity />
        </div>
      </div>
    </div>
  );
}
