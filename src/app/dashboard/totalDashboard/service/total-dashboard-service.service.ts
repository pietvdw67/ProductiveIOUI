import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { AppSettings } from 'src/app/settings/AppSettings';
import { TotalDashboardItem } from 'src/app/dashboard/totalDashboard/model/TotalDashboardItem';

const TOTAL_DASHBOARD_URL = 'totalDashboard/v1';

@Injectable({
  providedIn: 'root'
})
export class TotalDashboardServiceService {

  private totalDashboardItems : TotalDashboardItem[] =[];
  
  constructor(private http: HttpClient) { }

  refreshMachineDetails() {
    const REQUEST_URL = AppSettings.ENDPOINT + TOTAL_DASHBOARD_URL;

    this.http.get<any>(REQUEST_URL).subscribe(data => {
      this.totalDashboardItems = data;          
    });
  }

  public getTotalDashboardItems(){
    return this.totalDashboardItems;
  }
}
