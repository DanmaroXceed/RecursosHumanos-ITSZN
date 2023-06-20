import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UsersService } from 'src/app/core/servicios/users.service';
import { User } from 'src/models/User';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css']
})

export class UserDataComponent {
  email!: string;
  nombre!: string;
  usuario!:User;

  public cstates: { label: string; value: string }[] = [
    { label: "Soltero", value: "soltero" },
    { label: "Casado", value: "casado" },
    { label: "Otro", value: "otro" },
  ];

  constructor(private cookieService : CookieService,
              private userService : UsersService){
    this.email = this.cookieService.get('email')
    this.nombre = this.cookieService.get('name')

    // this.userService.getUserbyEmail(this.email).subscribe((data:any) => {
    //   console.log(data)
    // })
  }
}
