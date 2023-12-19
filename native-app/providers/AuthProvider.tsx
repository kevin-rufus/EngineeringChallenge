// AuthContext.tsx
import React, { createContext, useState, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AUTH_TOKEN } from '../constants';

interface AuthContextProps {
  children: ReactNode;
}

interface Auth {
  isLoggedIn: boolean;
  token: string;
  loading?: boolean;
}

interface AuthContextValue {
  auth: Auth;
  setAuth: React.Dispatch<React.SetStateAction<Auth>>;
}

const initialAuthentication = {
  isLoggedIn: false,
  token: '',
  loading: false,
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const AuthProvider: React.FC<AuthContextProps> = ({ children }) => {
  const [auth, setAuth] = useState<Auth>(initialAuthentication);
  
  const fetchToken = async () => {
    setAuth({...auth, loading: true})
    const token = await AsyncStorage.getItem(AUTH_TOKEN);
    if (token) {
      setAuth({
        token: token,
        isLoggedIn: true,
        loading: false
      });
    } else {
      setAuth({
        token: '',
        isLoggedIn: true,
        loading: false
      });
    }
  }
  
  useEffect(() => {
    fetchToken()
  }, [])

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
