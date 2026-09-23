import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Level, TechDomain } from '../../data-access/exams.models';
import { ExamsService } from '../../data-access/exams';

@Component({
  selector: 'app-start-exam-page',
  standalone: true,
  template: `
    <div class="page-head">
      <h1>Start an exam</h1>
      <p>Choose a domain and a level, then submit within the time limit.</p>
    </div>
    <div class="panel" style="padding:22px 24px; max-width:520px;">
      <p style="font-size:12.5px; color:var(--ink-soft); margin-bottom:10px;">Domain</p>
      <div style="display:flex; flex-wrap:wrap; gap:8px; margin-bottom:22px;">
        @for (domain of domains; track domain) {
          <span
            class="chip clickable"
            [class.on]="selectedDomain() === domain"
            (click)="selectedDomain.set(domain)">
            {{ domainLabel(domain) }}
          </span>
        }
      </div>
      <p style="font-size:12.5px; color:var(--ink-soft); margin-bottom:10px;">Level</p>
      <div style="display:flex; flex-wrap:wrap; gap:8px; margin-bottom:26px;">
        @for (level of levels; track level) {
          <span
            class="chip clickable"
            [class.on]="selectedLevel() === level"
            (click)="selectedLevel.set(level)">
            {{ level }}
          </span>
        }
      </div>
      @if (errorMessage()) {
        <p style="color:var(--danger); font-size:13px; margin-bottom:14px;">{{ errorMessage() }}</p>
      }
      <button class="btn primary" [disabled]="loading()" (click)="start()">Start exam</button>
    </div>
  `
})
export class StartExamPage {
  private readonly examsService = inject(ExamsService);
  private readonly router = inject(Router);

  readonly domains: TechDomain[] = ['DotNet', 'Angular', 'Sql', 'SystemDesign'];
  readonly levels: Level[] = ['Beginner', 'Intermediate', 'Advanced'];

  readonly selectedDomain = signal<TechDomain>('DotNet');
  readonly selectedLevel = signal<Level>('Beginner');
  readonly loading = signal(false);
  readonly errorMessage = signal<string | null>(null);

  domainLabel(domain: TechDomain) {
    return domain === 'DotNet' ? '.NET' : domain === 'SystemDesign' ? 'System Design' : domain;
  }

  start() {
    this.loading.set(true);
    this.errorMessage.set(null);
    this.examsService.start({ domain: this.selectedDomain(), level: this.selectedLevel() }).subscribe({
      next: (attempt) => this.router.navigate(['/app/exams', attempt.attemptId]),
      error: (err) => {
        this.loading.set(false);
        if (err?.status === 0) {
          this.errorMessage.set('Could not reach the server — check your connection and that the API is running.');
        } else if (err?.status === 409 && err?.error?.title) {
          this.errorMessage.set(err.error.title);
        } else if (err?.status === 401) {
          this.errorMessage.set('Your session has expired — please log in again.');
        } else {
          this.errorMessage.set('Something went wrong starting the exam. Please try again.');
        }
      }
    });
  }
}