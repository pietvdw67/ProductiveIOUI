import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { saveAs } from 'file-saver';

import { AppSettings } from 'src/app/settings/AppSettings';
import { HistoryView } from 'src/app/history/model/HistoryView';

const HISTORY_URL = 'dailyhistory/v1';
const HISTORY_BY_DATE_URL = 'dailyhistoryByDate/v1';

const MIME_TYPES = {
  xls: 'application/vnd.ms-excel',
  xlsx: 'application/vnc.openxmlformats-officedocument.spreadsheetxml.sheet'
}

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

  refreshHistoryByCountDate(countDate: string) {
    const REQUEST_URL = AppSettings.ENDPOINT + HISTORY_BY_DATE_URL + '/' + countDate;
    this.http.get<any>(REQUEST_URL).subscribe(data => {
      this.historyViews = data;
    });

  }

  downloadReportById(id: number) {

    const REQUEST_URL = AppSettings.ENDPOINT + 'dailyhistory/downloadReport/v1/' + String(id);

    this.http.get(REQUEST_URL, { responseType: 'arraybuffer' }).subscribe((data) => {
      saveAs(new Blob([data], { type: MIME_TYPES["xlsx"] }), "History.xlsx");
    }, err => {
      alert('error');
      console.log(err);
    }
    );
  }

  downloadReportByDate(countDate: string) {

    const REQUEST_URL = AppSettings.ENDPOINT + 'dailyhistory/downloadByDateReport/v1/' + countDate;

    this.http.get(REQUEST_URL, { responseType: 'arraybuffer' }).subscribe((data) => {
      saveAs(new Blob([data], { type: MIME_TYPES["xlsx"] }), "History.xlsx");
    }, err => {
      alert('error');
      console.log(err);
    }
    );
  }

  getHistory() {
    return this.historyViews;
  }
}
