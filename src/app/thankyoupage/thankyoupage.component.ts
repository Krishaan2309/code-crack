// thankyoupage.component.ts
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-thankyoupage',
  templateUrl: './thankyoupage.component.html',
  styleUrls: ['./thankyoupage.component.css']
})
export class ThankyoupageComponent implements OnInit {
  // User information
  userName: string = 'John';
  userEmail: string = 'Johndavid@gmail.com';
  @Input()
  myFormValue:any

  

  ngOninit(){
    console.log(this.myFormValue)
  }
  
  // Image paths
  logoPath: string = 'assets/images/asp-rcm-logo.png';
  teamImagePath: string = 'assets/images/healthcare-team.png';
  
  // Modal visibility flags
  showBoothModal: boolean = false;
  showDeckModal: boolean = false;
  showCallModal: boolean = false;
  showCallConfirmation: boolean = false;
  
  // Form data
  callForm: FormGroup;
  timeSlots: string[] = [
    '01:00', '01:30',
    '02:00', '02:30',
    '03:00', '03:30',
    '04:00', '04:30',
    '05:00', '05:30',
    '06:00', '06:30',
    '07:00', '07:30',
    '08:00', '08:30',
    '09:00', '09:30',
    '10:00', '10:30',
    '11:00', '11:30',
    '12:00', '12:30',
    '13:00', '13:30',
    '14:00', '14:30',
    '15:00', '15:30',
    '16:00', '16:30',
    '17:00', '17:30',
    '18:00', '18:30',
    '19:00', '19:30',
    '20:00', '20:30',
    '21:00', '21:30',
    '22:00', '22:30',
    '23:00', '23:30'
  ];
  timeZones: string[] = [
    'EDT'
    ,'CDT'
    ,'MDT'
    ,'PDT'
    ,'ADT'
    ,'HST'
  ];
  
  
  
  
  // Selected values
  selectedDate: string
  selectedTime: string = '9:00 AM';
  selectedTimeZone: string = 'UTC'

  OnDateSelected(){
    console.log(this.selectedDate)
  }
  constructor(private fb: FormBuilder,
    private http: HttpClient
  ) {
    this.callForm = this.fb.group({
      date: ['', Validators.required],
      time: ['', Validators.required],
      timezone: ['', Validators.required],

    });
  }

  ngOnInit(): void {
    // Initialize your component here
  }

  // Modal control methods
  openBoothModal(): void {
    this.closeAllModals();
    this.showBoothModal = true;
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'accept': '*/*'
    });

    const requestBody = {
      client_id: this.myFormValue.id,
      contact_preference: 1,
      scheduled_date: null,
      scheduled_timezone: null,
      scheduled_time: null
    };
    console.log("Booth BODY", requestBody)
    this.http.post(`https://apiccapp.asprcmsolutions.com/addboothdata?client_id=${this.myFormValue.id}`, requestBody, { headers }).subscribe({
      next: response => {
        console.log('POST Booth Success:', response)
      },
      error: error => console.error('POST Booth Error:', error)
    });

  }

  openDeckModal(): void {
    this.closeAllModals();
    this.showDeckModal = true;
    document.body.style.overflow = 'hidden';

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'accept': '*/*'
    });

    const requestBody = {
      client_id: this.myFormValue.id,
      contact_preference: 2,
      scheduled_date: null,
      scheduled_timezone: null,
      scheduled_time: null
    };
    console.log("DECK BODY", requestBody)
    this.http.post(`https://apiccapp.asprcmsolutions.com/addemaildata?client_id=${this.myFormValue.id}`, requestBody, { headers }).subscribe({
      next: response => {
        console.log('POST DECK Success:', response)
      },
      error: error => console.error('POST DECK Error:', error)
    });
  }


  restartAppAfterDelay() {
    setTimeout(() => {
      window.location.reload();
    }, 10000); // 3000 milliseconds = 3 seconds
  }

  openCallModal(): void {
    this.closeAllModals();
    this.showCallModal = true;
    document.body.style.overflow = 'hidden';
  }

  closeBooth(): void {
    this.showBoothModal = false;
    document.body.style.overflow = '';
    this.restartAppAfterDelay()
  }

  closeDeck(): void {
    this.showDeckModal = false;
    document.body.style.overflow = '';
    this.restartAppAfterDelay()
  }

  closeCall(): void {
    this.showCallModal = false;
    document.body.style.overflow = '';
  }

  closeCallConfirmation(): void {
    this.showCallConfirmation = false;
    document.body.style.overflow = '';
    this.restartAppAfterDelay()
  }

  closeAllModals(): void {
    this.showBoothModal = false;
    this.showDeckModal = false;
    this.showCallModal = false;
    this.showCallConfirmation = false;
    document.body.style.overflow = '';
  }

  // This prevents clicks inside the modal from closing it
  closeModals(event: Event): void {
    if ((event.target as HTMLElement).classList.contains('modal-overlay')) {
      this.closeAllModals();
    }
  }

  // Form handling methods
  openDatePicker(): void {
    // In a real implementation, you would trigger your date picker here
    // For this example, we'll just set a default date
    this.callForm.patchValue({
      date: 'Tuesday, April 22, 2025'
    });
  }

  submitCallSchedule(): void {
    if (this.callForm.valid) {
      // Store selected values
      this.selectedDate = this.callForm.value.date;
      this.selectedTime = this.callForm.value.time;
      this.selectedTimeZone = this.callForm.value.timezone;
      
      // Show confirmation modal
      this.showCallModal = false;
      this.showCallConfirmation = true;
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'accept': '*/*'
      });
  
      const requestBody = {
        client_id: this.myFormValue.id,
        scheduled_date: this.selectedDate,
        scheduled_timezone: this.selectedTimeZone,
        scheduled_time: this.selectedTime
      };
      console.log("DECK BODY", requestBody)
      this.http.post('https://apiccapp.asprcmsolutions.com/addscheduleddata', requestBody, { headers }).subscribe({
        next: response => {
          console.log('POST DECK Success:', response)
        },
        error: error => console.error('POST DECK Error:', error)
      });
      // In a real app, you would send this data to your backend here
      console.log('Call scheduled for:', this.selectedDate, 'at', this.selectedTime);
    }
  }
}