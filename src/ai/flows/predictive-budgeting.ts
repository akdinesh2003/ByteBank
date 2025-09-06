'use server';

/**
 * @fileOverview This file defines a Genkit flow for predictive budgeting.
 *
 * The flow forecasts next month's expenses based on historical data and suggests budget caps.
 * It uses a prompt to analyze spending patterns and provide recommendations.
 *
 * @exports {
 *   predictBudget - A function to trigger the predictive budgeting flow.
 *   PredictBudgetInput - The input type for the predictBudget function.
 *   PredictBudgetOutput - The output type for the predictBudget function.
 * }
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

/**
 * Input schema for the predictive budgeting flow.
 */
const PredictBudgetInputSchema = z.object({
  historicalSpendingData: z
    .string()
    .describe(
      'A JSON string containing historical spending data.  Each key should be a category, and the value should be an array of numbers representing spending for that category in previous months.'
    ),
});
export type PredictBudgetInput = z.infer<typeof PredictBudgetInputSchema>;

/**
 * Output schema for the predictive budgeting flow.
 */
const PredictBudgetOutputSchema = z.object({
  forecastedExpenses: z
    .string()
    .describe(
      'A JSON string containing forecasted expenses for the next month, broken down by category.'
    ),
  suggestedBudgetCaps: z
    .string()
    .describe(
      'A JSON string containing suggested budget caps for each category, to help the user manage their finances.'
    ),
});
export type PredictBudgetOutput = z.infer<typeof PredictBudgetOutputSchema>;

/**
 * Wrapper function to trigger the predictive budgeting flow.
 * @param input - The input data for the flow.
 * @returns A promise that resolves to the output of the flow.
 */
export async function predictBudget(input: PredictBudgetInput): Promise<PredictBudgetOutput> {
  return predictiveBudgetingFlow(input);
}

/**
 * Prompt definition for the predictive budgeting flow.
 */
const predictiveBudgetingPrompt = ai.definePrompt({
  name: 'predictiveBudgetingPrompt',
  input: {schema: PredictBudgetInputSchema},
  output: {schema: PredictBudgetOutputSchema},
  config: {
    safetySettings: [
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_NONE',
      },
      {
        category: 'HARM_CATEGORY_HARASSMENT',
        threshold: 'BLOCK_NONE',
      },
      {
        category: 'HARM_CATEGORY_HATE_SPEECH',
        threshold: 'BLOCK_NONE',
      },
      {
        category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
        threshold: 'BLOCK_NONE',
      },
    ],
  },
  prompt: `You are a personal finance advisor. Analyze the following historical spending data and provide a forecast of next month's expenses, as well as suggested budget caps for each category.  The data is provided as a JSON string.

Historical Spending Data:
{{{historicalSpendingData}}}

Respond with a JSON string containing the forecasted expenses and another JSON string containing the suggested budget caps.
`,
});

/**
 * Flow definition for predictive budgeting.
 */
const predictiveBudgetingFlow = ai.defineFlow(
  {
    name: 'predictiveBudgetingFlow',
    inputSchema: PredictBudgetInputSchema,
    outputSchema: PredictBudgetOutputSchema,
  },
  async input => {
    const {output} = await predictiveBudgetingPrompt(input);
    return output!;
  }
);
