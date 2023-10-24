import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {ChartComponent} from "./components/chart/chart.component";

@NgModule({
  declarations:[
    ChartComponent,

  ],
  imports:[
    CommonModule,
    RouterModule.forChild([
      {path: '', component: ChartComponent}
    ])
  ]
})

export class ChartModule{}
