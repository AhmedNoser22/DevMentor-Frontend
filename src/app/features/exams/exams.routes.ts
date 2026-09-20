import { Routes } from '@angular/router';

export const examsRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/start-exam/start-exam').then((m) => m.StartExamPage)
  },
  {
    path: ':id',
    loadComponent: () => import('./pages/take-exam/take-exam').then((m) => m.TakeExamPage)
  },
  {
    path: ':id/result',
    loadComponent: () => import('./pages/exam-result/exam-result').then((m) => m.ExamResultPage)
  }
];