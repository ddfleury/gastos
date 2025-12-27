
import React from 'react';
import { Transaction, Category } from '../types';
import { CATEGORIES } from '../constants';
import { BarChart, Bar, ResponsiveContainer, XAxis, Tooltip, Cell } from 'recharts';

interface DashboardProps {
  balance: number;
  transactions: Transaction[];
  onAdd: () => void;
  onViewAll: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ balance, transactions, onAdd, onViewAll }) => {
  const latestTransactions = transactions.slice(0, 5);
  
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((acc, curr) => acc + curr.amount, 0);
  
  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, curr) => acc + curr.amount, 0);

  // Mini Chart Mock Data
  const chartData = [
    { name: 'Seg', val: 200 },
    { name: 'Ter', val: 400 },
    { name: 'Qua', val: 300 },
    { name: 'Qui', val: 700 },
    { name: 'Sex', val: 500 },
    { name: 'Sab', val: 600 },
    { name: 'Dom', val: 800 },
  ];

  const getCategoryIcon = (catId: string) => {
    const category = CATEGORIES.find(c => c.id === catId);
    return category ? category.icon : 'category';
  };

  const getCategoryColorClass = (catId: string) => {
    const category = CATEGORIES.find(c => c.id === catId);
    if (!category) return 'bg-gray-500/10 text-gray-500';
    
    switch(category.id) {
      case 'food': return 'bg-orange-500/10 text-orange-500';
      case 'transport': return 'bg-blue-500/10 text-blue-500';
      case 'home': return 'bg-red-500/10 text-red-500';
      case 'leisure': return 'bg-purple-500/10 text-purple-500';
      case 'work': return 'bg-primary/10 text-primary';
      default: return 'bg-primary/10 text-primary';
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-background-dark overflow-hidden">
      <header className="flex items-center p-4 pt-6 justify-between bg-background-dark sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 rounded-full size-10 border-2 border-primary/20 flex items-center justify-center">
            <span className="material-symbols-outlined text-primary">person</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-secondary-text font-medium">Bom dia,</span>
            <h2 className="text-white text-base font-bold leading-tight">Alexandre</h2>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center justify-center rounded-full size-10 bg-surface-dark text-white hover:bg-[#2a4536] transition-colors shadow-sm">
            <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>notifications</span>
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto pb-32 no-scrollbar">
        <div className="px-4 py-2 w-full">
          <div className="w-full rounded-2xl bg-gradient-to-br from-[#1c2e24] to-[#15231b] p-6 shadow-lg border border-white/5 relative overflow-hidden">
            <div className="absolute -right-10 -top-10 size-40 rounded-full bg-primary/5 blur-3xl"></div>
            <div className="relative z-10 flex flex-col gap-1">
              <div className="flex justify-between items-center mb-1">
                <p className="text-secondary-text text-sm font-medium flex items-center gap-2">
                  Saldo Total
                  <span className="material-symbols-outlined text-secondary-text cursor-pointer hover:text-white transition-colors" style={{ fontSize: '16px' }}>visibility</span>
                </p>
                <span className="bg-primary/20 text-primary px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase">Conta Principal</span>
              </div>
              <h1 className="text-white text-3xl font-extrabold tracking-tight mb-6">
                {balance.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </h1>
              <div className="flex gap-3">
                <button 
                  onClick={onAdd}
                  className="flex-1 bg-primary hover:bg-[#0fd671] text-background-dark py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all active:scale-95 shadow-[0_0_15px_rgba(19,236,128,0.3)]"
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>add_circle</span>
                  <span className="text-sm font-bold">Adicionar</span>
                </button>
                <button 
                  onClick={onViewAll}
                  className="flex-1 bg-surface-dark border border-white/10 hover:bg-white/5 text-white py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all active:scale-95"
                >
                  <span className="material-symbols-outlined text-red-400" style={{ fontSize: '20px' }}>receipt_long</span>
                  <span className="text-sm font-bold">Extrato</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white text-lg font-bold">Resumo do Mês</h3>
            <button className="text-primary text-sm font-medium hover:underline">Ver relatório</button>
          </div>
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
            <div className="min-w-[260px] flex-1 bg-surface-dark rounded-xl p-4 border border-white/5 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div className="bg-red-500/10 p-2 rounded-lg">
                  <span className="material-symbols-outlined text-red-500 block" style={{ fontSize: '24px' }}>trending_down</span>
                </div>
                <span className="text-red-500 text-xs font-bold bg-red-500/10 px-2 py-1 rounded-full">+12%</span>
              </div>
              <p className="text-secondary-text text-xs font-medium uppercase tracking-wider mb-1">Gastos</p>
              <p className="text-white text-2xl font-bold">
                {totalExpense.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </p>
              <div className="h-12 w-full mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <Bar dataKey="val" radius={[2, 2, 0, 0]}>
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index === 3 ? '#13ec80' : 'rgba(19, 236, 128, 0.2)'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="min-w-[260px] flex-1 bg-surface-dark rounded-xl p-4 border border-white/5 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <span className="material-symbols-outlined text-primary block" style={{ fontSize: '24px' }}>trending_up</span>
                </div>
                <span className="text-primary text-xs font-bold bg-primary/10 px-2 py-1 rounded-full">+5%</span>
              </div>
              <p className="text-secondary-text text-xs font-medium uppercase tracking-wider mb-1">Entradas</p>
              <p className="text-white text-2xl font-bold">
                {totalIncome.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </p>
              <div className="h-12 w-full mt-4 flex items-center gap-3">
                <div className="relative size-10 rounded-full border-4 border-white/10" style={{ borderRightColor: '#13ec80', borderTopColor: '#13ec80', transform: 'rotate(45deg)' }}></div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-secondary-text">Meta de economia</span>
                  <span className="text-xs text-white font-bold">65% atingido</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="px-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-white text-lg font-bold">Últimas Transações</h3>
            <button onClick={onViewAll} className="text-primary text-sm font-medium hover:underline">Ver tudo</button>
          </div>
          <div className="flex flex-col gap-3 pb-4">
            {latestTransactions.map(t => (
              <div key={t.id} className="group flex items-center justify-between bg-surface-dark p-4 rounded-xl border border-transparent hover:border-primary/20 transition-all cursor-pointer shadow-sm">
                <div className="flex items-center gap-4">
                  <div className={`flex items-center justify-center rounded-full size-12 shrink-0 ${getCategoryColorClass(t.category)}`}>
                    <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>{getCategoryIcon(t.category)}</span>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-white text-base font-bold line-clamp-1">{t.description}</p>
                    <p className="text-secondary-text text-sm font-medium">{t.category}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-base font-bold ${t.type === 'income' ? 'text-primary' : 'text-white'}`}>
                    {t.type === 'income' ? '+' : '-'} {t.amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </p>
                  <p className="text-secondary-text text-xs">{t.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
