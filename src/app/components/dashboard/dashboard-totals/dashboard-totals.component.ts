import { Component, OnInit,OnDestroy } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { interval, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { saveAs } from 'file-saver';

import { ColDef } from 'ag-grid-community';

import { ItemDetail } from "src/app/model/item-detail/item-detail.module";

import { GridDetailAndHistoryCellRendererComponent } from 'src/app/components/gridcomponents/grid-detail-and-history-cell-renderer/grid-detail-and-history-cell-renderer.component';

const MIME_TYPES = {
  xls: 'application/vnd.ms-excel',
  xlsx: 'application/vnc.openxmlformats-officedocument.spreadsheetxml.sheet'
}

@Component({
  selector: 'app-dashboard-totals',
  templateUrl: './dashboard-totals.component.html',
  styleUrls: ['./dashboard-totals.component.scss']
})
export class DashboardTotalsComponent implements OnInit {

  itemDetails : ItemDetail[] = [];
  subscription: Subscription | undefined;
  rowData;
  

  columnDefs: ColDef[] = [    
    { field: 'machineId',
      headerName: 'Machine' },
    { field: 'countTime',
      headerName: "Last Update"
    },
    { field: 'countAmount',
      headerName: 'Amount' },    
    { headerName: '',  
      valueGetter: dateAndMachineId,  
      flex:1,
      cellRenderer: 'gridDetailAndHistoryCellRendererComponent',
      cellRendererParams: {
        clicked: function(functionName:string,field: any) {
          // This cannot access the function, navigating in the cell renderer          
        }        
      }
    },
  ];

  frameworkComponents = {
    gridDetailAndHistoryCellRendererComponent : GridDetailAndHistoryCellRendererComponent
  };

  constructor(private http:HttpClient,private router: Router) { 
    console.log('running this component');
  }

  ngOnInit(): void {
    this.fetchItemDetails();

    const source = interval(5000);
    this.subscription = source.subscribe(val => this.fetchItemDetails());
  }

  ngOnDestroy() {
    this.subscription && this.subscription.unsubscribe();
  }

  public getItemDetails(){    
    return this.itemDetails;
  }

  public onDownloadReportClick(){    
    const REQUEST_URL = "http://127.0.0.1:8080/dailytotal/downloadReport/v2";

    this.http.get(REQUEST_URL,{responseType: 'arraybuffer'}).subscribe((data) => {
      saveAs(new Blob([data],{type:MIME_TYPES["xlsx"]}),"DailyTotal.xlsx");
    }, err => {
      alert ('error');
      console.log(err);
    }
    );
  }

  private fetchItemDetails(){    
    const REQUEST_URL = "http://127.0.0.1:8080/dailytotal/TotalsPerDay/v1";

    this.http.get<any>(REQUEST_URL).subscribe(data => { 
      this.itemDetails = [];
      data.forEach(dataRow => {
        var itemDetail = new ItemDetail(dataRow.id,dataRow.machineid,dataRow.countdate,dataRow.counttime,dataRow.countamount); 
        this.itemDetails.push(itemDetail);                    
      });
      
      this.rowData = this.itemDetails;
    });    
  }
}

var dateAndMachineId = function(parms) {
  return parms.data.countDate + ',' + parms.data.machineId;
}

