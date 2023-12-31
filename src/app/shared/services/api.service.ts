import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CurrencyResponseInterface} from "../interface/currency-response.interface";
import {GraphicalCurrencyResponseInterface} from "../interface/graphical-currency-response.interface";
import {ExchangeResponseInterface} from "../interface/exchange-response.interface";
import {CurrencyIdResponseInterface} from "../interface/currency-id-response.interface";

@Injectable({
  providedIn: 'root'
})

export class ApiService{
  constructor(private http: HttpClient) {
  }

  getCurrency(currency:string = 'USD'): Observable<CurrencyResponseInterface[]>{
    return this.http.get<CurrencyResponseInterface[]>(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&sparkline=false`);
  }

  getGrpahicalCurrencyData(coinId:string, currency:string, days: number): Observable<GraphicalCurrencyResponseInterface>{
    return this.http.get<GraphicalCurrencyResponseInterface>(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency}&days=${days}`)
  }

  getExchange() :Observable<ExchangeResponseInterface[]>{
    return this.http.get<ExchangeResponseInterface[]>(`https://api.coingecko.com/api/v3/exchanges`)
  }

  getCurrencyById(coinId:string): Observable<CurrencyIdResponseInterface>{
    return this.http.get<CurrencyIdResponseInterface>(`https://api.coingecko.com/api/v3/coins/${coinId}`)
  }

}
