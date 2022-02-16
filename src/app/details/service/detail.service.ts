import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { saveAs } from 'file-saver';

import { AppSettings } from 'src/app/settings/AppSettings';
import { DetailView } from 'src/app/details/model/DetailView';

const DETAIL_URL = 'dailydetail';

const MIME_TYPES = {
  xls: 'application/vnd.ms-excel',
  xlsx: 'application/vnc.openxmlformats-officedocument.spreadsheetxml.sheet'
}


@Injectable({
  providedIn: 'root'
})
export class DetailService {

  private detailViews: DetailView[] = [];

  constructor(private http: HttpClient) { }

  refreshDetails(countDate: string,machineId:number,callback:any) {
    const REQUEST_URL = AppSettings.ENDPOINT + DETAIL_URL + '/v1/' + countDate + '/' + machineId;

    this.http.get<any>(REQUEST_URL).subscribe(data => {
      this.detailViews = data;
      this.detailViews.sort();

      callback();
    });
  }

  downloadReport(countDate:string,machineId:number) {

    const REQUEST_URL = AppSettings.ENDPOINT + DETAIL_URL + '/downloadReport/v1/' + countDate + '/' + machineId;

    this.http.get(REQUEST_URL, { responseType: 'arraybuffer' }).subscribe((data) => {
      saveAs(new Blob([data], { type: MIME_TYPES["xlsx"] }), "Detail.xlsx");
    }, err => {
      alert('error');
      console.log(err);
    }
    );
  }

  getDetails(){
    return this.detailViews;
  }

  getCurrentTotal(countDate:string,machineId:number,callback:any){
    const REQUEST_URL = AppSettings.ENDPOINT + DETAIL_URL + '/currenttotal/v1/' + countDate + '/' + machineId;

    this.http.get<any>(REQUEST_URL).subscribe(data => {
      let currentTotal = data;
      
      callback(currentTotal);
    });
  }
}
