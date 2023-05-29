// Creado por Daniel Alejandro Martinez para Residencia profesional 17/05/2023

// pestaña donde se muestra el personal registrado, asi como se permite su administracion

import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { User } from "src/models/User";
import { LoginService } from "../login/Service/login.service";

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

  constructor(private loginService: LoginService) {
    this.generateUsers();
  }

  ngOnInit(): void {}

  generateUsers() {
    for (let i = 0; i < 10; i++) {
      const user: User = {
        id : i,
        firstname: `Usuario${i + 1}`,
        lastname: `Apellido${i + 1}`,
        email: `usuario${i + 1}@example.com`,
        phone: (i+1)*493157,
        password: 'password123',
        role: 'Usuario',
        curp: `USR${i + 1}2023`,
        rfc: `USR${i + 1}000`,
        locked: false,
        verified: true,
      };
      this.usuarios.push(user);
    }
  }
}
