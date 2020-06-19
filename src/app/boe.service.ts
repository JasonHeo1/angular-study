import { student } from './model/student';

import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BoeService {


  //Domain
  BoeServiceDomain: string = "http://localhost:8080";

  //All Data service url
  AllData:string = "/boe/all";

  //Data
  studentData: student[] = [];

  constructor(
    private http: HttpClient
  ) { }

  //获取全部学生信息
  getAllStudents(): Observable<Object> {

    return this.http.get<student[]>(this.BoeServiceDomain + this.AllData);

  }

}


