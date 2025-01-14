import { Component, OnDestroy } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Constants } from 'src/app/shared/utils/constants';
import { takeWhile } from 'rxjs';
import { Utils } from '../../shared/utils/utils';

@Component({
  selector: 'app-park-header',
  templateUrl: './park-header.component.html',
  styleUrls: ['./park-header.component.scss'],
})
export class ParkHeaderComponent implements OnDestroy {
  public parkName;
  public subAreaName;
  public date;
  public utils = new Utils();
  public subscriptions: any[] = [];
  public alive = true;

  constructor(protected dataService: DataService) {
    this.subscriptions.push(
      this.dataService
        .getItemValue(Constants.dataIds.FORM_PARAMS)
        .pipe(takeWhile(() => this.alive))
        .subscribe((res) => {
          if (res) {
            this.parkName = res.parkName;
            this.subAreaName = res.subAreaName;
            this.date = res.date
              ? this.utils.convertYYYYMMToMMMMYYYY(res.date)
              : '-';
          }
        })
    );
  }
  ngOnDestroy() {
    this.alive = false;
    for (let i = 0; i < this.subscriptions.length; i++) {
      this.subscriptions[i]?.unsubscribe();
    }
  }
}
