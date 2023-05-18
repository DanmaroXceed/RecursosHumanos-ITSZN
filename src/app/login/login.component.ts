import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { User } from 'src/models/User';
import { LoginService } from 'src/app/login/Service/login.service';
import { HttpClient } from '@angular/common/http';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import { DatosLoginService } from '../core/servicios/datos-login.service';
import { AuthService } from '../core/servicios/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  
  public errorLogin = false;
  routeRedirect = '';

  loginForm: FormGroup;


  constructor(private http: HttpClient, 
              private loginService: LoginService, 
              private formBuilder: FormBuilder, 
              private router: Router,
              //Se declara el servicio de observable 
              private datosLoginService: DatosLoginService,
              private authService : AuthService) {
    this.loginForm = this.formBuilder.group({
      login_email: ['', [Validators.required, Validators.email]],
      login_password: ['', Validators.required]
    });
  
  }

  OnSubmit() {
    //console.log(this.loginForm.value);
    if (this.loginForm.valid) {
      this.loginService.signIn(this.loginForm.value.login_email, this.loginForm.value.login_password).subscribe(
        data => { 
          // console.log(data);
          if(data){
            this.loginService.getUserLogged(this.loginForm.value.login_email).subscribe(
              data2 => {
                // console.log(data2)
                localStorage.setItem("usuario", JSON.stringify(data2));
              }
            );
            this.authService.login();
            this.routeRedirect = this.authService.urlUsuarioIntentaAcceder;
            this.authService.urlUsuarioIntentaAcceder = 'home';

            this.router.navigate([this.routeRedirect]);
          }
          else{
            this.errorLogin = true;
          }
        });
    }else{
      alert('Por favor, complete todos los campos');
      return;
    }
  }

  cerrarErrorLogin(){
    this.errorLogin = false;
  }
}
