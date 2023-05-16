import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { User } from 'src/models/User';
import { LoginService } from 'src/app/login/Service/login.service';
import { HttpClient } from '@angular/common/http';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import { DatosLoginService } from '../core/servicios/datos-login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {


  public userToCreate: User = {} as User
  public created = false
  public token: string = ""
  //public users : User[] = [];
  public isModalVisible = false;
  public faltanDatos = false;

  loginForm: FormGroup;
  @ViewChild('submitButton') submitButton!: ElementRef<HTMLButtonElement>;


  constructor(private http: HttpClient, 
              private loginService: LoginService, 
              private formBuilder: FormBuilder, 
              private router: Router,
              //Se declara el servicio de observable 
              private datosLoginService: DatosLoginService) {
    this.loginForm = this.formBuilder.group({
      login_email: ['', [Validators.required, Validators.email]],
      login_password: ['', Validators.required]
    });
  
  }

  public close() {
    this.isModalVisible = false;
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

  OnSubmit() {
    //console.log(this.loginForm.value);
    if (this.loginForm.valid) {
      this.loginService.signIn(this.loginForm.value.login_email, this.loginForm.value.login_password).subscribe(
        data => { 
          // console.log(data);
          if(data){
            this.loginService.getRole(this.loginForm.value.login_email).subscribe(
              data2 => { 
                const datosjson = JSON.stringify(data2);
                this.datosLoginService.datosObservable = JSON.parse(datosjson);
              }
            );
            
            this.router.navigate(['home']);
          }
          else{
            console.log("Credenciales erroneas");
          }
        });
    }
  }

  cerrarAlertaDeError(){
    this.faltanDatos = false;
  }
}
