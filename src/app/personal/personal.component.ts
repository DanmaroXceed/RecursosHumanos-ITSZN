// Creado por Daniel Alejandro Martinez para Residencia profesional 17/05/2023

// pestaña donde se muestra el personal registrado, asi como se permite su administracion

import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { User } from "src/models/User";
import { UsersService } from "../core/servicios/users.service";
import { Router, RouterLink } from "@angular/router";
import { CookieService } from "ngx-cookie-service";

@Component({ 
  selector: "app-personal",
  templateUrl: "./personal.component.html",
  styleUrls: ["./personal.component.css"],
})
export class PersonalComponent implements OnInit {

  public usuarios : User[] = [];
  public maxSize = 5;

  p: number = 1;
  idUser: number = 1;

  constructor(private usersService: UsersService,
              private router: Router,
              private cookieService: CookieService,
    ) {
    // Verificar si es necesario clonar
    this.usersService.getUsersEnabled().subscribe((data: any) => {
      // console.log(data)
      this.usuarios = data;
    })
  }

  ngOnInit(): void {
  }

  verUsuario(email: string): void{
    this.cookieService.set('emailUserData', email);
    this.router.navigate(['/personal/userData']);
  }
}
