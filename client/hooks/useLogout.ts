import { User } from "@/types"
import { useState } from "react"

export const useLogout = ()=>{

    const [ user,setUser]= useState<User | null>(null)
    const logout = ()=>{
        localStorage.removeItem("access_token")
        setUser(null)
    }

    return  { logout}
}