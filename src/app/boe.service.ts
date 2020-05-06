
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BoeService {


  //Domain
  BoeServiceDomain = "http://localhost:8080";

  //All Data service url
  AllData = "/boe/all";

  //Data
  student = [];

  constructor(
    private http: HttpClient
  ) { }

  getAllStudents() {

    return this.http.get(this.BoeServiceDomain + this.AllData);

  }

}


