import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/auth/auth.service';


@Component({
  selector: 'app-reset-password-page',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  template: `
    <div class="auth-card">
      <h1>Set a new password</h1>
      <form [formGroup]="form" (ngSubmit)="submit()">
        <label>Email</label>
        <input type="email" formControlName="email" />
        <label>Reset token</label>
        <input type="text" formControlName="token" />
        <label>New password</label>
        <input type="password" formControlName="newPassword" />
        @if (errorMessage()) {
          <p class="error">{{ errorMessage() }}</p>
        }
        @if (success()) {
          <p class="success">Password updated, you can log in now.</p>
        }
        <button type="submit" [disabled]="form.invalid || loading()">Update password</button>
      </form>
      <p><a routerLink="/auth/login">Back to login</a></p>
    </div>
  `,
  styleUrl: '../auth-pages.css'
})
export class ResetPassword {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly loading = signal(false);
  readonly errorMessage = signal<string | null>(null);
  readonly success = signal(false);

  readonly form = this.fb.nonNullable.group({
    email: [this.route.snapshot.queryParamMap.get('email') ?? '', [Validators.required, Validators.email]],
    token: [this.route.snapshot.queryParamMap.get('token') ?? '', Validators.required],
    newPassword: ['', [Validators.required, Validators.minLength(8)]]
  });

  submit() {
    if (this.form.invalid) {
      return;
    }
    this.loading.set(true);
    this.errorMessage.set(null);
    this.authService.resetPassword(this.form.getRawValue()).subscribe({
      next: () => {
        this.loading.set(false);
        this.success.set(true);
        setTimeout(() => this.router.navigateByUrl('/auth/login'), 1500);
      },
      error: () => {
        this.loading.set(false);
        this.errorMessage.set('This reset link is invalid or has expired');
      }
    });
  }
}