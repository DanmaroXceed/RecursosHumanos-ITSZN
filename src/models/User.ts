export interface User {
    id: number;
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
