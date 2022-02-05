import { Injectable } from '@angular/core';
import { MachineDetail } from '../machineDetails/model/MachineDetail';
import { MachineDetailsServiceService } from '../machineDetails/service/machine-details-service.service';

const MACHINE_DETAIL_KEY = 'MachineDetail';

@Injectable({
  providedIn: 'root'
})
export class AppLoaderService {

  private machineDetail: MachineDetail[] = [];

  constructor(private machineDetailsServiceService: MachineDetailsServiceService) {

  }

  initializeApp() {
    console.log("App initializing");

    if (!sessionStorage.getItem(MachineDetailsServiceService.MACHINE_DETAIL_KEY)) {
      console.log('Initializing machinedetails session cache');
      this.machineDetailsServiceService.refreshMachineDetails();
    }

  }



}
