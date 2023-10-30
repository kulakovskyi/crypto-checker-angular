import {Component, OnInit, ViewChild} from '@angular/core';
import {ApiService} from "../../../../shared/services/api.service";
import {combineLatest, Observable, Subscription, switchMap, tap} from "rxjs";
import {ActivatedRoute, Params} from "@angular/router";
import {CurrencyIdResponseInterface} from "../../../../shared/interface/currency-id-response.interface";
import {ChartConfiguration, ChartType} from "chart.js";
import {BaseChartDirective} from "ng2-charts";
import {ChartService} from "../../../../shared/services/chart.service";
import {DataIdService} from "../../../home/services/data-id.service";
import {CurrencyService} from "../../../../shared/services/currency.service";

@Component({
  selector: 'app-coin-item',
  templateUrl: './coin-item.component.html',
  styleUrls: ['./coin-item.component.scss']
})
export class CoinItemComponent implements OnInit{

  currency$!: Observable<CurrencyIdResponseInterface>

    currency : string = "USD"
    days : number = 365;
    selectedCoinId!: string;

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
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.currency$ = this.route.params
        .pipe(switchMap((params: Params) => {
          return this.apiService.getCurrencyById(params['id'])
      }))

      this.route.params.subscribe((params) => {
          this.selectedCoinId = params['id']
      });

    this.getGraphData(this.days)

  }

    getGraphData(days:number){
        this.days = days
        this.apiService.getGrpahicalCurrencyData(this.selectedCoinId,this.currency,this.days)
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
    }

}
