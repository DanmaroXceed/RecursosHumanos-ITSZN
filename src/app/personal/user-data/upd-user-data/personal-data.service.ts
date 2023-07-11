import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient, HttpEvent, HttpParams, HttpRequest} from "@angular/common/http";
import {PersonalData} from "../../../../models/PersonalData";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PersonalDataService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public addPersonalData (email: string, pd: PersonalData, curpfile: File): Observable<any>{
    const body = JSON.stringify(pd);
    let objectsToSend:FormData = new FormData();
    objectsToSend.append('email', email);
    objectsToSend.append('userProfile', body);
    objectsToSend.append('curpfile', curpfile, curpfile.name);
    return this.http.post<PersonalData>(`${this.apiServerUrl}/api/v1/registration/userprofile/add/${email}`, objectsToSend);
  }
/*
  public addCurpFile(email:string, curp:File): Observable<HttpEvent<{}>>{
    const data: FormData = new FormData();
    data.append('file', curp);
    const newRequest = new HttpRequest('POST', `${this.apiServerUrl}/api/v1/registration/userprofile/${email}/uploadCurp`, curp);
    return this.http.request(newRequest);
  }


  public createCurp(id: number, curp: File ): Observable<HttpEvent<{ }>>{
    const data: FormData = new FormData();
    data.append('file', curp);
    const newRequest = new HttpRequest('POST', `${this.apiServerUrl}/api/v1/registration/userprofile/upload/${id}/curp`, curp);
    return this.http.request(newRequest);
  }
  */
}
