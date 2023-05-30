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
        phone: (i+1)*493157,
        password: 'password123',
        role: 'Usuario',
        curp: `USR${i + 1}2023`,
        rfc: `USR${i + 1}000`,
        locked: false,
        verified: true,
        address: `Direccion${i + 1}`,
        bday: new Date(),
        newUser: true,
      };
      this.listaUsuarios.push(user);
    }
  }
}
