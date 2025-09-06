
'use client';

import FinancialHealthScore from "@/components/dashboard/FinancialHealthScore";
import GoalTracker from "@/components/dashboard/GoalTracker";
import PredictiveBudget from "@/components/dashboard/PredictiveBudget";
import RecentTransactions from "@/components/dashboard/RecentTransactions";

export default function Dashboard() {
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <FinancialHealthScore />
        <GoalTracker />
      </div>
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2">
        <RecentTransactions />
        <PredictiveBudget />
      </div>
    </>
  );
}
