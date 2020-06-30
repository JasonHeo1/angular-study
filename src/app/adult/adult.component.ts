import { Component, OnInit, Input } from '@angular/core';
import { AdultRadio } from './../model/adultRadio';
import { Output, EventEmitter } from '@angular/core';
import { from } from 'rxjs';

@Component({
  selector: 'app-adult',
  templateUrl: './adult.component.html',
  styleUrls: ['./adult.component.css'],
})
export class AdultComponent implements OnInit {
  @Input() selectedValue = 1;
  @Output() adultSelected = new EventEmitter<AdultRadio>();

  // 组件主数据
  adultGroup = 'adult';

  adultRadioValues = [
    new AdultRadio(1, 'All'),
    new AdultRadio(2, 'Only Adult'),
    new AdultRadio(3, 'Only Not Adult'),
  ];

  // selectedValue = 1;

  constructor() {}

  ngOnInit(): void {}

  onClick(param: number) {
    this.adultSelected.emit(this.adultRadioValues[param]);
  }
}
