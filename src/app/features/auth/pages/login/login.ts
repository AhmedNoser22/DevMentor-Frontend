import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../../../core/auth/auth.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  template: `
    <div class="auth-card">
      <h1>Log in to DevMentor</h1>
      <form [formGroup]="form" (ngSubmit)="submit()">
        <label>Email</label>
        <input type="email" formControlName="email" />
        <label>Password</label>
        <input type="password" formControlName="password" />
        @if (errorMessage()) {
          <p class="error">{{ errorMessage() }}</p>
        }
        <button type="submit" [disabled]="form.invalid || loading()">Log in</button>
      </form>
      <p><a routerLink="/auth/forgot-password">Forgot your password?</a></p>
      <p>Don't have an account? <a routerLink="/auth/register">Register</a></p>
    </div>
  `,
  styleUrl: '../auth-pages.css'
})
export class Login {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  readonly loading = signal(false);
  readonly errorMessage = signal<string | null>(null);

  readonly form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  submit() {
    if (this.form.invalid) {
      return;
    }
    this.loading.set(true);
    this.errorMessage.set(null);
    this.authService.login(this.form.getRawValue()).subscribe({
      next: (response) => {
        this.authService.storeSession(response);
        this.router.navigateByUrl('/dashboard');
      },
      error: () => {
        this.errorMessage.set('Invalid email or password');
        this.loading.set(false);
      }
    });
  }
}