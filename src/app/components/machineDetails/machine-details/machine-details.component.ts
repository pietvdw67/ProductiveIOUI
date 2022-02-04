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
  addId :string = '';
  addName:string = '';

  constructor(private http:HttpClient) { }

  ngOnInit(): void {

    this.fetchItemDetails();

    console.log(this.machineDetailItemModules.length);
  }

  private fetchItemDetails(){    
    const REQUEST_URL = "http://127.0.0.1:8080/machinedetails/v1";

    this.http.get<any>(REQUEST_URL).subscribe(data => { 
      this.machineDetailItemModules = data;      
    });    
  }

  canAdd():boolean{
    
    if (this.addId && !isNaN(parseInt(this.addId)) && this.addName){      
      return true;
    }

    return false;
  }

  onEditClick(){

  }

  onAddClick(){
    this.http.post<any>('http://127.0.0.1:8080/machinedetails/v1', { id: this.addId, name: this.addName }).subscribe(data => {

      alert(`Machine: ${this.addName} added`);
      this.addId="";
      this.addName="";

      this.fetchItemDetails();

        
    })
  }

}
