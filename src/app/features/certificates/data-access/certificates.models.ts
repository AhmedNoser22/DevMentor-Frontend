import { Level, TechDomain } from '../../exams/data-access/exams.models';

export interface Certificate {
  id: string;
  domain: TechDomain;
  level: Level;
  scorePercentage: number;
  certificateCode: string;
  issuedAtUtc: string;
}

export interface VerifyCertificateResult {
  isValid: boolean;
  certificate: Certificate | null;
  holderName: string | null;
}