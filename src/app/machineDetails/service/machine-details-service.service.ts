import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { AppSettings } from 'src/app/settings/AppSettings';
import { MachineDetail } from '../model/MachineDetail';

const MACHINE_DETAIL_URL = 'machinedetails/v1';

@Injectable({
  providedIn: 'root'
})
export class MachineDetailsServiceService {

  private machineDetails: MachineDetail[] = [];

  constructor(private http: HttpClient) {
  }

  getMachineDetails(): MachineDetail[] {
    return this.machineDetails;
  }

  refreshMachineDetails() {
    const REQUEST_URL = AppSettings.ENDPOINT + MACHINE_DETAIL_URL;

    this.http.get<any>(REQUEST_URL).subscribe(data => {
      this.machineDetails = data;
      this.machineDetails.sort();   

    });    
  }

  postMachineDetails(machineDetail:MachineDetail){
    this.http.post<any>(AppSettings.ENDPOINT + MACHINE_DETAIL_URL, { id: machineDetail.id, name: machineDetail.name }).subscribe(data => {
      this.refreshMachineDetails();        
    })

  }

  deleteMachineDetails(machineDetail:MachineDetail){
    this.http.delete<any>(AppSettings.ENDPOINT + MACHINE_DETAIL_URL + '/' + machineDetail.id).subscribe(data => {
      this.refreshMachineDetails();        
    })

  }

  
}

