import { Injectable } from '@angular/core';

import { MachineDetail } from 'src/app/machineDetails/model/MachineDetail';

import { HistoryView } from 'src/app/history/model/HistoryView';
import { DetailView } from 'src/app/details/model/DetailView';

import { MachineDetailsServiceService } from 'src/app/machineDetails/service/machine-details-service.service';
import { HistoryService } from 'src/app/history/service/history.service';
import { DetailService } from 'src/app/details/service/detail.service';
import { TotalDashboardServiceService } from 'src/app/dashboard/totalDashboard/service/total-dashboard-service.service';
import { TotalDashboardItem } from 'src/app/dashboard/totalDashboard/model/TotalDashboardItem';

@Injectable({
  providedIn: 'root'
})
export class DataViewServiceService {

  constructor(private machineDetailsServiceService : MachineDetailsServiceService,
    private historyService :HistoryService,
    private detailService:DetailService,
    private totalDashboardService : TotalDashboardServiceService) {   }

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

  historyDownloadReportById(id:number){
    this.historyService.downloadReportById(id);
  }

  historyDownloadReportByDate(countDate: string){
    this.historyService.downloadReportByDate(countDate);
  }

  detailRefresh(countDate: string,machineId:number,callback:any){
    this.detailService.refreshDetails(countDate,machineId,callback);
  }

  detailGet(){
    return this.detailService.getDetails();
  }

  detailsDownloadReport(countDate:string,machineId:number){
    this.detailService.downloadReport(countDate,machineId);
  }

  totalDashboardRefresh(){
    this.totalDashboardService.refreshMachineDetails();
  }

  totalDashboardGet(): TotalDashboardItem[] {
    return this.totalDashboardService.getTotalDashboardItems();
  }
  
}
