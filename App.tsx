
import React, { useState, useEffect } from 'react';
import { ViewState, Transaction } from './types';
import { INITIAL_TRANSACTIONS } from './constants';
import Onboarding from './pages/Onboarding';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Analysis from './pages/Analysis';
import TransactionsList from './pages/TransactionsList';
import Budgets from './pages/Budgets';
import Settings from './pages/Settings';
import AddTransaction from './pages/AddTransaction';
import QRScanner from './pages/QRScanner';
import BottomNav from './components/BottomNav';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('onboarding');
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [balance, setBalance] = useState(15250.00);

  useEffect(() => {
    const saved = localStorage.getItem('fincontrol_transactions');
    if (saved) {
      setTransactions(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('fincontrol_transactions', JSON.stringify(transactions));
    const totalIncome = transactions.filter(t => t.type === 'income').reduce((acc, curr) => acc + curr.amount, 0);
    const totalExpense = transactions.filter(t => t.type === 'expense').reduce((acc, curr) => acc + curr.amount, 0);
    setBalance(10000 + totalIncome - totalExpense);
  }, [transactions]);

  const handleAddTransaction = (newTransaction: Transaction) => {
    setTransactions([newTransaction, ...transactions]);
    setView('dashboard');
  };

  const renderView = () => {
    switch (view) {
      case 'onboarding':
        return <Onboarding onStart={() => setView('login')} onLogin={() => setView('login')} />;
      case 'login':
        return <Login onLogin={() => setView('dashboard')} onBack={() => setView('onboarding')} />;
      case 'dashboard':
        return <Dashboard balance={balance} transactions={transactions} onAdd={() => setView('add-transaction')} onViewAll={() => setView('transactions')} />;
      case 'analysis':
        return <Analysis transactions={transactions} />;
      case 'transactions':
        return <TransactionsList transactions={transactions} balance={balance} onBack={() => setView('dashboard')} />;
      case 'budgets':
        return <Budgets transactions={transactions} />;
      case 'settings':
        return <Settings onLogout={() => setView('onboarding')} onBack={() => setView('dashboard')} />;
      case 'add-transaction':
        return <AddTransaction onSave={handleAddTransaction} onCancel={() => setView('dashboard')} />;
      case 'qr-scanner':
        return <QRScanner onBack={() => setView('dashboard')} onScan={(data) => {
          console.log("Scanned:", data);
          setView('dashboard');
        }} />;
      default:
        return <Dashboard balance={balance} transactions={transactions} onAdd={() => setView('add-transaction')} onViewAll={() => setView('transactions')} />;
    }
  };

  const showNav = !['onboarding', 'login', 'add-transaction', 'qr-scanner'].includes(view);

  return (
    <div className="max-w-md mx-auto min-h-screen bg-background-light dark:bg-background-dark relative shadow-2xl overflow-hidden flex flex-col transition-colors duration-500">
      <div className="flex-1 flex flex-col overflow-hidden">
        {renderView()}
      </div>
      {showNav && <BottomNav activeView={view} setView={setView} />}
    </div>
  );
};

export default App;
