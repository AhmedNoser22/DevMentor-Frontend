import { TechDomain } from '../../exams/data-access/exams.models';

export interface StartInterviewRequest {
  domain: TechDomain;
}

export interface InterviewTurn {
  turnId: string;
  order: number;
  question: string;
  answer: string | null;
  technicalAccuracyFeedback: string | null;
  missingConceptsFeedback: string | null;
  communicationFeedback: string | null;
  score: number | null;
}

export interface InterviewSession {
  sessionId: string;
  domain: TechDomain;
  ended: boolean;
  finalScore: number | null;
  summaryText: string | null;
  turns: InterviewTurn[];
}

export interface AnswerTurnRequest {
  sessionId: string;
  turnId: string;
  answer: string;
}