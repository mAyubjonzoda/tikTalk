import { Component, forwardRef, inject, signal } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { TtInputComponent } from '../tt-input/tt-input.component';
import { DadataService } from '@tt/data-access';
import { debounceTime, switchMap, tap } from 'rxjs';

@Component({
  selector: 'tt-address-input',
  imports: [CommonModule, TtInputComponent, ReactiveFormsModule, AsyncPipe],
  templateUrl: './address-input.component.html',
  styleUrl: './address-input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => AddressInputComponent),
    },
  ],
})
export class AddressInputComponent implements ControlValueAccessor {
  innerSearchControl = new FormControl();
  isDropdownOpened = signal<boolean>(true);

  dadataService = inject(DadataService);

  suggestions$ = this.innerSearchControl.valueChanges.pipe(
    debounceTime(500),
    switchMap((query) =>
      this.dadataService

        .getSuggestions(query)
        .pipe(tap((res) => this.isDropdownOpened.set(!!res.length)))
    )
  );

  writeValue(city: string | null): void {
    this.innerSearchControl.patchValue(city, {
      emitEvent: false,
    });
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    //
  }

  onChange(value: string) {}

  onTouched() {}

  onSuggestionClick(city: any) {
    this.innerSearchControl.patchValue(city, {
      emitEvent: false,
    });
    this.onChange(city);
    this.isDropdownOpened.set(false);
  }
}
