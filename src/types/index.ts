// User types
export interface User {
  id: number;
  email: string;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface CreateUserRequest {
  email: string;
  password: string;
  name: string;
}

// Job types
export interface Job {
  id: string;
  creation_date: string;
  client_name: string;
  job_title: string;
  job_category: string;
  salary_range: string;
  status?: string;
  description?: string;
  required_skills?: string;
  preferred_skills?: string;
  work_location?: string;
  employment_type?: string;
  created_by?: number;
  created_at?: string;
  updated_at?: string;
}

export interface CreateJobRequest {
  client_name: string;
  job_title: string;
  job_category: string;
  salary_range: string;
  description?: string;
  required_skills?: string;
  preferred_skills?: string;
  work_location?: string;
  employment_type?: string;
}

export interface UpdateJobRequest {
  client_name?: string;
  job_title?: string;
  job_category?: string;
  salary_range?: string;
  status?: string;
  description?: string;
  required_skills?: string;
  preferred_skills?: string;
  work_location?: string;
  employment_type?: string;
}

// Offer types
export type OfferStatus = '下書き' | '送信準備完了' | '送信済' | '開封済' | '返信あり';

export interface Offer {
  id: string;
  job_id: string;
  candidate_name: string;
  candidate_email?: string;
  status: OfferStatus;
  subject: string;
  body_text?: string;
  sent_at?: string;
  opened_at?: string;
  replied_at?: string;
  created_by?: number;
  created_at?: string;
  updated_at?: string;
  // Join fields
  job_title?: string;
  client_name?: string;
}

export interface CreateOfferRequest {
  job_id: string;
  candidate_name: string;
  candidate_email?: string;
  subject: string;
  body_text?: string;
}

export interface UpdateOfferRequest {
  candidate_name?: string;
  candidate_email?: string;
  status?: OfferStatus;
  subject?: string;
  body_text?: string;
  sent_at?: string;
  opened_at?: string;
  replied_at?: string;
}

// Rule types
export type RuleScope = '全体' | '職種' | '顧客' | '求人';

export interface Rule {
  id: string;
  scope: RuleScope;
  target: string;
  summary: string;
  rule_details?: Record<string, any>;
  is_active: boolean;
  created_by?: number;
  created_at?: string;
  updated_at?: string;
}

export interface CreateRuleRequest {
  scope: RuleScope;
  target: string;
  summary: string;
  rule_details?: Record<string, any>;
}

export interface UpdateRuleRequest {
  scope?: RuleScope;
  target?: string;
  summary?: string;
  rule_details?: Record<string, any>;
  is_active?: boolean;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Query parameters
export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface JobQueryParams extends PaginationParams {
  client_name?: string;
  job_category?: string;
  status?: string;
}

export interface OfferQueryParams extends PaginationParams {
  status?: OfferStatus;
  job_id?: string;
}

export interface RuleQueryParams extends PaginationParams {
  scope?: RuleScope;
  is_active?: boolean;
}