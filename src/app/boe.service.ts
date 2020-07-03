import { AdultRadio } from './model/adultRadio';
import { SearchParam } from './model/SearchParam';
import { Student } from './model/Student';

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BoeService {
  // Domain
  BoeServiceDomain = 'http://localhost:8080';

  // By Name and Gender data
  SearchData = '/boe/students';

  // All Data service url
  AllData = '/boe/all';

  // Data
  StudentData: Student[];

  // Do search event observable
  private searchSource = new Subject<SearchParam>();
  searchObservable = this.searchSource.asObservable();

  // Do data filter event observable
  private filterSource = new Subject<AdultRadio>();
  filterObservable = this.filterSource.asObservable();

  constructor(private http: HttpClient) {}
  // DO search
  doSearch(param: SearchParam) {
    this.searchSource.next(param);
  }

  // DO filter
  doFilter(param: AdultRadio) {
    this.filterSource.next(param);
  }

  // 按照名字和性别查询信息
  getStudentByNameAndGender(param: SearchParam): Observable<Student[]> {
    // let searchKey = new HttpParams().set('NAME', param.name).set('GENDER', param.gender);
    let searchKey = new HttpParams();
    alert('name   ' + param.name + '  gender  ' + param.gender);
    searchKey = searchKey.set('NAME', param.name);
    searchKey = searchKey.set('GENDER', param.gender);

    return this.http.get<Student[]>(this.BoeServiceDomain + this.SearchData, {
      params: searchKey,
    });
  }

  // 获取全部学生信息
  getAllStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.BoeServiceDomain + this.AllData);
  }

  //保存学生信息
  saveStudents(param: Student[]): Observable<number> {
    return this.http.post<number>(
      this.BoeServiceDomain + this.SearchData,
      param
    );
  }
}
