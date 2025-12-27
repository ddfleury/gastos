
import React, { useState } from 'react';
import { Transaction } from '../types';
import { CATEGORIES } from '../constants';

interface TransactionsListProps {
  transactions: Transaction[];
  balance: number;
  onBack: () => void;
}

const TransactionsList: React.FC<TransactionsListProps> = ({ transactions, balance, onBack }) => {
  const [filter, setFilter] = useState<'all' | 'income' | 'expense'>('all');
  
  const filtered = transactions.filter(t => {
    if (filter === 'all') return true;
    return t.type === filter;
  });

  const getCategoryIcon = (catId: string) => {
    return CATEGORIES.find(c => c.id === catId)?.icon || 'category';
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-background-dark overflow-hidden">
      <div className="sticky top-0 z-50 bg-background-dark/95 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center justify-between p-4 pt-6 pb-2">
          <button onClick={onBack} className="p-2 rounded-full hover:bg-white/10 transition-colors">
            <span className="material-symbols-outlined text-white">arrow_back_ios_new</span>
          </button>
          <h2 className="text-lg font-bold flex-1 text-center pr-8">Extrato</h2>
          <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
            <span className="material-symbols-outlined text-white">more_horiz</span>
          </button>
        </div>
        <div className="px-4 pb-2 text-center">
          <p className="text-sm font-medium text-gray-400 mb-1">Saldo total</p>
          <h2 className="tracking-tight text-3xl font-bold leading-tight text-white">
            {balance.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </h2>
        </div>
        <div className="px-4 py-3">
          <div className="flex h-12 rounded-xl bg-surface-dark border border-white/5">
            <div className="text-gray-500 flex items-center justify-center pl-4 pr-2">
              <span className="material-symbols-outlined">search</span>
            </div>
            <input 
              className="flex-1 bg-transparent text-white focus:outline-0 border-none placeholder:text-gray-500 text-base" 
              placeholder="Buscar transação..." 
            />
          </div>
        </div>
        <div className="flex gap-3 px-4 pb-4 overflow-x-auto no-scrollbar">
          <button 
            onClick={() => setFilter('all')}
            className={`flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full px-4 transition-all ${filter === 'all' ? 'bg-primary text-black font-bold shadow-md shadow-primary/20' : 'bg-surface-dark border border-white/10 text-white'}`}
          >
            Todos
          </button>
          <button 
            onClick={() => setFilter('income')}
            className={`flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full px-4 transition-all ${filter === 'income' ? 'bg-primary text-black font-bold' : 'bg-surface-dark border border-white/10 text-white'}`}
          >
            Entradas
          </button>
          <button 
            onClick={() => setFilter('expense')}
            className={`flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full px-4 transition-all ${filter === 'expense' ? 'bg-primary text-black font-bold' : 'bg-surface-dark border border-white/10 text-white'}`}
          >
            Saídas
          </button>
        </div>
      </div>

      <main className="flex-1 overflow-y-auto pb-32 no-scrollbar">
        <div className="px-4">
          {filtered.length === 0 ? (
            <div className="py-10 text-center text-gray-400">Nenhuma transação encontrada.</div>
          ) : (
            filtered.map((t, i) => (
              <div key={t.id} className="flex items-center justify-between py-4 border-b border-white/5 last:border-0 group cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-surface-dark text-primary group-hover:scale-105 transition-transform`}>
                    <span className="material-symbols-outlined">{getCategoryIcon(t.category)}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-white text-base font-semibold">{t.description}</span>
                    <span className="text-gray-400 text-sm">{t.category} • {t.time}</span>
                  </div>
                </div>
                <span className={`font-bold text-base ${t.type === 'income' ? 'text-primary' : 'text-white'}`}>
                  {t.type === 'income' ? '+' : '-'} {t.amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </span>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default TransactionsList;
