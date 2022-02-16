import { Component, OnInit,Input } from '@angular/core';
import { DataViewServiceService } from 'src/app/dataView/service/data-view-service.service';

@Component({
  selector: 'app-current-total',
  templateUrl: './current-total.component.html',
  styleUrls: ['./current-total.component.scss']
})
export class CurrentTotalComponent implements OnInit {

  currentCount : number;

  private setMachineId;
  private setCountDate;

  constructor(private dataViewService: DataViewServiceService) { }

  ngOnInit(): void {
  }

  @Input() set machineId(machineid:number){
    this.setMachineId = machineid;
    this.getCurrentCount();    
  }

  @Input() set countDate(countdate:string){
    this.setCountDate = countdate;
    this.getCurrentCount(); 
  }

  private getCurrentCount(){

    // ensure that the setters for both values has executed in html attributes
    if (!this.setMachineId || !this.setCountDate){
      return;
    }

    this.dataViewService.detailCurrentTotal(this.setCountDate,this.setMachineId,(currentCount) => {
      this.currentCount = currentCount;
    })
  }    

}
