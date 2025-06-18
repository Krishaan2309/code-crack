import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface AutoplayCapability {
  canAutoplay: boolean;
  requiresUserInteraction: boolean;
  supportsInlinePlayback: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class VideoAutoplayServiceService {
  private autoplayCapabilitySubject = new BehaviorSubject<AutoplayCapability>({
    canAutoplay: false,
    requiresUserInteraction: true,
    supportsInlinePlayback: true
  });

  autoplayCapability$ = this.autoplayCapabilitySubject.asObservable();

  constructor() {
    this.detectAutoplayCapability();
  }

  private async detectAutoplayCapability() {
    try {
      const capability = await this.testAutoplaySupport();
      this.autoplayCapabilitySubject.next(capability);
    } catch (error) {
      console.warn('Failed to detect autoplay capability:', error);
    }
  }

  private async testAutoplaySupport(): Promise<AutoplayCapability> {
    return new Promise((resolve) => {
      // Create a test video element
      const video = document.createElement('video');
      video.muted = true;
      video.playsInline = true;
      video.setAttribute('webkit-playsinline', 'true');
      video.style.position = 'absolute';
      video.style.left = '-9999px';
      video.style.top = '-9999px';
      video.style.width = '1px';
      video.style.height = '1px';
      
      // Create a minimal video data URL (1x1 pixel, 0.1 second)
      const videoData = 'data:video/mp4;base64,AAAAIGZ0eXBpc29tAAACAGlzb21pc28yYXZjMQAAAABmZGF0AAAADGWIhAAV//728P4AAAA=';
      video.src = videoData;

      let resolved = false;
      const timeout = setTimeout(() => {
        if (!resolved) {
          resolved = true;
          cleanup();
          resolve({
            canAutoplay: false,
            requiresUserInteraction: true,
            supportsInlinePlayback: this.supportsInlinePlayback()
          });
        }
      }, 2000);

      const cleanup = () => {
        clearTimeout(timeout);
        if (video.parentNode) {
          video.parentNode.removeChild(video);
        }
      };

      video.addEventListener('canplaythrough', async () => {
        if (resolved) return;
        
        try {
          await video.play();
          resolved = true;
          cleanup();
          resolve({
            canAutoplay: true,
            requiresUserInteraction: false,
            supportsInlinePlayback: this.supportsInlinePlayback()
          });
        } catch (error) {
          resolved = true;
          cleanup();
          resolve({
            canAutoplay: false,
            requiresUserInteraction: true,
            supportsInlinePlayback: this.supportsInlinePlayback()
          });
        }
      });

      video.addEventListener('error', () => {
        if (!resolved) {
          resolved = true;
          cleanup();
          resolve({
            canAutoplay: false,
            requiresUserInteraction: true,
            supportsInlinePlayback: this.supportsInlinePlayback()
          });
        }
      });

      document.body.appendChild(video);
      video.load();
    });
  }

  private supportsInlinePlayback(): boolean {
    const video = document.createElement('video');
    return 'playsInline' in video || 'webkitPlaysInline' in video;
  }

  // Utility method to attempt playing a video with fallback handling
  async attemptVideoPlay(video: HTMLVideoElement): Promise<boolean> {
    try {
      await video.play();
      return true;
    } catch (error) {
      console.warn('Video play failed:', error);
      return false;
    }
  }

  // Preload video for better performance
  preloadVideo(src: string): Promise<HTMLVideoElement> {
    return new Promise((resolve, reject) => {
      const video = document.createElement('video');
      video.preload = 'metadata';
      video.muted = true;
      video.playsInline = true;
      
      video.addEventListener('loadedmetadata', () => {
        resolve(video);
      });
      
      video.addEventListener('error', (error) => {
        reject(error);
      });
      
      video.src = src;
    });
  }

  // Get browser-specific autoplay policy info
  getBrowserAutoplayInfo(): string {
    const userAgent = navigator.userAgent.toLowerCase();
    
    if (userAgent.includes('chrome')) {
      return 'Chrome requires muted videos for autoplay';
    } else if (userAgent.includes('safari')) {
      return 'Safari has strict autoplay policies';
    } else if (userAgent.includes('firefox')) {
      return 'Firefox allows autoplay for muted videos';
    } else if (userAgent.includes('edge')) {
      return 'Edge follows Chrome autoplay policies';
    }
    
    return 'Browser autoplay policy varies';
  }
}