import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chg-pass',
  templateUrl: './chg-pass.component.html',
  styleUrls: ['./chg-pass.component.css']
})
export class ChgPassComponent {
  pass!:string;
  passConfirm!:string;

  chgPassForm!: FormGroup;  
  
  constructor(private formBuilder : FormBuilder,
              private router : Router){}

  ngOnInit(): void {
    this.chgPassForm = this.initForm();
  }

  initForm(): FormGroup {
    return this.formBuilder.group({
      pass: new FormControl("", [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(12),
      ]),
      passConfirm: new FormControl("", [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(12),
      ]),
    });
  }

  chgPass(){ 
    this.router.navigate(['home']);
  }

}
