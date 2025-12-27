
import React from 'react';
import { Transaction } from '../types';
import { CATEGORIES } from '../constants';

interface BudgetsProps {
  transactions: Transaction[];
}

const Budgets: React.FC<BudgetsProps> = ({ transactions }) => {
  const currentMonth = "Outubro";
  
  // Calculate spent per category
  const spentPerCategory = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {} as Record<string, number>);

  // Mock limits
  const budgetItems = [
    { categoryId: 'food', limit: 1200, status: 'Atenção' },
    { categoryId: 'transport', limit: 400, status: 'OK' },
    { categoryId: 'home', limit: 1200, status: 'OK' },
    { categoryId: 'leisure', limit: 500, status: 'Estourado' },
  ];

  const totalLimit = budgetItems.reduce((s, b) => s + b.limit, 0);
  const totalSpent = budgetItems.reduce((s, b) => s + (spentPerCategory[b.categoryId] || 0), 0);
  const percentTotal = (totalSpent / totalLimit) * 100;

  return (
    <div className="flex-1 flex flex-col h-full bg-background-dark overflow-hidden">
      <header className="flex items-center justify-between px-6 pt-6 pb-2 sticky top-0 z-20 bg-background-dark">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight">Orçamentos</h2>
          <p className="text-sm text-secondary-text font-medium mt-1">Planejamento mensal</p>
        </div>
        <button className="flex items-center justify-center w-10 h-10 rounded-full bg-[#283930] text-white hover:bg-primary hover:text-black transition-colors">
          <span className="material-symbols-outlined">settings</span>
        </button>
      </header>

      <div className="w-full overflow-x-auto no-scrollbar py-4 pl-6">
        <div className="flex gap-3 pr-6 w-max">
          <button className="flex h-10 items-center justify-center px-6 rounded-full bg-primary shadow-[0_0_15px_rgba(19,236,128,0.3)]">
            <span className="text-background-dark text-sm font-bold">Outubro</span>
          </button>
          {['Novembro', 'Dezembro', 'Janeiro'].map(m => (
            <button key={m} className="flex h-10 items-center justify-center px-6 rounded-full bg-[#1E2D24] border border-transparent">
              <span className="text-[#9db9ab] text-sm font-medium">{m}</span>
            </button>
          ))}
        </div>
      </div>

      <main className="flex-1 flex flex-col px-4 gap-6 pb-32 overflow-y-auto no-scrollbar">
        <div className="relative flex flex-col items-stretch justify-start rounded-2xl shadow-xl bg-[#1c2721] overflow-hidden border border-white/5">
          <div className="absolute inset-0 z-0 bg-cover bg-center opacity-40 mix-blend-overlay" style={{ backgroundImage: 'url("https://picsum.photos/400/300?grayscale")' }}></div>
          <div className="relative z-10 p-6">
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="text-primary text-xs font-bold uppercase tracking-widest mb-1">Visão Geral</p>
                <p className="text-white text-3xl font-bold leading-tight">{(totalLimit - totalSpent).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                <p className="text-[#9db9ab] text-sm font-medium mt-1">Disponível para gastar</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-2 rounded-lg">
                <span className="material-symbols-outlined text-primary">pie_chart</span>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-white/10">
              <div className="flex items-end gap-3 justify-between mb-2">
                <p className="text-[#9db9ab] text-sm font-normal">Gasto Total: {totalSpent.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                <p className="text-white text-sm font-bold">{percentTotal.toFixed(0)}%</p>
              </div>
              <div className="w-full bg-black/40 rounded-full h-2 overflow-hidden">
                <div className="bg-primary h-full rounded-full" style={{ width: `${percentTotal}%` }}></div>
              </div>
              <div className="flex justify-between mt-2">
                <p className="text-xs text-[#9db9ab]">Limite: {totalLimit.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="px-2">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-white">Categorias</h3>
            <button className="text-primary text-sm font-bold">Ver todas</button>
          </div>
          <div className="flex flex-col gap-3">
            {budgetItems.map(item => {
              const cat = CATEGORIES.find(c => c.id === item.categoryId);
              const spent = spentPerCategory[item.categoryId] || 0;
              const percent = Math.min((spent / item.limit) * 100, 100);
              
              return (
                <div key={item.categoryId} className="group flex flex-col gap-3 bg-[#1c2721] p-4 rounded-2xl shadow-sm border border-white/5">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center rounded-xl bg-[#283930] shrink-0 w-12 h-12">
                      <span className="material-symbols-outlined text-white">{cat?.icon}</span>
                    </div>
                    <div className="flex flex-1 flex-col justify-center">
                      <div className="flex justify-between items-center">
                        <p className="text-white text-base font-bold">{cat?.name}</p>
                        <span className={`text-xs font-bold px-2 py-1 rounded-md ${item.status === 'Estourado' ? 'bg-red-500/20 text-red-300' : item.status === 'Atenção' ? 'bg-orange-500/20 text-orange-300' : 'bg-primary/20 text-primary'}`}>
                          {item.status}
                        </span>
                      </div>
                      <p className="text-[#9db9ab] text-xs mt-0.5">
                        {spent.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} de {item.limit.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-2 rounded-full bg-[#3b5447] overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${percent >= 100 ? 'bg-red-400' : percent >= 80 ? 'bg-orange-400' : 'bg-primary'}`} 
                        style={{ width: `${percent}%` }}
                      ></div>
                    </div>
                    <p className="text-white text-xs font-bold w-8 text-right">{((spent/item.limit)*100).toFixed(0)}%</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      <button className="fixed bottom-24 right-4 z-30 flex items-center justify-center w-14 h-14 rounded-full bg-primary shadow-lg shadow-primary/40 hover:scale-105 active:scale-95 transition-all text-background-dark">
        <span className="material-symbols-outlined" style={{ fontSize: '28px' }}>add</span>
      </button>
    </div>
  );
};

export default Budgets;
