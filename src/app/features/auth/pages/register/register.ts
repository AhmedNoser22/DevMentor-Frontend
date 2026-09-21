import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/auth/auth.service';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  template: `
    <div class="auth-card">
      <h1>Create your DevMentor account</h1>
      @if (!registered()) {
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
      } @else {
        <p class="success">
          Account created. Check your inbox for a confirmation link before logging in.
        </p>
        <p><a routerLink="/auth/login">Back to login</a></p>
      }
      <p><a routerLink="/">Back to home</a></p>
    </div>
  `,
  styleUrl: '../auth-pages.css'
})
export class RegisterPage {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);

  readonly loading = signal(false);
  readonly errorMessage = signal<string | null>(null);
  readonly registered = signal(false);

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
      next: () => {
        this.loading.set(false);
        this.registered.set(true);
      },
      error: () => {
        this.errorMessage.set('Could not create the account, please check your details');
        this.loading.set(false);
      }
    });
  }
}