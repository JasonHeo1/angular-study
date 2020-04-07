import { Component, OnInit } from "@angular/core";

import { InputTextModule } from "primeng/inputtext";
import { DropdownModule } from "primeng/dropdown";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.css"],
})
export class SearchComponent implements OnInit {
  //组件主数据
  name;

  //组件非主数据
  namePlaceholder = "请输入名字";

  constructor() {}

  ngOnInit(): void {}

  onBlur() {
    alert("The  value : " + this.name);
  }
}
