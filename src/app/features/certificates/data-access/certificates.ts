import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Certificate, VerifyCertificateResult } from './certificates.models';

@Injectable({ providedIn: 'root' })
export class CertificatesService {
  private readonly http = inject(HttpClient);

  getMine() {
    return this.http.get<Certificate[]>(`${environment.apiUrl}/certificates/mine`);
  }

  downloadPdf(certificateId: string) {
    return this.http.get(`${environment.apiUrl}/certificates/${certificateId}/pdf`, { responseType: 'blob' });
  }

  verify(code: string) {
    return this.http.get<VerifyCertificateResult>(`${environment.apiUrl}/certificates/verify/${code}`);
  }
}