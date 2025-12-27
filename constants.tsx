
import { Category, Transaction } from './types';

export const CATEGORIES: Category[] = [
  { id: 'food', name: 'Alimentação', icon: 'restaurant', color: '#3b82f6' },
  { id: 'transport', name: 'Transporte', icon: 'directions_car', color: '#eab308' },
  { id: 'home', name: 'Moradia', icon: 'home', color: '#ef4444' },
  { id: 'shopping', name: 'Compras', icon: 'shopping_bag', color: '#a855f7' },
  { id: 'health', name: 'Saúde', icon: 'medical_services', color: '#10b981' },
  { id: 'leisure', name: 'Lazer', icon: 'movie', color: '#ec4899' },
  { id: 'work', name: 'Trabalho', icon: 'work', color: '#13ec80' },
];

export const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: '1',
    description: 'Uber ida e volta',
    amount: 24.90,
    type: 'expense',
    category: 'transport',
    date: '2023-10-24',
    time: '14:30',
  },
  {
    id: '2',
    description: 'Salário Mensal',
    amount: 5000.00,
    type: 'income',
    category: 'work',
    date: '2023-10-24',
    time: '09:00',
  },
  {
    id: '3',
    description: 'Starbucks Coffee',
    amount: 18.50,
    type: 'expense',
    category: 'food',
    date: '2023-10-24',
    time: '08:15',
  },
  {
    id: '4',
    description: 'Spotify Premium',
    amount: 21.90,
    type: 'expense',
    category: 'leisure',
    date: '2023-10-23',
    time: '12:00',
  },
  {
    id: '5',
    description: 'Supermercado Extra',
    amount: 324.50,
    type: 'expense',
    category: 'food',
    date: '2023-10-22',
    time: '10:00',
  },
];
