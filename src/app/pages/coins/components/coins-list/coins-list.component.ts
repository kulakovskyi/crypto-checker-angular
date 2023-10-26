import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {CurrencyResponseInterface} from "../../../../shared/interface/currency-response.interface";
import {ApiService} from "../../../../shared/services/api.service";
import {DataIdService} from "../../../home/services/data-id.service";
import {CurrencyService} from "../../../../shared/services/currency.service";
import {Subscription} from "rxjs";


@Component({
  selector: 'app-coins-list',
  templateUrl: './coins-list.component.html',
  styleUrls: ['./coins-list.component.scss']
})
export class CoinsListComponent implements OnInit, OnDestroy {

  currency: string = "USD"
  currencyAll: CurrencyResponseInterface[] = []
  itemsPerPage: number = 12;
  currentPage: number = 1;

  cSub$!: Subscription


  constructor(private apiService: ApiService,
              private dataIdService: DataIdService,
              private currencyService: CurrencyService,
            ) {
  }

  ngOnInit() {
    this.cSub$ = this.currencyService.getCurrency().subscribe(val => {
      this.currency = val
      this.getAllData()
    })
  }

  selectCoin(id: string, symbol: string) {
    this.dataIdService.setSelectedCoinId(id, symbol);
  }

  getAllData() {
  this.apiService.getCurrency(this.currency)
      .subscribe(res => {
        this.currencyAll = res
      });
  }

  ngOnDestroy() {
    this.cSub$.unsubscribe()
  }


}
