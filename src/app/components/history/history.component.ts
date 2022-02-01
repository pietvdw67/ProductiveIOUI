import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';

import { saveAs } from 'file-saver';
import { ColDef } from 'ag-grid-community';

import { ItemDetail } from "src/app/model/item-detail/item-detail.module";
import { DetailCellRendererComponent } from '../gridcomponents/detail-cell-renderer/detail-cell-renderer.component';

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

  itemDetails: ItemDetail[] = [];
  machineId: string;
  countDate: string;
  title:string;

  rowData; // for AG Grid

  columnDefs: ColDef[] = [
    {
      field: 'machineId',
      headerName: 'Machine'      
    },
    {
      field: 'countDate',
      headerName: 'Date'      
    },
    {
      field: 'countTime',
      headerName: 'Time',
      sortable: true
    },
    {
      field: 'countAmount',
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

  constructor(private route: ActivatedRoute, private http: HttpClient) { 
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

    if (this.machineId.length>0 && this.countDate.length==0){      
      this.title = 'History for Machine: ' + this.machineId;  
    } 

    this.fetchItemDetailsPerMahineId();
  }

  fetchItemDetailsPerMahineId(){
    const REQUEST_URL = "http://127.0.0.1:8080/dailyhistory/v1/" + this.machineId;
    console.log("request: " + REQUEST_URL);
    this.http.get<any>(REQUEST_URL).subscribe(data => {         
      this.itemDetails = [];

      data.forEach(dataRow => {
        var itemDetail = new ItemDetail(dataRow.id,dataRow.machineid,dataRow.countdate,dataRow.counttime,dataRow.countamount); 
        this.itemDetails.push(itemDetail);                    
      });   

      this.rowData = this.itemDetails;
    })
  }

  public onDownloadReportClick(){
    const REQUEST_URL = "http://127.0.0.1:8080/dailyhistory/downloadReport/v2/"+ this.machineId;

    this.http.get(REQUEST_URL,{responseType: 'arraybuffer'}).subscribe((data) => {
      saveAs(new Blob([data],{type:MIME_TYPES["xlsx"]}),"History.xlsx");
    }, err => {
      alert ('error');
      console.log(err);
    }
    );
  }

  public getTitle(){   
    return this.title;
  }

}

var dateAndMachineId = function(parms) {
  return parms.data.countDate + ',' + parms.data.machineId;
}
