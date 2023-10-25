import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {ChartComponent} from "./components/chart/chart.component";
import { ChartAllComponent } from './components/chart-all/chart-all.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {NgChartsModule} from "ng2-charts";
import {DataIdService} from "../home/services/data-id.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations:[
    ChartComponent,
    ChartAllComponent,

  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: ChartComponent}
    ]),
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    NgChartsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers:[DataIdService]
})

export class ChartModule{}
