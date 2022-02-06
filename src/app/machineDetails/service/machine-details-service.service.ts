import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { AppSettings } from 'src/app/settings/AppSettings';
import { MachineDetail } from '../model/MachineDetail';

const MACHINE_DETAIL_URL = 'machinedetails/v1';

@Injectable({
  providedIn: 'root'
})
export class MachineDetailsServiceService {

  static MACHINE_DETAIL_KEY = 'MachineDetail';
  private machineDetails: MachineDetail[] = [];

  constructor(private http: HttpClient) {    
  }

  getMachineDetails(): MachineDetail[] {

    if (!this.machineDetails || this.machineDetails.length == 0){
      this.machineDetails = JSON.parse(sessionStorage.getItem(MachineDetailsServiceService.MACHINE_DETAIL_KEY));
    }

    return this.machineDetails;
  }

  refreshMachineDetails() {
    const REQUEST_URL = AppSettings.ENDPOINT + MACHINE_DETAIL_URL;

    this.http.get<any>(REQUEST_URL).subscribe(data => {
      this.machineDetails = data;
      this.machineDetails.sort();
      this.storeMachineDetails(this.machineDetails);

    });    
  }

  postMachineDetails(machineDetail:MachineDetail){

    console.log(`id: ${machineDetail.id}
    name: ${machineDetail.name}
    averageval:${machineDetail.averageval}
    marginval:${machineDetail.marginval}
    `);

    this.http.post<any>(AppSettings.ENDPOINT + MACHINE_DETAIL_URL, { 
      id: machineDetail.id, 
      name: machineDetail.name,
      averageval: machineDetail.averageval,
      marginval: machineDetail.marginval })
      .subscribe(data => {
      this.refreshMachineDetails();        
    })

  }

  deleteMachineDetails(machineDetail:MachineDetail){
    this.http.delete<any>(AppSettings.ENDPOINT + MACHINE_DETAIL_URL + '/' + machineDetail.id).subscribe(data => {
      this.refreshMachineDetails();        
    })
  }

  getMachineNameFromId(id:number):string {  

    this.getMachineDetails();

    if (this.machineDetails.length>0){
      for (let machineDetail of this.machineDetails){
        if (machineDetail.id == id){
          return machineDetail.name;
        }
      }
    }

    return String(id);
  }

  private storeMachineDetails(machineDetail:MachineDetail[]){
    sessionStorage.setItem(MachineDetailsServiceService.MACHINE_DETAIL_KEY,JSON.stringify(machineDetail));
  }

  
}

