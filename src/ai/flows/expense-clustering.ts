'use server';
/**
 * @fileOverview Expense clustering flow using local NLP to group similar expenses.
 *
 * - clusterExpense - A function that clusters a given expense with existing categories.
 * - ClusterExpenseInput - The input type for the clusterExpense function.
 * - ClusterExpenseOutput - The return type for the clusterExpense function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ClusterExpenseInputSchema = z.object({
  expenseDescription: z.string().describe('The description of the expense.'),
  existingCategories: z
    .array(z.string())
    .describe('The list of existing expense categories.'),
});
export type ClusterExpenseInput = z.infer<typeof ClusterExpenseInputSchema>;

const ClusterExpenseOutputSchema = z.object({
  suggestedCategory: z
    .string()
    .describe(
      'The suggested category for the expense, based on its similarity to existing categories. If no suitable category exists, return "Other".'
    ),
});
export type ClusterExpenseOutput = z.infer<typeof ClusterExpenseOutputSchema>;

const getSemanticSimilarity = ai.defineTool({
  name: 'getSemanticSimilarity',
  description: 'Determines the semantic similarity between two text strings.',
  inputSchema: z.object({
    text1: z.string().describe('The first text string.'),
    text2: z.string().describe('The second text string.'),
  }),
  outputSchema: z.number().describe('The semantic similarity score between 0 and 1.'),
},
async (input) => {
  // Mock implementation for demonstration purposes.
  // In a real application, this would use a local NLP library like spaCy.
  //TODO: Replace with actual semantic similarity comparison using a local NLP library.
  if (input.text1.toLowerCase().includes(input.text2.toLowerCase()) || input.text2.toLowerCase().includes(input.text1.toLowerCase())) {
    return 0.8; // High similarity if one string contains the other.
  }
  return 0.2; // Low similarity by default.
});

export async function clusterExpense(input: ClusterExpenseInput): Promise<ClusterExpenseOutput> {
  return clusterExpenseFlow(input);
}

const prompt = ai.definePrompt({
  name: 'clusterExpensePrompt',
  input: {schema: ClusterExpenseInputSchema},
  output: {schema: ClusterExpenseOutputSchema},
  tools: [getSemanticSimilarity],
  prompt: `You are an expert financial categorization assistant.

You are provided with an expense description and a list of existing categories.
Your task is to determine the most appropriate category for the expense, using semantic similarity.

Expense Description: {{{expenseDescription}}}
Existing Categories: {{#each existingCategories}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}

Consider the semantic similarity between the expense description and each existing category using the getSemanticSimilarity tool to get a similarity score.
If the highest similarity score is above 0.7, suggest the corresponding category.
Otherwise, suggest the category "Other".

Return ONLY the suggested category.

`, //Crucially, LLM only returns the category, since output schema only requires a string
});

const clusterExpenseFlow = ai.defineFlow(
  {
    name: 'clusterExpenseFlow',
    inputSchema: ClusterExpenseInputSchema,
    outputSchema: ClusterExpenseOutputSchema,
  },
  async input => {
    let suggestedCategory = 'Other';
    let highestSimilarity = 0;

    for (const category of input.existingCategories) {
      const similarityResult = await getSemanticSimilarity({
        text1: input.expenseDescription,
        text2: category,
      });

      if (similarityResult > highestSimilarity) {
        highestSimilarity = similarityResult;
        suggestedCategory = category;
      }
    }

    if (highestSimilarity <= 0.7) {
      suggestedCategory = 'Other';
    }

    return {suggestedCategory};
  }
);
