import {Injectable} from "@angular/core";
import {BaseChartDirective} from "ng2-charts";
import {ChartConfiguration} from "chart.js";
import {GraphicalCurrencyResponseInterface} from "../interface/graphical-currency-response.interface";

@Injectable({
  providedIn: 'root'
})

export class ChartService{

  updateChart(chart: any, lineChartData: ChartConfiguration['data'], res: GraphicalCurrencyResponseInterface, days: number) {

    setTimeout(() => {
      chart?.update();
    }, 200)


    lineChartData.datasets[0].data = res.prices.map((a: any) => {
      return a[1];
    });
    lineChartData.labels = res.prices.map((a: any) => {
      let date = new Date(a[0]);
      let time = date.getHours() > 12 ?
        `${date.getHours() - 12}:${date.getMinutes()} PM` :
        `${date.getHours()}:${date.getMinutes()} AM`;
      return days === 1 ? time : date.toLocaleDateString();
    });
  }
}
