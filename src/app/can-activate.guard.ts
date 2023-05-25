// Creado por Daniel Alejandro Martinez para Residencia profesional 18/05/2023

// Permite verificar si el usuario esta logeado para dar acceso a rutas, sino lo manda a iniciar sesion

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './core/servicios/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CanActivateGuard  {

  constructor(
    private router : Router,
    private authService : AuthService,
  ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    if(this.authService.isLoggedIn(state.url)){
      return true;
    }
    this.router.navigate([''])
      return true;
  }
  
}
