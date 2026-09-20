import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DashboardService } from '../../data-access/dashboard';
import { ProfileDto, RecentActivity } from '../../data-access/dashboard.models';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [RouterLink,DatePipe],
  template: `
    <div class="page-head">
      <h1>Dashboard</h1>
      <p>Pick up where you left off, or start something new.</p>
    </div>

    @if (profile(); as data) {
      <div class="dash-grid">
        <div class="panel continue-card">
          <div>
            <div class="eyebrow">{{ latestActivity() ? 'Continue' : 'Get started' }}</div>
            @if (latestActivity(); as latest) {
              <h2>{{ latest.title }}</h2>
              <p>{{ activitySummary(latest) }}</p>
            } @else {
              <h2>Take your first exam or interview</h2>
              <p>Choose a domain below to start an AI interview or a timed exam.</p>
            }
          </div>
          <div style="display:flex; gap:10px;">
            <a class="btn primary" routerLink="/exams">Start an exam</a>
            <a class="btn" routerLink="/interview">Start an interview</a>
          </div>
        </div>

        <div class="panel stat-tile">
          <div class="num mono">{{ data.certificatesCount }}</div>
          <div class="lbl">certificates earned</div>
        </div>
        <div class="panel stat-tile">
          <div class="num mono">{{ data.recentActivity.length }}</div>
          <div class="lbl">sessions completed</div>
        </div>

        <div class="panel domain-row">
          <div class="lbl">Start something new</div>
          <div class="chips-wrap">
            <a class="chip clickable" routerLink="/exams">.NET</a>
            <a class="chip clickable" routerLink="/exams">Angular</a>
            <a class="chip clickable" routerLink="/exams">SQL</a>
            <a class="chip clickable" routerLink="/exams">System Design</a>
          </div>
        </div>
      </div>

      <div class="panel activity">
        <h3>Recent activity</h3>
        @if (data.recentActivity.length) {
          @for (item of data.recentActivity; track item.title + item.dateUtc) {
            <div class="arow">
              <span class="left">
                <span class="h-icn" style="width:28px; height:28px; border-radius:7px; background:var(--bg-mist); display:inline-flex; align-items:center; justify-content:center; color:var(--accent-deep);">
                  @if (item.type === 'Exam') {
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" style="width:14px; height:14px;"><path d="M6 3.5h9l3 3v14a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-16a1 1 0 0 1 1-1Z"/><path d="M8 12.5l2.3 2.3L16 9.3"/></svg>
                  } @else {
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" style="width:14px; height:14px;"><path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v7A2.5 2.5 0 0 1 17.5 16H9l-4 3.5V16h-.5A2.5 2.5 0 0 1 2 13.5"/></svg>
                  }
                </span>
                {{ item.title }}
                <span class="tag">{{ item.dateUtc | date: 'MMM d' }}</span>
              </span>
              @if (item.type === 'Exam') {
                <span class="score-pill">{{ item.score }}% — {{ item.passed ? 'Passed' : 'Not passed' }}</span>
              } @else {
                <span class="score-pill">Score {{ item.score }}</span>
              }
            </div>
          }
        } @else {
          <p class="empty-hint">Nothing here yet — your exams and interviews will show up once you start one.</p>
        }
      </div>
    }
  `
})
export class DashboardPage implements OnInit {
  private readonly dashboardService = inject(DashboardService);
  readonly profile = signal<ProfileDto | null>(null);

  ngOnInit() {
    this.dashboardService.getProfile().subscribe((data) => this.profile.set(data));
  }

  latestActivity(): RecentActivity | null {
    return this.profile()?.recentActivity[0] ?? null;
  }

  activitySummary(activity: RecentActivity) {
    if (activity.type === 'Exam') {
      return activity.passed
        ? `You scored ${activity.score}% and passed.`
        : `You scored ${activity.score}% — you can try again anytime.`;
    }
    return activity.score !== null
      ? `Your last interview closed with a score of ${activity.score}.`
      : 'Your last interview session is on record.';
  }
}