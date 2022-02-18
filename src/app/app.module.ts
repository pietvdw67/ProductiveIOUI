import { NgModule,APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material/material.module';
import { AppLoaderService } from './settings/app-loader.service';

import { AgGridModule } from 'ag-grid-angular';
import { AgChartsAngularModule } from 'ag-charts-angular';

import { DashboardMainPageComponent } from 'src/app/pages/dashboard/dashboard-main-page/dashboard-main-page.component';
import { DashboardTotalsComponent } from './components/dashboard/dashboard-totals/dashboard-totals.component';
import { GridDetailAndHistoryCellRendererComponent } from './components/gridcomponents/grid-detail-and-history-cell-renderer/grid-detail-and-history-cell-renderer.component';
import { DetailPageComponent } from 'src/app/details/page/detail-page/detail-page.component';
import { HistoryPageComponent } from 'src/app/history/page/history-page/history-page.component';
import { HistoryComponent } from 'src/app/history/component/history/history.component';
import { DetailCellRendererComponent } from './components/gridcomponents/detail-cell-renderer/detail-cell-renderer.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MachineDetailPageComponent } from './machineDetails/page/machine-detail-page/machine-detail-page.component';
import { MachineDetailComponent } from './machineDetails/component/machine-detail/machine-detail.component';
import { DetailComponent } from './details/component/detail/detail.component';
import { HistoryCustomPageComponent } from './history/page/history-page/history-custom-page/history-custom-page.component';
import { TotalDashboardPageComponent } from './dashboard/totalDashboard/page/total-dashboard-page/total-dashboard-page.component';
import { DashboardItemComponent } from './dashboard/totalDashboard/component/dashboard-item/dashboard-item.component';
import { OperatorPageComponent } from './operator/page/operator-page/operator-page.component';
import { OperatorComponent } from './operator/component/operator/operator.component';
import { CurrentTotalComponent } from './details/component/current-total/current-total.component';
import { SettingsPageComponent } from './settings/page/settings-page/settings-page.component';
import { SettingsConfigComponent } from './settings/component/settings-config/settings-config.component';

export function init_app(appLoadService: AppLoaderService) {
  return () => appLoadService.initializeApp();
}

@NgModule({
  declarations: [
    AppComponent,
    DashboardMainPageComponent,
    DashboardTotalsComponent,    
    GridDetailAndHistoryCellRendererComponent, DetailPageComponent, HistoryPageComponent, HistoryComponent, 
    DetailCellRendererComponent, MachineDetailPageComponent, MachineDetailComponent, DetailComponent, HistoryCustomPageComponent, TotalDashboardPageComponent, DashboardItemComponent, OperatorPageComponent, OperatorComponent, CurrentTotalComponent, SettingsPageComponent, SettingsConfigComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,   
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    AgChartsAngularModule,
    AgGridModule.withComponents([])
  ],
  providers: [AppLoaderService,
    { provide: APP_INITIALIZER, useFactory: init_app, deps: [AppLoaderService], multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
