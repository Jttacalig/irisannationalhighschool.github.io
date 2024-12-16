import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  lastLogin: string | null;
  loginAttempts: number;
  resetLoginAttempts: () => void;
  isLocked: boolean;
  lockoutTimeRemaining: number | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [lastLogin, setLastLogin] = useState<string | null>(null);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [lockoutTimeRemaining, setLockoutTimeRemaining] = useState<number | null>(null);

  useEffect(() => {
    const authStatus = localStorage.getItem('isAdminAuthorized') === 'true';
    const lastLoginTime = localStorage.getItem('lastLoginTime');
    const storedAttempts = localStorage.getItem('loginAttempts');
    const lockoutEnd = localStorage.getItem('lockoutEnd');

    setIsAuthenticated(authStatus);
    setLastLogin(lastLoginTime);
    setLoginAttempts(storedAttempts ? parseInt(storedAttempts) : 0);

    if (lockoutEnd) {
      const remainingTime = new Date(lockoutEnd).getTime() - new Date().getTime();
      if (remainingTime > 0) {
        setIsLocked(true);
        setLockoutTimeRemaining(Math.ceil(remainingTime / 1000));
        startLockoutTimer(remainingTime);
      } else {
        localStorage.removeItem('lockoutEnd');
        setIsLocked(false);
        setLockoutTimeRemaining(null);
      }
    }
  }, []);

  const startLockoutTimer = (duration: number) => {
    const timer = setInterval(() => {
      setLockoutTimeRemaining(prev => {
        if (prev === null || prev <= 1) {
          clearInterval(timer);
          setIsLocked(false);
          localStorage.removeItem('lockoutEnd');
          return null;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleLockout = () => {
    setIsLocked(true);
    const lockoutDuration = 20 * 1000; // 20 seconds in milliseconds
    const lockoutEnd = new Date(Date.now() + lockoutDuration).toISOString();
    localStorage.setItem('lockoutEnd', lockoutEnd);
    setLockoutTimeRemaining(20); // 20 seconds
    startLockoutTimer(lockoutDuration);
  };

  const login = async (username: string, password: string): Promise<boolean> => {
    if (isLocked) {
      return false;
    }

    // In a real application, this would make an API call to verify credentials
    if (username === 'admin' && password === 'admin123') {
      setIsAuthenticated(true);
      localStorage.setItem('isAdminAuthorized', 'true');
      const currentTime = new Date().toISOString();
      localStorage.setItem('lastLoginTime', currentTime);
      setLastLogin(currentTime);
      setLoginAttempts(0);
      localStorage.setItem('loginAttempts', '0');
      window.dispatchEvent(new Event('adminAuthChanged'));
      return true;
    }

    const newAttempts = loginAttempts + 1;
    setLoginAttempts(newAttempts);
    localStorage.setItem('loginAttempts', newAttempts.toString());

    if (newAttempts >= 5) {
      handleLockout();
    }

    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.setItem('isAdminAuthorized', 'false');
    window.dispatchEvent(new Event('adminAuthChanged'));
  };

  const resetLoginAttempts = () => {
    setLoginAttempts(0);
    localStorage.setItem('loginAttempts', '0');
    setIsLocked(false);
    localStorage.removeItem('lockoutEnd');
    setLockoutTimeRemaining(null);
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      login, 
      logout, 
      lastLogin,
      loginAttempts,
      resetLoginAttempts,
      isLocked,
      lockoutTimeRemaining
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
