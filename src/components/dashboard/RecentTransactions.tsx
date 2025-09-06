
'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { transactions } from '@/lib/data';
import { ArrowUpRight, PlusCircle } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import AddTransactionForm from './AddTransactionForm';
import { usePathname } from 'next/navigation';
import { useCurrency } from '@/context/CurrencyContext';

export default function RecentTransactions() {
  const [isSheetOpen, setSheetOpen] = useState(false);
  const pathname = usePathname();
  const isTransactionsPage = pathname === '/transactions';
  const { currencySymbol } = useCurrency();

  const transactionsToShow = isTransactionsPage ? transactions : transactions.slice(0, 5);


  return (
    <Card>
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle className="font-headline">Transactions</CardTitle>
          <CardDescription>
            {isTransactionsPage ? 'All of your transactions.' : 'Recent transactions from your accounts.'}
          </CardDescription>
        </div>
        <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger asChild>
            <Button size="sm" className="ml-auto gap-1">
              <PlusCircle className="h-4 w-4" />
              Add Transaction
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle className="font-headline">Add Transaction</SheetTitle>
            </SheetHeader>
            <AddTransactionForm onFinished={() => setSheetOpen(false)} />
          </SheetContent>
        </Sheet>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Description</TableHead>
              <TableHead className="hidden sm:table-cell">Category</TableHead>
              <TableHead className="hidden sm:table-cell">Date</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactionsToShow.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>
                  <div className="font-medium">{transaction.description}</div>
                  <div className="text-sm text-muted-foreground sm:hidden">
                    {transaction.category} - {transaction.date}
                  </div>
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  <Badge className="text-xs" variant="outline">
                    {transaction.category}
                  </Badge>
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  {transaction.date}
                </TableCell>
                <TableCell
                  className={`text-right font-medium ${
                    transaction.type === 'income'
                      ? 'text-green-600'
                      : 'text-foreground'
                  }`}
                >
                  {transaction.type === 'income' ? '+' : '-'}{currencySymbol}
                  {transaction.amount.toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
       {!isTransactionsPage && (
        <CardFooter>
            <div className="text-xs text-muted-foreground">
            Showing <strong>1-5</strong> of <strong>{transactions.length}</strong> transactions
            </div>
            <Button asChild size="sm" variant="link" className="ml-auto gap-1">
                <a href="/transactions">
                    View All
                    <ArrowUpRight className="h-4 w-4" />
                </a>
            </Button>
        </CardFooter>
       )}
    </Card>
  );
}
