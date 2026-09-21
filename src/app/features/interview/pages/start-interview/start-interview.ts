import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { InterviewService } from '../../data-access/interview';
import { TechDomain } from '../../../exams/data-access/exams.models';

@Component({
  selector: 'app-start-interview-page',
  standalone: true,
  template: `
    <div class="page-head">
      <h1>AI Interview</h1>
      <p>A spoken-style session, graded turn by turn. You can answer in Arabic or English.</p>
    </div>
    <div class="panel" style="padding:22px 24px; max-width:520px;">
      <p style="font-size:12.5px; color:var(--ink-soft); margin-bottom:10px;">Domain</p>
      <div style="display:flex; flex-wrap:wrap; gap:8px; margin-bottom:26px;">
        @for (domain of domains; track domain) {
          <span
            class="chip clickable"
            [class.on]="selectedDomain() === domain"
            (click)="selectedDomain.set(domain)">
            {{ domainLabel(domain) }}
          </span>
        }
      </div>
      @if (errorMessage()) {
        <p style="color:var(--danger); font-size:13px; margin-bottom:14px;">{{ errorMessage() }}</p>
      }
      <button class="btn primary" [disabled]="loading()" (click)="start()">Start interview</button>
    </div>
  `
})
export class StartInterviewPage {
  private readonly interviewService = inject(InterviewService);
  private readonly router = inject(Router);

  readonly domains: TechDomain[] = ['DotNet', 'Angular', 'Sql', 'SystemDesign'];
  readonly selectedDomain = signal<TechDomain>('DotNet');
  readonly loading = signal(false);
  readonly errorMessage = signal<string | null>(null);

  domainLabel(domain: TechDomain) {
    return domain === 'DotNet' ? '.NET' : domain === 'SystemDesign' ? 'System Design' : domain;
  }

  start() {
    this.loading.set(true);
    this.errorMessage.set(null);
    this.interviewService.start({ domain: this.selectedDomain() }).subscribe({
      next: (session) => this.router.navigate(['/app/interview', session.sessionId]),
      error: () => {
        this.loading.set(false);
        this.errorMessage.set('You have reached today\'s interview limit — please try again tomorrow.');
      }
    });
  }
}