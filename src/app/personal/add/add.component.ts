// Creado por Daniel Alejandro Martinez para Residencia profesional 28/05/2023
import { FocusMonitor } from "@angular/cdk/a11y";
import { BooleanInput } from "@angular/cdk/coercion";
import {
  Component,
  ElementRef,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Self,
  ViewChild,
} from "@angular/core";
import {
  AbstractControl,
  ControlValueAccessor,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  NgControl,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import {
  MatFormFieldControl,
  MAT_FORM_FIELD,
  MatFormField,
} from "@angular/material/form-field";
import { coerceBooleanProperty } from "@cds/core/internal";
import { Subject } from "rxjs";
import { UsersService } from "src/app/core/servicios/users.service";
import { User } from "src/models/User";

@Component({
  selector: "app-add",
  templateUrl: "./add.component.html",
  styleUrls: ["./add.component.css"],
})
export class AddComponent implements OnInit {
  // Variables
  public user: User = {} as User;
  public token: string = "";
  public created = false;
  public faltanDatos = false;
  public roles: { label: string; value: string }[] = [
    { label: "Profesor", value: "TEACHER" },
    { label: "Alumno", value: "STUDENT" },
    { label: "Administrador", value: "ADMIN" },
  ];

  constructor(
    private userService: UsersService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.addForm = this.initForm();
  }

  addForm!: FormGroup;
  // nombre = new FormControl('', [Validators.required]);
  // apellido = new FormControl('', [Validators.required]);
  // correo = new FormControl('', [Validators.required]);
  // rol = new FormControl('', [Validators.required]);

  // Permite ver las etiquetas html y acceder a sus propiedades
  @ViewChild("submitButton") submitButton!: ElementRef<HTMLButtonElement>;
  @ViewChild("btnCancel_Regresar")
  btnCancel_Regresar!: ElementRef<HTMLButtonElement>;

  // Inicializa los requerimientos del formulario
  initForm(): FormGroup {
    return this.formBuilder.group({
      nombre: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ]),
      apellido: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ]),
      correo: new FormControl("", [Validators.required, Validators.email]),
      rol: new FormControl("", Validators.required),
    });
  }

  canAddUser(): boolean {
    return !this.addForm.hasError("required") ||
      !this.addForm.hasError("email") ||
      !this.addForm.hasError("minlength") ||
      !this.addForm.hasError("maxlength")
      ? true
      : false;
  }

  public addUser(): void {
    // datos default par usuario
    this.user.password = this.userService.generarContraseña();
    this.user.locked = false;
    this.user.verified = false;
    this.user.newUser = true;

    this.created = true;
    this.faltanDatos = false;
    this.btnCancel_Regresar.nativeElement.textContent = "Regresar";
    this.submitButton.nativeElement.disabled = true;

    // console.log(this.user);
    // this.loginService.signUp(this.user).subscribe((data: any) => {
    //    this.token = data.token;
    // });
    
    this.userService.addUser(this.user);
    console.log(this.user);
  }

  cerrarAlertaDeError() {
    this.faltanDatos = false;
  }
}
