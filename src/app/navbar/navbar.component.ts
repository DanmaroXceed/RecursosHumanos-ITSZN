import { Component, OnInit } from '@angular/core';
import { DatosLoginService } from '../core/servicios/datos-login.service';
import { Observable } from "rxjs";
import { LoginService } from '../login/Service/login.service';
import { Router } from '@angular/router';
import { UserLogged } from 'src/models/UserLogged';
import { User } from 'src/models/User';
import { AuthService } from '../core/servicios/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  //datos del usuario
  data: UserLogged | undefined;

  opcionSeleccionada: number = 0;

  
  constructor(
    public datosLoginService: DatosLoginService,
    private loginService: LoginService,
    private router: Router,
    private authService : AuthService
    ) { 
    }

  ngOnInit(): void {
    //se asigna valor a data$ mediante el servicio datosLoginService y el metodo observable que regresa sus datos
    this.data = JSON.parse(localStorage.getItem('usuario') || "{}");
    console.log(this.data)
  }

  signOut(){
    /*
    this.loginService.SignOut().subscribe((data:any)=>{
      console.log(data);
    });
    */

    this.authService.logout()
    this.router.navigate(['']);
  }

}
