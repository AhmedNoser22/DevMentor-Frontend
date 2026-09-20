import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../../../core/auth/auth.service';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  template: `
    <div class="auth-card">
      <h1>Create your DevMentor account</h1>
      <form [formGroup]="form" (ngSubmit)="submit()">
        <label>Full name</label>
        <input type="text" formControlName="fullName" />
        <label>Email</label>
        <input type="email" formControlName="email" />
        <label>Password</label>
        <input type="password" formControlName="password" />
        @if (errorMessage()) {
          <p class="error">{{ errorMessage() }}</p>
        }
        <button type="submit" [disabled]="form.invalid || loading()">Create account</button>
      </form>
      <p>Already have an account? <a routerLink="/auth/login">Log in</a></p>
    </div>
  `,
  styleUrl: '../auth-pages.css'
})
export class Register {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  readonly loading = signal(false);
  readonly errorMessage = signal<string | null>(null);

  readonly form = this.fb.nonNullable.group({
    fullName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  });

  submit() {
    if (this.form.invalid) {
      return;
    }
    this.loading.set(true);
    this.errorMessage.set(null);
    this.authService.register(this.form.getRawValue()).subscribe({
      next: (response) => {
        this.authService.storeSession(response);
        this.router.navigateByUrl('/dashboard');
      },
      error: () => {
        this.errorMessage.set('Could not create the account, please check your details');
        this.loading.set(false);
      }
    });
  }
}