import React from 'react'
import { createContext, useState, useEffect } from 'react'
import { ReactNode } from 'react';

interface AuthContextType {
    user: any;
    loading: boolean;
  }
  
  export const AuthContext = createContext<AuthContextType>({ user: null, loading: true });
  
  interface AuthProviderProps {
    children: ReactNode;
  }
  
  export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
        setLoading(false)
    }, []);
  
    const contextData = {
      user,
      loading,
    };
  
    return (
      <AuthContext.Provider value={contextData}>
        {!loading && children}
      </AuthContext.Provider>
    );
  };

export const useAuth = () => {return React.useContext(AuthContext)};

export default AuthContext