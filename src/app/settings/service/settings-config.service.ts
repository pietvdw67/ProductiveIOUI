import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { AppSettings } from 'src/app/settings/AppSettings';
import { SettingsConfig } from 'src/app/settings/model/SettingsConfig';

const SETTINGS_CONFIG_URL = 'settings/settingsConfig/v1';

@Injectable({
  providedIn: 'root'
})
export class SettingsConfigService {

  constructor(private http: HttpClient) { }

  getSettingsConfig(callback:any){
    const REQUEST_URL = AppSettings.ENDPOINT + SETTINGS_CONFIG_URL;

    this.http.get<any>(REQUEST_URL).subscribe(data => {
      let settingsConfig = data;
      
      callback(settingsConfig);
    });
  }

  postSettingsConfig(settingsConfig:SettingsConfig){
    console.log(`posting saturday as: ${settingsConfig.hoursSaturday}
    url: ${AppSettings.ENDPOINT + SETTINGS_CONFIG_URL}`)
    this.http.post<any>(AppSettings.ENDPOINT + SETTINGS_CONFIG_URL, {
      hoursMonday: settingsConfig.hoursMonday,
      hoursTuesday: settingsConfig.hoursTuesday,
      hoursWednesday: settingsConfig.hoursWednesday,
      hoursThursday: settingsConfig.hoursThursday,
      hoursFriday: settingsConfig.hoursFriday,
      hoursSaturday: settingsConfig.hoursSaturday,
      hoursSunday: settingsConfig.hoursSunday
    }) .subscribe(data => {      
    })

  }
}
