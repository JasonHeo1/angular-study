import { SearchParam } from './../model/searchParam';
import { Student } from './../model/student';
import { Component, OnInit, NgModule } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { Observable, fromEvent } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { BoeService } from '../boe.service';

interface City {
  name: string;
  code: string;
}

// export interface Car {
//   vin;
//   year;
//   brand;
//   color;
// }
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  // 学生数据
  students: Student[];

  constructor(private boeService: BoeService) {}

  ngOnInit(): void {
    // return this.boeService.getAllStudents().subscribe();

    //   fromEvent(document.getElementById('search_btn'), 'click').subscribe( it => {
    //     this.getAllStudents();
    // });

    // this.boeService.searchObservable.subscribe(param => alert(`${param.name} + '/  ${param.gender}`));
    this.boeService.searchObservable.subscribe((param) => {
      console.log(`${param.name} + '/  ${param.gender}`);
      this.getStudentByNameAndGender(param);
    });
  }

  getStudentByNameAndGender(param: SearchParam) {
    this.boeService
      .getStudentByNameAndGender(param)
      // .pipe(
      //   filter(),
      //   map(),
      // )
      // 过滤逻辑 pipe map filter
      .pipe(map((item) => item.filter((one) => one.gender === 'F')))
      .subscribe(
        (data) => {
          console.log(data);
          // this.students = <student[]> data;
          // this.students = data as student[];
          this.students = data;
        },
        (error) => {
          console.log('error');
        }
      );
  }

  getAllStudents(param: SearchParam) {
    this.boeService
      .getAllStudents()
      // .pipe(
      //   filter(),
      //   map(),
      // )
      .subscribe(
        (data) => {
          console.log(data);
          // this.students = <student[]> data;
          this.students = data as Student[];
        },
        (error) => {
          console.log('error');
        }
      );
  }
}
