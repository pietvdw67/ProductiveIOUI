import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { saveAs } from 'file-saver';

import { ColDef } from 'ag-grid-community';
import { DetailCellRendererComponent } from 'src/app/components/gridcomponents/detail-cell-renderer/detail-cell-renderer.component';

import { DataViewServiceService } from 'src/app/dataView/service/data-view-service.service';

import { HistoryView } from '../../model/HistoryView';

const MIME_TYPES = {
  xls: 'application/vnd.ms-excel',
  xlsx: 'application/vnc.openxmlformats-officedocument.spreadsheetxml.sheet'
}

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  machineId: string = '';
  countDate: string = '';
  byId:boolean = false;
  byDate:boolean = false;

  columnDefsById: ColDef[] = [
    {
      field: 'countdate',
      headerName: 'Date'      
    },
    {
      field: 'countamount',
      headerName: 'Amount',
      sortable: true
    },
    { headerName: '',  
      valueGetter: dateAndMachineId,
      flex:1,
      cellRenderer: 'detailCellRendererComponent',
      cellRendererParams: {
        clicked: function(functionName:string,field: any) {
          // This cannot access the function, navigating in the cell renderer          
        }        
      }
    },
  ];

  columnDefsByDate: ColDef[] = [
    {
      field: 'machinename',
      headerName: 'Machine Name',
      flex:2 
    },
    {
      field: 'countdate',
      headerName: 'Date'      
    },
    {
      field: 'countamount',
      headerName: 'Amount',
      sortable: true
    },
    { headerName: '',  
      valueGetter: dateAndMachineId,
      flex:1,
      cellRenderer: 'detailCellRendererComponent',
      cellRendererParams: {
        clicked: function(functionName:string,field: any) {
          // This cannot access the function, navigating in the cell renderer          
        }        
      }
    },
  ];

  frameworkComponents = {
    detailCellRendererComponent : DetailCellRendererComponent
  };

  constructor(private route: ActivatedRoute, private http: HttpClient,private dataViewServiceService : DataViewServiceService) { }

  ngOnInit(): void {

    let machineId = this.route.snapshot.paramMap.get('machineId');
    if (machineId) {
      this.machineId = machineId;
    } 

    let countDate = this.route.snapshot.paramMap.get('countDate');
    if (countDate) {
      this.countDate = countDate;
    }

    console.log(`opening history with
      machineid: ${this.machineId}
      countDate: ${this.countDate}`);

    if (this.machineId == 'none' && this.countDate != 'none'){
      this.byDate = true;
      this.dataViewServiceService.historyRefreshByCountDate(this.countDate);
    }
    
    if (this.machineId && !this.countDate){
      this.byId = true;
      this.dataViewServiceService.historyRefreshById(parseInt(this.machineId));
    }

  }

  getHistoryDetails(): HistoryView[] {
    return this.dataViewServiceService.historyGet();
  }

  onDownloadReportClick(){
    /*
    const REQUEST_URL = "http://127.0.0.1:8080/dailyhistory/downloadReport/v2/"+ this.machineId;

    this.http.get(REQUEST_URL,{responseType: 'arraybuffer'}).subscribe((data) => {
      saveAs(new Blob([data],{type:MIME_TYPES["xlsx"]}),"History.xlsx");
    }, err => {
      alert ('error');
      console.log(err);
    }
    );
    */
  }

}

var dateAndMachineId = function(parms) {
  return parms.data.countdate + ',' + parms.data.machineid;
}

