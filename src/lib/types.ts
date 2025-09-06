export interface Profile {
  id: string;
  name: string;
  avatar: string;
  initials: string;
}

export interface Transaction {
  id: string;
  description: string;
  category: string;
  amount: number;
  date: string;
  type: 'income' | 'expense';
}

export interface Goal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  icon: React.ComponentType<{ className?: string }>;
}
