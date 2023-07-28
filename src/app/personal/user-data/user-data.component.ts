import {Component, OnInit} from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { UsersService } from 'src/app/core/servicios/users.service';
import {environment} from "../../../environments/environment";
import {ToastrService} from "ngx-toastr";
import {UserLogged} from "../../../models/UserLogged.model";
import {Assignment} from "../../../models/Assignment";
import {compDOMFile} from "../../../models/compDOMFile";
import {rfcfile} from "../../../models/rfcfile";
import { PersonalData } from 'src/models/PersonalData';


@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css']
})

export class UserDataComponent implements OnInit{

  email!: string;
  nombre!: string;
  usuario = {} as PersonalData;
  private apiServerUrl = environment.apiBaseUrl;
  urldownloadCURP : string = this.apiServerUrl + "/api/v1/registration/userprofile/curp/";
  urldownloadRFC : string = this.apiServerUrl + "/api/v1/registration/userprofile/rfc/";
  urldownloadCDOM : string = this.apiServerUrl + "/api/v1/registration/userprofile/cdom/";
  showSpinner : boolean = false;
  hasData : boolean = false;



  public cstates: { label: string; value: string }[] = [
    { label: "Soltero", value: "soltero" },
    { label: "Casado", value: "casado" },
    { label: "Otro", value: "otro" },
  ];

  constructor(private cookieService : CookieService,
              private userService : UsersService,
              private toastr: ToastrService){
    this.email = this.cookieService.get('email')
    this.nombre = this.cookieService.get('name')
  }

  ngOnInit(): void {
    this.showSpinner = true;
    this.userService.getUserbyEmail(this.email).subscribe(response => {
      //console.log(response);
      if(response.status == 200) {
        //the user exist
        this.usuario = response.body;
        this.usuario.appUser = {} as UserLogged;
        this.usuario.curpFile = {} as Assignment;
        this.usuario.cdomfile = {} as compDOMFile;
        this.usuario.rfcfile = {} as rfcfile;
        this.hasData = true;
        this.sendToLocalStorage();
        //console.log(response.body);
        this.showSpinner = false;
      } else{
        this.showWarning("No existe algún registro capturado", "Alerta");
        this.showSpinner = false;
      }
    });
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

  sendToLocalStorage() {
    //localStorage.clear();
    localStorage.setItem("PersonalData", JSON.stringify(this.usuario));
  }

}
