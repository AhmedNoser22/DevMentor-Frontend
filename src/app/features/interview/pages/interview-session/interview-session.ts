import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { InterviewService } from '../../data-access/interview';
import { InterviewSession } from '../../data-access/interview.models';

@Component({
  selector: 'app-interview-session-page',
  standalone: true,
  imports: [FormsModule],
  template: `
    @if (session(); as data) {
      <div class="interview-layout">
        <div class="panel transcript">
          <div class="transcript-head">
            <div class="who">{{ domainLabel(data.domain) }} session</div>
            <span class="chip">{{ data.ended ? 'Completed' : 'Turn ' + latestTurn()!.order }}</span>
          </div>
          <div class="transcript-body">
            @for (turn of data.turns; track turn.turnId) {
              <div class="turn-q">{{ turn.question }}</div>
              @if (turn.answer) {
                <div class="turn-a" dir="auto">
                  <div class="who">You</div>
                  {{ turn.answer }}
                </div>
              }
            }
            @if (sending()) {
              <div class="turn-a" style="opacity:.6;">
                <div class="who">Mentor is reviewing your answer…</div>
              </div>
            }
          </div>
          @if (errorMessage()) {
            <p style="color:var(--danger); font-size:13px; padding:0 26px;">{{ errorMessage() }}</p>
          }
          @if (!data.ended) {
            <div class="composer">
              <input
                type="text"
                dir="auto"
                placeholder="Type your answer in Arabic or English…"
                [(ngModel)]="draftAnswer"
                [disabled]="sending()"
                (keyup.enter)="send()">
              <button class="btn primary" [disabled]="sending() || !draftAnswer.trim()" (click)="send()">
                {{ sending() ? 'Sending…' : 'Send' }}
              </button>
            </div>
          }
        </div>

        @if (latestScoredTurn(); as scoredTurn) {
          <div class="panel margin-col">
            <div class="score-ring">{{ scoredTurn.score }}</div>
            <div style="text-align:center; font-size:11.5px; color:var(--ink-soft); margin-top:-8px;">turn score</div>
            <div>
              <h4>Technical accuracy</h4>
              <div class="note">{{ scoredTurn.technicalAccuracyFeedback }}</div>
            </div>
            <div>
              <h4>Missing concepts</h4>
              <div class="note">{{ scoredTurn.missingConceptsFeedback }}</div>
            </div>
            <div>
              <h4>Communication</h4>
              <div class="note">{{ scoredTurn.communicationFeedback }}</div>
            </div>
          </div>
        }
      </div>

      @if (data.ended) {
        <div class="panel summary-panel">
          <h3>Session summary</h3>
          <p style="color:var(--ink-soft); font-size:13.5px; margin-top:10px;">{{ data.summaryText }}</p>
          <p class="mono" style="margin-top:10px; font-size:22px;">{{ data.finalScore }}</p>
        </div>
      }
    } @else if (loadError()) {
      <p style="color:var(--danger);">Could not load this interview session.</p>
    } @else {
      <p style="color:var(--ink-soft);">Loading…</p>
    }
  `
})
export class InterviewSessionPage implements OnInit {
  private readonly interviewService = inject(InterviewService);
  private readonly route = inject(ActivatedRoute);

  readonly session = signal<InterviewSession | null>(null);
  readonly sending = signal(false);
  readonly loadError = signal(false);
  readonly errorMessage = signal<string | null>(null);
  draftAnswer = '';

  ngOnInit() {
    const sessionId = this.route.snapshot.paramMap.get('id')!;
    this.interviewService.get(sessionId).subscribe({
      next: (data) => this.session.set(data),
      error: () => this.loadError.set(true)
    });
  }

  domainLabel(domain: string) {
    return domain === 'DotNet' ? '.NET' : domain === 'SystemDesign' ? 'System Design' : domain;
  }

  latestTurn() {
    const data = this.session();
    return data ? data.turns[data.turns.length - 1] : null;
  }

  latestScoredTurn() {
    const data = this.session();
    if (!data) {
      return null;
    }
    return [...data.turns].reverse().find((t) => t.score !== null) ?? null;
  }

  send() {
    const data = this.session();
    const turn = this.latestTurn();
    if (!data || !turn || !this.draftAnswer.trim()) {
      return;
    }

    this.sending.set(true);
    this.errorMessage.set(null);
    const answerText = this.draftAnswer.trim();

    this.interviewService
      .answer({ sessionId: data.sessionId, turnId: turn.turnId, answer: answerText })
      .subscribe({
        next: (updated) => {
          this.session.set(updated);
          this.draftAnswer = '';
          this.sending.set(false);
        },
        error: (err) => {
          this.sending.set(false);
          if (err?.status === 0) {
            this.errorMessage.set('Could not reach the server — please try again.');
          } else if (err?.status === 401) {
            this.errorMessage.set('Your session has expired — please log in again.');
          } else {
            this.errorMessage.set('Something went wrong grading that answer — please try again.');
          }
        }
      });
  }
}