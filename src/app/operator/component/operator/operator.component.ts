import { Component, OnInit } from '@angular/core';

import { OperatorItem } from 'src/app/operator/model/OperatorItem';
import { DataViewServiceService } from 'src/app/dataView/service/data-view-service.service';

@Component({
  selector: 'app-operator',
  templateUrl: './operator.component.html',
  styleUrls: ['./operator.component.scss']
})
export class OperatorComponent implements OnInit {

  addOperatorName:string = '';

  constructor(private dataViewServiceService :DataViewServiceService) { }

  ngOnInit(): void {
    this.dataViewServiceService.operatorsRefresh();
  }

  canAdd():boolean{
    
    if (this.addOperatorName){      
      return true;
    }

    return false;
  }

  onAddClick(){
    let operatorItem = new OperatorItem();
    
    operatorItem.operatorname = this.addOperatorName;

    this.dataViewServiceService.operatorPost(operatorItem);

    this.addOperatorName = '';    
  }

  onEditClick(id: number,operatorName:string,machineid:number){
    let operatorItem = new OperatorItem();
    operatorItem.id = id;
    operatorItem.operatorname = operatorName;

    if (machineid){
      operatorItem.machineid = machineid
    }

    this.dataViewServiceService.operatorPost(operatorItem);
 
  }

  onDeleteClick(id:number){
    let operatorItem = new OperatorItem();
    operatorItem.id = id;

    this.dataViewServiceService.operatorDelete(operatorItem);
  }

  operatorsGet():OperatorItem[]{
    return this.dataViewServiceService.operatorsGet();
  }

  machineDetailsGet(){
    return this.dataViewServiceService.machineDetailsGet();
  }

}
