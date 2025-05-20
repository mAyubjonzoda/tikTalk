import { Component, inject } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  FormRecord,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MockService } from './mock.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Feature } from './mock.interface';
import { KeyValuePipe, NgIf } from '@angular/common';

import { MaskitoDirective } from '@maskito/angular';
import type { MaskitoOptions } from '@maskito/core';
import mask from './mask';
import date from './date';

enum ReceiverTypes {
  NEW = 'NEW',
  OLD = 'OLD',
}
enum Guarantee {
  NO_GUARANTEE = 'noguarantee',
  ONE_MONTH = '1month',
  THREE_MONTH = '3month',
}
type ReceiverInfo = {
  type: ReceiverTypes;
  brand: string;
};

function getAddressForm() {
  return new FormGroup({
    city: new FormControl<string>(''),
    street: new FormControl<string>(''),
    building: new FormControl<number | null>(null),
    apartment: new FormControl<number | null>(null),
  });
}

@Component({
  selector: 'app-form-page',
  imports: [ReactiveFormsModule, KeyValuePipe, NgIf, MaskitoDirective],
  templateUrl: './form-page.component.html',
  styleUrl: './form-page.component.scss',
})
export class FormPageComponent {
  mockService = inject(MockService);
  features: Feature[] = [];
  readonly options: MaskitoOptions = mask;
  readonly date: MaskitoOptions = date;

  ReceiverTypes = ReceiverTypes;
  Guarantee = Guarantee;
  form = new FormGroup({
    type: new FormControl<ReceiverInfo | null>(null, Validators.required),
    model: new FormControl<string>('', Validators.required),
    description: new FormControl<string>(''),
    date: new FormControl<string>(''),
    guarantee: new FormControl<Guarantee | null>(null, Validators.required),
    addresses: new FormArray([getAddressForm()]),
    features: new FormRecord({}),
  });

  constructor() {
    // this.mockService
    //   .getAddresses()
    //   .pipe(takeUntilDestroyed())
    //   .subscribe((val) => {
    //     this.form.controls.addresses.clear();
    //     for (const i of val) {
    //       this.form.controls.addresses.push(getAddressForm());
    //     }
    //     this.form.patchValue({ addresses: val });
    //   });

    this.mockService
      .getFeatures()
      .pipe(takeUntilDestroyed())
      .subscribe((features) => {
        this.features = features;
        for (const feature of features) {
          this.form.controls.features.addControl(
            feature.code,
            new FormControl(feature.value)
          );
        }
      });

    this.form.controls.type.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe((val) => {
        console.log(val);

        //   this.form.controls.inn.clearValidators();
        //   this.form.controls.inn.updateValueAndValidity();
        //   if (val === ReceiverTypes.LEGAL) {
        //     this.form.controls.inn.setValidators([
        //       Validators.required,
        //       Validators.minLength(10),
        //     ]);
        //   }
        // });
      });
  }

  onSubmit(event: SubmitEvent) {
    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();
    if (!this.form.valid) return;

    //
    console.log(this.form.valid);
    console.log(this.form.value);
  }

  addAddress() {
    this.form.controls.addresses.insert(0, getAddressForm());
  }

  removeAddress(i: number) {
    this.form.controls.addresses.removeAt(i, { emitEvent: false });
  }

  sort = () => 0;
}
