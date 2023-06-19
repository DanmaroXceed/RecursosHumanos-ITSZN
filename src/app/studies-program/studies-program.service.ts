import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable, Subject} from "rxjs";
import {StudiesProgram} from "../../models/StudiesProgram";
//import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class StudiesProgramService {

  private apiServerUrl = environment.apiBaseUrl;
 // private _refresh$ = new Subject<void>();

  constructor(private http: HttpClient) { }
/*
  get refresh(){
    return this._refresh$;
  }
*/
  public getAllStudiesProgram(): Observable<StudiesProgram[]>{
    return this.http.get<StudiesProgram[]>(`${this.apiServerUrl}/api/v1/registration/studiesprogram/all`);
  }

  public addStudiesProgram(sp: StudiesProgram): Observable<StudiesProgram>{
    return this.http.post<StudiesProgram>(`${this.apiServerUrl}/api/v1/registration/studiesprogram/add`, sp);
        /*
        .pipe(
        tap(()=>{
          this._refresh$.next();
        })
         */
  }
/*
  public updateStudiesProgram(sp: StudiesProgram): Observable<StudiesProgram>{
    return this.http.put<StudiesProgram>(`${this.apiServerUrl}/api/v1/registration/studiesprogram/update`, sp);
  }
*/
  public deleteStudiesProgram(id: number): Observable<boolean>{
    return this.http.delete<boolean>(`${this.apiServerUrl}/api/v1/registration/studiesprogram/delete/${id}`);
  }

}
