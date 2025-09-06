import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from '@/components/ui/card';
import { predictBudget } from '@/ai/flows/predictive-budgeting';
import { historicalSpending } from '@/lib/data';
import { PredictiveBudgetChart } from './PredictiveBudgetChart';
import { BadgeAlert } from 'lucide-react';

export default async function PredictiveBudget() {
  let chartData: { category: string; forecast: number; budget: number; }[] = [];
  let riskyCategories: string[] = [];

  try {
    const prediction = await predictBudget({ historicalSpendingData: JSON.stringify(historicalSpending) });
    const forecastedExpenses = JSON.parse(prediction.forecastedExpenses);
    const suggestedBudgets = JSON.parse(prediction.suggestedBudgetCaps);

    chartData = Object.keys(forecastedExpenses).map(key => ({
      category: key,
      forecast: forecastedExpenses[key] || 0,
      budget: suggestedBudgets[key] || 0,
    }));

    riskyCategories = chartData
      .filter(d => d.forecast > d.budget)
      .map(d => d.category);

  } catch (error) {
    console.error("Failed to predict budget:", error);
    // Render a fallback or error state if needed
  }
  
  if (chartData.length === 0) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Predictive Budget</CardTitle>
                <CardDescription>Could not load budget predictions.</CardDescription>
            </CardHeader>
            <CardContent>
                <p>There was an error fetching the predictive budget data.</p>
            </CardContent>
        </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Predictive Budget</CardTitle>
        <CardDescription>
          AI-powered forecast for next month's spending.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <PredictiveBudgetChart data={chartData} />
      </CardContent>
      {riskyCategories.length > 0 && (
         <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="flex items-center gap-2 font-medium leading-none">
            <BadgeAlert className="h-4 w-4 text-accent" />
            Spending Alert
          </div>
          <div className="leading-none text-muted-foreground">
            You're on track to overspend in: {riskyCategories.join(', ')}.
          </div>
        </CardFooter>
      )}
    </Card>
  );
}
