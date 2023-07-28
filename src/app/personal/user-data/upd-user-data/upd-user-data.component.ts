import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { UsersService } from 'src/app/core/servicios/users.service';
import {PersonalData} from "../../../../models/PersonalData";
import {PersonalDataService} from "./personal-data.service";
import {Router} from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import {HttpHeaders} from "@angular/common/http";


@Component({
  selector: 'app-upd-user-data',
  templateUrl: './upd-user-data.component.html',
  styleUrls: ['./upd-user-data.component.css']
})

export class UpdUserDataComponent implements OnInit {

  //usuario : PersonalData = {} as PersonalData;
  curp!:File | undefined;
  rfc!:File | undefined;
  compDom!:File | undefined;
  response : any;
  data: PersonalData = {} as PersonalData;
  updatedData : PersonalData = {} as PersonalData;
  email!: string;
  updPersonalForm!: FormGroup;
  startingSpinner : boolean = false;

  cstates: { label: string; value: string }[] = [
    { label: "Soltero", value: "soltero" },
    { label: "Casado", value: "casado" },
    { label: "Otro", value: "otro" },
  ];

  constructor(private cookieService : CookieService,
              private userService : UsersService,
              private formBuilder: FormBuilder,
              private personalDataService: PersonalDataService,
              private router: Router,
              private toastr: ToastrService){
    this.email = this.cookieService.get('email');
    this.data.fullname = this.cookieService.get('name');
    this.data.verified = false;
  }

  getLocalStorege(): PersonalData{
      let sUsuario = localStorage.getItem("PersonalData");
      // @ts-ignore
      return  JSON.parse(sUsuario);
  }

  ngOnInit(): void {
    this.data = this.getLocalStorege();
    //console.log(this.data);
    this.updPersonalForm = this.initForm();
  }

  initForm(): FormGroup {
    return this.formBuilder.group({
      fullname: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ]),
      birthdate: new FormControl("", [
        Validators.required
      ]),
      strCURP: new FormControl("", [
        Validators.required,
        Validators.pattern(/^([A-Z&]|[a-z&]{1})([AEIOU]|[aeiou]{1})([A-Z&]|[a-z&]{1})([A-Z&]|[a-z&]{1})([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])([HM]|[hm]{1})([AS|as|BC|bc|BS|bs|CC|cc|CS|cs|CH|ch|CL|cl|CM|cm|DF|df|DG|dg|GT|gt|GR|gr|HG|hg|JC|jc|MC|mc|MN|mn|MS|ms|NT|nt|NL|nl|OC|oc|PL|pl|QT|qt|QR|qr|SP|sp|SL|sl|SR|sr|TC|tc|TS|ts|TL|tl|VZ|vz|YN|yn|ZS|zs|NE|ne]{2})([^A|a|E|e|I|i|O|o|U|u]{1})([^A|a|E|e|I|i|O|o|U|u]{1})([^A|a|E|e|I|i|O|o|U|u]{1})([0-9]{2})$/g)
      ]),
      strRFC: new FormControl("", [
        Validators.required,
        Validators.pattern(/^([A-Z&Ññ]{3}|[A-Z][AEIOU][A-Z]{2})\d{2}((01|03|05|07|08|10|12)(0[1-9]|[12]\d|3[01])|02(0[1-9]|[12]\d)|(04|06|09|11)(0[1-9]|[12]\d|30))([A-Z0-9]{2}[0-9A])?$/)
      ]),
      curpfile:new FormControl("", []),
      rfcfile:new FormControl("", []),
      cdomfile:new FormControl("", []),
      phone: new FormControl("", [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
      ]),
      civilstatus: new FormControl("", [
        Validators.required,
      ])
    });
  }

  updPersonalData(){
    this.startingSpinner = true;
    if (this.data.id === undefined){
      //New record
      this.personalDataService.addPersonalData(this.email, this.data, this.curp!, this.rfc!, this.compDom!).subscribe(
          resp => {
            this.response = resp;
            if (this.response.status == 201) {
              this.startingSpinner = false;
              this.showSuccess("Almacenado correctamente", "Notificación");
              this.router.navigate(['/informacion']);
            }
          });
    } else {
      // update
      //console.log(this.data);
      this.updatedData.id = this.data.id;
      this.updatedData.fullname = this.data.fullname;
      this.updatedData.birthdate = this.data.birthdate;
      this.updatedData.strCURP = this.data.strCURP;
      this.updatedData.strRFC = this.data.strRFC;
      this.updatedData.phone = this.data.phone;
      this.updatedData.verified = this.data.verified;
      this.updatedData.civilstatus = this.data.civilstatus;

      this.personalDataService.updatePersonalData(this.data.id, this.updatedData, this.curp!, this.rfc!, this.compDom!).subscribe(
          resp => {
            this.response = resp;
            console.log(this.response.status);
            if (this.response.status == 200) {
              this.startingSpinner = false;
              this.showSuccess("Almacenado correctamente", "Notificación");
              this.router.navigate(['/informacion']);
            }
          }
      );
    }


    // console.log(this.email, this.data, this.curp!, this.rfc!, this.compDom!)
  }

  getFile(event:any){
    this.curp = event.target.files[0];
    //console.log("file", this.curp?.arguments);
  }

  getRFC(event:any){
    this.rfc = event.target.files[0];

    //console.log("file", this.curp?.arguments);
  }
  
  getCDOM(event:any){
    this.compDom = event.target.files[0];
    //console.log("file", this.curp?.arguments);
  }



  showSuccess(message: string, title: string){
    this.toastr.success(message, title)
  }

  showError(message: string, title: string){
    this.toastr.error(message, title)
  }

  showInfo(message: string, title: string){
    this.toastr.info(message, title)
  }

  showWarning(message: string, title: string){
    this.toastr.warning(message, title)
  }

}
