// Job types
export interface Job {
  id?: number;
  job_id: string;
  creation_date: string;
  client_name: string;
  job_title: string;
  job_category: string;
  salary_range: string;
  created_at?: string;
  updated_at?: string;
}

export interface CreateJobRequest {
  client_name: string;
  job_title: string;
  job_category: string;
  salary_range: string;
}

// Offer types
export interface Offer {
  id?: number;
  offer_id: string;
  creation_date: string;
  job_name: string;
  candidate_name: string;
  status: OfferStatus;
  subject: string;
  content?: string;
  job_id?: string;
  created_at?: string;
  updated_at?: string;
}

export type OfferStatus = '下書き' | '送信準備完了' | '送信済' | '開封済' | '返信あり';

export interface CreateOfferRequest {
  job_name: string;
  candidate_name: string;
  subject: string;
  content?: string;
  job_id?: string;
}

// Rule types
export interface Rule {
  id?: number;
  rule_id: string;
  creation_date: string;
  scope: RuleScope;
  target: string;
  summary: string;
  rule_content?: string;
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
}

export type RuleScope = '全体' | '職種' | '顧客' | '求人';

export interface CreateRuleRequest {
  scope: RuleScope;
  target: string;
  summary: string;
  rule_content?: string;
}

// API response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}