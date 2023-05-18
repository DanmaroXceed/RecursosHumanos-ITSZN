// Creado por Daniel Alejandro Martinez para Residencia profesional 17/05/2023

// pestaña donde se muestra el personal registrado, asi como se permite su administracion

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/models/User';
import { LoginService } from '../login/Service/login.service';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})
export class PersonalComponent implements OnInit {
  @ViewChild('submitButton') submitButton!: ElementRef<HTMLButtonElement>;


  public userToCreate: User = {} as User
  public faltanDatos = false;
  public created = false
  public isModalVisible = false;
  public token: string = ""

  constructor(private loginService : LoginService) { 
    
  }

  ngOnInit(): void {
  }

  public signUp(): void {
    if (this.userToCreate.firstname === undefined ||
      this.userToCreate.lastname === undefined ||
      this.userToCreate.email === undefined ||
      this.userToCreate.password === undefined){
      this.faltanDatos = true
    }else{
      this.created = true;
      this.submitButton.nativeElement.disabled = true;

      this.loginService.signUp(this.userToCreate).subscribe((
          data: any) => {
          this.token = data.token
        }
      );
    }
  }

  public close() {
    this.isModalVisible = false;
  }

  cerrarAlertaDeError(){
    this.faltanDatos = false;
  }

}
