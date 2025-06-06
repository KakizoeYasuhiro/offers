// Database Entity Types
export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary_range: string;
  description: string;
  requirements: string;
  employment_type: 'full-time' | 'part-time' | 'contract' | 'internship';
  experience_level: 'entry' | 'mid' | 'senior' | 'executive';
  remote_option: boolean;
  created_at: string;
  updated_at: string;
}

export interface Offer {
  id: string;
  job_id: string;
  candidate_name: string;
  email: string;
  phone: string;
  status: 'pending' | 'reviewed' | 'interviewed' | 'offered' | 'accepted' | 'rejected';
  cover_letter: string;
  resume_url?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface Rule {
  id: string;
  name: string;
  description: string;
  type: 'screening' | 'evaluation' | 'notification' | 'workflow';
  conditions: Record<string, unknown>;
  actions: Record<string, unknown>;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// API Query Parameters
export interface JobQueryParams {
  page?: number;
  limit?: number;
  company?: string;
  location?: string;
  employment_type?: string;
  experience_level?: string;
  remote_option?: boolean;
  search?: string;
}

export interface OfferQueryParams {
  page?: number;
  limit?: number;
  job_id?: string;
  status?: string;
  candidate_name?: string;
  search?: string;
}

export interface RuleQueryParams {
  page?: number;
  limit?: number;
  type?: string;
  is_active?: boolean;
  search?: string;
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  meta?: {
    total: number;
    page: number;
    limit: number;
    total_pages: number;
  };
}

export interface ApiError {
  error: string;
  message: string;
  code?: number;
}

// Form Input Types
export interface JobInput {
  title: string;
  company: string;
  location: string;
  salary_range: string;
  description: string;
  requirements: string;
  employment_type: 'full-time' | 'part-time' | 'contract' | 'internship';
  experience_level: 'entry' | 'mid' | 'senior' | 'executive';
  remote_option: boolean;
}

export interface OfferInput {
  job_id: string;
  candidate_name: string;
  email: string;
  phone: string;
  cover_letter: string;
  resume_url?: string;
  notes?: string;
}

export interface RuleInput {
  name: string;
  description: string;
  type: 'screening' | 'evaluation' | 'notification' | 'workflow';
  conditions: Record<string, unknown>;
  actions: Record<string, unknown>;
  is_active: boolean;
}

// Database Operations
export interface DatabaseConfig {
  connectionString: string;
}

export interface PaginationOptions {
  page: number;
  limit: number;
  offset: number;
}