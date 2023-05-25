import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DatosLoginService } from '../core/servicios/datos-login.service';
import { Observable, pipe } from "rxjs";
import { LoginService } from '../login/Service/login.service';
import { Router } from '@angular/router';
import { UserLogged } from 'src/models/UserLogged';
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

}
