import { Component, OnInit } from '@angular/core';

import { MachineDetail } from 'src/app/machineDetails/model/MachineDetail';
import { DataViewServiceService } from 'src/app/dataView/service/data-view-service.service';

@Component({
  selector: 'app-machine-detail',
  templateUrl: './machine-detail.component.html',
  styleUrls: ['./machine-detail.component.scss']
})
export class MachineDetailComponent implements OnInit {
   
  addId :string = '';
  addName:string = '';
  editId : string = '';
  editName : string = '';
  editAverage : string = '';
  editMargin : string = '';  

  constructor(private dataViewServiceService :DataViewServiceService) { }

  ngOnInit(): void {
    this.dataViewServiceService.machineDetailsRefresh();        
  }

  canAdd():boolean{
    
    if (this.addId && !isNaN(parseInt(this.addId)) && this.addName){      
      return true;
    }

    return false;
  }

  canEdit():boolean{
    if (this.editId && !isNaN(parseInt(this.editId)) && this.editName){      
      return true;
    }

    return false;
  }

  canDisplayEditControls(){
    if (this.editId && !isNaN(parseInt(this.editId))){
      return true;
    } else {
      return false;
    }
  }

  onEditClick(){
    let machineDetail = new MachineDetail();
    machineDetail.id = parseInt(this.editId);
    machineDetail.name = this.editName;
    
    if (!isNaN(parseInt(this.editAverage))){
      machineDetail.averageval = parseInt(this.editAverage);
    } else {
      machineDetail.averageval = 0;
    }

    if (!isNaN(parseInt(this.editMargin))){
      machineDetail.marginval = parseInt(this.editMargin);
    } else {
      machineDetail.marginval = 0;
    }


    this.dataViewServiceService.machineDetailsPost(machineDetail);
  }

  onDeleteClick(){
    let machineDetail = new MachineDetail();
    machineDetail.id = parseInt(this.editId);
    
    this.dataViewServiceService.machineDetailsDelete(machineDetail);

    this.editName = '';
  }

  onSelectionChange(){
    
    if (this.editId){
      for (let i = 0 ; i < this.dataViewServiceService.machineDetailsGet().length;i++){
        if (this.dataViewServiceService.machineDetailsGet()[i].id == parseInt(this.editId)){
          this.editName = this.dataViewServiceService.machineDetailsGet()[i].name;

          if (this.dataViewServiceService.machineDetailsGet()[i].averageval){
            this.editAverage = String(this.dataViewServiceService.machineDetailsGet()[i].averageval);
          } else {
            this.editAverage = '0';
          }

          if (this.dataViewServiceService.machineDetailsGet()[i].marginval){
            this.editMargin = String(this.dataViewServiceService.machineDetailsGet()[i].marginval);
          } else {
            this.editMargin = '0';
          }

        }
      }
    }
  }

  onAddClick(){
    let machineDetail = new MachineDetail();
    machineDetail.id = parseInt(this.addId);
    machineDetail.name = this.addName;

    this.dataViewServiceService.machineDetailsPost(machineDetail);

    this.addId = '';
    this.addName = '';
  }

  machineDetailsGet():MachineDetail[]{
    return this.dataViewServiceService.machineDetailsGet();
  }

}
