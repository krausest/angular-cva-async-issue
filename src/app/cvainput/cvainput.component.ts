import { Component, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, ControlValueAccessor, FormControl, FormGroup, NG_ASYNC_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator, Validators } from '@angular/forms';
import { filter, first, map, Observable, of, tap } from 'rxjs';

export let asyncEvenLength: AsyncValidatorFn = (control: AbstractControl): Promise<ValidationErrors|null> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve((control.value.length % 2) !== 0 ? {asyncEvenLength: true} : null)
    }, 2000)
  })
 }

 export interface ICvainputComponentValue {
  name: string;
  adress: string;
}

@Component({
  selector: 'app-cvainput',
  templateUrl: './cvainput.component.html',
  styleUrls: ['./cvainput.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: CvainputComponent,
    },
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: CvainputComponent,
      multi: true
    }    
  ],  
})
export class CvainputComponent implements OnInit, ControlValueAccessor, Validator {

  fg = new FormGroup({
    name: new FormControl<string>("", { validators:[Validators.required, Validators.min(5), Validators.max(50)], asyncValidators:[asyncEvenLength], nonNullable: true }),
    adress: new FormControl<string>(""),
  })

  constructor() { }

  ngOnInit(): void {
    this.fg.valueChanges.subscribe(val => {
      this._onChange(val as ICvainputComponentValue)
    })
  }

  private _onChange = (val: ICvainputComponentValue) => { };
  private _onTouched = () => { };
  private onValidatorChange: any;

  registerOnChange(fn: (experience: ICvainputComponentValue) => void): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this._onTouched = fn;
  }

  writeValue(value: ICvainputComponentValue | undefined | null): void {
    console.log("writeValue", value);
    this.fg.setValue(value ?? {name:'', adress: ''}, {
      emitEvent: true,
      onlySelf: false
    });
    this.fg.updateValueAndValidity({
      onlySelf: false
    });    
  }

  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.fg.disable() : this.fg.enable();
  }

  registerOnValidatorChange?(fn: () => void): void {
    this.onValidatorChange = fn;
  }

  validate(control: AbstractControl<any, any>): Observable<ValidationErrors | null> {
      return this.fg.statusChanges.pipe(
        filter(s => s!="PENDING"),
        map(status => {
          console.log('pipe', status);
          return status == "VALID" ? null : ({ cavinput: 'invalid' });
        }),
        first()
      )
  }
}
