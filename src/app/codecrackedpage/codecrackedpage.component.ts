import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-codecrackedpage',
  templateUrl: './codecrackedpage.component.html',
  styleUrls: ['./codecrackedpage.component.css']
})
export class CodecrackedpageComponent {
 @Input()
 myFormValue:any
 videoSrc = "assets/ccv_climax.mp4"
 showOverlay:boolean = false;

 ngOnInit(){
  console.log(this.myFormValue)
 }
 constructor(private router:Router){}
 

 @Output()
 continueClicked = new EventEmitter<boolean>

 OnClickContinue(){
  this.continueClicked.emit(true)
 }

 onVideoEnded(){
  this.showOverlay = true
  // this.router.navigate(['thankyou-page'])
 }
  
}
