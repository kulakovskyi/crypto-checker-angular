import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {HomeComponent} from "./components/home/home.component";
import {CoinMinComponent} from "./components/coin-min/coin-min.component";
import {NgChartsModule} from "ng2-charts";
import { ChartMinComponent } from './components/chart-min/chart-min.component';
import {DataIdService} from "./services/data-id.service";


@NgModule({
  declarations:[
    HomeComponent,
    CoinMinComponent,
    ChartMinComponent,
  ],
  imports: [
    CommonModule,

    RouterModule.forChild([
      {path: '', component: HomeComponent}
    ]),
    NgChartsModule
  ],
  providers:[DataIdService]
})

export class HomeModule{}
