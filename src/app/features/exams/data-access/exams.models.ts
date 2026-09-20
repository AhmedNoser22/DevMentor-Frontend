export type TechDomain = 'DotNet' | 'Angular' | 'Sql' | 'SystemDesign';
export type Level = 'Beginner' | 'Intermediate' | 'Advanced';
export type AttemptStatus = 'InProgress' | 'Submitted' | 'Expired';

export interface StartExamRequest {
  domain: TechDomain;
  level: Level;
}

export interface ExamOption {
  id: string;
  text: string;
}

export interface ExamQuestion {
  questionId: string;
  text: string;
  options: ExamOption[];
  selectedOptionId: string | null;
}

export interface ExamAttempt {
  attemptId: string;
  domain: TechDomain;
  level: Level;
  status: AttemptStatus;
  expiresAtUtc: string;
  questions: ExamQuestion[];
}

export interface SaveAnswerRequest {
  attemptId: string;
  questionId: string;
  selectedOptionId: string;
}

export interface ExamResult {
  attemptId: string;
  scorePercentage: number;
  passed: boolean;
  certificateIssued: boolean;
  certificateCode: string | null;
}