
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  subscriptionPlan: 'free' | 'pro' | 'ultra';
  connectedAccounts: number;
  profilePicture?: string;
}

interface Transaction {
  id: string;
  amount: number;
  description: string;
  category: string;
  type: 'income' | 'expense';
  date: string;
  account: string;
}

interface UserContextType {
  user: User | null;
  isOnboarded: boolean;
  balance: number;
  transactions: Transaction[];
  monthlyIncome: number;
  monthlyExpense: number;
  setUser: (user: User | null) => void;
  setIsOnboarded: (value: boolean) => void;
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  updateBalance: (amount: number) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [balance, setBalance] = useState(50000);
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: '1',
      amount: 5000,
      description: 'Salary Credit',
      category: 'Salary',
      type: 'income',
      date: '2024-06-01',
      account: 'SBI Main'
    },
    {
      id: '2',
      amount: 1200,
      description: 'Grocery Shopping',
      category: 'Food',
      type: 'expense',
      date: '2024-06-02',
      account: 'SBI Main'
    },
    {
      id: '3',
      amount: 800,
      description: 'Electricity Bill',
      category: 'Utilities',
      type: 'expense',
      date: '2024-06-02',
      account: 'SBI Main'
    }
  ]);

  const monthlyIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const monthlyExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction = {
      ...transaction,
      id: Date.now().toString()
    };
    setTransactions(prev => [newTransaction, ...prev]);
  };

  const updateBalance = (amount: number) => {
    setBalance(prev => prev + amount);
  };

  useEffect(() => {
    // Check if user has seen onboarding
    const hasSeenOnboarding = localStorage.getItem('floner-onboarded');
    if (hasSeenOnboarding) {
      setIsOnboarded(true);
    }

    // Check if user is logged in
    const savedUser = localStorage.getItem('floner-user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  return (
    <UserContext.Provider value={{
      user,
      isOnboarded,
      balance,
      transactions,
      monthlyIncome,
      monthlyExpense,
      setUser,
      setIsOnboarded,
      addTransaction,
      updateBalance
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
