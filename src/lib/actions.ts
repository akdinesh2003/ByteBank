'use server';

import { clusterExpense } from '@/ai/flows/expense-clustering';
import { z } from 'zod';
import { categories } from './data';

const clusterSchema = z.object({
  description: z.string(),
});

export async function getExpenseCategory(formData: FormData) {
  try {
    const validatedData = clusterSchema.parse({
      description: formData.get('description'),
    });

    if (!validatedData.description) {
      return { success: false, category: null, error: 'Description is required.' };
    }

    const result = await clusterExpense({
      expenseDescription: validatedData.description,
      existingCategories: categories,
    });
    
    return { success: true, category: result.suggestedCategory, error: null };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, category: null, error: error.errors.map(e => e.message).join(', ') };
    }
    console.error('Error clustering expense:', error);
    return { success: false, category: null, error: 'An unexpected error occurred.' };
  }
}
