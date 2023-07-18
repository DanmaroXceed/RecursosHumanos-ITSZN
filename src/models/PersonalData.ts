import { Assignment } from "./Assignment";
import { rfcfile } from "./rfcFile";
import { compDOMFile } from "./compDOMFile";
import { UserLogged } from "./UserLogged.model";

export interface PersonalData{
    id: number;
    fullname: string;
    birthdate: Date;
    curpfile: string;
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