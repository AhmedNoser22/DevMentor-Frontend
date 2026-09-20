import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProfileService } from '../../data-access/profile';
import { AuthService } from '../../../../core/auth/auth.service';
import { CertificateSummary, ProfileDto } from '../../../dashboard/data-access/dashboard.models';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [RouterLink],
  template: `
    @if (profile(); as data) {
      <div class="profile-top">
        <div class="p-avatar">{{ initials(data.fullName) }}</div>
        <div>
          <p class="p-name">{{ data.fullName }}</p>
          <p class="p-role">{{ data.email }} — {{ data.certificatesCount }} certificate{{ data.certificatesCount === 1 ? '' : 's' }}</p>
        </div>
      </div>

      <div class="profile-grid">
        <div class="panel" style="padding:20px 22px;">
          <h3>History</h3>
          @if (data.recentActivity.length) {
            @for (item of data.recentActivity; track item.title + item.dateUtc) {
              <div class="history-row">
                <div class="h-left">
                  <div class="h-icn">
                    @if (item.type === 'Exam') {
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M6 3.5h9l3 3v14a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-16a1 1 0 0 1 1-1Z"/><path d="M8 12.5l2.3 2.3L16 9.3"/></svg>
                    } @else {
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v7A2.5 2.5 0 0 1 17.5 16H9l-4 3.5V16h-.5A2.5 2.5 0 0 1 2 13.5"/></svg>
                    }
                  </div>
                  {{ item.title }}
                </div>
                @if (item.type === 'Exam') {
                  <span class="score-pill">{{ item.score }}% — {{ item.passed ? 'Passed' : 'Not passed' }}</span>
                } @else {
                  <span class="score-pill">Score {{ item.score }}</span>
                }
              </div>
            }
          } @else {
            <p class="empty-hint">No exams or interviews yet.</p>
          }
        </div>

        <div class="panel" style="padding:20px 22px;">
          <h3>Certificates</h3>
          @if (data.certificates.length) {
            @for (cert of data.certificates; track cert.certificateCode) {
              <a class="cert-badge" routerLink="/certificates">
                <span class="left">
                  <span class="dot"></span>
                  {{ domainLabel(cert) }}
                </span>
                <span class="mono" style="font-size:12px; color:var(--ink-soft);">{{ cert.certificateCode }}</span>
              </a>
            }
          } @else {
            <p class="empty-hint">Pass an exam at 85% or higher to earn your first certificate.</p>
          }
        </div>
      </div>
    }
  `
})
export class ProfilePage implements OnInit {
  private readonly profileService = inject(ProfileService);
  private readonly authService = inject(AuthService);
  readonly profile = signal<ProfileDto | null>(null);

  ngOnInit() {
    this.profileService.getProfile().subscribe((data) => this.profile.set(data));
  }

  initials(fullName: string) {
    return fullName
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join('');
  }

  domainLabel(cert: CertificateSummary) {
    const domainNames: Record<number, string> = {
      1: '.NET',
      2: 'Angular',
      3: 'SQL',
      4: 'System Design'
    };
    const levelNames: Record<number, string> = {
      1: 'Beginner',
      2: 'Intermediate',
      3: 'Advanced'
    };
    return `${domainNames[cert.domain] ?? cert.domain} — ${levelNames[cert.level] ?? cert.level}`;
  }
}