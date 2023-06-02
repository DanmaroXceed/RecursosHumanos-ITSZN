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
  usuario!:User;

  constructor(private cookieService : CookieService,
              private router : Router,
              private userService : UsersService){
    this.email = this.cookieService.get('emailUserData')

    this.userService.getUserbyEmail(this.email).subscribe((data:any) => {
      console.log(data)
    })
  }

  regresar():void{
    this.cookieService.delete('idUserData');
    this.router.navigate(['/personal']);
  }
}
