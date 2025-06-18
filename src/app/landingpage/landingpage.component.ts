// import { Component, EventEmitter, Output , ElementRef, ViewChild } from '@angular/core';


// @Component({
//   selector: 'app-landingpage',
//   templateUrl: './landingpage.component.html',
//   styleUrls: ['./landingpage.component.css']
// })
// export class LandingpageComponent {
//   @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;

  

// @Output()
// clickHereMoreDetailsClicked = new EventEmitter<boolean>

// showButton = false;
// onVideoEnded() {
//   this.showButton = true;
// }

// ngAfterViewInit() {
//   console.log('ngAfterViewInit - DOM is ready'); // Safe to access DOM elements

//   const video = this.videoPlayer.nativeElement;
//   video.play().then(() => {
//     console.log('Video is playing automatically');
//   }).catch(err => {
//     console.warn('Autoplay failed', err);
//   });
// }



// clickHere(){
//   this.clickHereMoreDetailsClicked.emit(true)

// }
// }


import { Component, ViewChild, ElementRef, AfterViewInit, OnDestroy, HostListener, EventEmitter, Output } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-video-background',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('in', style({opacity: 1})),
      transition(':enter', [
        style({opacity: 0}),
        animate(300, style({opacity: 1}))
      ]),
      transition(':leave', [
        animate(300, style({opacity: 0}))
      ])
    ])
  ]
})
export class LandingpageComponent implements AfterViewInit, OnDestroy {
  @ViewChild('backgroundVideo') videoElement!: ElementRef<HTMLVideoElement>;
  @Output() helpRequested = new EventEmitter<void>();

  constructor(private router:Router){}

  // Configuration
  videoSrc = 'assets/intro.mp4';

  // State management
  videoCanPlay = false;
  userInteracted = false;
  showPlayButton = false;
  showHelpButton = false;
  videoEnded = false;
  countdownSeconds = 10;
  countdownProgress = 0;
  
  private intersectionObserver?: IntersectionObserver;
  private retryCount = 0;
  private maxRetries = 3;
  private countdownInterval?: any;
  private refreshTimeout?: any;

  ngAfterViewInit() {
    this.initializeVideo();
  }

  private initializeVideo() {
    const video = this.videoElement.nativeElement;
    
    // Set video attributes programmatically for better browser support
    video.muted = true;
    video.playsInline = true;
    video.loop = false; // IMPORTANT: Remove loop to allow ended event
    video.setAttribute('webkit-playsinline', 'true');
    
    // Add video event listeners
    video.addEventListener('ended', () => this.onVideoEnded());
    video.addEventListener('timeupdate', () => this.onTimeUpdate());
    
    this.setupIntersectionObserver();
    this.preloadVideo();
  }

  private preloadVideo() {
    const video = this.videoElement.nativeElement;
    video.load();
  }

  private setupIntersectionObserver() {
    this.intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && this.videoCanPlay && !this.videoEnded) {
          this.attemptAutoplay();
        } else if (!entry.isIntersecting && !this.videoEnded) {
          this.pauseVideo();
        }
      });
    }, { threshold: 0.25 });

    this.intersectionObserver.observe(this.videoElement.nativeElement);
  }

  onVideoLoaded() {
    console.log('Video metadata loaded');
    this.videoCanPlay = true;
  }

  onCanPlay() {
    console.log('Video can play');
    this.videoCanPlay = true;
    
    // Try autoplay if user hasn't interacted yet and video hasn't ended
    if (!this.userInteracted && !this.videoEnded) {
      this.attemptAutoplay();
    }
  }

  private onTimeUpdate() {
    // Optional: You can add progress tracking here if needed
    const video = this.videoElement.nativeElement;
    if (video.duration && video.currentTime) {
      const progress = (video.currentTime / video.duration) * 100;
      // console.log('Video progress:', progress + '%');
    }
  }

  private async attemptAutoplay() {
    if (!this.videoCanPlay || this.userInteracted || this.videoEnded) return;

    try {
      const video = this.videoElement.nativeElement;
      await video.play();
      console.log('Autoplay successful');
      this.showPlayButton = false;
    } catch (error) {
      console.log('Autoplay blocked, showing play button');
      this.handleAutoplayBlocked();
    }
  }

  private handleAutoplayBlocked() {
    this.showPlayButton = true;
    this.videoCanPlay = false;
  }

  onUserInteraction() {
    this.userInteracted = true;
    this.showPlayButton = false;
    this.videoCanPlay = true;
    
    if (!this.videoEnded) {
      this.playVideo();
    }
  }

  private async playVideo() {
    if (this.videoEnded) return; // Don't play if video has ended
    
    try {
      const video = this.videoElement.nativeElement;
      if (video.paused) {
        await video.play();
        console.log('Video playing after user interaction');
      }
    } catch (error) {
      console.error('Failed to play video after user interaction:', error);
      this.retryPlayback();
    }
  }

  private retryPlayback() {
    if (this.retryCount < this.maxRetries && !this.videoEnded) {
      this.retryCount++;
      console.log(`Retrying video playback (${this.retryCount}/${this.maxRetries})`);
      
      setTimeout(() => {
        this.playVideo();
      }, 1000 * this.retryCount);
    } else {
      console.error('Max retries reached, falling back to poster');
      this.videoCanPlay = false;
    }
  }

  private pauseVideo() {
    if (this.videoEnded) return; // Don't pause if video has ended (keep it frozen)
    
    const video = this.videoElement.nativeElement;
    if (!video.paused) {
      video.pause();
    }
  }

  onVideoPlay() {
    console.log('Video started playing');
    this.showPlayButton = false;
  }

  onVideoPause() {
    console.log('Video paused');
  }

  onVideoError(event: any) {
    console.error('Video loading error:', event);
    this.videoCanPlay = false;
    this.showPlayButton = false;
  }

  onVideoEnded() {
    console.log('Video ended, showing help button and freezing video');
    this.videoEnded = true;
    this.showHelpButton = true;
    this.showPlayButton = false;
    
    // Freeze the video at the last frame
    const video = this.videoElement.nativeElement;
    video.pause();
    
    this.startCountdown();
  }

  private startCountdown() {
    this.countdownSeconds = 10;
    this.countdownProgress = 0;
    
    // Clear any existing timers
    this.clearTimers();
    
    console.log('Starting countdown...');
    
    // Start the countdown interval
    this.countdownInterval = setInterval(() => {
      this.countdownSeconds--;
      this.countdownProgress = ((10 - this.countdownSeconds) / 10) * 157; // 157 = 2πr where r=25
      
      console.log(`Countdown: ${this.countdownSeconds} seconds remaining`);
      
      if (this.countdownSeconds <= 0) {
        this.refreshPage();
      }
    }, 1000);
    
    // Set a timeout as backup
    this.refreshTimeout = setTimeout(() => {
      this.refreshPage();
    }, 10100); // Slightly longer than 5 seconds as backup
  }

  onHelpClick() {
    console.log('Help button clicked - stopping countdown');
    this.clearTimers();
    this.showHelpButton = false;
    
    // Emit event to parent component
    this.helpRequested.emit();
    this.router.navigate(['locker-page'])
  }

  private refreshPage() {
    console.log('Auto-refreshing page after countdown');
    this.clearTimers();
    
    // Reset all states before refresh
    this.showHelpButton = false;
    this.videoEnded = false;
    this.userInteracted = false;
    this.videoCanPlay = false;
    
    // Use location.reload() for a clean refresh
    window.location.reload();
  }

  private clearTimers() {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
      this.countdownInterval = null;
    }
    
    if (this.refreshTimeout) {
      clearTimeout(this.refreshTimeout);
      this.refreshTimeout = null;
    }
  }

  // Listen for any user interaction on the page
  @HostListener('document:click', ['$event'])
  @HostListener('document:keydown', ['$event'])
  @HostListener('document:touchstart', ['$event'])
  onDocumentInteraction(event: any) {
    if (!this.userInteracted && this.videoCanPlay && !this.videoEnded) {
      this.userInteracted = true;
      
      if (!this.showPlayButton) {
        this.playVideo();
      }
    }
  }

  // Handle visibility changes (tab switching, etc.)
  @HostListener('document:visibilitychange')
  onVisibilityChange() {
    if (this.videoEnded) return; // Don't change video state if it has ended
    
    if (document.visibilityState === 'visible' && this.userInteracted && this.videoCanPlay) {
      this.playVideo();
    } else if (document.visibilityState === 'hidden') {
      this.pauseVideo();
    }
  }

  // Handle page focus/blur
  @HostListener('window:focus')
  onWindowFocus() {
    if (!this.videoEnded && this.userInteracted && this.videoCanPlay) {
      this.playVideo();
    }
  }

  @HostListener('window:blur')
  onWindowBlur() {
    if (!this.videoEnded) {
      this.pauseVideo();
    }
  }

  ngOnDestroy() {
    this.intersectionObserver?.disconnect();
    this.clearTimers();
    
    // Don't pause video if it has ended (keep it frozen)
    if (!this.videoEnded) {
      this.pauseVideo();
    }
  }
}