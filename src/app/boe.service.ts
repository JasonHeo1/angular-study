import { searchParam } from './model/searchParam';
import { student } from './model/student';

import { Injectable } from '@angular/core';
import {HttpClient , HttpParams} from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BoeService {


  //Domain
  BoeServiceDomain: string = "http://localhost:8080";

  //By Name and Gender data
  SearchData:string = "/boe/students";

  //All Data service url
  AllData:string = "/boe/all";


  //Data
  studentData: student[];

  //Do search event observable
  private searchSource = new Subject<searchParam>();
  searchObservable = this.searchSource.asObservable();

  constructor(private http: HttpClient) {

   }
   //DO search
   doSearch(param:searchParam) {
     this.searchSource.next(param);
   }

    //按照名字和性别查询信息
    getStudentByNameAndGender(param: searchParam): Observable<student[]> {

      // let searchKey = new HttpParams().set('NAME', param.name).set('GENDER', param.gender);
      let searchKey = new HttpParams();
      alert('name   ' + param.name + '  gender  ' + param.gender);
      searchKey = searchKey.set('NAME', param.name);
      searchKey = searchKey.set('GENDER', param.gender);


      return this.http.get<student[]>(this.BoeServiceDomain + this.SearchData, {params: searchKey});

    }

   //获取全部学生信息
  getAllStudents(): Observable<student[]> {

    return this.http.get<student[]>(this.BoeServiceDomain + this.AllData);

  }



}


