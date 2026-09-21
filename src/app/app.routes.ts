import { Routes } from '@angular/router';
import { authGuard } from './core/auth/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/pages/homepage/homepage').then((m) => m.HomePage)
  },
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.routes').then((m) => m.authRoutes)
  },
  {
    path: 'verify/:code',
    loadComponent: () => import('./features/certificates/pages/verify/verify').then((m) => m.VerifyPage)
  },
  {
    path: 'app',
    loadComponent: () => import('./layout/shell/shell/shell').then((m) => m.ShellComponent),
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/pages/dashboard/dashboard').then((m) => m.DashboardPage)
      },
      {
        path: 'exams',
        loadChildren: () => import('./features/exams/exams.routes').then((m) => m.examsRoutes)
      },
      {
        path: 'certificates',
        loadChildren: () => import('./features/certificates/certificates.routes').then((m) => m.certificatesRoutes)
      },
      {
        path: 'interview',
        loadChildren: () => import('./features/interview/interview.routes').then((m) => m.interviewRoutes)
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('./features/profile/pages/profile/profile').then((m) => m.ProfilePage)
      }
    ]
  },
  { path: '**', redirectTo: '' }
];