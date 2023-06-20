import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { UsersService } from 'src/app/core/servicios/users.service';
import { personalData } from 'src/models/personalData';

@Component({
  selector: 'app-upd-user-data',
  templateUrl: './upd-user-data.component.html',
  styleUrls: ['./upd-user-data.component.css']
})

export class UpdUserDataComponent implements OnInit {
  nombre!: string;
  fechaNac!: Date;
  curp!: string;
  rfc!: string;
  domicilio!: string;
  telefono!: number;
  estadoCiv!: string;
  ine!:File | undefined;

  datos: personalData = {} as personalData;

  email!: string;

  updPersonalesForm!: FormGroup;  

  cstates: { label: string; value: string }[] = [
    { label: "Soltero", value: "soltero" },
    { label: "Casado", value: "casado" },
    { label: "Otro", value: "otro" },
  ];

  constructor(private cookieService : CookieService,
              private userService : UsersService,
              private formBuilder: FormBuilder){
    this.email = this.cookieService.get('email')
    this.datos.nombre = this.cookieService.get('name')

    // this.userService.getUserbyEmail(this.email).subscribe((data:any) => {
    //   console.log("usuario: " + data)
    // })
  }

  ngOnInit(): void {
    this.updPersonalesForm = this.initForm();
  }

  initForm(): FormGroup {
    return this.formBuilder.group({
      nombre: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ]),
      fechaNac: new FormControl("", [
        Validators.required
      ]),
      curp : new FormControl("", [
        Validators.required,
        Validators.pattern('^[A-Z]{4}[0-9]{6}[H,M][A-Z]{5}[0-9]{2}$'),
      ]),
      rfc: new FormControl("", [
        Validators.required,
        Validators.pattern('^[A-Z]{4}[0-9]{6}[A-Z0-9]{3}$')
      ]),
      domicilio: new FormControl("", [
        Validators.required,
      ]),
      telefono: new FormControl("", [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
      ]),
      estadoCivil: new FormControl("", [
        Validators.required,
      ]),
      ine: new FormControl("", [])
    });
  }

  updPersonalData(){
    console.log(this.datos)
  }

  getFile(event:any){
    this.ine = event.target.files[0];
    console.log("file", this.ine)
  }
}
