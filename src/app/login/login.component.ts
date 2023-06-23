import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { User } from 'src/models/User';
import { LoginService } from 'src/app/login/Service/login.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators} from "@angular/forms";
import { Router } from "@angular/router";
import { DatosLoginService } from '../core/servicios/datos-login.service';
import { AuthService } from '../core/servicios/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { UserLogged } from 'src/models/UserLogged.model';
import { userIcon } from '@cds/core/icon';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  
  public errorLogin = false;
  public mensaje : string = '';
  routeRedirect = '';

  loginForm: FormGroup;

  constructor(private http: HttpClient, 
              private loginService: LoginService, 
              private formBuilder: FormBuilder, 
              private router: Router,
              private datosLoginService: DatosLoginService,
              private authService : AuthService,
              private cookieService : CookieService) {
    this.loginForm = this.formBuilder.group({
      login_email: ['', [Validators.required, Validators.email]],
      login_password: ['', Validators.required]
    });
    
    this.authService.logout()

  }

  OnSubmit() {
    if (this.loginForm.valid) {
      // iniciar sesion mediante servicio usando pass y correo del formulario
      this.loginService.signIn(this.loginForm.value.login_email, this.loginForm.value.login_password).subscribe(
        data => { 
          // console.log(data);
          // si data es 1, existe el usuario
          if(data){
            //Obtener datos del usuario
            this.loginService.getUserLogged(this.loginForm.value.login_email).subscribe(
              data2 => {
                //Convertir datos a JSON con el esquema UserLogged
                const userData : UserLogged = JSON.parse(JSON.stringify(data2));
                console.log(userData)

                if(userData.role === 'ADMIN' && userData.enabled == 'true'){
                  this.initUser(userData)
                  this.router.navigate(['home']);
                }

                if(userData.locked == 'true'){
                  this.showError('El usuario se encuentra bloqueado');
                  return;
                }

                if(userData.enabled == 'false'){
                  this.showError('El usuario no se encuentra verificado' );
                  return;
                }

                if(userData.securityupdated == 'false' && userData.role !== 'ADMIN'){
                  this.initUser(userData);
                  this.router.navigate(['cambio-contr']);
                }else{
                  this.initUser(userData);
                  this.routeRedirect = this.authService.urlUsuarioIntentaAcceder;
                  this.authService.urlUsuarioIntentaAcceder = 'home';
                  this.router.navigate([this.routeRedirect]);
                }
              }
            );
          }
          else{
            this.showError("Datos erroneos, por favor intenta nuevamente");
            return;      
          }
        });
    }else{
      this.showError("Por favor complete la informacion");
      return;
    } 
  }

  showError(mensaje : string){
    this.mensaje = mensaje;
    this.errorLogin = true;
  }

  initUser(userData : UserLogged){
    this.authService.login();
    this.datosLoginService.agregarObservable(userData);
    this.cookieService.set('name', userData.name);
    this.cookieService.set('role', userData.role);
    this.cookieService.set('email', userData.email);
  }

  cerrarErrorLogin(){
    this.errorLogin = false;
  }
}


