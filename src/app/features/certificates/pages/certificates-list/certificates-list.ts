import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CertificatesService } from '../../data-access/certificates';
import { Certificate } from '../../data-access/certificates.models';

@Component({
  selector: 'app-certificates-list-page',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="page-head">
      <h1>Certificates</h1>
      <p>Earned at 85% or higher, each verifiable by its own ID.</p>
    </div>
    @if (certificates().length) {
      <div class="panel" style="padding:20px 22px; max-width:560px;">
        @for (cert of certificates(); track cert.id) {
          <a class="cert-badge" [routerLink]="['/app/certificates', cert.id]">
            <span class="left">
              <span class="dot"></span>
              {{ domainLabel(cert.domain) }} — {{ cert.level }}
            </span>
            <span class="mono" style="font-size:12px; color:var(--ink-soft);">{{ cert.certificateCode }}</span>
          </a>
        }
      </div>
    } @else {
      <p>No certificates yet — pass an exam at 85% or higher to earn one.</p>
    }
  `
})
export class CertificatesListPage implements OnInit {
  private readonly certificatesService = inject(CertificatesService);
  readonly certificates = signal<Certificate[]>([]);

  ngOnInit() {
    this.certificatesService.getMine().subscribe((data) => this.certificates.set(data));
  }

  domainLabel(domain: string) {
    return domain === 'DotNet' ? '.NET' : domain === 'SystemDesign' ? 'System Design' : domain;
  }
}