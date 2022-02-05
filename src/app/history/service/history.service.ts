import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { AppSettings } from 'src/app/settings/AppSettings';
import { HistoryView } from 'src/app/history/model/HistoryView';

const HISTORY_URL = 'dailyhistory/v1';
const HISTORY_BY_DATE_URL = 'dailyhistoryByDate/v1';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  private historyViews: HistoryView[] = [];

  constructor(private http: HttpClient) { }

  refreshHistoryByMachineId(id: number) {
    const REQUEST_URL = AppSettings.ENDPOINT + HISTORY_URL + '/' + String(id);

    this.http.get<any>(REQUEST_URL).subscribe(data => {
      this.historyViews = data;
      this.historyViews.sort();
    });
  }

  refreshHistoryByCountDate(countDate: string){
    const REQUEST_URL = AppSettings.ENDPOINT + HISTORY_BY_DATE_URL + '/' + countDate;
    this.http.get<any>(REQUEST_URL).subscribe(data => {
      this.historyViews = data;      
    });

  }

  fetchItemDetailsPerCountDate() {
    /*
    const REQUEST_URL = "http://127.0.0.1:8080/dailyhistoryByDate/v1/" + this.countDate;
    console.log("request: " + REQUEST_URL);
    this.http.get<any>(REQUEST_URL).subscribe(data => {         
      this.itemDetails = [];

      data.forEach(dataRow => {
        var itemDetail = new ItemDetail(dataRow.id,dataRow.machineid,dataRow.countdate,dataRow.counttime,dataRow.countamount); 
        this.itemDetails.push(itemDetail);                    
      });   

      this.rowData = this.itemDetails;
    })
    */
  }

  onDownloadReportClick() {
    /*
    const REQUEST_URL = "http://127.0.0.1:8080/dailyhistory/downloadReport/v2/"+ this.machineId;
 
    this.http.get(REQUEST_URL,{responseType: 'arraybuffer'}).subscribe((data) => {
      saveAs(new Blob([data],{type:MIME_TYPES["xlsx"]}),"History.xlsx");
    }, err => {
      alert ('error');
      console.log(err);
    }
    );
  }
  */
  }

  getHistory() {
    return this.historyViews;
  }
}
