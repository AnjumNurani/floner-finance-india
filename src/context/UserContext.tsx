import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  subscriptionPlan: 'free' | 'pro' | 'ultra';
  connectedAccounts: number;
  profilePicture?: string;
  subscriptionExpiry?: string;
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
  applyPromo: (plan: 'pro' | 'ultra') => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [balance, setBalance] = useState(50000);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

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

  const applyPromo = (plan: 'pro' | 'ultra') => {
    if (user) {
      const expiryDate = new Date('2025-09-20');
      const updatedUser = {
        ...user,
        subscriptionPlan: plan,
        subscriptionExpiry: expiryDate.toISOString(),
      };
      setUser(updatedUser);
      localStorage.setItem('enro-user', JSON.stringify(updatedUser));
    }
  };

  useEffect(() => {
    // Check if user has seen onboarding
    const hasSeenOnboarding = localStorage.getItem('enro-onboarded');
    if (hasSeenOnboarding) {
      setIsOnboarded(true);
    }

    // Check if user is logged in
    const savedUser = localStorage.getItem('enro-user');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser) as User;
      
      // Check for subscription expiry
      if (parsedUser.subscriptionExpiry) {
        const expiryDate = new Date(parsedUser.subscriptionExpiry);
        if (new Date() > expiryDate) {
          parsedUser.subscriptionPlan = 'free';
          delete parsedUser.subscriptionExpiry;
          localStorage.setItem('enro-user', JSON.stringify(parsedUser));
        }
      }
      setUser(parsedUser);
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
      updateBalance,
      applyPromo,
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
