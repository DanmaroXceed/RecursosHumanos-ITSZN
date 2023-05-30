export interface User {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    role: string;
    locked: boolean;
    newUser:boolean;
    verified:boolean;
    password?: string;
    curp?: string;
    rfc?: string;
    phone?: number;
    address?:string;
    bday?:Date;
}
