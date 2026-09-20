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
          </div>
          @if (!data.ended) {
            <div class="composer">
              <input
                type="text"
                dir="auto"
                placeholder="Type your answer in Arabic or English…"
                [(ngModel)]="draftAnswer"
                [disabled]="sending()"
                (keyup.enter)="send()">
              <button class="btn primary" [disabled]="sending() || !draftAnswer.trim()" (click)="send()">Send</button>
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
    }
  `
})
export class InterviewSessionPage implements OnInit {
  private readonly interviewService = inject(InterviewService);
  private readonly route = inject(ActivatedRoute);

  readonly session = signal<InterviewSession | null>(null);
  readonly sending = signal(false);
  draftAnswer = '';

  ngOnInit() {
    const sessionId = this.route.snapshot.paramMap.get('id')!;
    this.interviewService.get(sessionId).subscribe((data) => this.session.set(data));
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
    this.interviewService
      .answer({ sessionId: data.sessionId, turnId: turn.turnId, answer: this.draftAnswer.trim() })
      .subscribe((updated) => {
        this.session.set(updated);
        this.draftAnswer = '';
        this.sending.set(false);
      });
  }
}