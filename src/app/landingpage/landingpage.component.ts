import { Component, EventEmitter, Output , ElementRef, ViewChild } from '@angular/core';


@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.css']
})
export class LandingpageComponent {
  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;

  

@Output()
clickHereMoreDetailsClicked = new EventEmitter<boolean>

showButton = false;
onVideoEnded() {
  this.showButton = true;
}

ngAfterViewInit() {
  console.log('ngAfterViewInit - DOM is ready'); // Safe to access DOM elements

  const video = this.videoPlayer.nativeElement;
  video.play().then(() => {
    console.log('Video is playing automatically');
  }).catch(err => {
    console.warn('Autoplay failed', err);
  });
}



clickHere(){
  this.clickHereMoreDetailsClicked.emit(true)

}
}
