import { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Parse the JSON string
    }
    setLoading(false);
  }, []);

  const signIn = () => {
    const userData = { name: "Hamnas", email: "hamnas@gmail.com" };
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const value = {
    user,
    signIn,
    signOut,
    loading,
    isAuthenticated: Boolean(user),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthProvider, AuthContext };