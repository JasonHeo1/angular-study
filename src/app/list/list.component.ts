import { student } from './../model/student';
import { Component, OnInit, NgModule } from "@angular/core";
import { SelectItem } from "primeng/api";
import { Observable, fromEvent } from 'rxjs';
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
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"],
})
export class ListComponent implements OnInit {
  constructor(private boeService: BoeService) {
  }

  ngOnInit(): void{
    //return this.boeService.getAllStudents().subscribe();

    fromEvent(document.getElementById('search_btn'), 'click').subscribe( it => {
      this.getAllStudents();
  });
}

getAllStudents() {
  this.boeService.getAllStudents().subscribe(
    data => {
      console.log(data);
    },
    error => {
      console.log('error');
    }
  )
}
}
