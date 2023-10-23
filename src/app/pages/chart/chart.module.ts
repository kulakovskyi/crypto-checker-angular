import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ChartComponent} from "./components/chart.component";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations:[
    ChartComponent
  ],
  imports:[
    CommonModule,
    RouterModule.forChild([
      {path: '', component: ChartComponent}
    ])
  ]
})

export class ChartModule{}
