import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { Sidebar } from "@/components/layout/Sidebar";
import { Dashboard } from "@/pages/Dashboard";
import { Products } from "@/pages/Products";
import { ProductDetails } from "@/pages/ProductDetails";
import { Campaigns } from "@/pages/Campaigns";
import { Orders } from "@/pages/Orders";
import { Invoices } from "@/pages/Invoices";
import { Schedule } from "@/pages/Schedule";
import { Messages } from "@/pages/Messages";
import { Shipments } from "@/pages/Shipments";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/products" component={Products} />
      <Route path="/products/:id" component={ProductDetails} />
      <Route path="/campaigns" component={Campaigns} />
      <Route path="/orders" component={Orders} />
      <Route path="/invoices" component={Invoices} />
      <Route path="/schedule" component={Schedule} />
      <Route path="/messages" component={Messages} />
      <Route path="/shipments" component={Shipments} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <div className="flex h-screen bg-[#f6f7f6] overflow-hidden">
          <Sidebar />
          <main className="flex-1 overflow-y-auto p-7">
            <Router />
          </main>
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
