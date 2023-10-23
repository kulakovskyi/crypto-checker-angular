import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {SidenavData} from "../../data/sidenav-data";
import {SideNavDataInterface} from "../../interface/side-nav-data.interface";
import {SideNavToggleInterface} from "../../interface/side-nav-toggle.interface";

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss']
})



export class DrawerComponent implements OnInit{

  @Output() onToggleSidenav: EventEmitter<SideNavToggleInterface> = new EventEmitter()
  collapsed = false;
  screenWidth = 0
  navData: SideNavDataInterface[] = SidenavData

  ngOnInit() {
    this.screenWidth = window.innerWidth;
  }


  toggleCollapsed() {
    this.collapsed = !this.collapsed
    const emitter: SideNavToggleInterface = {
      collapsed: this.collapsed,
      screenWidth: this.screenWidth
    }
    this.onToggleSidenav.emit(emitter)
  }
}
