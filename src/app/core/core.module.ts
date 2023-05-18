// Creado por Daniel Alejandro Martinez para Residencia profesional 11/05/2023

// Se importa en el app.module.ts como CoreModule

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatosLoginService } from './servicios/datos-login.service';


@NgModule({
  declarations: [
  ],
  imports: [CommonModule],
  providers : [DatosLoginService]
})
export class CoreModule { }
