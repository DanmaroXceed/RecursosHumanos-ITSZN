// Creado por Daniel Alejandro Martinez para Residencia profesional 28/05/2023 
import { FocusMonitor } from '@angular/cdk/a11y';
import { BooleanInput } from '@angular/cdk/coercion';
import { Component, ElementRef, Inject, Input, OnDestroy, Optional, Self, ViewChild } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormBuilder, FormControl, FormGroup, FormsModule, NgControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldControl, MAT_FORM_FIELD, MatFormField } from '@angular/material/form-field';
import { coerceBooleanProperty } from '@cds/core/internal';
import { Subject } from 'rxjs';
import { User } from 'src/models/User';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {
  // Variables
  public userToCreate: User = {} as User;
  public token: string = "";
  public created = false;
  public faltanDatos = false;
  public roles: { label: string, value: string }[] = [
    { label: 'Profesor', value: 'TEACHER' },
    { label: 'Alumno', value: 'STUDENT' },
    { label: 'Administrador', value: 'ADMIN' }
  ];

  @ViewChild("submitButton") submitButton!: ElementRef<HTMLButtonElement>;

  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Campo Requerido';
    }

    return this.email.hasError('email') ? 'Email no valido' : '';
  }

  public signUp(): void {
    if (
      this.userToCreate.firstname === undefined ||
      this.userToCreate.lastname === undefined ||
      this.userToCreate.email === undefined ||
      this.userToCreate.password === undefined ||
      this.userToCreate.role === undefined
    ) {
      this.faltanDatos = true;
    } else {
      this.created = true;
      this.submitButton.nativeElement.disabled = true;
      // datos default par usuario
      this.userToCreate.locked = false;
      this.userToCreate.verified = false;
    //   this.loginService.signUp(this.userToCreate).subscribe((data: any) => {
    //     this.token = data.token;
    //   });
    }
    console.log(this.userToCreate);
  }

  cerrarAlertaDeError() {
    this.faltanDatos = false;
  }

}

