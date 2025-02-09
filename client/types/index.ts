

export type User = {
    id: number,
    email: string,
    name: string,
    token: string
}

export  type AuthContextType= {
    user: User | null,
    login: (user: User) => void,
    logout: () => void,
    isLoading : boolean
    error: string | null
}