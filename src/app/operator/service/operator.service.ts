import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { AppSettings } from 'src/app/settings/AppSettings';
import { OperatorItem } from 'src/app/operator/model/OperatorItem';

const OPERATOR_URL = 'operator/v1';

@Injectable({
  providedIn: 'root'
})
export class OperatorService {

  static OPERATOR_KEY = 'Operators';

  private operatorItems: OperatorItem[] = [];

  constructor(private http: HttpClient) { }

  getOperators(): OperatorItem[] {

    if (!this.operatorItems || this.operatorItems.length == 0) {
      this.operatorItems = JSON.parse(sessionStorage.getItem(OperatorService.OPERATOR_KEY));
    }

    return this.operatorItems;
  }

  refreshOperators() {
    const REQUEST_URL = AppSettings.ENDPOINT + OPERATOR_URL;

    this.http.get<any>(REQUEST_URL).subscribe(data => {
      this.operatorItems = data;

      this.storeOperators(this.operatorItems);

    });
  }

  postOperator(operatorItem: OperatorItem) {

    this.http.post<any>(AppSettings.ENDPOINT + OPERATOR_URL, {
      id: operatorItem.id,
      operatorname: operatorItem.operatorname,
      machineid: operatorItem.machineid
    })
      .subscribe(data => {
        this.refreshOperators();
      })

  }

  deleteOperator(operatorItem: OperatorItem) {
    this.http.delete<any>(AppSettings.ENDPOINT + OPERATOR_URL + '/' + operatorItem.id).subscribe(data => {
      this.refreshOperators();
    })
  }

  private storeOperators(operatorItem: OperatorItem[]) {
    sessionStorage.setItem(OperatorService.OPERATOR_KEY, JSON.stringify(operatorItem));
  }
}
