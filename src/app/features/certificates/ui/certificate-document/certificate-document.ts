import { Component, Input } from '@angular/core';
import { Certificate } from '../../data-access/certificates.models';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-certificate-document',
  standalone: true,
  imports:[DatePipe],
  template: `
    <div class="cert-wrap">
      <div class="cert">
        <div class="cert-inner">
          <svg class="seal" viewBox="0 0 100 100">
            <circle cx="50" cy="42" r="30" fill="none" stroke="var(--gold)" stroke-width="2.5"/>
            <circle cx="50" cy="42" r="23" fill="none" stroke="var(--gold)" stroke-width="1"/>
            <text x="50" y="49" text-anchor="middle" font-family="Newsreader, serif" font-size="20" fill="var(--gold-deep)">DM</text>
            <path d="M38 68 L32 92 L50 82 L68 92 L62 68" fill="none" stroke="var(--gold)" stroke-width="2.5" stroke-linejoin="round"/>
          </svg>
          <div class="kicker">Certificate of completion</div>
          <h1>{{ domainLabel(certificate.domain) }} — {{ certificate.level }}</h1>
          <div class="for">Awarded for a passing score of {{ certificate.scorePercentage }}% on the DevMentor assessment</div>
          <div class="name">{{ holderName }}</div>
          <div class="desc">
            This certifies that the recipient has demonstrated {{ certificate.level.toLowerCase() }}-level proficiency
            in {{ domainLabel(certificate.domain) }} through a timed, proctorless assessment on the DevMentor platform.
          </div>
          <div class="cert-meta">
            <div class="m">
              <div class="l">Certificate ID</div>
              <div class="v">{{ certificate.certificateCode }}</div>
            </div>
            <div class="m">
              <div class="l">Issued</div>
              <div class="v">{{ certificate.issuedAtUtc | date: 'yyyy-MM-dd' }}</div>
            </div>
            <div class="m">
              <div class="qr" aria-hidden="true">
                @for (cell of qrPattern; track $index) {
                  <span [class.off]="!cell"></span>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class CertificateDocumentComponent {
  @Input({ required: true }) certificate!: Certificate;
  @Input() holderName = '';

  readonly qrPattern = [
    1, 0, 1, 1, 0, 1, 1,
    1, 0, 0, 1, 0, 0, 1,
    1, 1, 1, 0, 1, 1, 1,
    0, 0, 1, 1, 1, 0, 0,
    1, 1, 0, 1, 0, 1, 1,
    1, 0, 1, 0, 1, 0, 1,
    1, 1, 1, 0, 1, 1, 1
  ];

  domainLabel(domain: string) {
    return domain === 'DotNet' ? '.NET' : domain === 'SystemDesign' ? 'System Design' : domain;
  }
}