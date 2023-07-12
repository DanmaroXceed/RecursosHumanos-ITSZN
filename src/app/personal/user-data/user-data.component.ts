import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UsersService } from 'src/app/core/servicios/users.service';
import { PersonalData } from 'src/models/PersonalData';
import {HttpHeaders} from "@angular/common/http";
import {Assignment} from "../../../models/Assignment";
import {environment} from "../../../environments/environment";

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
  urldownload : string = this.apiServerUrl + "/api/v1/registration/userprofile/curp/";



  public cstates: { label: string; value: string }[] = [
    { label: "Soltero", value: "soltero" },
    { label: "Casado", value: "casado" },
    { label: "Otro", value: "otro" },
  ];

  constructor(private cookieService : CookieService,
              private userService : UsersService){
    this.email = this.cookieService.get('email')
    this.nombre = this.cookieService.get('name')


  }

  ngOnInit(): void {
    this.userService.getUserbyEmail(this.email).subscribe((data:any) => {
      this.usuario = data;
      console.log(this.usuario);
    });
  }
}
