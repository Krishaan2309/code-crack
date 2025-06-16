import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface CountryCode {
  country: string;
  code: string;
  flag: string;
}

@Component({
  selector: 'app-getdetailspage',
  templateUrl: './getdetailspage.component.html',
  styleUrls: ['./getdetailspage.component.css']
})
export class GetdetailspageComponent implements OnInit {
  myForm!: FormGroup;
  formValue: any;
  
  @Output()
  revealClicked = new EventEmitter<any>();
  
  // List of country codes with flags
  countryCodes: CountryCode[] = [
    { country: 'United States', code: '+1', flag: 'US' },
    // { country: 'United Kingdom', code: '+44', flag: 'GB' },
    // { country: 'India', code: '+91', flag: 'IN' },
    // { country: 'Canada', code: '+1', flag: 'CA' },
    // { country: 'Australia', code: '+61', flag: 'AU' },
    // { country: 'Germany', code: '+49', flag: 'DE' },
    // { country: 'France', code: '+33', flag: 'FR' },
    // { country: 'China', code: '+86', flag: 'CN' },
    // { country: 'Japan', code: '+81', flag: 'JP' },
    // { country: 'Brazil', code: '+55', flag: 'BR' },
    // { country: 'Mexico', code: '+52', flag: 'MX' },
    // { country: 'Spain', code: '+34', flag: 'ES' },
    // { country: 'Italy', code: '+39', flag: 'IT' },
    // { country: 'Russia', code: '+7', flag: 'RU' },
    // { country: 'South Korea', code: '+82', flag: 'KR' }
  ];
  constructor(private fb: FormBuilder,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.myForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      countryCode: ['+1', [Validators.required]], // Default to US (+1)
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\(\d{3}\) \d{3}-\d{4}$/)]]
    });
  }

  onPhoneInput(): void {
    const control = this.myForm.get('phoneNumber');
    let digits = control?.value.replace(/\D/g, '');
  
    if (digits.length > 10) {
      digits = digits.slice(0, 10); // Max 10 digits
    }
  
    let formatted = '';
  
    if (digits.length > 0) {
      formatted += '(' + digits.substring(0, Math.min(3, digits.length));
    }
    if (digits.length >= 4) {
      formatted += ') ' + digits.substring(3, Math.min(6, digits.length));
    }
    if (digits.length >= 7) {
      formatted += '-' + digits.substring(6, 10);
    }
  
    control?.setValue(formatted, { emitEvent: false });
  }
  

  OnSubmit() {
    if (this.myForm.valid) {
      // Combine country code and phone number for the final value
      const formData = {
        id: 0,
        name: this.myForm.value.name,
        email: this.myForm.value.email,
        phn_no: `${this.myForm.value.countryCode} ${this.myForm.value.phoneNumber}`
      };
      
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'accept': '*/*'
      });
      this.http.post('https://apiccapp.asprcmsolutions.com/clients', formData, { headers }).subscribe({
        next: response => {
          console.log('POST Success:', response)
          this.formValue = response;
          this.revealClicked.emit(this.formValue);
        },
        error: error => console.error('POST Error:', error)
      });
      
      // console.log(formData);
    }
  }
}
