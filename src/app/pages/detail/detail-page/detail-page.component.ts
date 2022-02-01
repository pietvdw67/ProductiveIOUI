import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.scss']
})
export class DetailPageComponent implements OnInit {

  machineId: string;
  countDate: string;
  pageTitle: string;

  constructor(private route: ActivatedRoute) { 
    this.machineId = "";
    this.countDate = "";
  }

  ngOnInit(): void {
    let machineId = this.route.snapshot.paramMap.get('machineId');
    if (machineId) {
      this.machineId = machineId;
    }

    let countDate = this.route.snapshot.paramMap.get('countDate');
    if (countDate) {
      this.countDate = countDate;
    }
  }

  getPageTitle(){
    return 'Details for machine: ' + this.machineId + ' for date: ' + this.countDate;
  }

}
