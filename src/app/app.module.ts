import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material/material.module';

import { AgGridModule } from 'ag-grid-angular';
import { AgChartsAngularModule } from 'ag-charts-angular';

import { DashboardMainPageComponent } from 'src/app/pages/dashboard/dashboard-main-page/dashboard-main-page.component';
import { DashboardTotalsComponent } from './components/dashboard/dashboard-totals/dashboard-totals.component';
import { GridDetailAndHistoryCellRendererComponent } from './components/gridcomponents/grid-detail-and-history-cell-renderer/grid-detail-and-history-cell-renderer.component';
import { DetailPageComponent } from './pages/detail/detail-page/detail-page.component';
import { DetailComponent } from './components/detail/detail.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardMainPageComponent,
    DashboardTotalsComponent,    
    GridDetailAndHistoryCellRendererComponent, DetailPageComponent, DetailComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,    
    MaterialModule,
    AgChartsAngularModule,
    AgGridModule.withComponents([])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
