
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { categories } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';
import { getExpenseCategory } from '@/lib/actions';
import { useEffect, useState, useTransition } from 'react';
import { Loader2, Wand2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCurrency } from '@/context/CurrencyContext';

const formSchema = z.object({
  description: z.string().min(2, {
    message: 'Description must be at least 2 characters.',
  }),
  amount: z.coerce.number().positive({
    message: 'Amount must be a positive number.',
  }),
  category: z.string().min(1, {
    message: 'Please select a category.',
  }),
  date: z.string(),
});

type AddTransactionFormProps = {
  onFinished: () => void;
};

export default function AddTransactionForm({ onFinished }: AddTransactionFormProps) {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [suggestedCategory, setSuggestedCategory] = useState<string | null>(null);
  const { currencySymbol } = useCurrency();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: '',
      amount: 0,
      category: '',
      date: new Date().toISOString().split('T')[0],
    },
  });

  const descriptionValue = form.watch('description');

  useEffect(() => {
    const handler = setTimeout(() => {
      if (descriptionValue.length > 3) {
        const formData = new FormData();
        formData.append('description', descriptionValue);
        startTransition(async () => {
          const result = await getExpenseCategory(formData);
          if (result.success && result.category) {
            setSuggestedCategory(result.category);
          }
        });
      } else {
        setSuggestedCategory(null);
      }
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [descriptionValue]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: 'Transaction Added',
      description: `${values.description} for ${currencySymbol}${values.amount} has been added.`,
    });
    onFinished();
  }

  const applySuggestion = () => {
    if (suggestedCategory) {
      form.setValue('category', suggestedCategory);
      setSuggestedCategory(null);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pt-6">
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Coffee with friends" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input type="number" placeholder="0.00" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <div className="relative">
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                 {isPending && (
                  <Loader2 className="absolute right-10 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin text-muted-foreground" />
                )}
              </div>
              {suggestedCategory && suggestedCategory !== field.value && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="mt-2 w-full gap-2"
                  onClick={applySuggestion}
                >
                  <Wand2 className="h-4 w-4 text-accent" />
                  Suggested:
                  <span className="font-semibold">{suggestedCategory}</span>
                </Button>
              )}
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Add Transaction
        </Button>
      </form>
    </Form>
  );
}
