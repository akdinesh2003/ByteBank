
import GoalTracker from "@/components/dashboard/GoalTracker";
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Goals | ByteBank X',
  description: 'Track your financial goals.',
}

export default function GoalsPage() {
  return (
    <div className="grid gap-4 md:gap-8">
      <GoalTracker />
    </div>
  );
}

