import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {ChartComponent} from "./pages/chart/components/chart/chart.component";

const routes: Routes = [
  {path:'', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', loadChildren: () => import('./pages/home/home.module').then(x => x.HomeModule)},
  {path: 'chart', loadChildren: () => import('./pages/chart/chart.module').then(x => x.ChartModule)},
  {path: 'coins', loadChildren: () => import('./pages/coins/coins.module').then(x => x.CoinsModule)},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
