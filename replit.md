# Salestics - Point of Sales Admin Dashboard

## Overview
A full-stack Point of Sales admin dashboard built from a Figma design. Features a responsive sidebar layout with multiple dashboard widgets displaying sales data, charts, and analytics.

## Architecture

### Stack
- **Frontend**: React 18 + TypeScript + Vite
- **Backend**: Express.js (Node.js)
- **Database**: PostgreSQL via Drizzle ORM
- **Styling**: Tailwind CSS + shadcn/ui components
- **Charts**: Recharts
- **Icons**: Lucide React
- **Routing**: Wouter

### Project Structure
```
client/src/
  components/
    layout/
      Sidebar.tsx       - Navigation sidebar with active route highlighting
      Header.tsx        - Top header with search, notifications, user profile
    dashboard/
      CardStatistic.tsx          - KPI stat cards (revenue, orders, customers, products)
      WidgetSalesOverview.tsx    - Bar chart showing earnings vs expenditure
      WidgetSalesActivity.tsx    - Activity metrics (packed, delivered, shipping, pending)
      WidgetCustomerGrowth.tsx   - Customer growth percentage widget
      WidgetSalesDistribution.tsx - Donut chart for sales by channel
      WidgetVisitors.tsx         - Visitors by region widget
      RecentOrders.tsx           - Orders table with status badges
  pages/
    Dashboard.tsx           - Main dashboard page composing all widgets
    WidgetProductSales.tsx  - Product Sales Category widget (from Figma)
    not-found.tsx           - 404 page
server/
  index.ts     - Express server entry
  routes.ts    - API route registration
  storage.ts   - Data storage interface
shared/
  schema.ts    - Drizzle DB schema + Zod validation
```

## Design System
Based on the Salestics Figma design (https://figma.com/design/2YoWeGmvbfaPgkMMhmc4Gi/)

### Colors
- Primary Orange: `#ff683a`
- Background: `#fdfcff` (white), `#f6f7f6` (subtle gray)
- Text Primary: `#2a2b2a`
- Text Secondary: `#8c8d8c`, `#555`
- Blue accent: `#d2ebff`
- Purple accent: `#e2d7fa`
- Red/Warning: `#ffd9d0`

### Font
Plus Jakarta Sans (400, 500, 600, 700, 800 weights)

## Running the App
```bash
npm run dev    # Development server on port 5000
npm run build  # Production build
npm run db:push  # Push schema to database
```

## Deployment
- Build command: `npm run build`
- Run command: `node ./dist/index.cjs`
- Deployment target: Autoscale
