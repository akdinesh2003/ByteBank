'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart';
import { TrendingUp, TrendingDown } from 'lucide-react';

const chartConfig = {
  forecast: {
    label: 'Forecasted',
    color: 'hsl(var(--chart-1))',
    icon: TrendingUp,
  },
  budget: {
    label: 'Budget Cap',
    color: 'hsl(var(--chart-2))',
    icon: TrendingDown,
  },
} satisfies ChartConfig;

type PredictiveBudgetChartProps = {
  data: {
    category: string;
    forecast: number;
    budget: number;
  }[];
};

export function PredictiveBudgetChart({ data }: PredictiveBudgetChartProps) {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={data} margin={{ top: 20 }}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="category"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <YAxis />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="forecast" fill="var(--color-forecast)" radius={4} />
        <Bar dataKey="budget" fill="var(--color-budget)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
