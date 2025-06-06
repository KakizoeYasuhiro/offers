import { useState, useEffect, useCallback } from 'react';
import type { Job, Offer, Rule, ApiResponse, JobQueryParams, OfferQueryParams, RuleQueryParams } from '@/types';

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

interface UseApiListState<T> {
  data: T[];
  loading: boolean;
  error: string | null;
  meta: {
    total: number;
    page: number;
    limit: number;
    total_pages: number;
  } | null;
}

// Generic API fetch hook
export function useApi<T>(url: string | null): UseApiState<T> {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  const fetchData = useCallback(async () => {
    if (!url) {
      setState({ data: null, loading: false, error: null });
      return;
    }

    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: ApiResponse<T> = await response.json();
      setState({ data: result.data, loading: false, error: null });
    } catch (error) {
      setState({ 
        data: null, 
        loading: false, 
        error: error instanceof Error ? error.message : 'An error occurred'
      });
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return state;
}

// Jobs API hooks
export function useJobs(params: JobQueryParams = {}): UseApiListState<Job> & { refetch: () => void } {
  const [state, setState] = useState<UseApiListState<Job>>({
    data: [],
    loading: true,
    error: null,
    meta: null,
  });

  const buildUrl = useCallback(() => {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, String(value));
      }
    });
    return `/api/jobs?${searchParams.toString()}`;
  }, [params]);

  const fetchData = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const response = await fetch(buildUrl());
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: ApiResponse<Job[]> = await response.json();
      setState({ 
        data: result.data, 
        loading: false, 
        error: null,
        meta: result.meta || null
      });
    } catch (error) {
      setState({ 
        data: [], 
        loading: false, 
        error: error instanceof Error ? error.message : 'An error occurred',
        meta: null
      });
    }
  }, [buildUrl]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { ...state, refetch: fetchData };
}

export function useJob(id: string | null): UseApiState<Job> & { refetch: () => void } {
  const url = id ? `/api/jobs/${id}` : null;
  const state = useApi<Job>(url);
  
  const refetch = useCallback(async () => {
    if (!url) return;
    
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result: ApiResponse<Job> = await response.json();
      // This would trigger a re-fetch in a real implementation
      // For now, we'll just return the data
      return result.data;
    } catch (error) {
      throw error instanceof Error ? error : new Error('An error occurred');
    }
  }, [url]);

  return { ...state, refetch };
}

// Offers API hooks
export function useOffers(params: OfferQueryParams = {}): UseApiListState<Offer> & { refetch: () => void } {
  const [state, setState] = useState<UseApiListState<Offer>>({
    data: [],
    loading: true,
    error: null,
    meta: null,
  });

  const buildUrl = useCallback(() => {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, String(value));
      }
    });
    return `/api/offers?${searchParams.toString()}`;
  }, [params]);

  const fetchData = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const response = await fetch(buildUrl());
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: ApiResponse<Offer[]> = await response.json();
      setState({ 
        data: result.data, 
        loading: false, 
        error: null,
        meta: result.meta || null
      });
    } catch (error) {
      setState({ 
        data: [], 
        loading: false, 
        error: error instanceof Error ? error.message : 'An error occurred',
        meta: null
      });
    }
  }, [buildUrl]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { ...state, refetch: fetchData };
}

export function useOffer(id: string | null): UseApiState<Offer> & { refetch: () => void } {
  const url = id ? `/api/offers/${id}` : null;
  const state = useApi<Offer>(url);
  
  const refetch = useCallback(async () => {
    if (!url) return;
    
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result: ApiResponse<Offer> = await response.json();
      return result.data;
    } catch (error) {
      throw error instanceof Error ? error : new Error('An error occurred');
    }
  }, [url]);

  return { ...state, refetch };
}

// Rules API hooks
export function useRules(params: RuleQueryParams = {}): UseApiListState<Rule> & { refetch: () => void } {
  const [state, setState] = useState<UseApiListState<Rule>>({
    data: [],
    loading: true,
    error: null,
    meta: null,
  });

  const buildUrl = useCallback(() => {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, String(value));
      }
    });
    return `/api/rules?${searchParams.toString()}`;
  }, [params]);

  const fetchData = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const response = await fetch(buildUrl());
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: ApiResponse<Rule[]> = await response.json();
      setState({ 
        data: result.data, 
        loading: false, 
        error: null,
        meta: result.meta || null
      });
    } catch (error) {
      setState({ 
        data: [], 
        loading: false, 
        error: error instanceof Error ? error.message : 'An error occurred',
        meta: null
      });
    }
  }, [buildUrl]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { ...state, refetch: fetchData };
}

export function useRule(id: string | null): UseApiState<Rule> & { refetch: () => void } {
  const url = id ? `/api/rules/${id}` : null;
  const state = useApi<Rule>(url);
  
  const refetch = useCallback(async () => {
    if (!url) return;
    
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result: ApiResponse<Rule> = await response.json();
      return result.data;
    } catch (error) {
      throw error instanceof Error ? error : new Error('An error occurred');
    }
  }, [url]);

  return { ...state, refetch };
}