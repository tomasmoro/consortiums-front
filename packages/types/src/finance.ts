export type TransactionType = 'income' | 'expense';
export type PaymentStatus = 'pending' | 'paid' | 'overdue' | 'cancelled';
export type ExpenseCategory =
  | 'maintenance'
  | 'utilities'
  | 'insurance'
  | 'salaries'
  | 'supplies'
  | 'other';

export interface IncomeEntry {
  id: string;
  consortiumId: string;
  unitId: string;
  unitNumber: string;
  description: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  dueDate: string;
  paidAt?: string;
  receiptUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ExpenseEntry {
  id: string;
  consortiumId: string;
  description: string;
  category: ExpenseCategory;
  amount: number;
  currency: string;
  vendor?: string;
  invoiceUrl?: string;
  approvedBy?: string;
  paidAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface FinanceSummary {
  consortiumId: string;
  period: string;
  totalIncome: number;
  totalExpenses: number;
  balance: number;
  pendingPayments: number;
  overduePayments: number;
  currency: string;
}
