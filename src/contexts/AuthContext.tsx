import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  login: (email: string, password: string) => boolean;
  signup: (name: string, email: string, password: string) => boolean;
  adminLogin: (password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check for stored user on app load
    const storedUser = localStorage.getItem('mindconnect_user');
    const storedIsAdmin = localStorage.getItem('mindconnect_admin');
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    if (storedIsAdmin === 'true') {
      setIsAdmin(true);
    }
  }, []);

  const login = (email: string, password: string): boolean => {
    // Simple mock login - check if user exists in localStorage
    const users = JSON.parse(localStorage.getItem('mindconnect_users') || '[]');
    const foundUser = users.find((u: any) => u.email === email && u.password === password);
    
    if (foundUser) {
      const userObj = { id: foundUser.id, name: foundUser.name, email: foundUser.email };
      setUser(userObj);
      localStorage.setItem('mindconnect_user', JSON.stringify(userObj));
      return true;
    }
    return false;
  };

  const signup = (name: string, email: string, password: string): boolean => {
    const users = JSON.parse(localStorage.getItem('mindconnect_users') || '[]');
    
    // Check if user already exists
    if (users.find((u: any) => u.email === email)) {
      return false;
    }

    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password,
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    localStorage.setItem('mindconnect_users', JSON.stringify(users));

    const userObj = { id: newUser.id, name: newUser.name, email: newUser.email };
    setUser(userObj);
    localStorage.setItem('mindconnect_user', JSON.stringify(userObj));
    return true;
  };

  const adminLogin = (password: string): boolean => {
    // Simple admin password check
    if (password === 'admin123') {
      setIsAdmin(true);
      localStorage.setItem('mindconnect_admin', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setIsAdmin(false);
    localStorage.removeItem('mindconnect_user');
    localStorage.removeItem('mindconnect_admin');
  };

  return (
    <AuthContext.Provider value={{ user, isAdmin, login, signup, adminLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};