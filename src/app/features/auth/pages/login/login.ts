import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { AuthShell } from '../../ui/auth-shell/auth-shell';
import { environment } from '../../../../../environments/environment';
import { AuthService } from '../../../../core/auth/auth.service';


@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, AuthShell],
  template: `
    <app-auth-shell heading="Welcome back." subheading="Pick up your progress across interviews, exams, and certificates.">
      <h1>Log in to DevMentor</h1>
      <p class="lede">New here? <a routerLink="/auth/register">Create an account</a> instead.</p>

      <div class="oauth-group">
        <a class="oauth-btn" [href]="googleLoginUrl">
          <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.25 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.85A11 11 0 0 0 12 23z"/><path fill="#FBBC05" d="M5.84 14.1A6.6 6.6 0 0 1 5.5 12c0-.73.13-1.44.34-2.1V7.05H2.18A11 11 0 0 0 1 12c0 1.77.42 3.45 1.18 4.95l3.66-2.85z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1a11 11 0 0 0-9.82 6.05l3.66 2.85C6.71 7.31 9.14 5.38 12 5.38z"/></svg>
          Continue with Google
        </a>
        <a class="oauth-btn" [href]="githubLoginUrl">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55v-2.1c-3.2.7-3.87-1.36-3.87-1.36-.53-1.33-1.29-1.69-1.29-1.69-1.05-.72.08-.7.08-.7 1.17.08 1.78 1.2 1.78 1.2 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.19-3.08-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.64 1.59.24 2.76.12 3.05.74.8 1.19 1.82 1.19 3.08 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.07.78 2.16v3.2c0 .31.21.66.79.55A10.51 10.51 0 0 0 23.5 12c0-6.35-5.15-11.5-11.5-11.5z"/></svg>
          Continue with GitHub
        </a>
      </div>

      <div class="divider">or with email</div>

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

      <div class="links">
        <a routerLink="/auth/forgot-password">Forgot your password?</a>
        <a routerLink="/">Back to home</a>
      </div>
    </app-auth-shell>
  `
})
export class LoginPage {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  readonly googleLoginUrl = `${environment.apiUrl}/auth/external/google/login`;
  readonly githubLoginUrl = `${environment.apiUrl}/auth/external/github/login`;

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
        this.router.navigateByUrl('/app/dashboard');
      },
      error: (err) => {
        this.errorMessage.set(
          err?.status === 401 && err?.error?.title ? err.error.title : 'Invalid email or password'
        );
        this.loading.set(false);
      }
    });
  }
}