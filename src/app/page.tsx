
import Dashboard from "@/components/dashboard/Dashboard";
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard | ByteBank X',
  description: 'Your personal finance overview.',
}

export default function DashboardPage() {
  return (
    <Dashboard />
  );
}
