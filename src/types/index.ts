// Core entity types
export interface Job {
  id: number;
  company: string;
  position: string;
  salaryRange: string;
  location: string;
  description: string;
  requirements: string;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

export interface Offer {
  id: number;
  jobId: number;
  candidate: string;
  status: 'pending' | 'accepted' | 'rejected';
  subject: string;
  message: string;
  createdAt: string;
  updatedAt: string;
}

export interface Rule {
  id: number;
  scope: string;
  target: string;
  overview: string;
  details: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// API request/response types
export interface CreateJobRequest {
  company: string;
  position: string;
  salaryRange: string;
  location: string;
  description: string;
  requirements: string;
}

export interface UpdateJobRequest extends Partial<CreateJobRequest> {
  status?: 'active' | 'inactive';
}

export interface CreateOfferRequest {
  jobId: number;
  candidate: string;
  subject: string;
  message: string;
}

export interface UpdateOfferRequest extends Partial<CreateOfferRequest> {
  status?: 'pending' | 'accepted' | 'rejected';
}

export interface CreateRuleRequest {
  scope: string;
  target: string;
  overview: string;
  details: string;
}

export interface UpdateRuleRequest extends Partial<CreateRuleRequest> {
  isActive?: boolean;
}

// Query parameter types
export interface JobQueryParams {
  page?: number;
  limit?: number;
  status?: 'active' | 'inactive';
  company?: string;
  position?: string;
}

export interface OfferQueryParams {
  page?: number;
  limit?: number;
  status?: 'pending' | 'accepted' | 'rejected';
  jobId?: number;
  candidate?: string;
}

export interface RuleQueryParams {
  page?: number;
  limit?: number;
  isActive?: boolean;
  scope?: string;
}

// Pagination types
export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: PaginationInfo;
}

// API response types
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface JobsResponse extends PaginatedResponse<Job> {}
export interface OffersResponse extends PaginatedResponse<Offer> {}
export interface RulesResponse extends PaginatedResponse<Rule> {}

// Database table creation types
export interface DatabaseTables {
  jobs: string;
  offers: string;
  rules: string;
}

// Error types
export interface DatabaseError extends Error {
  code?: string;
  detail?: string;
}

// Utility types
export type EntityType = 'job' | 'offer' | 'rule';
export type EntityId = number;
export type ResponseStatus = 'success' | 'error';