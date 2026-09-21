import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AuthShell } from '../../ui/auth-shell/auth-shell';
import { AuthService } from '../../../../core/auth/auth.service';

@Component({
  selector: 'app-confirm-email-page',
  standalone: true,
  imports: [RouterLink, AuthShell],
  template: `
    <app-auth-shell heading="One last step." subheading="Confirming your email keeps your certificates tied to the right inbox.">
      <h1>Confirming your email</h1>
      @if (loading()) {
        <p class="lede">One moment…</p>
      } @else if (success()) {
        <p class="success">Your email is confirmed. You can log in now.</p>
      } @else {
        <p class="error">This confirmation link is invalid or has expired.</p>
      }
      <div class="links">
        <a routerLink="/auth/login">Back to login</a>
      </div>
    </app-auth-shell>
  `
})
export class ConfirmEmailPage implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly route = inject(ActivatedRoute);

  readonly loading = signal(true);
  readonly success = signal(false);

  ngOnInit() {
    const email = this.route.snapshot.queryParamMap.get('email');
    const token = this.route.snapshot.queryParamMap.get('token');

    if (!email || !token) {
      this.loading.set(false);
      return;
    }

    this.authService.confirmEmail({ email, token }).subscribe({
      next: () => {
        this.loading.set(false);
        this.success.set(true);
      },
      error: () => {
        this.loading.set(false);
        this.success.set(false);
      }
    });
  }
}