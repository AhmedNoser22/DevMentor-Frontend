import { Routes } from '@angular/router';

export const certificatesRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/certificates-list/certificates-list').then((m) => m.CertificatesListPage)
  },
  {
    path: ':id',
    loadComponent: () => import('./pages/certificate-view/certificate-view').then((m) => m.CertificateViewPage)
  }
];