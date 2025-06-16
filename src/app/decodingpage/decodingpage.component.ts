import { Component, EventEmitter, Output } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';


@Component({
  selector: 'app-decodingpage',
  templateUrl: './decodingpage.component.html',
  styleUrls: ['./decodingpage.component.css'],
  animations: [
    trigger('slideFadeUp', [
      state('visible', style({ opacity: 1, transform: 'translateY(0)' })),
      state('hidden', style({ opacity: 0, transform: 'translateY(-100px)' })),
      transition('visible => hidden', [
        animate('800ms ease-in-out')
      ])
    ])
  ]
}
)
export class DecodingpageComponent {

  @Output() initialized = new EventEmitter<void>();

  
  buttons = [
    { code: 'CO-197', state: 'visible' },
    { code: 'PR-49', state: 'visible' },
    { code: 'CO-16', state: 'visible' },
    { code: 'CO-204', state: 'visible' },
    { code: 'PR-96', state: 'visible' },
    { code: 'CO-50', state: 'visible' }
  ];

  ngOnInit(): void {
    this.initialized.emit();
    setTimeout(() => {
      this.buttons.forEach(btn => btn.state = 'hidden');

      // Optional: remove buttons after animation
      setTimeout(() => {
        this.buttons = [];
      }, 1000);
    }, 1000); // 2-second delay before starting animation
  }
}





