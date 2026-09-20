import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CertificateDocumentComponent } from '../../ui/certificate-document/certificate-document';
import { VerifyCertificateResult } from '../../data-access/certificates.models';
import { CertificatesService } from '../../data-access/certificates';

@Component({
  selector: 'app-verify-page',
  standalone: true,
  imports: [CertificateDocumentComponent],
  template: `
    <div style="max-width:800px; margin:60px auto; padding:0 20px;">
      @if (loading()) {
        <p style="text-align:center; color:var(--ink-soft);">Checking certificate…</p>
      } @else if (result()?.isValid && result()?.certificate) {
        <p style="text-align:center; color:var(--gold-deep); font-size:13.5px; margin-bottom:10px;">This certificate is valid.</p>
        <app-certificate-document [certificate]="result()!.certificate!" [holderName]="result()!.holderName ?? ''"></app-certificate-document>
      } @else {
        <div class="panel result-banner">
          <p class="verdict">This certificate ID could not be verified.</p>
        </div>
      }
    </div>
  `
})
export class VerifyPage implements OnInit {
  private readonly certificatesService = inject(CertificatesService);
  private readonly route = inject(ActivatedRoute);

  readonly loading = signal(true);
  readonly result = signal<VerifyCertificateResult | null>(null);

  ngOnInit() {
    const code = this.route.snapshot.paramMap.get('code')!;
    this.certificatesService.verify(code).subscribe({
      next: (data) => {
        this.result.set(data);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }
}