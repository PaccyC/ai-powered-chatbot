export type AuthResponse = {
    access_token: string;
    user : User;
}

export type User = {
    id: number;
    name: string;
    email: string;
   
}