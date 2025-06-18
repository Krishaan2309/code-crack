// import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css']
// })
// export class AppComponent {
//   title = 'CodeCrack';
//   isNextClicked:boolean = false
//   isRevealMyImpactClicked:boolean = false
//   formValue:any
//   continueClicked:boolean
//   clickHereBool:boolean
  


//   @ViewChild('backgroundVideo') videoElement!: ElementRef<HTMLVideoElement>;
  
//   //  = 'assets/videos/background-video.mp4';
//   videoSrc = "assets/cc_intro.mp4";
//   private intersectionObserver?: IntersectionObserver;
//   showDecodingPage: boolean;

//   ngAfterViewInit() {
//     this.setupVideoAutoplay();
//     this.setupIntersectionObserver();
//   }

//   private setupVideoAutoplay() {
//     const video = this.videoElement.nativeElement;
    
//     // Force autoplay on load/reload
//     video.addEventListener('canplaythrough', () => {
//       this.playVideo();
//     });

//     // Handle visibility change (tab switching)
//     document.addEventListener('visibilitychange', () => {
//       if (document.visibilityState === 'visible') {
//         this.playVideo();
//       }
//     });
//   }

//   private setupIntersectionObserver() {
//     // Play/pause based on viewport visibility for performance
//     this.intersectionObserver = new IntersectionObserver((entries) => {
//       entries.forEach(entry => {
//         if (entry.isIntersecting) {
//           this.playVideo();
//         } else {
//           this.pauseVideo();
//         }
//       });
//     }, { threshold: 0.1 });

//     this.intersectionObserver.observe(this.videoElement.nativeElement);
//   }

//   private async playVideo() {
//     try {
//       const video = this.videoElement.nativeElement;
//       if (video.paused) {
//         await video.play();
//       }
//     } catch (error) {
//       console.warn('Video autoplay failed:', error);
//       // Fallback: show poster image or static background
//       this.handleAutoplayFailure();
//     }
//   }

//   private pauseVideo() {
//     const video = this.videoElement.nativeElement;
//     if (!video.paused) {
//       video.pause();
//     }
//   }

//   onVideoLoaded() {
//     // Video is ready, ensure it plays
//     this.playVideo();
//   }

//   onVideoError(event: any) {
//     console.error('Video loading error:', event);
//     // Handle video loading errors
//     this.handleVideoError();
//   }

//   private handleAutoplayFailure() {
//     // Fallback for browsers that block autoplay
//     const videoContainer = this.videoElement.nativeElement.parentElement;
//     videoContainer?.classList.add('autoplay-failed');
//   }

//   private handleVideoError() {
//     // Show fallback background image
//     const videoContainer = this.videoElement.nativeElement.parentElement;
//     videoContainer?.classList.add('video-error');
//   }

//   ngOnDestroy() {
//     this.intersectionObserver?.disconnect();
//   }


//   onChildInitialized() {
//     setTimeout(() => {
//       this.showDecodingPage = false;
//     }, 3000);
//   }


//   onNext(value:boolean){
//     this.isNextClicked = value
//   }

//   onrevealMyImpactClicked(value:boolean){
//     this.isRevealMyImpactClicked = value
//   }

//   onRevealClicked(formValue){
//     this.formValue = formValue
//   }
//   onContinueClicked(cont){
//     this.continueClicked = cont
//   }

//   // clickHere(value){
//   //   this.clickHereBool = value;

//   //   // ✅ Skip WelcomePage
//   //   this.isNextClicked = true;
//   // }


//   @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;
  
    
  
//   @Output()
//   clickHereMoreDetailsClicked = new EventEmitter<boolean>
  
//   showButton = false;
//   onVideoEnded() {
//     this.showButton = true;
//   }
  
//   // ngAfterViewInit() {
//   //   console.log('ngAfterViewInit - DOM is ready');
  
//   //   const video = this.videoPlayer.nativeElement;
//   //   video.play().then(() => {
//   //     console.log('Video is playing automatically');
//   //   }).catch(err => {
//   //     console.warn('Autoplay failed', err);
//   //   });
//   // }
  
  

  
//   clickHere(value){
//     this.clickHereBool = value;

//     // ✅ Skip WelcomePage
//     this.isNextClicked = true;
//     this.showButton = false;
//     this.clickHereMoreDetailsClicked.emit(true)
  
//   }

// }



import { Component, OnInit } from '@angular/core';
import { VideoAutoplayServiceService } from './video-autoplay-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  showHelpModal = false;
  isNextClicked:boolean = false
  isRevealMyImpactClicked:boolean = false
  formValue:any
  continueClicked:boolean
  clickHereBool:boolean
  showDecodingPage: boolean;
  
  constructor(private videoAutoplayService: VideoAutoplayServiceService, private router:Router) {}

  ngOnInit() {

    this.router.navigate(['landing-page'])
    // Optional: Subscribe to autoplay capability detection
    this.videoAutoplayService.autoplayCapability$.subscribe(capability => {
      console.log('Autoplay capability:', capability);
      
      if (!capability.canAutoplay) {
        console.log('Autoplay blocked - user interaction will be required');
      }
    });
  }

  onHelpRequested() {
    console.log('Help requested from video component');
    this.isNextClicked = true;
    // this.showHelpModal = true;
  }


  onNext(value:boolean){
    this.isNextClicked = value
  }

  onrevealMyImpactClicked(value:boolean){
    this.isRevealMyImpactClicked = value
  }

  onRevealClicked(formValue){
    this.formValue = formValue
  }
  onContinueClicked(cont){
    this.continueClicked = cont
  }

  clickHere(value){
    this.clickHereBool = value;
    this.isNextClicked = true;
  }

    onChildInitialized() {
    setTimeout(() => {
      this.showDecodingPage = false;
    }, 3000);
  }

}