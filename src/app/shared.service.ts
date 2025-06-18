import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private _formValue: any;

  set formValue(value: any) {
    this._formValue = value;
  }

  get formValue(): any {
    return this._formValue;
  }

  clearFormValue(): void {
    this._formValue = null;
  }
}
