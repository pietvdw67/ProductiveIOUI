import { Injectable } from '@angular/core';

import { MachineDetail } from 'src/app/machineDetails/model/MachineDetail';
import { MachineDetailsServiceService } from 'src/app/machineDetails/service/machine-details-service.service';

@Injectable({
  providedIn: 'root'
})
export class DataViewServiceService {

  constructor(private machineDetailsServiceService : MachineDetailsServiceService) { 

  }

  machineDetailsGet() : MachineDetail[] {
    return this.machineDetailsServiceService.getMachineDetails();
  }

  machineDetailsRefresh() {
    this.machineDetailsServiceService.refreshMachineDetails();
  }

  machineDetailsPost(machineDetail:MachineDetail) {
    this.machineDetailsServiceService.postMachineDetails(machineDetail);
  }

  machineDetailsDelete(machineDetail:MachineDetail){
    this.machineDetailsServiceService.deleteMachineDetails(machineDetail);
  }



  
}
