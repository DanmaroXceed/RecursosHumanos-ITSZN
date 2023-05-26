export interface User {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    role: string;
    locked: boolean;
    curp?: string;
    rfc?: string;
    phone?: number;
    verified:boolean;
}
