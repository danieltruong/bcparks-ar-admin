import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { formulaResult } from 'src/app/services/formula.service';

@Component({
  selector: 'app-other-day-use',
  templateUrl: './other-day-use.component.html',
  styleUrls: ['./other-day-use.component.scss']
})
export class OtherDayUseComponent implements OnInit {
  @Input() otherDayUseRevenueSkiiField = new FormControl;
  @Input() otherDayUseRevenueHotSpringsField = new FormControl;
  @Input() revenueTotal: formulaResult = {result: null, formula: ''};

  constructor() { }

  ngOnInit(): void {
  }

}
