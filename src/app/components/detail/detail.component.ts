import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { interval, Subscription } from 'rxjs';

import { saveAs } from 'file-saver';
import { ColDef } from 'ag-grid-community';
import { GridDetailAndHistoryCellRendererComponent } from 'src/app/components/gridcomponents/grid-detail-and-history-cell-renderer/grid-detail-and-history-cell-renderer.component';

import { ItemDetail } from "src/app/model/item-detail/item-detail.module";
import { AgChartsAngular } from 'ag-charts-angular';

const MIME_TYPES = {
  xls: 'application/vnd.ms-excel',
  xlsx: 'application/vnc.openxmlformats-officedocument.spreadsheetxml.sheet'
}

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  itemDetails: ItemDetail[] = [];
  machineId: string;
  countDate: string;
  rowData; // for AG Grid
  options: any; // for AG Chart
  subscription: Subscription | undefined;

  constructor(private route: ActivatedRoute, private http: HttpClient) {
    this.machineId = "";
    this.countDate = "";

    this.options = {
      data: this.rowData,
      title: {
        text: 'Item Count',
      },
      subtitle: {
        text: 'over time',
      },
      series: [{
        xKey: 'countAmount',
        yKey: 'machineId',
      }],
    };
  }

  columnDefs: ColDef[] = [
    {
      field: 'machineId',
      headerName: 'Machine',
      flex:1
    },
    {
      field: 'countDate',
      headerName: 'Date',
      flex:3
    },
    {
      field: 'countTime',
      headerName: 'Time',
      sortable: true,
      flex:3
    },
    {
      field: 'countAmount',
      headerName: 'Amount',
      sortable: true,
      flex:3
    },
  ];



  frameworkComponents = {
    gridDetailAndHistoryCellRendererComponent: GridDetailAndHistoryCellRendererComponent
  };

  ngOnInit(): void {
    let machineId = this.route.snapshot.paramMap.get('machineId');
    if (machineId) {
      this.machineId = machineId;
    }

    let countDate = this.route.snapshot.paramMap.get('countDate');
    if (countDate) {
      this.countDate = countDate;
    }

    const source = interval(5000);
    this.subscription = source.subscribe(val => this.fetchItemDetails());

    this.fetchItemDetails();
  }

  public onDownloadReportClick(){
    const REQUEST_URL = "http://127.0.0.1:8080/dailydetail/downloadReport/v2/" + this.countDate + "/" + this.machineId;

    this.http.get(REQUEST_URL,{responseType: 'arraybuffer'}).subscribe((data) => {
      saveAs(new Blob([data],{type:MIME_TYPES["xlsx"]}),"DailyDetail.xlsx");
    }, err => {
      alert ('error');
      console.log(err);
    }
    );
  }

  private fetchItemDetails() {
    const REQUEST_URL = "http://127.0.0.1:8080/dailydetail/v1/" + this.countDate + "/" + this.machineId;

    this.http.get<any>(REQUEST_URL).subscribe(data => {
      this.itemDetails = [];

      data.forEach(dataRow => {
        var itemDetail = new ItemDetail(dataRow.id, dataRow.machineid, dataRow.countdate, dataRow.counttime, dataRow.countamount);
        this.itemDetails.push(itemDetail);
      });

      this.rowData = this.itemDetails;

      this.options = {
        data: this.rowData,        
        title: {
          text: 'Item Count',
        },
        subtitle: {
          text: 'over time',
        },
        series: [{
          xKey: 'countTime',
          yKey: 'countAmount',
          yName: 'Amount'
        }],
        axes: [{
          position: 'bottom',
          type: 'category',
          label: {
            rotation: 90,
            formatter: function (parms) {
              if (parms.index % 10 == 0) {
                return String(parms.value).substring(0,5);
              } else {
                return '';
              }
            }
          },
          title: {
            text: 'Time',
            enabled: true
          }
        }, {
          position: 'left',
          type: 'number',
          title: {
            text: 'Amount',
            enabled: true
          }

        }],
      };


    });

  }


  public getMachineid() {
    return this.machineId;
  }

  public getCountdate() {
    return this.countDate;
  }

  public getItemDetail() {
    return this.rowData;
  }

}
