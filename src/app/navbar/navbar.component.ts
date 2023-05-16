import { Component, OnInit } from '@angular/core';
import { DatosLoginService } from '../core/servicios/datos-login.service';
import { Observable } from "rxjs";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  //datos del observable
  data$: Observable<any> | undefined;

  constructor(
    public datosLoginService: DatosLoginService
    ) {  }

  ngOnInit(): void {
    //se asigna valor a data$ mediante el servicio datosLoginService y el metodo observable que regresa sus datos
    this.datosLoginService.observable.subscribe(datos$ => 
      this.data$ = datos$);
  }

}
