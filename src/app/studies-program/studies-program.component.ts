import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output} from '@angular/core';
import {StudiesProgram} from "../../models/StudiesProgram";
import {StudiesProgramService} from "./studies-program.service";
import {HttpErrorResponse} from "@angular/common/http";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-studies-program',
  templateUrl: './studies-program.component.html',
  styleUrls: ['./studies-program.component.css']
})
export class StudiesProgramComponent implements OnInit{

  public studiesprograms: StudiesProgram[]=[];
  public spToCreate: StudiesProgram = {} as StudiesProgram;
  public isModalVisible = false;
  spform : FormGroup;
  //subscription : Subscription=Subscription.EMPTY;

  ngOnInit(): void{
      this.isModalVisible=false;
      this.getAllStudiesPrograms();
  }

  get f(){
    return this.spform.controls;
  }

  constructor(private studiesProgramService: StudiesProgramService, private formBuilder:FormBuilder) {
    this.spform = this.formBuilder.group({
        studiesProgramName:['', Validators.required]
    });
  }

  public getAllStudiesPrograms():void {
    this.studiesProgramService.getAllStudiesProgram().subscribe(
        (response: StudiesProgram[])=>{this.studiesprograms = response;},
        (error:HttpErrorResponse)=>{alert(error.message)}
        );
  }

  onAdd(sp:StudiesProgram){
    this.studiesProgramService.addStudiesProgram(sp).subscribe(
    (data:any)=>{this.spToCreate = data;}
    );
  }

    onEdit(sp: StudiesProgram) {
      //this.spform.patchValue({studiesProgramName: sp.studiesProgramName});
      this.spform.get('studiesProgramName')?.setValue(sp.studiesProgramName);
      this.isModalVisible = true;
    }

  onDelete(id: number) {
    this.studiesProgramService.deleteStudiesProgram(id).subscribe(
      (data:any)=>{console.log(data);}
    );
  }

}
