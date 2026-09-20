export interface RecentActivity {
  type: string;
  title: string;
  dateUtc: string;
  score: number | null;
  passed: boolean | null;
}

export interface CertificateSummary {
  domain: number;
  level: number;
  certificateCode: string;
  issuedAtUtc: string;
}

export interface ProfileDto {
  userId: string;
  fullName: string;
  email: string;
  certificatesCount: number;
  recentActivity: RecentActivity[];
  certificates: CertificateSummary[];
}