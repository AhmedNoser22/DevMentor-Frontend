import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CertificateDocumentComponent } from '../../ui/certificate-document/certificate-document';
import { CertificatesService } from '../../data-access/certificates';
import { AuthService } from '../../../../core/auth/auth.service';
import { Certificate } from '../../data-access/certificates.models';

@Component({
  selector: 'app-certificate-view-page',
  standalone: true,
  imports: [CertificateDocumentComponent],
  template: `
    @if (certificate(); as cert) {
      <app-certificate-document [certificate]="cert" [holderName]="holderName()"></app-certificate-document>
      <div class="cert-actions">
        <button class="btn gold" (click)="download(cert.id)">Download PDF</button>
        <button class="btn" (click)="print()">Print</button>
        <button class="btn" (click)="copyVerifyLink(cert.certificateCode)">Copy verify link</button>
      </div>
      @if (copied()) {
        <p style="text-align:center; color:var(--ink-soft); font-size:12.5px; margin-top:8px;">Link copied.</p>
      }
    }
  `
})
export class CertificateViewPage implements OnInit {
  private readonly certificatesService = inject(CertificatesService);
  private readonly authService = inject(AuthService);
  private readonly route = inject(ActivatedRoute);

  readonly certificate = signal<Certificate | null>(null);
  readonly copied = signal(false);

  holderName() {
    return this.authService.currentUser()?.fullName ?? '';
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.certificatesService.getMine().subscribe((certificates) => {
      this.certificate.set(certificates.find((c) => c.id === id) ?? null);
    });
  }

  download(certificateId: string) {
    this.certificatesService.downloadPdf(certificateId).subscribe((blob) => {
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `certificate-${certificateId}.pdf`;
      link.click();
      window.URL.revokeObjectURL(url);
    });
  }

  print() {
    window.print();
  }

  copyVerifyLink(code: string) {
    const link = `${window.location.origin}/verify/${code}`;
    navigator.clipboard.writeText(link).then(() => {
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2000);
    });
  }
}