import React, { createContext, useContext, useEffect, useState } from 'react';

import * as api from '../services/api';

interface AuthContextData {
  signed: boolean;
  user: User;
  Login(user: object): Promise<void>;
  Logout(): void;
}

export interface User {
  name: string;
  email: string;
  password: string;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User>({} as User);

  useEffect(() => {
    const storagedUser = sessionStorage.getItem('@App:user');
    const storagedToken = sessionStorage.getItem('@App:token');

    if (storagedToken && storagedUser) {
      setUser(JSON.parse(storagedUser));
      api.defaults.headers.Authorization = `Bearer ${storagedToken}`;
    }
  }, []);

  async function Login(userData: User) {
    const { data } = await api.post('http://localhost:3000', userData);

    setUser({name: data.user.name, email: data.user.email, password: ''});
    api.defaults.headers.Authorization = `Bearer ${data.token}`

    sessionStorage.setItem('@App:user', JSON.stringify(data.user));
    sessionStorage.setItem('@App:token', data.token);
  }

  function Logout() {
    setUser({} as User);
    sessionStorage.clear();
  }

  return (
    <AuthContext.Provider 
      value={{ signed: Boolean(user.email), user, Login, Logout}}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(){
  const context = useContext(AuthContext);

  return context;
}