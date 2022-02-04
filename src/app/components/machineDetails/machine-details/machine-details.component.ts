import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MachineDetailItemModule } from "src/app/model/machine-detail-item/machine-detail-item.module";

@Component({
  selector: 'app-machine-details',
  templateUrl: './machine-details.component.html',
  styleUrls: ['./machine-details.component.scss']
})
export class MachineDetailsComponent implements OnInit {

  machineDetailItemModules : MachineDetailItemModule[] = [];

  constructor(private http:HttpClient) { }

  ngOnInit(): void {

    this.fetchItemDetails();

    console.log(this.machineDetailItemModules.length);
  }

  private fetchItemDetails(){    
    const REQUEST_URL = "http://127.0.0.1:8080/machinedetails/v1";

    this.http.get<any>(REQUEST_URL).subscribe(data => { 
      this.machineDetailItemModules = data;      
      console.log(this.machineDetailItemModules.length);
    });    
  }

}
