import { Component, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
@Component({
  selector: 'app-welcomepage',
  templateUrl: './welcomepage.component.html',
  styleUrls: ['./welcomepage.component.css']
})
export class WelcomepageComponent {
  isNextClicked: boolean = false

  

  @Output()
  onNextButtonChanged = new EventEmitter<boolean>();
  
  onNext(){
    this.onNextButtonChanged.emit(true)
    // this.isNextClicked = !this.isNextClicked
    // console.log(this.isNextClicked)
  }

  onBack(){
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }

}
