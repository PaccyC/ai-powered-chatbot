"use client"

import { AuthContextType, User } from "@/types"
import { createContext, ReactNode, useEffect, useState } from "react"

export const AuthContext = createContext<AuthContextType | null>(null)
const AuthContextProvider = ({children}:{children: ReactNode}) => {
    const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
    
  useEffect(()=>{
    const storedUser=localStorage.getItem("user");
    if(storedUser){
      setUser(JSON.parse(storedUser));
    }
  },[])
  const login = (user: User) => {
    
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  };
  // 

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("access_tokenz")
  };
  
  return (
    <AuthContext.Provider value={{user,login,logout,isLoading,error}} >
     { children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider