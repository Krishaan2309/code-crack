import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-codecrackedpage',
  templateUrl: './codecrackedpage.component.html',
  styleUrls: ['./codecrackedpage.component.css']
})
export class CodecrackedpageComponent {
 @Input()
 myFormValue:any

 ngOnInit(){
  console.log(this.myFormValue)
 }

 @Output()
 continueClicked = new EventEmitter<boolean>

 OnClickContinue(){
  this.continueClicked.emit(true)
 }
  
}
