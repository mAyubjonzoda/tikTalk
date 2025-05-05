import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'svg[icon]',
  imports: [CommonModule],
  template: `<svg:use [attr.href]="href"></svg:use>`,
  styles: [''],
})
export class SvgIconComponent {
  @Input() icon = '';
  get href(): string {
    return `/assets/svg/${this.icon}.svg#${this.icon}`;
  }
}
