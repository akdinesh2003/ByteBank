
import RecentTransactions from "@/components/dashboard/RecentTransactions";
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Transactions | ByteBank X',
  description: 'View and manage your transactions.',
}

export default function TransactionsPage() {
  return (
    <div className="grid gap-4 md:gap-8">
        <RecentTransactions />
    </div>
  );
}
