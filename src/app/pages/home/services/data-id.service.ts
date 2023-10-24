import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";

interface setCoinInterface {
  id:string
  symbol: string
}

@Injectable()
export class DataIdService {
  private selectedCoinIdSubject = new BehaviorSubject<setCoinInterface>({id: 'bitcoin', symbol: 'BTC'});
  selectedCoinId$ = this.selectedCoinIdSubject.asObservable();

  setSelectedCoinId(id: string, symbol: string) {
    this.selectedCoinIdSubject.next({id, symbol});
  }
}
