import {Component, OnInit, ViewChild} from '@angular/core';
import {ChartConfiguration, ChartType} from "chart.js";
import {BaseChartDirective} from "ng2-charts";
import {ApiService} from "../../../../shared/services/api.service";
import {CurrencyService} from "../../../../shared/services/currency.service";
import {CurrencyResponseInterface} from "../../../../shared/interface/currency-response.interface";
import {FormControl, FormGroup} from "@angular/forms";
import {ChartService} from "../../../../shared/services/chart.service";
import {DataIdService} from "../../../home/services/data-id.service";
import {combineLatest, Subscription, switchMap, take, tap} from "rxjs";



@Component({
  selector: 'app-chart-all',
  templateUrl: './chart-all.component.html',
  styleUrls: ['./chart-all.component.scss']
})
export class ChartAllComponent implements OnInit{

  currencyAll!: CurrencyResponseInterface[]
  selectCurrencyObject!: CurrencyResponseInterface | undefined
  formGroup!: FormGroup
  currency : string = "USD"
  sub$!: Subscription

  days : number = 365;
  selectedCoinId = 'bitcoin';
  selectedCoinSymbol = 'BTC';

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
              private currencyService: CurrencyService,
              private chartService: ChartService,
              private dataIdService: DataIdService) {
  }

  ngOnInit() {
    this.getAllData()
    this.initialSelect()
    this.getGraphData(this.days)
  }

  getAllData(){
    this.apiService.getCurrency(this.currency).subscribe(res => {
      this.currencyAll = res
      this.selectCurrencyObject = res[0]
    })
  }

  initialSelect(){
    this.formGroup = new FormGroup({
      selectCurrency: new FormControl('bitcoin')
    });
  }

  sendCurrency(event: string) {
    this.selectedCoinId = event
    this.selectCurrencyObject = this.findObjectById(event)
    this.currencyService.getCurrency()
      .pipe(take(1))
      .subscribe(val => {
      this.currency = val
      this.apiService.getGrpahicalCurrencyData(event,val,this.days)
        .subscribe(res=>{
          this.chartService.updateChart(this.myLineChart.chart, this.lineChartData, res, this.days);
        })
    });
  }

  getGraphData(days:number){

    this.sub$ && this.sub$.unsubscribe();
    this.sub$ = combineLatest(
      [this.dataIdService.selectedCoinId$,
        this.currencyService.getCurrency()
      ]
    )
      .pipe(
        tap(([res, currency]) => {
          this.currency = currency;
          this.selectedCoinId = res.id;
          this.selectedCoinSymbol = res.symbol;
          this.days = days
        }),
        switchMap(() => this.apiService.getGrpahicalCurrencyData(this.selectedCoinId,this.currency,days))
      )
      .subscribe(res=>{
        this.chartService.updateChart(this.myLineChart.chart, this.lineChartData, res, this.days);
      })
  }

  findObjectById(targetId: string) {
    return this.currencyAll.find(item => item.id === targetId);
  }

}
