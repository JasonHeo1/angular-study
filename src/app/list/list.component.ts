import { AdultRadio } from './../model/adultRadio';
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
  studentsBackup: Student[];

  // 过滤条件
  filterCondition: AdultRadio;

  constructor(private boeService: BoeService) {}

  ngOnInit(): void {
    // return this.boeService.getAllStudents().subscribe();

    //   fromEvent(document.getElementById('search_btn'), 'click').subscribe( it => {
    //     this.getAllStudents();
    // });

    // this.boeService.searchObservable.subscribe(param => alert(`${param.name} + '/  ${param.gender}`));
    // 订阅搜索事件
    this.boeService.searchObservable.subscribe((param) => {
      console.log(`${param.name} + '/  ${param.gender}`);
      this.getStudentByNameAndGender(param);
    });

    // 订阅过滤事件
    this.boeService.filterObservable.subscribe((param) => {
      console.log(`${param.name} + '/  ${param.code}`);
      this.filterCondition = param;
      this.filterStudents();
    });
  }

  filterStudents() {
    if (this.filterCondition === undefined || this.filterCondition.code === 1) {
      this.students = this.studentsBackup;
    } else if (this.filterCondition.code === 2) {
      this.students = this.studentsBackup.filter((item) => item.age > 18);
    } else if (this.filterCondition.code === 3) {
      this.students = this.studentsBackup.filter((item) => item.age <= 18);
    }
  }

  getStudentByNameAndGender(param: SearchParam) {
    this.boeService
      .getStudentByNameAndGender(param)
      // .pipe(
      //   filter(),
      //   map(),
      // )
      // 过滤逻辑 pipe map filter
      // .pipe(map((item) => item.filter((one) => one.gender === 'F')))
      .subscribe(
        (data) => {
          console.log(data);
          // this.students = <student[]> data;
          // this.students = data as student[];
          this.students = data;
          this.studentsBackup = data;
          this.filterStudents();
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
