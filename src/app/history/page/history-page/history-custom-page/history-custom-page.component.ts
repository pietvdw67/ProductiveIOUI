import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormControl,ReactiveFormsModule} from '@angular/forms';

import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import * as _moment from 'moment';
const moment = _moment;

import { MachineDetailsServiceService} from 'src/app/machineDetails/service/machine-details-service.service';
import { MachineDetail } from 'src/app/machineDetails/model/MachineDetail';

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-history-custom-page',
  templateUrl: './history-custom-page.component.html',
  styleUrls: ['./history-custom-page.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class HistoryCustomPageComponent implements OnInit {

  doFilterMachine :boolean = false;
  selectedMachine : string;
  date = new FormControl(moment());

  constructor(private router: Router,private machineDetailsServiceService : MachineDetailsServiceService) { }

  ngOnInit(): void {
  }

  onSubmitClick(dateValue:string){

    let formattedDate = this.reformatDate(dateValue);

    // history for all machines for a date
    if (!this.doFilterMachine){   
      this.router.navigate(['/history','none',formattedDate]);
    } else {  

      // detail for the selected machine and date
      let machineId = this.getMachineId(this.selectedMachine);
      this.router.navigate(['/detail',formattedDate,machineId]);
    }
  }

  onChkFilterChange(){
    this.doFilterMachine = !this.doFilterMachine
  }

  doDisplayFilter(){
    return this.doFilterMachine;
  }

  private reformatDate(dateValue:string):string {
    let day = dateValue.substring(0,2);
    let month = dateValue.substring(3,5);
    let year = dateValue.substring(6,10);
    return year + '-' + month + '-' + day;
  }

  // Tempory until it get's replaced with names
  private getMachineId(selectedValue:string):string {

    return selectedValue;
  }

  getMachineDetails() : MachineDetail[] {
    return this.machineDetailsServiceService.getMachineDetails();

  }

}
