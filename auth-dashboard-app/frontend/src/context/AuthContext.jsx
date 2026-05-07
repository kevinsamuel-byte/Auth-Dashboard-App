import { createContext, useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    try {
      const storedToken = localStorage.getItem("token");

      if (storedToken) {
        setToken(storedToken);
        axiosInstance.defaults.headers.Authorization = `Bearer ${storedToken}`;
      }
    } catch (error) {
      console.log("Error reading token");
    }

    
    setIsReady(true);
  }, []);

  const login = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
    axiosInstance.defaults.headers.Authorization = `Bearer ${newToken}`;
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    delete axiosInstance.defaults.headers.Authorization;
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, isReady }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;