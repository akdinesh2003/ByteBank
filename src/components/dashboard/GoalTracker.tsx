
'use client'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { goals } from '@/lib/data';
import { useCurrency } from '@/context/CurrencyContext';

export default function GoalTracker() {
  const { currencySymbol } = useCurrency();

  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle className="font-headline">Goal Tracker</CardTitle>
        <CardDescription>
          Visualize your progress towards your financial goals.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {goals.map((goal) => {
            const progress = (goal.currentAmount / goal.targetAmount) * 100;
            return (
              <div key={goal.id}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <goal.icon className="h-6 w-6 text-muted-foreground" />
                    <span className="font-medium">{goal.name}</span>
                  </div>
                  <span className="font-mono text-sm font-medium">
                    {currencySymbol}{goal.currentAmount.toLocaleString()} / {currencySymbol}
                    {goal.targetAmount.toLocaleString()}
                  </span>
                </div>
                <Progress value={progress} className="mt-2 h-2" />
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
