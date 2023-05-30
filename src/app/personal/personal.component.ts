// Creado por Daniel Alejandro Martinez para Residencia profesional 17/05/2023

// pestaña donde se muestra el personal registrado, asi como se permite su administracion

import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { User } from "src/models/User";
import { LoginService } from "../login/Service/login.service";
import { UsersService } from "../core/servicios/users.service";

@Component({
  selector: "app-personal",
  templateUrl: "./personal.component.html",
  styleUrls: ["./personal.component.css"],
})
export class PersonalComponent implements OnInit {

  public isModalVisible = false;
  public registroExtendido = false;
  public usuarios : User[] = [];
  public maxSize = 5;
  public modificar = false;

  p: number = 1;
  idUser: number = 1;

  constructor(private usersService: UsersService) {
    // Verificar si es necesario clonar
    this.usuarios = this.usersService.userList;
  }

  ngOnInit(): void {}

  
}
