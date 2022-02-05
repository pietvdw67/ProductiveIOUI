import { Injectable } from '@angular/core';

import { MachineDetail } from 'src/app/machineDetails/model/MachineDetail';
import { Detail } from 'src/app/details/model/Detail';
import { HistoryView } from 'src/app/history/model/HistoryView';

import { MachineDetailsServiceService } from 'src/app/machineDetails/service/machine-details-service.service';
import { HistoryService } from 'src/app/history/service/history.service';

@Injectable({
  providedIn: 'root'
})
export class DataViewServiceService {

  constructor(private machineDetailsServiceService : MachineDetailsServiceService,
    private historyService :HistoryService) { 

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

  machineDetailNameFromId(id:number):string{
    return this.machineDetailsServiceService.getMachineNameFromId(id);
  }

  historyGet() : HistoryView[] {
    return this.historyService.getHistory();
  }

  historyRefreshById(id:number){
    this.historyService.refreshHistoryByMachineId(id);
  }

  historyRefreshByCountDate(countDate:string){
    this.historyService.refreshHistoryByCountDate(countDate);
  }
  
}
