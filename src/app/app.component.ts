import {Component, OnInit} from '@angular/core';
import {SideNavToggleInterface} from "./shared/interface/side-nav-toggle.interface";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit{

  isSideCollapsed = false;
  screenWidth = 0

  ngOnInit() {
  }

  onToggleSidenav(data: SideNavToggleInterface) {
    this.screenWidth = data.screenWidth
    this.isSideCollapsed = data.collapsed
  }
}
