
import React from 'react';

interface LoginProps {
  onLogin: () => void;
  onBack: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, onBack }) => {
  return (
    <div className="flex-1 flex flex-col h-full bg-background-dark relative overflow-hidden">
      <div className="flex items-center p-4 pb-2 justify-between z-10">
        <button 
          onClick={onBack}
          className="text-white flex size-12 shrink-0 items-center justify-center rounded-full hover:bg-white/10 transition-colors"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <div className="flex items-center gap-2 pr-12 flex-1 justify-center">
          <div className="size-6 bg-primary rounded-full flex items-center justify-center text-background-dark font-bold text-xs">
            <span className="material-symbols-outlined text-[16px] filled">monetization_on</span>
          </div>
          <h2 className="text-white text-lg font-bold leading-tight tracking-tight">FinControl</h2>
        </div>
      </div>

      <div className="flex-1 flex flex-col px-6 pt-4 pb-8 overflow-y-auto no-scrollbar">
        <div className="flex flex-col items-center justify-center text-center space-y-2 mb-8">
          <h1 className="text-white tracking-tight text-[32px] font-bold leading-tight">Bem-vindo</h1>
          <p className="text-slate-400 text-base font-normal leading-normal">Gerencie sua riqueza com segurança.</p>
        </div>

        <div className="mb-8">
          <div className="flex h-12 w-full items-center justify-center rounded-xl bg-[#1c2e25] p-1">
            <button className="flex-1 h-full rounded-lg text-sm font-bold bg-[#2c4035] text-primary shadow-sm">Log In</button>
            <button className="flex-1 h-full rounded-lg text-sm font-bold text-[#9db9ab]">Sign Up</button>
          </div>
        </div>

        <form className="flex flex-col gap-5 w-full">
          <div className="flex flex-col gap-1.5">
            <label className="text-white text-sm font-semibold leading-normal">Email</label>
            <div className="relative flex items-center">
              <span className="absolute left-4 text-slate-400 material-symbols-outlined text-[20px]">mail</span>
              <input 
                className="form-input flex w-full rounded-xl text-white focus:ring-2 focus:ring-primary/50 border border-[#3b5447] bg-[#1c2721] focus:border-primary h-14 pl-11 pr-4 text-base transition-all" 
                placeholder="nome@exemplo.com" 
                type="email" 
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center">
              <label className="text-white text-sm font-semibold leading-normal">Senha</label>
              <a className="text-sm font-medium text-primary hover:underline" href="#">Esqueceu?</a>
            </div>
            <div className="relative flex items-center">
              <span className="absolute left-4 text-slate-400 material-symbols-outlined text-[20px]">lock</span>
              <input 
                className="form-input flex w-full rounded-xl text-white focus:ring-2 focus:ring-primary/50 border border-[#3b5447] bg-[#1c2721] focus:border-primary h-14 pl-11 pr-12 text-base transition-all" 
                placeholder="Sua senha" 
                type="password" 
              />
              <button className="absolute right-4 text-slate-400 hover:text-white transition-colors flex items-center" type="button">
                <span className="material-symbols-outlined text-[20px]">visibility_off</span>
              </button>
            </div>
          </div>

          <button 
            onClick={(e) => { e.preventDefault(); onLogin(); }}
            className="mt-4 flex w-full items-center justify-center rounded-xl bg-primary px-4 h-14 text-background-dark text-base font-bold leading-normal hover:brightness-110 active:scale-[0.98] transition-all duration-200 shadow-[0_0_15px_rgba(19,236,128,0.3)]" 
            type="button"
          >
            Log In
          </button>
        </form>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-background-dark px-4 text-slate-400 font-medium">Ou continue com</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button className="flex items-center justify-center gap-2 h-12 rounded-xl border border-white/10 bg-[#1c2721] hover:bg-[#25332c] transition-colors active:scale-[0.98]">
            <span className="material-symbols-outlined text-white text-[24px]">shopping_bag</span>
            <span className="text-sm font-semibold text-white">Apple</span>
          </button>
          <button className="flex items-center justify-center gap-2 h-12 rounded-xl border border-white/10 bg-[#1c2721] hover:bg-[#25332c] transition-colors active:scale-[0.98]">
            <span className="material-symbols-outlined text-white text-[24px]">language</span>
            <span className="text-sm font-semibold text-white">Google</span>
          </button>
        </div>
      </div>
      
      <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl"></div>
    </div>
  );
};

export default Login;
