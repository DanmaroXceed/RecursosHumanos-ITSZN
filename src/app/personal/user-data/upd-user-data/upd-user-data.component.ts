import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { UsersService } from 'src/app/core/servicios/users.service';
import {PersonalData} from "../../../../models/PersonalData";
import {PersonalDataService} from "./personal-data.service";


@Component({
  selector: 'app-upd-user-data',
  templateUrl: './upd-user-data.component.html',
  styleUrls: ['./upd-user-data.component.css']
})

export class UpdUserDataComponent implements OnInit {
  curp!:File | undefined;

  response : any;
  data: PersonalData = {} as PersonalData;
  email!: string;

  updPersonalForm!: FormGroup;

  cstates: { label: string; value: string }[] = [
    { label: "Soltero", value: "soltero" },
    { label: "Casado", value: "casado" },
    { label: "Otro", value: "otro" },
  ];

  constructor(private cookieService : CookieService,
              private userService : UsersService,
              private formBuilder: FormBuilder,
              private personalDataService: PersonalDataService){
    this.email = this.cookieService.get('email');
    this.data.fullname = this.cookieService.get('name');
    this.data.verified = false;
  }

  ngOnInit(): void {
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
      curpfile:new FormControl("", []),
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
    //console.log(this.curp?.name);

    this.personalDataService.addPersonalData(this.email, this.data, this.curp!).subscribe(
        resp => {
          this.response = resp;
          console.log(this.response);
        }
    );

  }

  getFile(event:any){
    this.curp = event.target.files[0];

    //console.log("file", this.curp?.arguments);
  }
}
