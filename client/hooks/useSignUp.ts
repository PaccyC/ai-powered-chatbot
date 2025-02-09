import axios  from "axios"
import { useState } from "react"
import { User } from "@/types"
export const useSignUp = ()=>{

    const [isLoading, setIsLoading]= useState(false)
    const  [error, setError]= useState<string | null>(null)
    const [ user,setUser]= useState<User | null> (null)

    const handleSignup=async(name: string,email: string,password: string) => {
        
        try {
            setError(null);
            setIsLoading(true);
         
            // call the backend
            const response= await axios.post(`http://localhost:5000/auth/register`,{
                name,
               email,
               password
            },{
                headers: {
                    "Content-Type": "application/json"
                }
            })
            
            if(response.status  !== 201){
                setError("Invalid credentials")
                setIsLoading(false);
                return;
            }
            const data= await response.data;
            localStorage.setItem("access_token", data.access_token)
        } 
        catch (error) {
            console.log(error)
            throw error;
            
        }
    }
    return  { handleSignup, isLoading, error}

}