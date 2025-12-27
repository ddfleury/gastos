
import React from 'react';
import { ViewState } from '../types';

interface BottomNavProps {
  activeView: ViewState;
  setView: (view: ViewState) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeView, setView }) => {
  return (
    <nav className="fixed bottom-0 w-full max-w-md bg-white/90 dark:bg-[#15231b]/95 backdrop-blur-md border-t border-gray-200 dark:border-white/5 pb-6 pt-3 px-6 flex justify-between items-center z-50">
      <button 
        onClick={() => setView('dashboard')}
        className={`flex flex-col items-center gap-1 transition-all ${activeView === 'dashboard' ? 'text-primary' : 'text-secondary-text hover:text-white'}`}
      >
        <span className={`material-symbols-outlined ${activeView === 'dashboard' ? 'filled' : ''}`}>home</span>
        <span className="text-[10px] font-bold">Início</span>
      </button>
      
      <button 
        onClick={() => setView('analysis')}
        className={`flex flex-col items-center gap-1 transition-all ${activeView === 'analysis' ? 'text-primary' : 'text-secondary-text hover:text-white'}`}
      >
        <span className={`material-symbols-outlined ${activeView === 'analysis' ? 'filled' : ''}`}>pie_chart</span>
        <span className="text-[10px] font-medium">Análise</span>
      </button>

      <button 
        onClick={() => setView('qr-scanner')}
        className="flex items-center justify-center -mt-10 size-14 rounded-full bg-primary shadow-[0_4px_20px_rgba(19,236,128,0.4)] text-background-dark hover:scale-105 transition-transform active:scale-95"
      >
        <span className="material-symbols-outlined font-bold" style={{ fontSize: '28px' }}>qr_code_scanner</span>
      </button>

      <button 
        onClick={() => setView('budgets')}
        className={`flex flex-col items-center gap-1 transition-all ${activeView === 'budgets' ? 'text-primary' : 'text-secondary-text hover:text-white'}`}
      >
        <span className={`material-symbols-outlined ${activeView === 'budgets' ? 'filled' : ''}`}>account_balance_wallet</span>
        <span className="text-[10px] font-medium">Planos</span>
      </button>

      <button 
        onClick={() => setView('settings')}
        className={`flex flex-col items-center gap-1 transition-all ${activeView === 'settings' ? 'text-primary' : 'text-secondary-text hover:text-white'}`}
      >
        <span className={`material-symbols-outlined ${activeView === 'settings' ? 'filled' : ''}`}>settings</span>
        <span className="text-[10px] font-medium">Ajustes</span>
      </button>
    </nav>
  );
};

export default BottomNav;
