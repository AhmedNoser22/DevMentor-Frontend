import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import {
  AuthResponse,
  ConfirmEmailRequest,
  ForgotPasswordRequest,
  LoginRequest,
  RegisterRequest,
  RegisterResult,
  ResendConfirmationRequest,
  ResetPasswordRequest
} from '../models/auth.models';

interface StoredUser {
  userId: string;
  fullName: string;
  email: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);

  private readonly currentUserSignal = signal<StoredUser | null>(this.readStoredUser());
  readonly currentUser = this.currentUserSignal.asReadonly();
  readonly isAuthenticated = computed(() => this.currentUserSignal() !== null);

  register(request: RegisterRequest) {
    return this.http.post<RegisterResult>(`${environment.apiUrl}/auth/register`, request);
  }

  confirmEmail(request: ConfirmEmailRequest) {
    return this.http.post<void>(`${environment.apiUrl}/auth/confirm-email`, request);
  }

  resendConfirmation(request: ResendConfirmationRequest) {
    return this.http.post<void>(`${environment.apiUrl}/auth/resend-confirmation`, request);
  }

  login(request: LoginRequest) {
    return this.http.post<AuthResponse>(`${environment.apiUrl}/auth/login`, request);
  }

  forgotPassword(request: ForgotPasswordRequest) {
    return this.http.post<void>(`${environment.apiUrl}/auth/forgot-password`, request);
  }

  resetPassword(request: ResetPasswordRequest) {
    return this.http.post<void>(`${environment.apiUrl}/auth/reset-password`, request);
  }

  refresh() {
    const refreshToken = this.getRefreshToken();
    const accessToken = this.getAccessToken();
    return this.http.post<AuthResponse>(`${environment.apiUrl}/auth/refresh`, {
      accessToken,
      refreshToken
    });
  }

  storeSession(response: AuthResponse) {
    localStorage.setItem('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
    const user: StoredUser = {
      userId: response.userId,
      fullName: response.fullName,
      email: response.email
    };
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSignal.set(user);
  }

  logout() {
    const refreshToken = this.getRefreshToken();
    if (refreshToken) {
      this.http.post(`${environment.apiUrl}/auth/logout`, { refreshToken }).subscribe();
    }
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('currentUser');
    this.currentUserSignal.set(null);
    this.router.navigateByUrl('/auth/login');
  }

  getAccessToken() {
    return localStorage.getItem('accessToken');
  }

  getRefreshToken() {
    return localStorage.getItem('refreshToken');
  }

  private readStoredUser(): StoredUser | null {
    const raw = localStorage.getItem('currentUser');
    return raw ? (JSON.parse(raw) as StoredUser) : null;
  }
}