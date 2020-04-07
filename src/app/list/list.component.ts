import { Component, OnInit, NgModule } from "@angular/core";
import { SelectItem } from "primeng/api";

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
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"],
})
export class ListComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
