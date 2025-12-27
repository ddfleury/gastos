
import React, { useMemo, useState } from 'react';
import { Transaction } from '../types';
import { CATEGORIES } from '../constants';
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, Tooltip } from 'recharts';
import { GoogleGenAI } from "@google/genai";

interface AnalysisProps {
  transactions: Transaction[];
}

const Analysis: React.FC<AnalysisProps> = ({ transactions }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiInsight, setAiInsight] = useState<string | null>(null);

  const expenseByCategory = useMemo(() => {
    const data: Record<string, number> = {};
    transactions.filter(t => t.type === 'expense').forEach(t => {
      data[t.category] = (data[t.category] || 0) + t.amount;
    });
    return CATEGORIES.map(c => ({
      name: c.name,
      value: data[c.id] || 0,
      color: c.color,
      id: c.id,
      icon: c.icon
    })).filter(d => d.value > 0);
  }, [transactions]);

  const totalExpense = useMemo(() => expenseByCategory.reduce((s, d) => s + d.value, 0), [expenseByCategory]);

  const generateAIInsight = async () => {
    setIsAnalyzing(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const transactionSummary = transactions.slice(0, 10).map(t => `${t.description}: R$${t.amount} (${t.type})`).join(', ');
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Analise estas transações financeiras e dê 2 dicas curtas e acionáveis em português brasileiro: ${transactionSummary}`,
      });

      setAiInsight(response.text || "Continue monitorando seus gastos para manter a saúde financeira!");
    } catch (error) {
      console.error("AI Error:", error);
      setAiInsight("Não consegui analisar seus dados agora. Tente novamente mais tarde.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-background-dark overflow-hidden">
      <header className="flex items-center justify-between px-6 pt-12 pb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Análises</h1>
          <p className="text-sm font-medium text-slate-400">Outubro 2023</p>
        </div>
        <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-primary/20 transition-colors">
          <span className="material-symbols-outlined text-white">download</span>
        </button>
      </header>

      <main className="flex-1 overflow-y-auto pb-32 no-scrollbar px-6">
        {/* IA Insight Section */}
        <div className="mb-6">
          <div className="bg-gradient-to-r from-primary/20 to-blue-500/10 rounded-2xl p-5 border border-primary/30 relative overflow-hidden">
            <div className="flex items-start gap-3 relative z-10">
              <div className="bg-primary text-black p-2 rounded-lg">
                <span className="material-symbols-outlined filled">bolt</span>
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-bold text-white mb-1">Dicas da IA</h3>
                {aiInsight ? (
                  <p className="text-xs text-slate-300 leading-relaxed italic animate-in fade-in duration-700">"{aiInsight}"</p>
                ) : (
                  <p className="text-xs text-slate-400">Deixe que a inteligência artificial analise seu perfil de gastos.</p>
                )}
                {!aiInsight && (
                  <button 
                    onClick={generateAIInsight}
                    disabled={isAnalyzing}
                    className="mt-3 text-xs font-bold text-primary flex items-center gap-1 hover:underline disabled:opacity-50"
                  >
                    {isAnalyzing ? "Analisando..." : "Gerar Insights Agora"}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <div className="rounded-2xl bg-card-dark p-6 shadow-sm border border-white/5">
            <h2 className="text-lg font-bold text-white mb-6">Gastos por Categoria</h2>
            <div className="flex items-center justify-center h-48 relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={expenseByCategory} cx="50%" cy="50%" innerRadius={60} outerRadius={85} paddingAngle={5} dataKey="value">
                    {expenseByCategory.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute flex flex-col items-center">
                <span className="text-xs text-slate-400">Total</span>
                <span className="text-lg font-bold text-white">R$ {(totalExpense/1000).toFixed(1)}k</span>
              </div>
            </div>

            <div className="flex flex-col gap-4 mt-6">
              {expenseByCategory.map((cat, idx) => (
                <div key={idx} className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5" style={{ color: cat.color }}>
                        <span className="material-symbols-outlined">{cat.icon}</span>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white">{cat.name}</p>
                        <p className="text-xs text-slate-400">{((cat.value / totalExpense) * 100).toFixed(0)}% do total</p>
                      </div>
                    </div>
                    <p className="text-sm font-bold text-white">- R$ {cat.value.toFixed(0)}</p>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-white/5">
                    <div className="h-full rounded-full transition-all duration-1000" style={{ backgroundColor: cat.color, width: `${(cat.value / totalExpense) * 100}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Analysis;
