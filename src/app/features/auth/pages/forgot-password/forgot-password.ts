import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthShell } from '../../ui/auth-shell/auth-shell';
import { AuthService } from '../../../../core/auth/auth.service';

@Component({
  selector: 'app-forgot-password-page',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, AuthShell],
  template: `
    <app-auth-shell heading="Forgot something?" subheading="It happens. We'll get you a link to set a new one.">
      <h1>Reset your password</h1>
      @if (!submitted()) {
        <p class="lede">Enter the email on your account.</p>
        <form [formGroup]="form" (ngSubmit)="submit()">
          <label>Email</label>
          <input type="email" formControlName="email" />
          <button type="submit" [disabled]="form.invalid || loading()">Send reset link</button>
        </form>
      } @else {
        <p class="success">If an account exists for this email, a reset link has been sent.</p>
      }
      <div class="links">
        <a routerLink="/auth/login">Back to login</a>
      </div>
    </app-auth-shell>
  `
})
export class ForgotPasswordPage {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);

  readonly loading = signal(false);
  readonly submitted = signal(false);

  readonly form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]]
  });

  submit() {
    if (this.form.invalid) {
      return;
    }
    this.loading.set(true);
    this.authService.forgotPassword(this.form.getRawValue()).subscribe({
      next: () => {
        this.loading.set(false);
        this.submitted.set(true);
      },
      error: () => {
        this.loading.set(false);
        this.submitted.set(true);
      }
    });
  }
}