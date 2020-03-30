import { CarServiceService } from "./../car-service.service";
import { Component, OnInit, NgModule } from "@angular/core";
import { SelectItem } from "primeng/api";

interface City {
  name: string;
  code: string;
}

export interface Car {
  vin;
  year;
  brand;
  color;
}
@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"]
})
export class ListComponent implements OnInit {
  cities1: SelectItem[];

  selectedCity1: City;

  cars: Car[];

  constructor(private carService: CarServiceService) {
    this.cities1 = [
      { label: "Select City", value: null },
      { label: "New York", value: { id: 1, name: "New York", code: "NY" } },
      { label: "Rome", value: { id: 2, name: "Rome", code: "RM" } },
      { label: "London", value: { id: 3, name: "London", code: "LDN" } },
      { label: "Istanbul", value: { id: 4, name: "Istanbul", code: "IST" } },
      { label: "Paris", value: { id: 5, name: "Paris", code: "PRS" } }
    ];
  }

  ngOnInit(): void {
    this.carService.getCarsSmall().then(data => {
      // window.console.log(data);
      this.cars = data;
    });
  }
}
