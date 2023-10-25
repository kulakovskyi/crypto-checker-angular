import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../../../shared/services/api.service";
import {map, Observable} from "rxjs";
import {ExchangeResponseInterface} from "../../../../shared/interface/exchange-response.interface";

@Component({
  selector: 'app-exchanges-min',
  templateUrl: './exchanges-min.component.html',
  styleUrls: ['./exchanges-min.component.scss']
})
export class ExchangesMinComponent implements OnInit{

  exchanges$!: Observable<ExchangeResponseInterface[]>

  constructor(private apiService: ApiService) {
  }

  ngOnInit() {
    this.getAllExchange()
    this.apiService.getExchange().subscribe(res => {
      console.log(res)
    })
  }

  getAllExchange(){
    this.exchanges$ = this.apiService.getExchange().pipe(
      map(data => data.slice(0,11))
    )
  }

}
