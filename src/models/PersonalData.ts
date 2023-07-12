import {Assignment} from "./Assignment";
import {UserLogged} from "./UserLogged.model";

export interface PersonalData{
    id: number;
    fullname: string;
    birthdate: Date;
    curpfile: string;
    phone: string;
    verified: boolean;
    civilstatus: string;
    curpFile: Assignment;
    appUser: UserLogged;
  }