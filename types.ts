
export type TransactionType = 'income' | 'expense';

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: TransactionType;
  category: string;
  date: string;
  time?: string;
}

export interface Budget {
  categoryId: string;
  limit: number;
  spent: number;
}

export type ViewState = 
  | 'onboarding' 
  | 'login' 
  | 'dashboard' 
  | 'analysis' 
  | 'transactions' 
  | 'budgets' 
  | 'settings' 
  | 'add-transaction'
  | 'qr-scanner';
