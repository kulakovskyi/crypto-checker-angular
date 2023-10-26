import {Injectable, OnInit} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class CurrencyService implements OnInit {

  private selectedCurrency$: BehaviorSubject<string> = new BehaviorSubject<string>('USD')

  currentCurrency = 'USD';

  ngOnInit() {
    this.selectedCurrency$.subscribe(val => {
      this.currentCurrency = val;
    })
  }

  getCurrency(): Observable<string>{
    return this.selectedCurrency$.asObservable()
  }

  setCurrency(currency: string){
    this.selectedCurrency$.next(currency)
  }

}
