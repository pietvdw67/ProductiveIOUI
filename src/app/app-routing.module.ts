import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailPageComponent } from 'src/app/details/page/detail-page/detail-page.component';
import { HistoryPageComponent } from './history/page/history-page/history-page.component';
import { HistoryCustomPageComponent } from 'src/app/history/page/history-page/history-custom-page/history-custom-page.component';
import { MachineDetailPageComponent } from 'src/app/machineDetails/page/machine-detail-page/machine-detail-page.component';
import { TotalDashboardPageComponent} from 'src/app/dashboard/totalDashboard/page/total-dashboard-page/total-dashboard-page.component';

const routes: Routes = [
  { path: '', component: TotalDashboardPageComponent },
  { path: 'detail/:countDate/:machineId', component: DetailPageComponent },
  { path: 'history/:machineId/:countDate',component: HistoryPageComponent },
  { path: 'historyCustom', component: HistoryCustomPageComponent },
  { path: 'machineDetails', component: MachineDetailPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  /*


  */
}
