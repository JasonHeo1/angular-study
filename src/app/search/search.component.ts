import { searchParam } from './../model/searchParam';
import { BoeService } from './../boe.service';
import { SelectItem } from "primeng/api";
import { Component, OnInit } from "@angular/core";

import { InputTextModule } from "primeng/inputtext";
import { DropdownModule } from "primeng/dropdown";

// interface Sex {
//   sexName: string;
//   code: string;
// }
@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.css"],
})
export class SearchComponent implements OnInit {
  //组件主数据
  // name: string = '';
  // gender: Sex;

  //组件非主数据
  namePlaceholder = '请输入名字';

  //性别选项
  genderList = [
    { sexName: '全部', code: ''},
    { sexName: '男', code: 'M' },
    { sexName: '女', code: 'F' },
  ];

  name = '';
  gender = this.genderList[0];

  constructor(private boeService: BoeService) {
    // this.genderList = [
    //   { sexName: '全部', code: ''},
    //   { sexName: '男', code: 'M' },
    //   { sexName: '女', code: 'F' },
    // ];


  }

  ngOnInit(): void {
    // this.gender = this.genderList[0];
  }

  onClickSearch() {
    //  this.boeService.getAllStudents().subscribe();

    //Search keyword
    let param = new searchParam();
    param.name = this.name;
    param.gender = this.gender.code;

    this.boeService.doSearch(param);
  }
}
