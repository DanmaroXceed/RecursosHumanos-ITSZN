import { Assignment } from "./Assignment";
import { compDOMFile } from "./compDOMFile";
import { UserLogged } from "./UserLogged.model";
import { rfcfile } from "./rfcfile";

export interface PersonalData{
    id: number;
    fullname: string;
    birthdate: Date;
    strCURP: string;
    rfcfile: rfcfile;
    strRFC: string;
    phone: string;
    verified: boolean;
    civilstatus: string;
    curpFile: Assignment;
    cdomfile: compDOMFile;
    appUser: UserLogged;
  }