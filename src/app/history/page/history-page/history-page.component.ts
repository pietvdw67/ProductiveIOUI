import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DataViewServiceService } from 'src/app/dataView/service/data-view-service.service';

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit {

  machineId: string;
  machineName: string;
  countDate: string;
  title:string;

  constructor(private route: ActivatedRoute, private dataViewService: DataViewServiceService) { }

  ngOnInit(): void {
    let machineId = this.route.snapshot.paramMap.get('machineId');
    if (machineId) {
      this.machineId = machineId;
    } else {
      this.machineId = '';
    }

    let countDate = this.route.snapshot.paramMap.get('countDate');
    if (countDate) {
      this.countDate = countDate;
    } else {
      this.countDate = '';
    }

    if (this.machineId){
      this.machineName = this.dataViewService.machineDetailNameFromId(parseInt(this.machineId));
    }

    if (this.machineId == 'none' && this.countDate != 'none'){     
      this.title = 'History for: ' + this.countDate;
    }

    if (this.machineId.length>0 && this.countDate.length==0){      
      this.title = 'History for Machine: ' + this.machineName;  
    } 
  }

}
