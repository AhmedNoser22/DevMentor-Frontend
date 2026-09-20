import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { ExamAttempt, ExamResult, SaveAnswerRequest, StartExamRequest } from './exams.models';

@Injectable({ providedIn: 'root' })
export class ExamsService {
  private readonly http = inject(HttpClient);

  start(request: StartExamRequest) {
    return this.http.post<ExamAttempt>(`${environment.apiUrl}/exams/start`, request);
  }

  get(attemptId: string) {
    return this.http.get<ExamAttempt>(`${environment.apiUrl}/exams/${attemptId}`);
  }

  saveAnswer(request: SaveAnswerRequest) {
    return this.http.post<void>(`${environment.apiUrl}/exams/answer`, request);
  }

  submit(attemptId: string) {
    return this.http.post<ExamResult>(`${environment.apiUrl}/exams/${attemptId}/submit`, {});
  }
}