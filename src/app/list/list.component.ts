import { AdultRadio } from './../model/adultRadio';
import { SearchParam } from './../model/searchParam';
import { Student } from './../model/student';
import { Component, OnInit, NgModule, EventEmitter } from '@angular/core';
import { SelectItem, MenuItem } from 'primeng/api';
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

  // 搜索条件
  searchKey: SearchParam;

  // 过滤条件
  filterCondition: AdultRadio;

  // 右键菜单
  items: MenuItem[];
  selectedStudent: Student;

  genderList = [
    { sexName: '男', code: 'M' },
    { sexName: '女', code: 'F' },
  ];

  // 弹窗
  displayDialog = false;
  title = '新建';
  mode = 1;
  targetStudent: Student = new Student();
  targetGender = this.genderList[0];

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

    // 初始化右键菜单
    this.items = [
      {
        label: '新建',
        icon: 'pi pi-search-plus',
        command: (event) => {
          this.openPopupWindow(1, null);
        },
      },
      {
        label: '修改',
        icon: 'pi pi-pencil',
        command: (event) => {
          this.openPopupWindow(2, this.selectedStudent);
        },
      },
      {
        label: '删除',
        icon: 'pi pi-trash',
        command: (event) => {
          this.deleteStudent(this.selectedStudent);
        },
      },
    ];
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

  openPopupWindow(mode: number, target: Student) {
    this.mode = mode;
    if (mode === 1) {
      this.title = '新建';
      this.targetStudent = new Student();
    } else {
      this.title = '修改';
      this.targetStudent = Object.assign({}, target);
      this.targetGender =
        this.targetStudent.gender === 'M'
          ? this.genderList[0]
          : this.genderList[1];
    }
    this.displayDialog = true;
  }

  onClickSave() {
    this.targetStudent.gender = this.targetGender.code;

    this.boeService.saveStudents([this.targetStudent]).subscribe(
      (data) => {
        alert(`成功保存 ${data}条数据`);
        this.displayDialog = false;
        // this.getAllStudents();
        this.getStudentByNameAndGender(this.searchKey);
        // document.getElementById('search_btn');
      },
      (error) => {
        alert(`成功失败 ${error}`);
      }
    );
  }

  onRowSelected(event, data) {
    // this.newCar = false;
    // alert('here!!!!!' + data);
    // this.targetStudent = this.cloneCar(data);
    this.openPopupWindow(2, data);
    this.displayDialog = true;
  }

  // cloneCar(c: Student): Student {
  //   let student = new Student();
  //   for (let prop in c) {
  //     student[prop] = c[prop];
  //   }
  //   return student;
  // }

  onClickDelete() {
    // alert('Delete!!');
    if (this.mode === 2) {
      this.boeService.deleteStudent(this.targetStudent).subscribe(
        (complete) => {
          alert(`学生 ${this.targetStudent.name} 删除成功！`);
          this.displayDialog = false;
          // this.getAllStudents();
          this.getStudentByNameAndGender(this.searchKey);
        },
        (error) => {
          alert('删除失败！');
        }
      );
    }
  }

  deleteStudent(target: Student) {
    this.boeService.deleteStudent(target).subscribe(
      (complete) => {
        alert(`学生 ${target.name} 删除成功！`);
        this.displayDialog = false;
        // this.getAllStudents();
        this.getStudentByNameAndGender(this.searchKey);
      },
      (error) => {
        alert('删除失败！');
      }
    );
  }

  getStudentByNameAndGender(param: SearchParam) {
    this.searchKey = param;
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

  getAllStudents() {
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
