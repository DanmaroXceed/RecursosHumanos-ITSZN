// Creado por Daniel Alejandro Martinez para Residencia profesional 29/05/2023
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';
import { environment } from 'src/environments/environment';
import { User } from 'src/models/User';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http : HttpClient) {
    
   }

   public getUserbyEmail(email: string): Observable<string>{
    return this.http.get<any>(`${this.apiServerUrl}/api/v1/api/v1/registration/userprofile/getUserProfileByEmail/`+ email);
  }

  public getUsersEnabled():Observable<any>{
    return this.http.get<any>(`${this.apiServerUrl}/api/v1/registration/findbyenabled`);
  }

  // generateUsers() {
  //   for (let i = 0; i < 10; i++) {
  //     const user: User = {
  //       id : i,
  //       firstname: `Usuario${i + 1}`,
  //       lastname: `Apellido${i + 1}`,
  //       email: `usuario${i + 1}@example.com`,
  //       password: this.generarContraseña(),
  //       role: 'TEACHER',
  //       locked: false,
  //       verified: true,
  //       newUser: true,
  //     };
  //     this.listaUsuarios.push(user);
  //   }
  // }

  generarContraseña(): string {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*()';
    let contraseña = '';
  
    for (let i = 0; i < 9; i++) {
      const indice = Math.floor(Math.random() * caracteres.length);
      contraseña += caracteres.charAt(indice);
    }
  
    return contraseña;
  }
}
