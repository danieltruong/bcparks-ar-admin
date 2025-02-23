import { Component, OnDestroy } from '@angular/core';
import { takeWhile } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { FormulaService } from 'src/app/services/formula.service';
import { summarySection } from 'src/app/shared/components/accordion/summary-section/summary-section.component';
import { Constants } from 'src/app/shared/utils/constants';

@Component({
  selector: 'app-backcountry-camping-accordion',
  templateUrl: './backcountry-camping-accordion.component.html',
  styleUrls: ['./backcountry-camping-accordion.component.scss'],
})
export class BackcountryCampingAccordionComponent implements OnDestroy {
  private alive = true;
  private subscriptions: any[] = [];

  public icons = Constants.iconUrls;
  public data;
  public summaries: summarySection[] = [];

  constructor(
    protected dataService: DataService,
    protected formulaService: FormulaService
  ) {
    dataService
      .getItemValue(Constants.dataIds.ACCORDION_BACKCOUNTRY_CAMPING)
      .pipe(takeWhile(() => this.alive))
      .subscribe((res) => {
        this.data = res;
        this.buildAccordion();
      });
  }

  buildAccordion() {
    this.summaries = [
      {
        attendanceItems: [
          {
            itemName: 'People',
            value: this.data?.people,
          },
        ],
        revenueLabel: 'Net Revenue',
        revenueItems: [
          {
            itemName: 'Gross camping revenue',
            value: this.data?.grossCampingRevenue,
          },
        ],
        revenueTotal: this.formulaService.basicNetRevenue([
          this.data?.grossCampingRevenue,
        ]),
      },
    ];
  }

  ngOnDestroy() {
    this.alive = false;
    for (let i = 0; i < this.subscriptions.length; i++) {
      this.subscriptions[i].unsubscribe();
    }
  }
}
