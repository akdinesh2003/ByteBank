import { AppSidebar } from "@/components/AppSidebar";
import { DashboardHeader } from "@/components/DashboardHeader";
import FinancialHealthScore from "@/components/dashboard/FinancialHealthScore";
import GoalTracker from "@/components/dashboard/GoalTracker";
import PredictiveBudget from "@/components/dashboard/PredictiveBudget";
import RecentTransactions from "@/components/dashboard/RecentTransactions";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard | ByteBank X',
  description: 'Your personal finance overview.',
}

export default function DashboardPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="flex min-h-screen w-full flex-col">
          <DashboardHeader />
          <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
            <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
              <FinancialHealthScore />
              <GoalTracker />
            </div>
            <div className="grid gap-4 md:gap-8 lg:grid-cols-2">
              <RecentTransactions />
              <PredictiveBudget />
            </div>
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
