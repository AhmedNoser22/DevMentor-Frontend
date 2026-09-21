import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthShell } from '../../ui/auth-shell/auth-shell';
import { AuthService } from '../../../../core/auth/auth.service';

@Component({
  selector: 'app-external-callback-page',
  standalone: true,
  imports: [AuthShell],
  template: `
    <app-auth-shell heading="Signing you in." subheading="This only takes a second.">
      <h1>Signing you in…</h1>
      @if (errored()) {
        <p class="error">Something went wrong with that sign-in. Please try again.</p>
      } @else {
        <p class="lede">One moment while we finish connecting your account.</p>
      }
    </app-auth-shell>
  `
})
export class ExternalCallbackPage implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly errored = signal(false);

  ngOnInit() {
    const params = this.route.snapshot.queryParamMap;
    const accessToken = params.get('accessToken');
    const refreshToken = params.get('refreshToken');
    const userId = params.get('userId');
    const email = params.get('email');
    const fullName = params.get('fullName');

    if (!accessToken || !refreshToken || !userId || !email) {
      this.errored.set(true);
      return;
    }

    this.authService.storeSession({
      userId,
      fullName: fullName ?? '',
      email,
      accessToken,
      refreshToken,
      accessTokenExpiresAtUtc: new Date().toISOString()
    });

    this.router.navigateByUrl('/app/dashboard');
  }
}