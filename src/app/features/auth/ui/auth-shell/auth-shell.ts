import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-auth-shell',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="auth-page">
      <aside class="auth-visual">
        <a routerLink="/" class="auth-brand">
          <span class="mark">DM</span>
          <span class="wordmark">DevMentor</span>
        </a>

        <div class="auth-visual-body">
          <p class="kicker mono">.NET · Angular · SQL · System Design</p>
          <h1>{{ heading }}</h1>
          <p class="sub">{{ subheading }}</p>

          <div class="feature-list">
            <div class="feature">
              <span class="feature-icn">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v7A2.5 2.5 0 0 1 17.5 16H9l-4 3.5V16h-.5A2.5 2.5 0 0 1 2 13.5"/></svg>
              </span>
              <div>
                <h3>AI-graded interviews</h3>
                <p>Real questions, scored on accuracy and communication.</p>
              </div>
            </div>
            <div class="feature">
              <span class="feature-icn">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="8.5" r="5"/><path d="M9 12.8 7.5 20l4.5-2.3 4.5 2.3-1.5-7.2"/></svg>
              </span>
              <div>
                <h3>Verifiable certificates</h3>
                <p>Score 85% or higher and get a certificate with its own ID and QR code.</p>
              </div>
            </div>
          </div>
        </div>

        <div class="auth-visual-card">
          <div class="score-ring-mini mono">88</div>
          <div>
            <p class="mini-title">ASP.NET Core — Intermediate</p>
            <p class="mini-sub mono">DM-NET-INT-88213 — Passed</p>
          </div>
        </div>
      </aside>

      <main class="auth-form-panel">
        <div class="auth-card">
          <ng-content></ng-content>
        </div>
      </main>
    </div>
  `,
  styleUrl: './auth-shell.css'
})
export class AuthShell {
  @Input() heading = 'Practice like it counts.';
  @Input() subheading = 'Interviews, exams, and certificates for real computer science skills.';
}