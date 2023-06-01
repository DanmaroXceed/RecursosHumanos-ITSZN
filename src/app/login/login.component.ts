import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { User } from 'src/models/User';
import { LoginService } from 'src/app/login/Service/login.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators} from "@angular/forms";
import { Router } from "@angular/router";
import { DatosLoginService } from '../core/servicios/datos-login.service';
import { AuthService } from '../core/servicios/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { UserLogged } from 'src/models/UserLogged';

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
  
  }

  OnSubmit() {
    //Falta testeo
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
                // si no esta bloqueado y si esta verificado permitir acceso
                if(!userData.locked && userData.verified){
                  this.datosLoginService.agregarObservable(userData);
                  //this.cookieService.set('name', userData.name);
                  //this.cookieService.set('role', userData.role);
                  //this.cookieService.set('email', userData.email);

                  this.authService.login();
                  this.routeRedirect = this.authService.urlUsuarioIntentaAcceder;
                  this.authService.urlUsuarioIntentaAcceder = 'home';

                  this.router.navigate([this.routeRedirect]);
                }else{
                  userData.locked ? this.mensaje = 'El usuario se encuentra bloqueado' : this.mensaje = 'El usuario no se encuentra verificado';
                  this.errorLogin = true;
                  return;
                }
              }
            );
          }
          else{
            this.mensaje = "Datos erroneos, por favor ingresa nuevamente";
            this.errorLogin = true;
            return;      
          }
        });
    }else{
      this.mensaje = "Por favor complete la informacion";
      this.errorLogin = true;
      return;
    }
  }

  cerrarErrorLogin(){
    this.errorLogin = false;
  }
}
