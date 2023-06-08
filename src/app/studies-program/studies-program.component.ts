import { Component } from '@angular/core';
import {StudiesProgram} from "../../models/StudiesProgram";
import {StudiesProgramService} from "./studies-program.service";
import {HttpErrorResponse} from "@angular/common/http";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-studies-program',
  templateUrl: './studies-program.component.html',
  styleUrls: ['./studies-program.component.css']
})
export class StudiesProgramComponent {

  public created = false;
  public token : any;
  public studiesprograms: StudiesProgram[]=[];
  public spToCreate: StudiesProgram = {} as StudiesProgram;
  public isModalVisible = false;
  spform : FormGroup;

  ngOnInit(): void{
      this.isModalVisible=false;
      this.getAllStudiesPrograms();
  }

  constructor(private studiesProgramService: StudiesProgramService, private formBuilder:FormBuilder) {
    this.spform = this.formBuilder.group({

    });
  }

  public getAllStudiesPrograms():void {
    this.studiesProgramService.getAllStudiesProgram().subscribe(
        (response: StudiesProgram[])=>{this.studiesprograms = response;},
        (error:HttpErrorResponse)=>{alert(error.message)}
        );
  }

  onAdd(){
    this.studiesProgramService.addStudiesProgram(this.spToCreate).subscribe(
        data => { this.token = data;
          this.created = true;
        });
    this.getAllStudiesPrograms();
  }

    onEdit(sp: StudiesProgram) {
        
    }

  onDelete(sp: StudiesProgram) {
    
  }
}
