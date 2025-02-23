import { ChangeDetectorRef, Component } from '@angular/core';
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
import { ValidationService } from 'src/app/services/validation.service';

@Component({
  selector: 'app-frontcountry-camping',
  templateUrl: './frontcountry-camping.component.html',
  styleUrls: ['./frontcountry-camping.component.scss'],
})
export class FrontcountryCampingComponent extends BaseFormComponent {
  public partyAttendanceTotal: formulaResult = { result: null, formula: '' };
  public vehicleAttendanceTotal: formulaResult = { result: null, formula: '' };
  public partyRevenueTotal: formulaResult = { result: null, formula: '' };
  public vehicleRevenueTotal: formulaResult = { result: null, formula: '' };
  public otherRevenueTotal: formulaResult = { result: null, formula: '' };

  constructor(
    protected formBuilder: FormBuilder,
    protected formService: FormService,
    protected dataService: DataService,
    protected router: Router,
    protected subAreaService: SubAreaService,
    protected formulaService: FormulaService,
    protected loadingService: LoadingService,
    protected validationService: ValidationService,
    protected changeDetectior: ChangeDetectorRef
  ) {
    super(
      formBuilder,
      formService,
      router,
      dataService,
      subAreaService,
      formulaService,
      loadingService,
      changeDetectior
    );
    // push existing form data to parent subscriptions
    this.subscriptions.push(
      this.dataService
        .getItemValue(Constants.dataIds.ACCORDION_FRONTCOUNTRY_CAMPING)
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
    (this.postObj['activity'] = 'Frontcountry Camping'),
      // initialize the form and populate with values if they exist.
      (this.form = new FormGroup({
        campingPartyNightsAttendanceStandardControl: new FormControl(
          {
            value: this.data.campingPartyNightsAttendanceStandard,
            disabled: this.loading,
          },
          this.validationService.counterFieldValidator()
        ),
        campingPartyNightsAttendanceSeniorControl: new FormControl(
          {
            value: this.data.campingPartyNightsAttendanceSenior,
            disabled: this.loading,
          },
          this.validationService.counterFieldValidator()
        ),
        campingPartyNightsAttendanceSocialControl: new FormControl(
          {
            value: this.data.campingPartyNightsAttendanceSocial,
            disabled: this.loading,
          },
          this.validationService.counterFieldValidator()
        ),
        campingPartyNightsAttendanceLongStayControl: new FormControl(
          {
            value: this.data.campingPartyNightsAttendanceLongStay,
            disabled: this.loading,
          },
          this.validationService.counterFieldValidator()
        ),
        campingPartyNightsRevenueGrossControl: new FormControl(
          {
            value: this.data.campingPartyNightsRevenueGross,
            disabled: this.loading,
          },
          this.validationService.moneyFieldValidator()
        ),
        secondCarsAttendanceStandardControl: new FormControl(
          {
            value: this.data.secondCarsAttendanceStandard,
            disabled: this.loading,
          },
          this.validationService.counterFieldValidator()
        ),
        secondCarsAttendanceSeniorControl: new FormControl(
          {
            value: this.data.secondCarsAttendanceSenior,
            disabled: this.loading,
          },
          this.validationService.counterFieldValidator()
        ),
        secondCarsAttendanceSocialControl: new FormControl(
          {
            value: this.data.secondCarsAttendanceSocial,
            disabled: this.loading,
          },
          this.validationService.counterFieldValidator()
        ),
        secondCarsRevenueGrossControl: new FormControl(
          {
            value: this.data.secondCarsRevenueGross,
            disabled: this.loading,
          },
          this.validationService.moneyFieldValidator()
        ),
        otherRevenueGrossSaniControl: new FormControl(
          {
            value: this.data.otherRevenueGrossSani,
            disabled: this.loading,
          },
          this.validationService.moneyFieldValidator()
        ),
        otherRevenueElectricalControl: new FormControl(
          {
            value: this.data.otherRevenueElectrical,
            disabled: this.loading,
          },
          this.validationService.moneyFieldValidator()
        ),
        otherRevenueShowerControl: new FormControl(
          {
            value: this.data.otherRevenueShower,
            disabled: this.loading,
          },
          this.validationService.moneyFieldValidator()
        ),
        varianceNotesControl: new FormControl({
          value: this.data.notes,
          disabled: this.loading,
        }),
      })),
      // link form controls to the object fields they represent
      (this.fields = {
        campingPartyNightsAttendanceStandard: this.form.get(
          'campingPartyNightsAttendanceStandardControl'
        ),
        campingPartyNightsAttendanceSenior: this.form.get(
          'campingPartyNightsAttendanceSeniorControl'
        ),
        campingPartyNightsAttendanceSocial: this.form.get(
          'campingPartyNightsAttendanceSocialControl'
        ),
        campingPartyNightsAttendanceLongStay: this.form.get(
          'campingPartyNightsAttendanceLongStayControl'
        ),
        campingPartyNightsRevenueGross: this.form.get(
          'campingPartyNightsRevenueGrossControl'
        ),
        secondCarsAttendanceStandard: this.form.get(
          'secondCarsAttendanceStandardControl'
        ),
        secondCarsAttendanceSenior: this.form.get(
          'secondCarsAttendanceSeniorControl'
        ),
        secondCarsAttendanceSocial: this.form.get(
          'secondCarsAttendanceSocialControl'
        ),
        secondCarsRevenueGross: this.form.get('secondCarsRevenueGrossControl'),
        otherRevenueGrossSani: this.form.get('otherRevenueGrossSaniControl'),
        otherRevenueElectrical: this.form.get('otherRevenueElectricalControl'),
        otherRevenueShower: this.form.get('otherRevenueShowerControl'),
        notes: this.form.get('varianceNotesControl'),
      });

    this.calculateTotals();
    super.subscribeToChanges(() => {
      this.calculateTotals();
    });
  }

  calculateTotals() {
    this.partyAttendanceTotal =
      this.formulaService.frontcountryCampingPartyAttendance(
        [
          this.fields.campingPartyNightsAttendanceStandard.value,
          this.fields.campingPartyNightsAttendanceSenior.value,
          this.fields.campingPartyNightsAttendanceSocial.value,
          this.fields.campingPartyNightsAttendanceLongStay.value,
        ],
        this.data?.config?.attendanceModifier
      );
    this.vehicleAttendanceTotal =
      this.formulaService.frontcountryCampingSecondCarAttendance([
        this.fields.secondCarsAttendanceStandard.value,
        this.fields.secondCarsAttendanceSenior.value,
        this.fields.secondCarsAttendanceSocial.value,
      ]);
    this.partyRevenueTotal = this.formulaService.basicNetRevenue([
      this.fields.campingPartyNightsRevenueGross.value,
    ]);
    this.vehicleRevenueTotal = this.formulaService.basicNetRevenue([
      this.fields.secondCarsRevenueGross.value,
    ]);
    this.otherRevenueTotal = this.formulaService.basicNetRevenue([
      this.fields.otherRevenueGrossSani.value,
      this.fields.otherRevenueElectrical.value,
      this.fields.otherRevenueShower.value,
    ]);
  }

  async onSubmit() {
    await super.submit();
  }
}
