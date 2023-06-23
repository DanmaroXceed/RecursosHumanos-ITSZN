import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DatosLoginService } from '../core/servicios/datos-login.service';
import { Observable, pipe } from "rxjs";
import { LoginService } from '../login/Service/login.service';
import { Router } from '@angular/router';
import { UserLogged } from 'src/models/UserLogged.model';
import { User } from 'src/models/User';
import { AuthService } from '../core/servicios/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { startWith } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent{
  public name! : string;
  public role! : string;
  public Rol! : string;
  public email! : string;

  opcionSeleccionada: number = 0;
  
  constructor(
    private datosLoginService: DatosLoginService,
    private loginService: LoginService,
    private router: Router,
    private authService : AuthService,
    private cookieService : CookieService,
    ) {

    }

  ngOnInit(){
    this.datosLoginService.observable.subscribe( usuario => {
      if(usuario.name !== '' && usuario.email !== '' && usuario.role !== ''){
        this.name = usuario.name;
        this.role = usuario.role;
        this.email = usuario.email;

        this.cookieService.set('name', this.name);
        this.cookieService.set('role', this.role);
        this.cookieService.set('email', this.email);

      }else{
        this.name = this.cookieService.get('name');
        this.role = this.cookieService.get('role');
        this.email = this.cookieService.get('email');
      }
      this.Rol = this.showRole(this.role)
      
    });
  }
  
  signOut(){
    /*
    this.loginService.SignOut().subscribe((data:any)=>{
      console.log(data);
    });
    */

    this.authService.logout();
    this.cookieService.deleteAll();
    this.router.navigate(['']);
  }

  showRole(role : string): string{
    switch (role) {
      case 'ADMIN':
        return 'Administrador'
        break;
      case 'TEACHER':
        return 'Profesor'
        break;
      case 'STUDENT':
        return 'Alumno'
        break;
      default:
        return 'Invitado'
        break;
    }
  }

  isAdmin(): boolean{
    return this.role === 'ADMIN' ? true : false;
  }

  onPref(): boolean{
    return window.location.href.includes('/preferencias') ? true : false;
  }

}
