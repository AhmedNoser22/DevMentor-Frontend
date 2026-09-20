import { Routes } from '@angular/router';

export const interviewRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/start-interview/start-interview').then((m) => m.StartInterviewPage)
  },
  {
    path: ':id',
    loadComponent: () => import('./pages/interview-session/interview-session').then((m) => m.InterviewSessionPage)
  }
];