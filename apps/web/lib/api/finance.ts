import type { IncomeEntry, ExpenseEntry, FinanceSummary } from '@condoflow/types';
import { mockIncomeEntries, mockExpenseEntries, mockFinanceSummary } from './mock-data';

function delay(ms = 350): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getFinanceSummary(consortiumId: string): Promise<FinanceSummary> {
  await delay();
  return { ...mockFinanceSummary, consortiumId };
}

export async function getIncomeEntries(consortiumId: string): Promise<IncomeEntry[]> {
  await delay();
  return mockIncomeEntries.filter((e) => e.consortiumId === consortiumId);
}

export async function getExpenseEntries(consortiumId: string): Promise<ExpenseEntry[]> {
  await delay();
  return mockExpenseEntries.filter((e) => e.consortiumId === consortiumId);
}

export async function createIncomeEntry(
  data: Omit<IncomeEntry, 'id' | 'createdAt' | 'updatedAt'>,
): Promise<IncomeEntry> {
  await delay(400);
  return {
    ...data,
    id: `inc-e-${Date.now()}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

export async function createExpenseEntry(
  data: Omit<ExpenseEntry, 'id' | 'createdAt' | 'updatedAt'>,
): Promise<ExpenseEntry> {
  await delay(400);
  return {
    ...data,
    id: `exp-${Date.now()}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}
