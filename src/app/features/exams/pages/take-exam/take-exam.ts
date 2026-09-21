import { Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExamsService } from '../../data-access/exams';
import { ExamAttempt } from '../../data-access/exams.models';

@Component({
  selector: 'app-take-exam-page',
  standalone: true,
  template: `
    @if (attempt(); as data) {
      <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:8px;">
        <div class="progress-dots">
          @for (q of data.questions; track q.questionId; let i = $index) {
            <span [class.done]="i < currentIndex()" [class.now]="i === currentIndex()"></span>
          }
        </div>
        <span class="timer">{{ remainingLabel() }}</span>
      </div>

      @if (currentQuestion(); as question) {
        <div class="panel exam-card">
          <div class="qnum">Question {{ currentIndex() + 1 }} of {{ data.questions.length }} — {{ domainLabel(data.domain) }}, {{ data.level }}</div>
          <h2>{{ question.text }}</h2>
          @for (option of question.options; track option.id; let i = $index) {
            <div class="option" [class.sel]="question.selectedOptionId === option.id" (click)="selectOption(question.questionId, option.id)">
              <span class="letter">{{ letterFor(i) }}</span>
              {{ option.text }}
            </div>
          }
          <div class="exam-foot">
            <button class="btn" [disabled]="currentIndex() === 0" (click)="back()">Back</button>
            @if (currentIndex() < data.questions.length - 1) {
              <button class="btn primary" (click)="next()">Next question</button>
            } @else {
              <button class="btn primary" [disabled]="submitting()" (click)="submit()">Submit exam</button>
            }
          </div>
        </div>
      }
    }
  `
})
export class TakeExamPage implements OnInit, OnDestroy {
  private readonly examsService = inject(ExamsService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private timerHandle?: ReturnType<typeof setInterval>;

  readonly attempt = signal<ExamAttempt | null>(null);
  readonly currentIndex = signal(0);
  readonly submitting = signal(false);
  readonly remainingSeconds = signal(0);

  ngOnInit() {
    const attemptId = this.route.snapshot.paramMap.get('id')!;
    this.examsService.get(attemptId).subscribe((attempt) => {
      this.attempt.set(attempt);
      this.startTimer(attempt.expiresAtUtc);
    });
  }

  ngOnDestroy() {
    if (this.timerHandle) {
      clearInterval(this.timerHandle);
    }
  }

  currentQuestion() {
    return this.attempt()?.questions[this.currentIndex()] ?? null;
  }

  domainLabel(domain: string) {
    return domain === 'DotNet' ? '.NET' : domain === 'SystemDesign' ? 'System Design' : domain;
  }

  letterFor(index: number) {
    return String.fromCharCode(65 + index);
  }

  selectOption(questionId: string, optionId: string) {
    const attempt = this.attempt();
    if (!attempt) {
      return;
    }

    const updatedQuestions = attempt.questions.map((q) =>
      q.questionId === questionId ? { ...q, selectedOptionId: optionId } : q
    );
    this.attempt.set({ ...attempt, questions: updatedQuestions });

    this.examsService
      .saveAnswer({ attemptId: attempt.attemptId, questionId, selectedOptionId: optionId })
      .subscribe();
  }

  next() {
    this.currentIndex.update((i) => i + 1);
  }

  back() {
    this.currentIndex.update((i) => Math.max(0, i - 1));
  }

  submit() {
    const attempt = this.attempt();
    if (!attempt) {
      return;
    }
    this.submitting.set(true);
    this.examsService.submit(attempt.attemptId).subscribe((result) => {
      this.router.navigate(['/app/exams', attempt.attemptId, 'result'], { state: { result } });
    });
  }

  remainingLabel() {
    const total = this.remainingSeconds();
    const minutes = Math.floor(total / 60);
    const seconds = total % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  private startTimer(expiresAtUtc: string) {
    const expiresAt = new Date(expiresAtUtc).getTime();
    const tick = () => {
      const secondsLeft = Math.max(0, Math.floor((expiresAt - Date.now()) / 1000));
      this.remainingSeconds.set(secondsLeft);
      if (secondsLeft === 0 && !this.submitting()) {
        this.submit();
      }
    };
    tick();
    this.timerHandle = setInterval(tick, 1000);
  }
}