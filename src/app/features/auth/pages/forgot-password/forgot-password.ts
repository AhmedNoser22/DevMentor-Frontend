import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/auth/auth.service';

@Component({
  selector: 'app-forgot-password-page',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  template: `
    <div class="auth-card">
      <h1>Reset your password</h1>
      @if (!submitted()) {
        <form [formGroup]="form" (ngSubmit)="submit()">
          <label>Email</label>
          <input type="email" formControlName="email" />
          <button type="submit" [disabled]="form.invalid || loading()">Send reset link</button>
        </form>
      } @else {
        <p>If an account exists for this email, a reset link has been sent.</p>
      }
      <p><a routerLink="/auth/login">Back to login</a></p>
    </div>
  `,
  styleUrl: '../auth-pages.css'
})
export class ForgotPassword {
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