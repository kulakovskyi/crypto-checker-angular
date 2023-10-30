import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import { CoinsListComponent } from './components/coins-list/coins-list.component';
import { CoinItemComponent } from './components/coin-item/coin-item.component';
import {DataIdService} from "../home/services/data-id.service";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatDialogModule} from "@angular/material/dialog";
import {NgChartsModule} from "ng2-charts";

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([
            {path: '', component: CoinsListComponent},
            {path: ':id', component: CoinItemComponent}
        ]),
        MatPaginatorModule,
        MatDialogModule,
        NgChartsModule
    ],
  declarations: [
    CoinsListComponent,
    CoinItemComponent
  ],
  providers:[DataIdService]
})

export class CoinsModule{

}
