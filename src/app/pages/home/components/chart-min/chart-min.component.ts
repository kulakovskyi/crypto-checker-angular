import {Component, OnInit, ViewChild} from '@angular/core';
import {ChartConfiguration, ChartType} from "chart.js";
import {BaseChartDirective} from "ng2-charts";
import {ApiService} from "../../../../shared/services/api.service";
import {DataIdService} from "../../services/data-id.service";

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
              private dataIdService: DataIdService) {

  }

  ngOnInit() {
    this.getGraphData(this.days)
  }

  getGraphData(days:number){
    this.dataIdService.selectedCoinId$.subscribe(({symbol, id}) => {
      this.selectedCoinId = id;
      this.selectedCoinSymbol = symbol
      this.days = days
      this.apiService.getGrpahicalCurrencyData(id,this.currency,days)
        .subscribe(res=>{
          setTimeout(() => {
            this.myLineChart.chart?.update();
          }, 200);
          this.lineChartData.datasets[0].data = res.prices.map((a:any)=>{
            return a[1];
          });
          this.lineChartData.labels = res.prices.map((a:any)=>{
            let date = new Date(a[0]);
            let time = date.getHours() > 12 ?
              `${date.getHours() - 12}: ${date.getMinutes()} PM` :
              `${date.getHours()}: ${date.getMinutes()} AM`
            return this.days === 1 ? time : date.toLocaleDateString();
          })
        })
    });

  }

}
