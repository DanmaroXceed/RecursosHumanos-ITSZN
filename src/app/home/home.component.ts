import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/servicios/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { DatosLoginService } from '../core/servicios/datos-login.service';
import { tarjeta } from 'src/models/tarjeta.model';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  name!: string;
  items : tarjeta[] = [
    {propietario: 'Daniel Martinez'},
    {propietario: 'Manuel Mendez'},
    {propietario: 'Arturo Ortega'},
    {propietario: 'Jose Gutierrez'},
  ]

  constructor(
    private authService : AuthService,
    private cookieService : CookieService,
    private datosLoginService : DatosLoginService
  ) { }

  ngOnInit(): void {
    this.datosLoginService.observable.subscribe( usuario => {
      if(usuario.name !== '' && usuario.email !== '' && usuario.role !== ''){
        this.name = usuario.name;
      }else{
        this.name = this.cookieService.get('name');
      }
      
    });
  }

}
