import { Component, inject, OnInit, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { Router } from '@angular/router';
import { AuthService } from '@tt/auth';
import { TtInputComponent } from '@tt/common-ui';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule, TtInputComponent],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  authService = inject(AuthService);
  router = inject(Router);

  isPasswordVisible = signal<boolean>(false);

  form = new FormGroup({
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
  });

  onSubmit() {
    if (this.form.valid) {
      //@ts-ignore
      this.authService.login(this.form.value).subscribe((res) => {
        this.router.navigate(['']);
      });
    }
  }
}
