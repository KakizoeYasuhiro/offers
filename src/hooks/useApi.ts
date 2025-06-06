'use client';

import { useState, useEffect, useCallback } from 'react';
import type { 
  Job, 
  Offer, 
  Rule, 
  PaginatedResponse, 
  JobQueryParams, 
  OfferQueryParams, 
  RuleQueryParams,
  CreateJobRequest,
  CreateOfferRequest,
  CreateRuleRequest,
  UpdateJobRequest,
  UpdateOfferRequest,
  UpdateRuleRequest,
  ApiResponse
} from '@/types';

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

interface UsePaginatedApiState<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  } | null;
  loading: boolean;
  error: string | null;
}

// Generic API hook
function useApiCall<T>() {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(async (apiCall: () => Promise<T>) => {
    setState({ data: null, loading: true, error: null });
    try {
      const result = await apiCall();
      setState({ data: result, loading: false, error: null });
      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setState({ data: null, loading: false, error: errorMessage });
      throw error;
    }
  }, []);

  return { ...state, execute };
}

// Generic paginated API hook
function usePaginatedApiCall<T>() {
  const [state, setState] = useState<UsePaginatedApiState<T>>({
    data: [],
    pagination: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(async (apiCall: () => Promise<PaginatedResponse<T>>) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const result = await apiCall();
      setState({
        data: result.data,
        pagination: result.pagination,
        loading: false,
        error: null,
      });
      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setState(prev => ({ ...prev, loading: false, error: errorMessage }));
      throw error;
    }
  }, []);

  return { ...state, execute };
}

// Jobs API hooks
export function useJobs(params?: JobQueryParams) {
  const { data, pagination, loading, error, execute } = usePaginatedApiCall<Job>();

  const fetchData = useCallback(async () => {
    const queryString = new URLSearchParams();
    if (params?.page) queryString.append('page', params.page.toString());
    if (params?.limit) queryString.append('limit', params.limit.toString());
    if (params?.status) queryString.append('status', params.status);
    if (params?.company) queryString.append('company', params.company);
    if (params?.position) queryString.append('position', params.position);

    const response = await fetch(`/api/jobs?${queryString}`);
    if (!response.ok) throw new Error('Failed to fetch jobs');
    const result: ApiResponse<PaginatedResponse<Job>> = await response.json();
    if (!result.success) throw new Error(result.error || 'Failed to fetch jobs');
    return result.data!;
  }, [params]);

  useEffect(() => {
    fetchData().catch(() => {});
  }, [fetchData]);

  return { data, pagination, loading, error, refetch: () => execute(fetchData) };
}

export function useJob(id?: number) {
  const { data, loading, error, execute } = useApiCall<Job>();

  const fetchData = useCallback(async () => {
    if (!id) throw new Error('Job ID is required');
    const response = await fetch(`/api/jobs/${id}`);
    if (!response.ok) throw new Error('Failed to fetch job');
    const result: ApiResponse<Job> = await response.json();
    if (!result.success) throw new Error(result.error || 'Failed to fetch job');
    return result.data!;
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchData().catch(() => {});
    }
  }, [fetchData, id]);

  return { data, loading, error, refetch: () => execute(fetchData) };
}

export function useCreateJob() {
  const { data, loading, error, execute } = useApiCall<Job>();

  const createJob = useCallback(async (jobData: CreateJobRequest) => {
    const response = await fetch('/api/jobs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(jobData),
    });
    if (!response.ok) throw new Error('Failed to create job');
    const result: ApiResponse<Job> = await response.json();
    if (!result.success) throw new Error(result.error || 'Failed to create job');
    return result.data!;
  }, []);

  return { data, loading, error, createJob: (jobData: CreateJobRequest) => execute(() => createJob(jobData)) };
}

export function useUpdateJob() {
  const { data, loading, error, execute } = useApiCall<Job>();

  const updateJob = useCallback(async (id: number, jobData: UpdateJobRequest) => {
    const response = await fetch(`/api/jobs/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(jobData),
    });
    if (!response.ok) throw new Error('Failed to update job');
    const result: ApiResponse<Job> = await response.json();
    if (!result.success) throw new Error(result.error || 'Failed to update job');
    return result.data!;
  }, []);

  return { data, loading, error, updateJob: (id: number, jobData: UpdateJobRequest) => execute(() => updateJob(id, jobData)) };
}

export function useDeleteJob() {
  const { data, loading, error, execute } = useApiCall<{ message: string }>();

  const deleteJob = useCallback(async (id: number) => {
    const response = await fetch(`/api/jobs/${id}`, { method: 'DELETE' });
    if (!response.ok) throw new Error('Failed to delete job');
    const result: ApiResponse<{ message: string }> = await response.json();
    if (!result.success) throw new Error(result.error || 'Failed to delete job');
    return { message: result.message || 'Job deleted successfully' };
  }, []);

  return { data, loading, error, deleteJob: (id: number) => execute(() => deleteJob(id)) };
}

// Offers API hooks
export function useOffers(params?: OfferQueryParams) {
  const { data, pagination, loading, error, execute } = usePaginatedApiCall<Offer>();

  const fetchData = useCallback(async () => {
    const queryString = new URLSearchParams();
    if (params?.page) queryString.append('page', params.page.toString());
    if (params?.limit) queryString.append('limit', params.limit.toString());
    if (params?.status) queryString.append('status', params.status);
    if (params?.jobId) queryString.append('jobId', params.jobId.toString());
    if (params?.candidate) queryString.append('candidate', params.candidate);

    const response = await fetch(`/api/offers?${queryString}`);
    if (!response.ok) throw new Error('Failed to fetch offers');
    const result: ApiResponse<PaginatedResponse<Offer>> = await response.json();
    if (!result.success) throw new Error(result.error || 'Failed to fetch offers');
    return result.data!;
  }, [params]);

  useEffect(() => {
    fetchData().catch(() => {});
  }, [fetchData]);

  return { data, pagination, loading, error, refetch: () => execute(fetchData) };
}

export function useOffer(id?: number) {
  const { data, loading, error, execute } = useApiCall<Offer>();

  const fetchData = useCallback(async () => {
    if (!id) throw new Error('Offer ID is required');
    const response = await fetch(`/api/offers/${id}`);
    if (!response.ok) throw new Error('Failed to fetch offer');
    const result: ApiResponse<Offer> = await response.json();
    if (!result.success) throw new Error(result.error || 'Failed to fetch offer');
    return result.data!;
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchData().catch(() => {});
    }
  }, [fetchData, id]);

  return { data, loading, error, refetch: () => execute(fetchData) };
}

export function useCreateOffer() {
  const { data, loading, error, execute } = useApiCall<Offer>();

  const createOffer = useCallback(async (offerData: CreateOfferRequest) => {
    const response = await fetch('/api/offers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(offerData),
    });
    if (!response.ok) throw new Error('Failed to create offer');
    const result: ApiResponse<Offer> = await response.json();
    if (!result.success) throw new Error(result.error || 'Failed to create offer');
    return result.data!;
  }, []);

  return { data, loading, error, createOffer: (offerData: CreateOfferRequest) => execute(() => createOffer(offerData)) };
}

export function useUpdateOffer() {
  const { data, loading, error, execute } = useApiCall<Offer>();

  const updateOffer = useCallback(async (id: number, offerData: UpdateOfferRequest) => {
    const response = await fetch(`/api/offers/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(offerData),
    });
    if (!response.ok) throw new Error('Failed to update offer');
    const result: ApiResponse<Offer> = await response.json();
    if (!result.success) throw new Error(result.error || 'Failed to update offer');
    return result.data!;
  }, []);

  return { data, loading, error, updateOffer: (id: number, offerData: UpdateOfferRequest) => execute(() => updateOffer(id, offerData)) };
}

export function useDeleteOffer() {
  const { data, loading, error, execute } = useApiCall<{ message: string }>();

  const deleteOffer = useCallback(async (id: number) => {
    const response = await fetch(`/api/offers/${id}`, { method: 'DELETE' });
    if (!response.ok) throw new Error('Failed to delete offer');
    const result: ApiResponse<{ message: string }> = await response.json();
    if (!result.success) throw new Error(result.error || 'Failed to delete offer');
    return { message: result.message || 'Offer deleted successfully' };
  }, []);

  return { data, loading, error, deleteOffer: (id: number) => execute(() => deleteOffer(id)) };
}

// Rules API hooks
export function useRules(params?: RuleQueryParams) {
  const { data, pagination, loading, error, execute } = usePaginatedApiCall<Rule>();

  const fetchData = useCallback(async () => {
    const queryString = new URLSearchParams();
    if (params?.page) queryString.append('page', params.page.toString());
    if (params?.limit) queryString.append('limit', params.limit.toString());
    if (params?.isActive !== undefined) queryString.append('isActive', params.isActive.toString());
    if (params?.scope) queryString.append('scope', params.scope);

    const response = await fetch(`/api/rules?${queryString}`);
    if (!response.ok) throw new Error('Failed to fetch rules');
    const result: ApiResponse<PaginatedResponse<Rule>> = await response.json();
    if (!result.success) throw new Error(result.error || 'Failed to fetch rules');
    return result.data!;
  }, [params]);

  useEffect(() => {
    fetchData().catch(() => {});
  }, [fetchData]);

  return { data, pagination, loading, error, refetch: () => execute(fetchData) };
}

export function useRule(id?: number) {
  const { data, loading, error, execute } = useApiCall<Rule>();

  const fetchData = useCallback(async () => {
    if (!id) throw new Error('Rule ID is required');
    const response = await fetch(`/api/rules/${id}`);
    if (!response.ok) throw new Error('Failed to fetch rule');
    const result: ApiResponse<Rule> = await response.json();
    if (!result.success) throw new Error(result.error || 'Failed to fetch rule');
    return result.data!;
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchData().catch(() => {});
    }
  }, [fetchData, id]);

  return { data, loading, error, refetch: () => execute(fetchData) };
}

export function useCreateRule() {
  const { data, loading, error, execute } = useApiCall<Rule>();

  const createRule = useCallback(async (ruleData: CreateRuleRequest) => {
    const response = await fetch('/api/rules', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(ruleData),
    });
    if (!response.ok) throw new Error('Failed to create rule');
    const result: ApiResponse<Rule> = await response.json();
    if (!result.success) throw new Error(result.error || 'Failed to create rule');
    return result.data!;
  }, []);

  return { data, loading, error, createRule: (ruleData: CreateRuleRequest) => execute(() => createRule(ruleData)) };
}

export function useUpdateRule() {
  const { data, loading, error, execute } = useApiCall<Rule>();

  const updateRule = useCallback(async (id: number, ruleData: UpdateRuleRequest) => {
    const response = await fetch(`/api/rules/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(ruleData),
    });
    if (!response.ok) throw new Error('Failed to update rule');
    const result: ApiResponse<Rule> = await response.json();
    if (!result.success) throw new Error(result.error || 'Failed to update rule');
    return result.data!;
  }, []);

  return { data, loading, error, updateRule: (id: number, ruleData: UpdateRuleRequest) => execute(() => updateRule(id, ruleData)) };
}

export function useDeleteRule() {
  const { data, loading, error, execute } = useApiCall<{ message: string }>();

  const deleteRule = useCallback(async (id: number) => {
    const response = await fetch(`/api/rules/${id}`, { method: 'DELETE' });
    if (!response.ok) throw new Error('Failed to delete rule');
    const result: ApiResponse<{ message: string }> = await response.json();
    if (!result.success) throw new Error(result.error || 'Failed to delete rule');
    return { message: result.message || 'Rule deleted successfully' };
  }, []);

  return { data, loading, error, deleteRule: (id: number) => execute(() => deleteRule(id)) };
}