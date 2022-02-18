import { Component, OnInit } from '@angular/core';
import { DataViewServiceService } from 'src/app/dataView/service/data-view-service.service';
import { SettingsConfig } from 'src/app/settings/model/SettingsConfig';

@Component({
  selector: 'app-settings-config',
  templateUrl: './settings-config.component.html',
  styleUrls: ['./settings-config.component.scss']
})
export class SettingsConfigComponent implements OnInit {

  editMonday = '0';
  editTuesday = '0';
  editWednesday = '0';
  editThursday = '0';
  editFriday = '0';
  editSaturday = '0';
  editSunday = '0';

  constructor(private dataViewServiceService : DataViewServiceService) { }

  ngOnInit(): void {
    this.getSettings();
  }

  getSettings(){
    this.dataViewServiceService.settingsConfigGet( (settingsConfig) => {
      this.editMonday = settingsConfig.hoursMonday;
      this.editTuesday = settingsConfig.hoursTuesday;
      this.editWednesday = settingsConfig.hoursWednesday;
      this.editThursday = settingsConfig.hoursThursday;
      this.editFriday = settingsConfig.hoursFriday;
      this.editSaturday = settingsConfig.hoursSaturday;
      this.editSunday = settingsConfig.hoursSunday;
    });
  }

  onUpdateSettingsClick(){
    let settingsConfig = new SettingsConfig();

    settingsConfig.hoursMonday = Number(this.editMonday);
    settingsConfig.hoursTuesday = Number(this.editTuesday);
    settingsConfig.hoursWednesday = Number(this.editWednesday);
    settingsConfig.hoursThursday = Number(this.editThursday);
    settingsConfig.hoursFriday = Number(this.editFriday);
    settingsConfig.hoursSaturday = Number(this.editSaturday);
    settingsConfig.hoursSunday =Number(this.editSunday);

    this.dataViewServiceService.settingsConfigPost(settingsConfig);
  }

}
