'use client';

import * as React from 'react';
import { Label, PolarGrid, PolarRadiusAxis, RadialBar } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { TrendingUp } from 'lucide-react';

const chartConfig = {
  score: {
    label: 'Score',
    color: 'hsl(var(--chart-1))',
  },
};

export default function FinancialHealthScore() {
  const score = 720;
  const chartData = [{ month: 'july', score }];

  return (
    <Card className="flex flex-col lg:col-span-2">
      <CardHeader className="items-center pb-0">
        <CardTitle className="font-headline">Financial Health Score</CardTitle>
        <CardDescription>Based on your financial activity</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadialBar
            dataKey="score"
            background
            startAngle={-90}
            endAngle={270}
            innerRadius={100}
            cornerRadius={8}
            data={chartData}
            className="fill-background"
          >
            <Label
              content={({ viewBox }) => {
                if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy}
                        className="fill-foreground text-4xl font-bold font-headline"
                      >
                        {score.toLocaleString()}
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 24}
                        className="fill-muted-foreground"
                      >
                        Good
                      </tspan>
                    </text>
                  );
                }
              }}
            />
          </RadialBar>
        </ChartContainer>
      </CardContent>
      <div className="flex w-full items-center justify-center p-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <TrendingUp className="h-4 w-4" />
          <span>Score is up 5% this month</span>
        </div>
      </div>
    </Card>
  );
}
