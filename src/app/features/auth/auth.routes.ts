import { Routes } from '@angular/router';

export const authRoutes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login').then((m) => m.LoginPage)
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register').then((m) => m.RegisterPage)
  },
  {
    path: 'confirm-email',
    loadComponent: () => import('./pages/confirm-emailpage/confirm-emailpage').then((m) => m.ConfirmEmailPage)
  },
  {
    path: 'forgot-password',
    loadComponent: () => import('./pages/forgot-password/forgot-password').then((m) => m.ForgotPassword)
  },
  {
    path: 'reset-password',
    loadComponent: () => import('./pages/reset-password/reset-password').then((m) => m.ResetPassword)
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];