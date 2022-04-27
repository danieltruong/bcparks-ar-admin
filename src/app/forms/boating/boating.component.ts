import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { takeWhile } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { FormService } from 'src/app/services/form.service';
import { SubAreaService } from 'src/app/services/sub-area.service';
import {
  formulaResult,
  FormulaService,
} from 'src/app/services/formula.service';
import { BaseFormComponent } from 'src/app/shared/components/forms/base-form/base-form.component';
import { Constants } from 'src/app/shared/utils/constants';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-boating',
  templateUrl: './boating.component.html',
  styleUrls: ['./boating.component.scss'],
})
export class BoatingComponent extends BaseFormComponent {
  public attendanceTotal: formulaResult = { result: null, formula: '' };
  public revenueTotal: formulaResult = { result: null, formula: '' };

  constructor(
    protected formBuilder: FormBuilder,
    protected formService: FormService,
    protected dataService: DataService,
    protected router: Router,
    protected subAreaService: SubAreaService,
    protected formulaService: FormulaService,
    protected loadingService: LoadingService
  ) {
    super(
      formBuilder,
      formService,
      router,
      dataService,
      subAreaService,
      formulaService,
      loadingService
    );
    // push existing form data to parent subscriptions
    this.subscriptions.push(
      this.dataService
        .getItemValue(Constants.dataIds.ACCORDION_BOATING)
        .pipe(takeWhile(() => this.alive))
        .subscribe((res) => {
          if (res) {
            this.data = res;
            this.setForm();
          }
        })
    );
    this.setForm();
  }

  setForm() {
    // declare activity type
    (this.postObj['activity'] = 'Boating'),
      // initialize the form and populate with values if they exist.
      (this.form = new FormGroup({
        boatAttendanceNightsOnDockControl: new FormControl(
          this.data.boatAttendanceNightsOnDock,
          Validators.pattern('^[0-9]*$')
        ),
        boatAttendanceNightsOnBouysControl: new FormControl(
          this.data.boatAttendanceNightsOnBouys,
          Validators.pattern('^[0-9]*$')
        ),
        boatAttendanceMiscellaneousControl: new FormControl(
          this.data.boatAttendanceMiscellaneous,
          Validators.pattern('^[0-9]*$')
        ),
        boatRevenueGrossControl: new FormControl(
          this.data.boatRevenueGross,
          Validators.pattern('/^-?(0|[1-9]d*)?$/')
        ),
        varianceNotesControl: new FormControl(this.data.notes),
      })),
      // link form controls to the object fields they represent
      (this.fields = {
        boatAttendanceNightsOnDock: this.form.get(
          'boatAttendanceNightsOnDockControl'
        ),
        boatAttendanceNightsOnBouys: this.form.get(
          'boatAttendanceNightsOnBouysControl'
        ),
        boatAttendanceMiscellaneous: this.form.get(
          'boatAttendanceMiscellaneousControl'
        ),
        boatRevenueGross: this.form.get('boatRevenueGrossControl'),
        notes: this.form.get('varianceNotesControl'),
      });

    if (this.loading) {
      this.disable();
    } else {
      // In case we init form after service is done fetching for some reason.
      this.enable();
    }

    this.calculateTotals();
    super.subscribeToChanges(() => {
      this.calculateTotals();
    });
  }

  calculateTotals() {
    (this.attendanceTotal = this.formulaService.boatingAttendance(
      [
        this.fields.boatAttendanceNightsOnDock.value,
        this.fields.boatAttendanceNightsOnBouys.value,
        this.fields.boatAttendanceMiscellaneous.value,
      ],
      this.data?.config?.attendanceModifier
    )),
      (this.revenueTotal = this.formulaService.basicNetRevenue([
        this.fields.boatRevenueGross.value,
      ]));
  }

  async onSubmit() {
    await super.submit();
  }
}
