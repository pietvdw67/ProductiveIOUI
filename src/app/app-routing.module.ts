import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardMainPageComponent } from 'src/app/pages/dashboard/dashboard-main-page/dashboard-main-page.component';
import { DetailPageComponent } from './pages/detail/detail-page/detail-page.component';

const routes: Routes = [
  { path: '', component: DashboardMainPageComponent },
  { path: 'detail/:countDate/:machineId', component: DetailPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
