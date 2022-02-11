import { Component, OnInit,OnDestroy } from '@angular/core';
import { interval, Subscription } from 'rxjs';

import { AppSettings } from 'src/app/settings/AppSettings';
import { DataViewServiceService } from 'src/app/dataView/service/data-view-service.service';
import { TotalDashboardItem } from 'src/app/dashboard/totalDashboard/model/TotalDashboardItem';

@Component({
  selector: 'app-total-dashboard-page',
  templateUrl: './total-dashboard-page.component.html',
  styleUrls: ['./total-dashboard-page.component.scss']
})
export class TotalDashboardPageComponent implements OnInit {

  private subscription;

  constructor(private dataViewServiceService : DataViewServiceService) { 
    dataViewServiceService.totalDashboardRefresh();
    
  }

  ngOnInit(): void {
    const source = interval(5000);
    this.subscription = source.subscribe(val => this.dataViewServiceService.totalDashboardRefresh());
  }

  getTotalDashboardItems(){
    return this.dataViewServiceService.totalDashboardGet();
  }

  ngOnDestroy() {
    this.subscription && this.subscription.unsubscribe();
  }

}
