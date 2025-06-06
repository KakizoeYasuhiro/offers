import { useState, useEffect } from 'react';
import { ApiResponse, PaginatedResponse } from '@/types';

interface UseApiOptions {
  immediate?: boolean;
}

interface UseApiResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useApi<T>(
  url: string, 
  options: UseApiOptions = { immediate: true }
): UseApiResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(url);
      const result: ApiResponse<T> = await response.json();
      
      if (result.success) {
        setData(result.data || null);
      } else {
        setError(result.error || 'Unknown error occurred');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Network error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (options.immediate) {
      fetchData();
    }
  }, [url, options.immediate]);

  return {
    data,
    loading,
    error,
    refetch: fetchData
  };
}

// Specific hooks for different data types
export function useJobs(params?: Record<string, string>) {
  const queryString = params ? new URLSearchParams(params).toString() : '';
  const url = `/api/jobs${queryString ? `?${queryString}` : ''}`;
  return useApi<PaginatedResponse<any>>(url);
}

export function useJob(id: string) {
  return useApi<any>(`/api/jobs/${id}`);
}

export function useOffers(params?: Record<string, string>) {
  const queryString = params ? new URLSearchParams(params).toString() : '';
  const url = `/api/offers${queryString ? `?${queryString}` : ''}`;
  return useApi<PaginatedResponse<any>>(url);
}

export function useOffer(id: string) {
  return useApi<any>(`/api/offers/${id}`);
}

export function useRules(params?: Record<string, string>) {
  const queryString = params ? new URLSearchParams(params).toString() : '';
  const url = `/api/rules${queryString ? `?${queryString}` : ''}`;
  return useApi<PaginatedResponse<any>>(url);
}

export function useRule(id: string) {
  return useApi<any>(`/api/rules/${id}`);
}

// Utility functions for API calls
export async function apiCall<T>(
  url: string, 
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });
  
  return response.json();
}

export async function createJob(data: any) {
  return apiCall('/api/jobs', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function updateJob(id: string, data: any) {
  return apiCall(`/api/jobs/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function deleteJob(id: string) {
  return apiCall(`/api/jobs/${id}`, {
    method: 'DELETE',
  });
}

export async function createOffer(data: any) {
  return apiCall('/api/offers', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function updateOffer(id: string, data: any) {
  return apiCall(`/api/offers/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function deleteOffer(id: string) {
  return apiCall(`/api/offers/${id}`, {
    method: 'DELETE',
  });
}

export async function createRule(data: any) {
  return apiCall('/api/rules', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function updateRule(id: string, data: any) {
  return apiCall(`/api/rules/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function deleteRule(id: string) {
  return apiCall(`/api/rules/${id}`, {
    method: 'DELETE',
  });
}