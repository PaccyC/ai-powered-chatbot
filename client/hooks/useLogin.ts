import axios  from "axios"
import { useState } from "react"
import { useAuthContext } from "./useAuthContext"
import { User } from "@/types"
export const useLogin = ()=>{
    const {login}= useAuthContext()

    const [isLoading, setIsLoading]= useState(false)
    const  [error, setError]= useState<string | null>(null)
    const [ user,setUser]= useState<User | null> (null)

  
    const handleLogin=async(email: string,password: string) => {
        try {
            setError(null);
            setIsLoading(true);
         
            const response= await axios.post(`http://localhost:5000/auth/login`,{
               email,password
            },{
                headers: {
                    "Content-Type": "application/json"
                }
            })

            console.log(response);
            
            if(response.status  !== 201){
                setError("Invalid credentials")
                setIsLoading(false);
                return;
            }
            const {access_token, user}= await response.data;
            
            
            console.log(user);
            login(
                {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    token: access_token,
                  }
            )
            
            setUser(user);
              
            localStorage.setItem("access_token", access_token)
            
            
        } 
        catch (error) {
            console.log(error)
            throw error;
        }
    }
    return  { handleLogin, isLoading, error}

}