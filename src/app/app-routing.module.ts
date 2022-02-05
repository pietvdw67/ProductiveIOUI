import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardMainPageComponent } from 'src/app/pages/dashboard/dashboard-main-page/dashboard-main-page.component';

import { DetailPageComponent } from './pages/detail/detail-page/detail-page.component';
//import { HistoryPageComponent } from './pages/history/history-page/history-page.component';
import { HistoryPageComponent } from './history/page/history-page/history-page.component';
import { HistoryCustomComponent } from './pages/history/history-custom/history-custom.component';
import { MachineDetailPageComponent } from 'src/app/machineDetails/page/machine-detail-page/machine-detail-page.component';

const routes: Routes = [
  { path: '', component: DashboardMainPageComponent },
  { path: 'detail/:countDate/:machineId', component: DetailPageComponent },
  { path: 'history/:machineId/:countDate',component: HistoryPageComponent },
  { path: 'historyCustom', component: HistoryCustomComponent },
  { path: 'machineDetails', component: MachineDetailPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  /*


  */
}
