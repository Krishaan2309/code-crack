import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.css']
})
export class LandingpageComponent {


  

@Output()
clickHereMoreDetailsClicked = new EventEmitter<boolean>


clickHere(){
  this.clickHereMoreDetailsClicked.emit(true)
}
}
