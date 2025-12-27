
import React from 'react';

interface SettingsProps {
  onLogout: () => void;
  onBack: () => void;
}

const Settings: React.FC<SettingsProps> = ({ onLogout, onBack }) => {
  return (
    <div className="flex-1 flex flex-col h-full bg-background-dark overflow-hidden">
      <header className="flex items-center px-4 py-4 justify-between sticky top-0 z-20 bg-background-dark/95 backdrop-blur-md">
        <button onClick={onBack} className="flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-white/10 transition-colors">
          <span className="material-symbols-outlined text-white" style={{ fontSize: '24px' }}>arrow_back</span>
        </button>
        <h2 className="text-white text-lg font-bold leading-tight tracking-tight">Configurações</h2>
        <div className="size-10"></div>
      </header>

      <main className="flex-1 overflow-y-auto pb-32 px-4 scroll-smooth no-scrollbar">
        <div className="flex flex-col items-center py-6">
          <div className="relative mb-4">
            <div className="size-24 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center">
               <span className="material-symbols-outlined text-primary text-5xl">person</span>
            </div>
            <button className="absolute bottom-0 right-0 bg-primary text-background-dark rounded-full p-1.5 border-2 border-background-dark flex items-center justify-center shadow-lg">
              <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>edit</span>
            </button>
          </div>
          <h3 className="text-xl font-bold text-white">Alexandre Souza</h3>
          <p className="text-slate-400 text-sm mb-3">alexandre.souza@email.com</p>
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
            <span className="material-symbols-outlined text-primary mr-1.5" style={{ fontSize: '16px' }}>star</span>
            <span className="text-primary text-xs font-bold uppercase tracking-wider">Plano Pro</span>
          </div>
        </div>

        <div className="mb-6">
          <h4 className="text-slate-500 text-xs font-bold uppercase tracking-wider px-2 mb-2">Geral</h4>
          <div className="bg-surface-dark rounded-2xl overflow-hidden border border-white/5">
            <button className="w-full flex items-center gap-4 p-4 hover:bg-white/5 transition-colors">
              <div className="flex items-center justify-center rounded-xl bg-blue-500/10 shrink-0 size-10 text-blue-400">
                <span className="material-symbols-outlined">currency_exchange</span>
              </div>
              <div className="flex flex-col items-start flex-1">
                <span className="text-white text-base font-medium">Moeda Principal</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-400 text-sm">BRL (R$)</span>
                <span className="material-symbols-outlined text-slate-600" style={{ fontSize: '20px' }}>chevron_right</span>
              </div>
            </button>
            <div className="h-px bg-white/5 mx-4"></div>
            <button className="w-full flex items-center gap-4 p-4 hover:bg-white/5 transition-colors">
              <div className="flex items-center justify-center rounded-xl bg-purple-500/10 shrink-0 size-10 text-purple-400">
                <span className="material-symbols-outlined">category</span>
              </div>
              <div className="flex flex-col items-start flex-1">
                <span className="text-white text-base font-medium">Categorias</span>
              </div>
              <span className="material-symbols-outlined text-slate-600" style={{ fontSize: '20px' }}>chevron_right</span>
            </button>
            <div className="h-px bg-white/5 mx-4"></div>
            <button className="w-full flex items-center gap-4 p-4 hover:bg-white/5 transition-colors">
              <div className="flex items-center justify-center rounded-xl bg-amber-500/10 shrink-0 size-10 text-amber-400">
                <span className="material-symbols-outlined">dark_mode</span>
              </div>
              <div className="flex flex-col items-start flex-1">
                <span className="text-white text-base font-medium">Aparência</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-400 text-sm">Escuro</span>
                <span className="material-symbols-outlined text-slate-600" style={{ fontSize: '20px' }}>chevron_right</span>
              </div>
            </button>
          </div>
        </div>

        <div className="mb-6">
          <h4 className="text-slate-500 text-xs font-bold uppercase tracking-wider px-2 mb-2">Notificações</h4>
          <div className="bg-surface-dark rounded-2xl overflow-hidden border border-white/5">
            <div className="w-full flex items-center gap-4 p-4 justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center rounded-xl bg-red-500/10 shrink-0 size-10 text-red-400">
                  <span className="material-symbols-outlined">notifications_active</span>
                </div>
                <span className="text-white text-base font-medium">Alertas de gastos</span>
              </div>
              <div className="relative inline-block w-12 h-6 rounded-full bg-primary transition-all">
                <div className="absolute right-1 top-1 size-4 bg-white rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 mt-4 mb-8">
          <button className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-surface-dark border border-white/5 text-white font-semibold hover:bg-white/5 transition-colors">
            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>help</span>
            Ajuda e Suporte
          </button>
          <button 
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-red-500/10 text-red-400 font-semibold hover:bg-red-500/20 transition-colors"
          >
            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>logout</span>
            Sair da conta
          </button>
          <p className="text-center text-xs text-slate-600 mt-4">Versão 2.4.0 (Build 182)</p>
        </div>
      </main>
    </div>
  );
};

export default Settings;
