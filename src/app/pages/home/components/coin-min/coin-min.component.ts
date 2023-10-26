import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../../../shared/services/api.service";
import {map, Observable} from "rxjs";
import {CurrencyResponseInterface} from "../../../../shared/interface/currency-response.interface";
import {DataIdService} from "../../services/data-id.service";
import {CurrencyService} from "../../../../shared/services/currency.service";


@Component({
  selector: 'app-coin-min',
  templateUrl: './coin-min.component.html',
  styleUrls: ['./coin-min.component.scss']
})
export class CoinMinComponent implements OnInit{

  activeCoinId: string = 'bitcoin'
  currency : string = "USD"
  currencyAll!: CurrencyResponseInterface[]

  constructor(private apiService: ApiService,
              private dataIdService: DataIdService,
              private currencyService: CurrencyService) {
  }

  ngOnInit() {
    this.currencyService.getCurrency().subscribe(val => {
      this.currency = val
      this.getAllData()
    })
  }

  selectCoin(id: string, symbol: string) {
    this.activeCoinId = id;
    this.dataIdService.setSelectedCoinId(id, symbol);
  }

  getAllData(){
    this.apiService.getCurrency(this.currency).pipe(
      map(data => data.slice(0, 4))
    ).subscribe(res => {
      this.currencyAll = res
    });

  }


}
