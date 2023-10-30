import {Injectable, OnInit} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class TopTitleService implements OnInit{
    private selectTitle$: BehaviorSubject<string> = new BehaviorSubject<string>('Home')

    currentTitle = 'Home'

    ngOnInit() {
        this.selectTitle$.subscribe(val => {
            this.currentTitle = val
        })
    }

    getTitle(): Observable<string>{
        return this.selectTitle$.asObservable()
    }

    setTitle(title: string){
        this.selectTitle$.next(title)
    }
}
