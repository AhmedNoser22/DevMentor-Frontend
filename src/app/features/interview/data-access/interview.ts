import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { AnswerTurnRequest, InterviewSession, StartInterviewRequest } from './interview.models';

@Injectable({ providedIn: 'root' })
export class InterviewService {
  private readonly http = inject(HttpClient);

  start(request: StartInterviewRequest) {
    return this.http.post<InterviewSession>(`${environment.apiUrl}/interviews/start`, request);
  }

  answer(request: AnswerTurnRequest) {
    return this.http.post<InterviewSession>(`${environment.apiUrl}/interviews/answer`, request);
  }

  get(sessionId: string) {
    return this.http.get<InterviewSession>(`${environment.apiUrl}/interviews/${sessionId}`);
  }
}