import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ColDef } from 'ag-grid-community';
import { DetailCellRendererComponent } from 'src/app/components/gridcomponents/detail-cell-renderer/detail-cell-renderer.component';

import { DataViewServiceService } from 'src/app/dataView/service/data-view-service.service';

import { HistoryView } from '../../model/HistoryView';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  machineId: string = '';
  countDate: string = '';
  byId: boolean = false;
  byDate: boolean = false;

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
    {
      headerName: '',
      valueGetter: dateAndMachineId,
      flex: 1,
      cellRenderer: 'detailCellRendererComponent',
      cellRendererParams: {
        clicked: function (functionName: string, field: any) {
          // This cannot access the function, navigating in the cell renderer          
        }
      }
    },
  ];

  columnDefsByDate: ColDef[] = [
    {
      field: 'machinename',
      headerName: 'Machine Name',
      flex: 2
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
    {
      headerName: '',
      valueGetter: dateAndMachineId,
      flex: 1,
      cellRenderer: 'detailCellRendererComponent',
      cellRendererParams: {
        clicked: function (functionName: string, field: any) {
          // This cannot access the function, navigating in the cell renderer          
        }
      }
    },
  ];

  frameworkComponents = {
    detailCellRendererComponent: DetailCellRendererComponent
  };

  constructor(private route: ActivatedRoute, private dataViewServiceService: DataViewServiceService) { }

  ngOnInit(): void {

    let machineId = this.route.snapshot.paramMap.get('machineId');
    if (machineId) {
      this.machineId = machineId;
    }

    let countDate = this.route.snapshot.paramMap.get('countDate');
    if (countDate) {
      this.countDate = countDate;
    }

    if (this.machineId == 'none' && this.countDate != 'none') {
      this.byDate = true;
      this.dataViewServiceService.historyRefreshByCountDate(this.countDate);
    }

    if (this.machineId && !this.countDate) {
      this.byId = true;
      this.dataViewServiceService.historyRefreshById(parseInt(this.machineId));
    }

  }

  getHistoryDetails(): HistoryView[] {
    return this.dataViewServiceService.historyGet();
  }

  onDownloadReportClick() {
    if (this.byId){
      this.dataViewServiceService.historyDownloadReportById( parseInt(this.machineId));
    }

    if (this.byDate){
      this.dataViewServiceService.historyDownloadReportByDate(this.countDate);
    }

  }

}

var dateAndMachineId = function (parms) {
  return parms.data.countdate + ',' + parms.data.machineid;
}

