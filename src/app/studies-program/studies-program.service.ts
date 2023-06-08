import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {User} from "../../models/User";
import {Observable} from "rxjs";
import {StudiesProgram} from "../../models/StudiesProgram";

@Injectable({
  providedIn: 'root'
})
export class StudiesProgramService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getAllStudiesProgram(): Observable<StudiesProgram[]>{
    return this.http.get<StudiesProgram[]>(`${this.apiServerUrl}/api/v1/registration/studiesprogram/all`);
  }

  public addStudiesProgram(sp: StudiesProgram): Observable<StudiesProgram>{
    return this.http.post<StudiesProgram>(`${this.apiServerUrl}/api/v1/registration/studiesprogram/add`, sp);
  }
/*
  public updateStudiesProgram(sp: StudiesProgram): Observable<StudiesProgram>{
    return this.http.put<StudiesProgram>(`${this.apiServerUrl}/api/v1/registration/studiesprogram/update`, sp);
  }
*/
  public deleteStudiesProgram(id: number): Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/api/v1/registration/studiesprogram/delete/${id}`);
  }

}
