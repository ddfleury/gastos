
import React from 'react';

interface OnboardingProps {
  onStart: () => void;
  onLogin: () => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onStart, onLogin }) => {
  return (
    <div className="flex-1 flex flex-col relative overflow-hidden h-full">
      <div className="absolute top-[-10%] left-[-20%] w-[80%] h-[40%] bg-primary/20 blur-[100px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-20%] w-[60%] h-[40%] bg-primary/10 blur-[100px] rounded-full pointer-events-none"></div>
      
      <main className="flex-1 flex flex-col relative z-10 h-full">
        <div className="flex-none pt-16 px-8 flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="material-symbols-outlined text-background-dark text-xl filled">account_balance_wallet</span>
          </div>
          <span className="font-bold text-lg tracking-tight">FinControl</span>
        </div>

        <div className="flex-1 flex flex-col justify-center items-center px-6 pb-4">
          <div className="relative w-full aspect-square max-w-sm mx-auto mb-8 rounded-2xl overflow-hidden shadow-2xl shadow-primary/10 border border-white/5 bg-gradient-to-b from-white/5 to-transparent">
            <img 
              alt="Financial Analysis Chart" 
              className="w-full h-full object-cover opacity-90 mix-blend-overlay" 
              src="https://picsum.photos/800/800?grayscale" 
            />
            <div className="absolute bottom-6 left-6 right-6 p-4 bg-background-dark/80 backdrop-blur-md border border-white/10 rounded-xl shadow-lg transform translate-y-2">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-gray-400 font-medium">Economia Total</span>
                <span className="text-[10px] bg-primary/20 text-primary px-2 py-0.5 rounded-full font-bold">+24%</span>
              </div>
              <div className="text-2xl font-bold text-white mb-1">R$ 12.450,00</div>
              <div className="h-1.5 w-full bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full w-3/4 bg-primary rounded-full"></div>
              </div>
            </div>
          </div>

          <div className="text-center space-y-4 max-w-xs mx-auto">
            <h1 className="text-3xl font-extrabold leading-tight tracking-tight">
              Domine suas <span className="text-primary">finanças</span> com inteligência.
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-base leading-relaxed">
              Acompanhe gastos, crie metas e veja seu patrimônio crescer em tempo real.
            </p>
          </div>

          <div className="flex justify-center gap-2 mt-8">
            <div className="w-8 h-2 rounded-full bg-primary"></div>
            <div className="w-2 h-2 rounded-full bg-gray-700"></div>
            <div className="w-2 h-2 rounded-full bg-gray-700"></div>
          </div>
        </div>

        <div className="flex-none px-6 pb-10 pt-4 space-y-4">
          <button 
            onClick={onStart}
            className="w-full py-4 bg-primary hover:bg-opacity-90 active:scale-[0.98] transition-all rounded-xl shadow-lg shadow-primary/25 flex items-center justify-center gap-2 group"
          >
            <span className="text-background-dark font-bold text-lg">Criar Conta Grátis</span>
            <span className="material-symbols-outlined text-background-dark text-xl group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </button>
          
          <button 
            onClick={onLogin}
            className="w-full py-4 bg-transparent border border-gray-700 hover:bg-white/5 active:scale-[0.98] transition-all rounded-xl text-white font-semibold text-lg"
          >
            Já tenho uma conta
          </button>
        </div>
      </main>
    </div>
  );
};

export default Onboarding;
