import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ExamResult } from '../../data-access/exams.models';

@Component({
  selector: 'app-exam-result-page',
  standalone: true,
  imports: [RouterLink],
  template: `
    @if (result(); as data) {
      <div class="panel result-banner">
        <p style="font-size:12.5px; color:var(--ink-faint);">Your result</p>
        <div class="score mono">{{ data.scorePercentage }}%</div>
        <p class="verdict" [class.passed]="data.passed">
          {{ data.passed ? 'Passed' : 'Not passed — try again once you are ready' }}
        </p>
        @if (data.certificateIssued) {
          <p style="margin-top:16px; font-size:13.5px;">A certificate has been issued for this domain and level.</p>
          <button class="btn gold" style="margin-top:14px;" routerLink="/app/certificates">View certificates</button>
        } @else {
          <button class="btn" style="margin-top:18px;" routerLink="/app/exams">Try another exam</button>
        }
      </div>
    } @else {
      <p>No result to show. <a routerLink="/app/exams">Start a new exam</a>.</p>
    }
  `
})
export class ExamResultPage {
  private readonly router = inject(Router);

  readonly result = signal<ExamResult | null>(
    (this.router.getCurrentNavigation()?.extras.state?.['result'] as ExamResult) ??
    (history.state?.['result'] as ExamResult) ??
    null
  );
}