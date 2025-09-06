
'use client';

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
import { useEffect, useState } from 'react';

interface ChartData {
  category: string;
  forecast: number;
  budget: number;
}

export default function PredictiveBudget() {
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [riskyCategories, setRiskyCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPredictions() {
      try {
        setIsLoading(true);
        const prediction = await predictBudget({ historicalSpendingData: JSON.stringify(historicalSpending) });
        const forecastedExpenses = JSON.parse(prediction.forecastedExpenses);
        const suggestedBudgets = JSON.parse(prediction.suggestedBudgetCaps);

        const data = Object.keys(forecastedExpenses).map(key => ({
          category: key,
          forecast: forecastedExpenses[key] || 0,
          budget: suggestedBudgets[key] || 0,
        }));
        setChartData(data);

        const risky = data
          .filter(d => d.forecast > d.budget)
          .map(d => d.category);
        setRiskyCategories(risky);
        setError(null);
      } catch (err) {
        console.error("Failed to predict budget:", err);
        setError("Could not load budget predictions.");
      } finally {
        setIsLoading(false);
      }
    }
    fetchPredictions();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Predictive Budget</CardTitle>
        <CardDescription>
          AI-powered forecast for next month's spending.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex h-[240px] items-center justify-center">
            <p>Loading predictions...</p>
          </div>
        ) : error ? (
           <div className="flex h-[240px] items-center justify-center">
            <p className="text-destructive">{error}</p>
          </div>
        ) : (
          <PredictiveBudgetChart data={chartData} />
        )}
      </CardContent>
      {!isLoading && !error && riskyCategories.length > 0 && (
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
