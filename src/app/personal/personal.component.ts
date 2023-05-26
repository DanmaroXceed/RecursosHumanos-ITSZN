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
  @ViewChild("submitButton") submitButton!: ElementRef<HTMLButtonElement>;

  public userToCreate: User = {} as User;
  public faltanDatos = false;
  public created = false;
  public isModalVisible = false;
  public token: string = "";
  roles: string[] = ["Profesor", "Estudiante", "Administrador"];
  public registroExtendido = false;
  public usuarios : User[] = [];
  public maxSize = 5;

  p: number = 1;

  constructor(private loginService: LoginService) {
    this.generateUsers();
  }

  ngOnInit(): void {}

  public signUp(): void {
    if (
      this.userToCreate.firstname === undefined ||
      this.userToCreate.lastname === undefined ||
      this.userToCreate.email === undefined ||
      this.userToCreate.password === undefined ||
      this.userToCreate.role === undefined
    ) {
      this.faltanDatos = true;
    } else {
      this.created = true;
      this.submitButton.nativeElement.disabled = true;
      // datos default par usuario
      this.userToCreate.locked = false;
      this.userToCreate.verified = false;
    //   this.loginService.signUp(this.userToCreate).subscribe((data: any) => {
    //     this.token = data.token;
    //   });
    }
    console.log(this.userToCreate);
  }

  public close() {
    this.isModalVisible = false;
  }

  cerrarAlertaDeError() {
    this.faltanDatos = false;
  }

  borrarUsuario(index: number){
    console.log(index);
  }

  modUsuario(index: number){
    console.log(index);
  }

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
