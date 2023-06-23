import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../login/Service/login.service';
import { CookieService } from 'ngx-cookie-service';

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
              private router : Router,
              private loginService: LoginService,
              private cookieService : CookieService){}

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
    try{
      this.loginService.changePassword(this.cookieService.get('email'), this.pass)
      .subscribe(data =>{
        console.log(data);
        this.router.navigate(['home']);
      })
    }catch(error){}
    
  }

}
