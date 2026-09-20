import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  template: `
    <div class="shell">
      <aside class="rail">
        <div class="mark">DM</div>
        <nav>
          <a routerLink="/dashboard" routerLinkActive="active">Dashboard</a>
          <a routerLink="/interview" routerLinkActive="active">AI Interview</a>
          <a routerLink="/exams" routerLinkActive="active">Exams</a>
          <a routerLink="/certificates" routerLinkActive="active">Certificates</a>
          <a routerLink="/profile" routerLinkActive="active">Profile</a>
        </nav>
        <button class="logout" (click)="authService.logout()">Log out</button>
      </aside>
      <main class="content">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styleUrl: './shell.css'
})
export class ShellComponent {
  readonly authService = inject(AuthService);
}