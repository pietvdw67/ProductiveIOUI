import { Component, OnInit, Input } from '@angular/core';

import { DataViewServiceService } from 'src/app/dataView/service/data-view-service.service';
import { TotalDashboardItem } from 'src/app/dashboard/totalDashboard/model/TotalDashboardItem';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-item',
  templateUrl: './dashboard-item.component.html',
  styleUrls: ['./dashboard-item.component.scss']
})
export class DashboardItemComponent implements OnInit {

  @Input() machineid: number;
  machineName;
  lastUpdate;
  totalForDay;
  lastUpdateAmount;
  average;
  currentAverage;
  margin;
  operatorName;
  inativeHours;
  note;
  showNote:boolean = false;

  constructor(private dataViewServiceService : DataViewServiceService,private router: Router) { 

  }

  ngOnInit(): void {

    let totalDashboardItems = this.dataViewServiceService.totalDashboardGet();
    let dashboardItem : TotalDashboardItem;
    for (let i = 0; i < totalDashboardItems.length; i++ ){
      if (totalDashboardItems[i].id == this.machineid){
        dashboardItem = totalDashboardItems[i];
      }
    }

    this.machineName = dashboardItem.machineName;
    this.lastUpdate = dashboardItem.lastUpdate;
    this.totalForDay = dashboardItem.totalForDay;
    this.lastUpdateAmount = dashboardItem.lastUpdateAmount;
    this.average = dashboardItem.average;
    this.margin = dashboardItem.margin      
    this.operatorName = dashboardItem.operatorName;  
    this.currentAverage = dashboardItem.currentAverage;
    this.inativeHours = dashboardItem.inativeHours;
    this.note = dashboardItem.note;
  }

  getClass(){

    if (this.lastUpdateAmount == 0){
      return 'inactive';
    }

    if ( (this.lastUpdateAmount >= this.average + this.margin)){
      return 'above';
    } else {
      return 'below';
    }
  }

  btnDetailClickedHandler() { 
    this.router.navigate(['/detail','today',this.machineid]);
  }

  btnHistoryClickedHandler() {
    this.router.navigate(['/history',this.machineid,'']);
  }

  hasNote():boolean {
    if (this.note){
      return true;
    } else {
      return false;
    }
  }

  onShowNoteClick(){
    this.showNote = !this.showNote;
  }



}
