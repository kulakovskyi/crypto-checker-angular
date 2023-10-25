import {Component, OnInit, ViewChild} from '@angular/core';
import {ChartConfiguration, ChartType} from "chart.js";
import {BaseChartDirective} from "ng2-charts";
import {ApiService} from "../../../../shared/services/api.service";
import {DataIdService} from "../../services/data-id.service";
import {CurrencyService} from "../../../../shared/services/currency.service";
import {ChartService} from "../../../../shared/services/chart.service";

@Component({
  selector: 'app-chart-min',
  templateUrl: './chart-min.component.html',
  styleUrls: ['./chart-min.component.scss']
})
export class ChartMinComponent implements OnInit{

  currency : string = "USD"
  days : number = 365;
  selectedCoinId = 'bitcoin';
  selectedCoinSymbol = 'BTC'

  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [],
        label: '',
        backgroundColor: 'rgba(148,159,177,0)',
        borderColor: '#3A6FF8',
        pointBackgroundColor: '#3A6FF8',
        pointBorderColor: '#3A6FF8',
        pointHoverBackgroundColor: '#3A6FF8',
        pointHoverBorderColor: '#3A6FF8',

      }
    ],
    labels: []
  };
  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      point: {
        radius: 1
      }
    },

    plugins: {
      legend: { display: false },
    }
  };
  public lineChartType: ChartType = 'line';
  @ViewChild(BaseChartDirective) myLineChart !: BaseChartDirective;


  constructor(private apiService: ApiService,
              private dataIdService: DataIdService,
              private currencyService: CurrencyService,
              private chartService: ChartService) {

  }

  ngOnInit() {
    this.getGraphData(this.days)
  }

  getGraphData(days:number){
    this.dataIdService.selectedCoinId$.subscribe(({symbol, id}) => {
      this.currencyService.getCurrency().subscribe(val => {
        this.selectedCoinId = id;
        this.selectedCoinSymbol = symbol
        this.currency = val
        this.apiService.getGrpahicalCurrencyData(id,val,days)
          .subscribe(res=>{
            this.chartService.updateChart(this.myLineChart.chart, this.lineChartData, res, this.days);
          })
      });
      })

  }

}
