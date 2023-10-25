import {Component, ViewEncapsulation} from '@angular/core';
import {CurrencyService} from "../../services/currency.service";

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TopBarComponent {

  selectedCurrency : string = "USD";

  constructor(private currencyService: CurrencyService) {
  }

  sendCurrency(event: string) {
      this.currencyService.setCurrency(event)
  }
}
