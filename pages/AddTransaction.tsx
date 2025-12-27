
import React, { useState } from 'react';
import { Transaction, TransactionType } from '../types';
import { CATEGORIES } from '../constants';

interface AddTransactionProps {
  onSave: (transaction: Transaction) => void;
  onCancel: () => void;
}

const AddTransaction: React.FC<AddTransactionProps> = ({ onSave, onCancel }) => {
  const [type, setType] = useState<TransactionType>('expense');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0].id);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSave = () => {
    if (!amount || !description) return;
    
    const newTransaction: Transaction = {
      id: Math.random().toString(36).substr(2, 9),
      description,
      amount: parseFloat(amount.replace(',', '.')),
      type,
      category,
      date,
      time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    };
    
    onSave(newTransaction);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-background-dark overflow-x-hidden">
      <header className="flex items-center justify-between px-4 pt-6 pb-2 sticky top-0 z-10 bg-background-dark">
        <button onClick={onCancel} className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-white/10 transition-colors">
          <span className="material-symbols-outlined text-slate-400">close</span>
        </button>
        <h2 className="text-base font-bold">Nova Transação</h2>
        <button onClick={handleSave} className="text-primary font-bold text-base px-2 py-1 rounded-lg hover:bg-primary/10 transition-colors">
          Salvar
        </button>
      </header>

      <div className="px-4 py-4">
        <div className="flex h-12 w-full items-center justify-center rounded-xl bg-surface-dark p-1">
          <button 
            onClick={() => setType('expense')}
            className={`flex-1 h-full rounded-lg text-sm font-bold transition-all ${type === 'expense' ? 'bg-[#2C4A3E] text-primary shadow-sm' : 'text-slate-400'}`}
          >
            Despesa
          </button>
          <button 
            onClick={() => setType('income')}
            className={`flex-1 h-full rounded-lg text-sm font-bold transition-all ${type === 'income' ? 'bg-[#2C4A3E] text-primary shadow-sm' : 'text-slate-400'}`}
          >
            Receita
          </button>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center py-6 px-4">
        <span className="text-slate-500 text-sm font-medium mb-2">Valor da transação</span>
        <div className="relative flex items-center justify-center">
          <span className="text-slate-500 text-4xl font-bold mr-2 pb-2">R$</span>
          <input 
            autoFocus 
            className="w-full bg-transparent text-center text-5xl font-bold text-white placeholder:text-slate-600 focus:ring-0 border-none p-0 caret-primary" 
            placeholder="0,00" 
            type="text" 
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
      </div>

      <div className="flex-1 px-4 pb-32">
        <div className="flex flex-col gap-5">
          <div className="bg-surface-dark rounded-2xl p-4 shadow-sm border border-white/5">
            <label className="flex flex-col w-full group">
              <span className="text-xs uppercase font-bold text-slate-500 tracking-wider mb-2 group-focus-within:text-primary transition-colors">Descrição</span>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-slate-500">edit_note</span>
                <input 
                  className="w-full bg-transparent border-none text-white text-lg font-medium placeholder:text-slate-600 focus:ring-0 p-0" 
                  placeholder="Ex: Supermercado" 
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </label>
          </div>

          <div className="bg-surface-dark rounded-2xl p-4 shadow-sm border border-white/5">
            <span className="text-xs uppercase font-bold text-slate-500 tracking-wider mb-3 block">Categoria</span>
            <div className="flex overflow-x-auto gap-3 pb-2 no-scrollbar -mx-1 px-1">
              {CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setCategory(cat.id)}
                  className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all min-w-[80px] ${category === cat.id ? 'bg-primary/20 border-primary/50' : 'bg-white/5 border-transparent'}`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${category === cat.id ? 'bg-primary text-black' : 'bg-white/10 text-slate-300'}`}>
                    <span className="material-symbols-outlined text-xl">{cat.icon}</span>
                  </div>
                  <span className={`text-xs font-medium ${category === cat.id ? 'text-primary' : 'text-slate-300'}`}>{cat.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-surface-dark rounded-2xl p-4 shadow-sm border border-white/5">
              <label className="flex flex-col w-full group">
                <span className="text-xs uppercase font-bold text-slate-500 tracking-wider mb-2">Data</span>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-slate-500">calendar_today</span>
                  <input 
                    className="bg-transparent border-none text-white text-sm font-medium focus:ring-0 p-0 w-full" 
                    type="date" 
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
              </label>
            </div>
            <div className="bg-surface-dark rounded-2xl p-4 shadow-sm border border-white/5 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-xs uppercase font-bold text-slate-500 tracking-wider mb-1">Repetir</span>
                <span className="text-xs font-medium text-slate-400">Mensalmente</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input className="sr-only peer" type="checkbox" />
                <div className="w-11 h-6 bg-slate-700 rounded-full peer peer-checked:bg-primary after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background-dark via-background-dark to-transparent flex justify-center pb-8 pointer-events-none">
        <button 
          onClick={handleSave}
          className="w-full max-w-md bg-primary hover:bg-[#0fd671] text-background-dark text-lg font-bold py-4 rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2 pointer-events-auto"
        >
          <span className="material-symbols-outlined">check_circle</span>
          Salvar Transação
        </button>
      </div>
    </div>
  );
};

export default AddTransaction;
