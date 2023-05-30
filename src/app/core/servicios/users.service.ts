// Creado por Daniel Alejandro Martinez para Residencia profesional 29/05/2023
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { User } from 'src/models/User';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private listaUsuarios: User[] = [];
  private usuarioPendiente: Subject<User> = new Subject<User>;

  constructor() {
    this.generateUsers();
   }

  // Obtener lista de usuarios
  get userList(){
    return this.listaUsuarios;
  }

  // getUser(): User{
  //   return this.observablePrivado.asObservable();
  // }

  // Asignar datos al observable
  addUser(user: User){
    this.listaUsuarios.push(user);
  }

  generateUsers() {
    for (let i = 0; i < 10; i++) {
      const user: User = {
        id : i,
        firstname: `Usuario${i + 1}`,
        lastname: `Apellido${i + 1}`,
        email: `usuario${i + 1}@example.com`,
        password: this.generarContraseña(),
        role: 'TEACHER',
        locked: false,
        verified: true,
        newUser: true,
      };
      this.listaUsuarios.push(user);
    }
  }

  generarContraseña(): string {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
    let contraseña = '';
  
    for (let i = 0; i < 9; i++) {
      const indice = Math.floor(Math.random() * caracteres.length);
      contraseña += caracteres.charAt(indice);
    }
  
    return contraseña;
  }
}
