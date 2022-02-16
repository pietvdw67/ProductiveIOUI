import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ColDef } from 'ag-grid-community';
import { DataViewServiceService } from 'src/app/dataView/service/data-view-service.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  machineId: string = '';
  countDate: string = '';
  options: any | undefined;

  columnDefs: ColDef[] = [
    {
      field: 'operatorName',
      headerName: 'Operator',
      sortable: true,
      flex: 3
    },
    {
      field: 'countdate',
      headerName: 'Date',
      flex: 3
    },
    {
      field: 'counttime',
      headerName: 'Time',
      sortable: true,
      flex: 3
    },
    {
      field: 'countamount',
      headerName: 'Amount',
      sortable: true,
      flex: 3
    },
  ];

  constructor(private route: ActivatedRoute, private dataViewServiceService: DataViewServiceService) {
    this.refreshGrid();
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

    this.dataViewServiceService.detailRefresh(this.countDate, parseInt(this.machineId), () => {
      this.refreshGrid();
    });    
  }

  onDownloadReportClick() {
    this.dataViewServiceService.detailsDownloadReport(this.countDate, parseInt(this.machineId));
  }

  getDetailView() {
    return this.dataViewServiceService.detailGet();
  }

  refreshGrid() {
    this.options = {
      data: this.getDetailView(),
      title: {
        text: 'Item Count',
      },
      subtitle: {
        text: 'over time',
      },
      series: [{
        xKey: 'counttime',
        yKey: 'countamount',
        yName: 'Amount'
      }],
      axes: [{
        position: 'bottom',
        type: 'category',
        label: {
          rotation: 90,
          formatter: function (parms) {
            if (parms.index % 10 == 0) {
              return String(parms.value).substring(0, 5);
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
  }

}
