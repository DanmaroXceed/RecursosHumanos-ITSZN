// Creado por Daniel Alejandro Martinez para Residencia profesional 18/05/2023

// Servicio de autenticacion de sesion

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  readonly ISLOGGEDKEY = 'islogged';
  public urlUsuarioIntentaAcceder = 'home';

  public changeLoginStatusSubject = new Subject<boolean>;
  public changeLoginStatus$ = this.changeLoginStatusSubject.asObservable();

  login(){
    localStorage.setItem(this.ISLOGGEDKEY, 'true');
    this.changeLoginStatusSubject.next(true);
  }

  logout(){
    localStorage.removeItem(this.ISLOGGEDKEY);
    this.changeLoginStatusSubject.next(false);
  }

  isLoggedIn(url: string){
    const isLogged = localStorage.getItem(this.ISLOGGEDKEY);
    if(!isLogged){
      this.urlUsuarioIntentaAcceder = url;
      return false;
    }
    return true;
  }
}
