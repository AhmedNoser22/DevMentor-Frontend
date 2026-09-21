import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface QrCell {
  x: number;
  y: number;
}

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="home">
      <header class="home-nav">
        <div class="home-nav-brand">
          <span class="mark">DM</span>
          <span class="wordmark">DevMentor</span>
        </div>

        <nav class="home-nav-menu" aria-label="Sections">
          <a href="#how" (click)="scrollTo('how', $event)">How it works</a>
          <a href="#tracks" (click)="scrollTo('tracks', $event)">Tracks</a>
          <a href="#certificates" (click)="scrollTo('certificates', $event)">Certificates</a>
        </nav>

        <nav class="home-nav-links">
          <a routerLink="/auth/login" class="btn">Log in</a>
          <a routerLink="/auth/register" class="btn primary">Create account</a>
        </nav>
      </header>

      <section class="hero" id="hero">
        <div class="hero-copy">
          <span class="hero-eyebrow">AI mock interviews</span>
          <h1>Practice like it's a real interview. Prove it with a real certificate.</h1>
          <p class="hero-sub">
            AI-driven technical interviews and timed exams, in Arabic or English, ending in a
            certificate anyone can verify.
          </p>
          <p class="hero-sub">
            Built for developers getting ready for their next role. Pick a field, practise at your
            own pace, and track how your scores change across every attempt, so you know exactly
            what to work on before the real interview.
          </p>
        </div>

        <div class="hero-visual" aria-hidden="true">
          <div class="session">
            <div class="session-bar">
              <span class="dots"><i></i><i></i><i></i></span>
              <span class="session-title">Angular interview</span>
              <span class="session-timer mono">12:40</span>
            </div>

            <div class="session-body">
              <div class="msg ai">
                <span class="avatar">AI</span>
                <p>What's the advantage of signals over the default change detection?</p>
              </div>

              <div class="msg you">
                <p>
                  Signals track exactly which views read a value, so Angular updates only those
                  instead of checking the whole tree.
                </p>
              </div>

              <div class="scores">
                <div class="score">
                  <span class="score-label">Technical accuracy</span>
                  <b class="score-val">90%</b>
                  <i class="score-bar" style="--v: 90%"></i>
                </div>
                <div class="score">
                  <span class="score-label">Concepts covered</span>
                  <b class="score-val">75%</b>
                  <i class="score-bar" style="--v: 75%"></i>
                </div>
                <div class="score">
                  <span class="score-label">Communication</span>
                  <b class="score-val">85%</b>
                  <i class="score-bar" style="--v: 85%"></i>
                </div>
              </div>

              <div class="followup">
                <span class="followup-tag">Follow-up</span>
                What happens when a signal is read inside an effect?
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="how" id="how">
        <div class="section-head">
          <h2>How a session goes</h2>
          <p>From first answer to a certificate you can share.</p>
        </div>

        <ol class="steps">
          <li class="step">
            <span class="step-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 5h16v11H9l-5 4V5z" /><path d="M8 9.5h8M8 12.5h5" /></svg>
            </span>
            <h3>Talk through a problem</h3>
            <p>Answer real technical questions in your own words.</p>
          </li>
          <li class="step">
            <span class="step-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 20V11M12 20V4M19 20v-6" /></svg>
            </span>
            <h3>Get graded, turn by turn</h3>
            <p>Every answer is scored, then followed by a question that builds on it.</p>
          </li>
          <li class="step">
            <span class="step-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="13" r="8" /><path d="M12 9v4l3 2M9 3h6" /></svg>
            </span>
            <h3>Take the timed exam</h3>
            <p>Multiple choice at your level, scored the moment you submit.</p>
          </li>
          <li class="step">
            <span class="step-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="9" r="6" /><path d="M9.5 9l2 2 3.5-4M8.5 14.5L7 21l5-2.5 5 2.5-1.5-6.5" /></svg>
            </span>
            <h3>Earn a certificate</h3>
            <p>Score 85% or higher and your certificate is issued instantly.</p>
          </li>
        </ol>
      </section>

      <section class="domains" id="tracks">
        <div class="section-head">
          <h2>Choose your track</h2>
          <p>Each track has its own interviewer, question bank and exam.</p>
        </div>

        <div class="domains-grid">
          <article class="domain-card">
            <div class="track-art">
              <svg viewBox="0 0 360 150" role="img" aria-label="A request passing through Auth, Routing and Endpoint middleware and returning a 200 OK response">
                <rect class="ill-pill" x="8" y="58" width="52" height="26" rx="13" />
                <text class="ill-text mono" x="34" y="75" text-anchor="middle">GET</text>

                <path class="ill-line" d="M60 71H80" />
                <rect class="ill-box" x="80" y="44" width="52" height="54" rx="8" />
                <text class="ill-text mono" x="106" y="75" text-anchor="middle">Auth</text>

                <path class="ill-line" d="M132 71H146" />
                <rect class="ill-box" x="146" y="44" width="52" height="54" rx="8" />
                <text class="ill-text mono" x="172" y="75" text-anchor="middle">Routing</text>

                <path class="ill-line" d="M198 71H212" />
                <rect class="ill-box ill-box-hot" x="212" y="44" width="52" height="54" rx="8" />
                <text class="ill-text ill-text-on mono" x="238" y="75" text-anchor="middle">Endpoint</text>

                <path class="ill-line" d="M264 71H288" />
                <rect class="ill-pill" x="288" y="58" width="64" height="26" rx="13" />
                <text class="ill-text mono" x="320" y="75" text-anchor="middle">200 OK</text>

                <path class="ill-line" d="M238 44V33" />
                <path class="ill-box" d="M223 14v13c0 3 7 5 15 5s15-2 15-5V14" />
                <ellipse class="ill-box" cx="238" cy="14" rx="15" ry="5" />
                <text class="ill-text-soft mono" x="260" y="24">EF Core</text>

                <path class="ill-line ill-dash" d="M320 84V118H34V84" />
                <path class="ill-arrow" d="M34 84l-4 6h8z" />
                <text class="ill-text-soft mono" x="177" y="136" text-anchor="middle">the response walks back through the same pipeline</text>
              </svg>
            </div>
            <div class="track-body">
              <span class="domain-tag">Backend</span>
              <h3>.NET</h3>
              <p>Middleware, EF Core and dependency injection, as asked in ASP.NET Core interviews.</p>
              <ul class="chips">
                <li>Middleware</li>
                <li>EF Core</li>
                <li>DI</li>
              </ul>
            </div>
          </article>

          <article class="domain-card">
            <div class="track-art">
              <svg viewBox="0 0 360 150" role="img" aria-label="A component tree where a signal update re-renders only one component">
                <path class="ill-line" d="M180 34L116 58M180 34L244 58M244 82L200 106M244 82L288 106" />

                <rect class="ill-box" x="150" y="10" width="60" height="24" rx="7" />
                <text class="ill-text mono" x="180" y="26" text-anchor="middle">App</text>

                <rect class="ill-box" x="86" y="58" width="60" height="24" rx="7" />
                <text class="ill-text mono" x="116" y="74" text-anchor="middle">Header</text>

                <rect class="ill-box" x="214" y="58" width="60" height="24" rx="7" />
                <text class="ill-text mono" x="244" y="74" text-anchor="middle">Dashboard</text>

                <circle class="ill-pulse" cx="200" cy="118" r="26" />
                <rect class="ill-box ill-box-hot" x="172" y="106" width="56" height="24" rx="7" />
                <text class="ill-text ill-text-on mono" x="200" y="122" text-anchor="middle">Chart</text>

                <rect class="ill-box" x="260" y="106" width="56" height="24" rx="7" />
                <text class="ill-text mono" x="288" y="122" text-anchor="middle">Table</text>

                <rect class="ill-pill" x="8" y="104" width="112" height="26" rx="8" />
                <text class="ill-text mono" x="64" y="121" text-anchor="middle">count = signal(0)</text>
                <path class="ill-line ill-dash" d="M120 117H170" />
              </svg>
            </div>
            <div class="track-body">
              <span class="domain-tag">Frontend</span>
              <h3>Angular</h3>
              <p>Signals, standalone components and change detection, the way seniors explain them.</p>
              <ul class="chips">
                <li>Signals</li>
                <li>Standalone</li>
                <li>Change detection</li>
              </ul>
            </div>
          </article>

          <article class="domain-card">
            <div class="track-art">
              <svg viewBox="0 0 360 150" role="img" aria-label="A database table and an index tree pointing to the matching row">
                <rect class="ill-box" x="10" y="14" width="150" height="100" rx="8" />
                <rect class="ill-head" x="10" y="14" width="150" height="20" rx="8" />
                <rect class="ill-head" x="10" y="26" width="150" height="8" />
                <text class="ill-text mono" x="20" y="28">id</text>
                <text class="ill-text mono" x="62" y="28">date</text>
                <text class="ill-text mono" x="118" y="28">total</text>

                <path class="ill-line" d="M10 54H160M10 74H160M10 94H160" />
                <rect class="ill-row-hot" x="11" y="75" width="148" height="19" />

                <rect class="ill-data" x="20" y="41" width="16" height="6" rx="3" />
                <rect class="ill-data" x="62" y="41" width="30" height="6" rx="3" />
                <rect class="ill-data" x="118" y="41" width="22" height="6" rx="3" />
                <rect class="ill-data" x="20" y="61" width="16" height="6" rx="3" />
                <rect class="ill-data" x="62" y="61" width="30" height="6" rx="3" />
                <rect class="ill-data" x="118" y="61" width="26" height="6" rx="3" />
                <rect class="ill-data ill-data-hot" x="20" y="81" width="16" height="6" rx="3" />
                <rect class="ill-data ill-data-hot" x="62" y="81" width="30" height="6" rx="3" />
                <rect class="ill-data ill-data-hot" x="118" y="81" width="18" height="6" rx="3" />
                <rect class="ill-data" x="20" y="101" width="16" height="6" rx="3" />
                <rect class="ill-data" x="62" y="101" width="30" height="6" rx="3" />
                <rect class="ill-data" x="118" y="101" width="24" height="6" rx="3" />

                <path class="ill-line" d="M272 30L226 54M272 30L318 54M226 74L210 100M226 74L272 100M318 74L334 100" />
                <rect class="ill-box" x="250" y="10" width="44" height="20" rx="6" />
                <rect class="ill-box" x="206" y="54" width="40" height="20" rx="6" />
                <rect class="ill-box" x="298" y="54" width="40" height="20" rx="6" />
                <rect class="ill-box" x="188" y="100" width="44" height="20" rx="6" />
                <rect class="ill-box ill-box-hot" x="250" y="100" width="44" height="20" rx="6" />
                <rect class="ill-box" x="312" y="100" width="44" height="20" rx="6" />

                <path class="ill-line ill-dash ill-line-hot" d="M250 110C210 110 200 84 162 84" />
                <text class="ill-text-soft mono" x="272" y="138" text-anchor="middle">index seek</text>
              </svg>
            </div>
            <div class="track-body">
              <span class="domain-tag">Data</span>
              <h3>SQL</h3>
              <p>Isolation levels, indexing and query plans, explained rather than memorised.</p>
              <ul class="chips">
                <li>Indexes</li>
                <li>Isolation levels</li>
                <li>Query plans</li>
              </ul>
            </div>
          </article>

          <article class="domain-card">
            <div class="track-art">
              <svg viewBox="0 0 360 150" role="img" aria-label="A client behind a load balancer, two API servers, a cache and a database">
                <path class="ill-line" d="M56 72H84M136 72L170 38M136 72L170 106M226 38H262M226 106H262M198 52V92" />
                <path class="ill-line ill-dash" d="M226 44L268 92" />

                <rect class="ill-pill" x="8" y="58" width="48" height="28" rx="14" />
                <text class="ill-text mono" x="32" y="76" text-anchor="middle">Client</text>

                <rect class="ill-box" x="84" y="58" width="52" height="28" rx="8" />
                <text class="ill-text mono" x="110" y="76" text-anchor="middle">LB</text>

                <rect class="ill-box" x="170" y="24" width="56" height="28" rx="8" />
                <text class="ill-text mono" x="198" y="42" text-anchor="middle">API 1</text>

                <rect class="ill-box" x="170" y="92" width="56" height="28" rx="8" />
                <text class="ill-text mono" x="198" y="110" text-anchor="middle">API 2</text>

                <rect class="ill-box ill-box-hot" x="262" y="24" width="60" height="28" rx="8" />
                <text class="ill-text ill-text-on mono" x="292" y="42" text-anchor="middle">Cache</text>

                <path class="ill-box" d="M270 96v16c0 3 10 6 22 6s22-3 22-6V96" />
                <ellipse class="ill-box" cx="292" cy="96" rx="22" ry="6" />
                <text class="ill-text mono" x="292" y="114" text-anchor="middle">DB</text>

                <text class="ill-text-soft mono" x="180" y="142" text-anchor="middle">scale out, cache reads, keep one source of truth</text>
              </svg>
            </div>
            <div class="track-body">
              <span class="domain-tag">Architecture</span>
              <h3>System Design</h3>
              <p>Trade-offs, scaling and thinking out loud, the part that's hardest to practice alone.</p>
              <ul class="chips">
                <li>Scaling</li>
                <li>Caching</li>
                <li>Trade-offs</li>
              </ul>
            </div>
          </article>
        </div>
      </section>

      <section class="verify" id="certificates">
        <div class="verify-copy">
          <h2>Every certificate can be checked in seconds.</h2>
          <p>No screenshots to trust. Anyone can check a certificate against the real record.</p>
          <ul class="verify-points">
            <li>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12l4.5 4.5L19 7" /></svg>
              A unique ID on every certificate
            </li>
            <li>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12l4.5 4.5L19 7" /></svg>
              Scan the QR code to open the result
            </li>
            <li>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12l4.5 4.5L19 7" /></svg>
              No login needed
            </li>
          </ul>
        </div>

        <div class="verify-visual" aria-hidden="true">
          <div class="cert">
            <div class="cert-inner">
              <span class="mark cert-mark">DM</span>
              <p class="cert-kind">Certificate of achievement</p>

              <p class="cert-line cert-intro">This certifies that</p>
              <p class="cert-name">Ahmed Noser</p>

              <div class="cert-rule">
                <i></i>
                <svg viewBox="0 0 10 10"><path d="M5 0l5 5-5 5-5-5z" fill="currentColor" /></svg>
                <i></i>
              </div>

              <p class="cert-line">has successfully passed the <b class="cert-track">Angular</b> exam</p>

              <div class="cert-foot">
                <div class="cert-meta">
                  <span class="cert-meta-label">Certificate ID</span>
                  <span class="mono cert-id">DM-7F3K-92QX</span>
                  <span class="cert-meta-label">Issued</span>
                  <span class="cert-date">14 Sep 2026</span>
                </div>

                <div class="cert-seal">
                  <svg viewBox="0 0 100 120">
                    <path class="seal-tail" d="M30 80L20 116L35 108L42 118L50 84z" />
                    <path class="seal-tail" d="M70 80L80 116L65 108L58 118L50 84z" />
                    <polygon class="seal-edge" [attr.points]="sealEdge" />
                    <circle class="seal-ring" cx="50" cy="50" r="37" />
                    <circle class="seal-core" cx="50" cy="50" r="31" />
                    <text class="seal-num" x="50" y="55" text-anchor="middle">91%</text>
                    <text class="seal-cap" x="50" y="68" text-anchor="middle">score</text>
                  </svg>
                </div>

                <svg class="qr" viewBox="0 0 17 17" shape-rendering="crispEdges">
                  @for (f of finders; track $index) {
                    <rect class="qr-dark" [attr.x]="f.x" [attr.y]="f.y" width="7" height="7" />
                    <rect class="qr-light" [attr.x]="f.x + 1" [attr.y]="f.y + 1" width="5" height="5" />
                    <rect class="qr-dark" [attr.x]="f.x + 2" [attr.y]="f.y + 2" width="3" height="3" />
                  }
                  @for (c of qrCells; track $index) {
                    <rect class="qr-dark" [attr.x]="c.x" [attr.y]="c.y" width="1" height="1" />
                  }
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer class="home-footer">
        <span>&copy; 2026 DevMentor</span>
        <span class="mono">v1</span>
      </footer>
    </div>
  `,
  styleUrl: './homepage.css'
})
export class HomePage {
  readonly finders = [
    { x: 0, y: 0 },
    { x: 10, y: 0 },
    { x: 0, y: 10 }
  ];

  readonly qrCells: QrCell[] = this.buildQr();
  readonly sealEdge: string = this.buildSealEdge();

  scrollTo(id: string, event: Event): void {
    event.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  private buildQr(): QrCell[] {
    const size = 17;
    const cells: QrCell[] = [];
    let seed = 7;
    const rnd = () => {
      seed = (seed * 1103515245 + 12345) & 0x7fffffff;
      return seed / 0x7fffffff;
    };
    const inFinder = (x: number, y: number) =>
      (x < 8 && y < 8) || (x >= size - 8 && y < 8) || (x < 8 && y >= size - 8);

    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        if (!inFinder(x, y) && rnd() > 0.5) {
          cells.push({ x, y });
        }
      }
    }
    return cells;
  }

  // Scalloped rosette outline for the certificate seal.
  private buildSealEdge(): string {
    const points: string[] = [];
    const steps = 120;
    for (let i = 0; i < steps; i++) {
      const a = (i / steps) * Math.PI * 2;
      const r = 44 + 2.2 * Math.cos(a * 24);
      points.push(`${(50 + r * Math.cos(a)).toFixed(2)},${(50 + r * Math.sin(a)).toFixed(2)}`);
    }
    return points.join(' ');
  }
}