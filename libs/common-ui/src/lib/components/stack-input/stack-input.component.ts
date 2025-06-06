import { Component, forwardRef, HostListener, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
  selector: 'tt-stack-input',
  imports: [CommonModule, SvgIconComponent, FormsModule],
  templateUrl: './stack-input.component.html',
  styleUrl: './stack-input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => StackInputComponent),
    },
  ],
})
export class StackInputComponent implements ControlValueAccessor {
  value = signal<string[]>([]);

  innerInput = '';

  @HostListener('keydown.enter')
  onEnter() {
    if (!this.innerInput) return;
    this.value.set([...this.value(), this.innerInput]);
    this.innerInput = '';
    this.onChange(this.value());
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(stack: string[] | null): void {
    if (!stack) {
      this.value.set([]);
      return;
    }
    this.value.set(stack);
  }

  setDisabledState?(isDisabled: boolean): void {}

  onChange(value: string[] | null) {}

  onTouched() {}

  onTagDelete(i: number) {
    const tags = this.value();
    tags.splice(i, 1);
    this.value.set(tags);
    this.onChange(this.value());
  }
}
