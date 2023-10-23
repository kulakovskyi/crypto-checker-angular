import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent {

  @Input() collapsed = false;
  @Input() screenWidth = 0;


  getBodyClass(): string {
    let styleClass = '';
    if(this.collapsed && this.screenWidth){
      styleClass = 'body-trimmed'
    }
    return styleClass
  }
}
