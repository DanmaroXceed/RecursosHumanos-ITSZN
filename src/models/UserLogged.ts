export interface UserLogged{
    role: string;
    name: string; 
    email: string;
    locked?: boolean;
    newUser?:boolean;
    verified?:boolean;
}