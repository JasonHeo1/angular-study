import { BoeService } from './../boe.service';
import { SelectItem } from "primeng/api";
import { Component, OnInit } from "@angular/core";

import { InputTextModule } from "primeng/inputtext";
import { DropdownModule } from "primeng/dropdown";

interface Sex {
  sexName: string;
  code: string;
}
@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.css"],
})
export class SearchComponent implements OnInit {
  //组件主数据
  name;
  gender: Sex;

  //组件非主数据
  namePlaceholder = '请输入名字';

  genderList: Sex[];

  constructor(
    private boeService: BoeService
  ) {
    this.genderList = [
      { sexName: '男', code: 'M' },
      { sexName: '女', code: 'F' },
    ];

    this.gender = this.genderList[0];
  }

  ngOnInit(): void {}

  onBlur() {
    alert("The  value : " + this.name+'  '+this.gender.sexName);

  }

  onClickSearch() {
     this.boeService.getAllStudents().subscribe();
  }
}
