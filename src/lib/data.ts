import type { Profile, Transaction, Goal } from './types';
import { Laptop, Plane, Target, Landmark } from 'lucide-react';

export const profiles: Profile[] = [
  { id: '1', name: 'Personal', avatar: '/avatars/01.png', initials: 'P' },
  { id: '2', name: 'Freelance', avatar: '/avatars/02.png', initials: 'F' },
  { id: '3', name: 'Household', avatar: '/avatars/03.png', initials: 'H' },
];

export const transactions: Transaction[] = [
  { id: '1', description: 'Starbucks', category: 'Coffee Shops', amount: 5.50, date: '2024-07-23', type: 'expense' },
  { id: '2', description: 'Client Project Payment', category: 'Freelance Income', amount: 1200, date: '2024-07-22', type: 'income' },
  { id: '3', description: 'Groceries from Whole Foods', category: 'Groceries', amount: 78.25, date: '2024-07-21', type: 'expense' },
  { id: '4', description: 'Netflix Subscription', category: 'Subscriptions', amount: 15.99, date: '2024-07-20', type: 'expense' },
  { id: '5', description: 'Cafe Coffee Day', category: 'Coffee Shops', amount: 4.75, date: '2024-07-19', type: 'expense' },
  { id: '6', description: 'Gasoline', category: 'Transportation', amount: 45.00, date: '2024-07-18', type: 'expense' },
];

export const goals: Goal[] = [
  { id: '1', name: 'New Laptop', targetAmount: 2000, currentAmount: 1500, icon: Laptop },
  { id: '2', name: 'Vacation to Japan', targetAmount: 5000, currentAmount: 1200, icon: Plane },
  { id: '3', name: 'Emergency Fund', targetAmount: 10000, currentAmount: 8500, icon: Landmark },
  { id: '4', name: 'Investment Goal', targetAmount: 25000, currentAmount: 18000, icon: Target },
];

export const historicalSpending = {
  "Groceries": [65, 72, 80],
  "Utilities": [150, 155, 148],
  "Transportation": [100, 120, 110],
  "Entertainment": [50, 40, 65],
  "Subscriptions": [30, 30, 32],
  "Coffee Shops": [20, 25, 22]
};

export const categories = [
    "Groceries",
    "Utilities",
    "Transportation",
    "Entertainment",
    "Health",
    "Shopping",
    "Food",
    "Housing",
    "Income",
    "Subscriptions",
    "Coffee Shops",
];
