import { Component, ElementRef, ViewChild } from '@angular/core';
import {StudiesProgram} from "../../models/StudiesProgram";
import {StudiesProgramService} from "./studies-program.service";
import {HttpErrorResponse} from "@angular/common/http";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-studies-program',
  templateUrl: './studies-program.component.html',
  styleUrls: ['./studies-program.component.css']
})
export class StudiesProgramComponent {

  public token : any;
  public studiesprograms: StudiesProgram[]=[];
  public spToCreate: StudiesProgram = {} as StudiesProgram;
  public isModalVisible = false;
  spform! : FormGroup;
  @ViewChild("submitButton") submitButton!: ElementRef<HTMLButtonElement>;

  initForm(): FormGroup {
    return this.formBuilder.group({
      sp: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ])
    });
  }

  ngOnInit(): void{
      this.isModalVisible=false;
      this.spform = this.initForm();
  }

  constructor(private studiesProgramService: StudiesProgramService, private formBuilder:FormBuilder) {
    this.getAllStudiesPrograms();
  }

  public getAllStudiesPrograms():void {
    this.studiesProgramService.getAllStudiesProgram().subscribe(
        (response: StudiesProgram[])=>{this.studiesprograms = response;}
        );
  }

  onAdd(){
    this.studiesProgramService.addStudiesProgram(this.spToCreate).subscribe(
        data => { 
          this.token = data;
        });
    this.isModalVisible=false;
    this.studiesprograms.push(this.spToCreate)
  }

  onEdit(sp: StudiesProgram) {
      
  }

  onDelete(sp: StudiesProgram) {
    
  }
}
