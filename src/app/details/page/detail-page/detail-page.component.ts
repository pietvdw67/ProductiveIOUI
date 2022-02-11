import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DataViewServiceService } from 'src/app/dataView/service/data-view-service.service';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.scss']
})
export class DetailPageComponent implements OnInit {

  machineId: string;
  machineName: string;
  countDate: string;
  title: string;

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

    if (this.countDate = 'none'){
      this.countDate = '';
    }

    if (this.machineId) {
      this.machineName = this.dataViewService.machineDetailNameFromId(parseInt(this.machineId));
    }

    if (this.machineId == 'none' && this.countDate != 'none') {
      this.title = 'Detals for: ' + this.countDate;
    } else if (this.machineId.length > 0 && this.countDate.length == 0) {
      this.title = 'Details for: ' + this.machineName;
    } else {
      this.title = 'Details for: ' + this.machineName + ' for date: ' + this.countDate
    }
  }

}
