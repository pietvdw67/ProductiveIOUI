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
import { DetailPageComponent } from './pages/detail/detail-page/detail-page.component';
import { DetailComponent } from './components/detail/detail.component';
import { HistoryPageComponent } from 'src/app/history/page/history-page/history-page.component';
import { HistoryComponent } from 'src/app/history/component/history/history.component';
import { DetailCellRendererComponent } from './components/gridcomponents/detail-cell-renderer/detail-cell-renderer.component';
import { HistoryCustomComponent } from './pages/history/history-custom/history-custom.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MachineDetailPageComponent } from './machineDetails/page/machine-detail-page/machine-detail-page.component';
import { MachineDetailComponent } from './machineDetails/component/machine-detail/machine-detail.component';

export function init_app(appLoadService: AppLoaderService) {
  return () => appLoadService.initializeApp();
}

@NgModule({
  declarations: [
    AppComponent,
    DashboardMainPageComponent,
    DashboardTotalsComponent,    
    GridDetailAndHistoryCellRendererComponent, DetailPageComponent, DetailComponent, HistoryPageComponent, HistoryComponent, 
    DetailCellRendererComponent, HistoryCustomComponent, MachineDetailPageComponent, MachineDetailComponent
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
