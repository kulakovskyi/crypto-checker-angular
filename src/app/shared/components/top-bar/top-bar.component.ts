import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {CurrencyService} from "../../services/currency.service";
import {TopTitleService} from "../../services/top-title.service";

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TopBarComponent implements OnInit{

  selectedCurrency : string = "USD";

  title!: string

  constructor(private currencyService: CurrencyService,
              private topTitleService: TopTitleService) {
  }

  sendCurrency(event: string) {
      this.currencyService.setCurrency(event)
  }

  ngOnInit() {
    this.topTitleService.getTitle().subscribe(res => {
      this.title = res
    }
    )
  }

}
