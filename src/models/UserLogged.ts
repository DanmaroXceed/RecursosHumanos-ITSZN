export interface UserLogged{
    role: string;
    name: string; 
    email: string;
    locked?: boolean;
    securityupdated?:boolean;
    enabled?:boolean;
}