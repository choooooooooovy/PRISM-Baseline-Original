import { ApiError, type ApiResponse } from '../types/api';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export interface FetchOptions extends RequestInit {
  params?: Record<string, string>;
}

/**
 * Base fetch wrapper with error handling
 */
export async function fetchApi<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<ApiResponse<T>> {
  const { params, ...fetchOptions } = options;

  // Build URL with query params
  let url = `${API_URL}${endpoint}`;
  if (params) {
    const searchParams = new URLSearchParams(params);
    url += `?${searchParams.toString()}`;
  }

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      headers: {
        'Content-Type': 'application/json',
        ...fetchOptions.headers,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new ApiError(
        data.error || data.message || 'API request failed',
        response.status,
        data
      );
    }

    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    // Network or parsing error
    throw new ApiError(
      error instanceof Error ? error.message : 'Unknown error occurred',
      undefined,
      error
    );
  }
}

/**
 * GET request
 */
export async function get<T>(
  endpoint: string,
  params?: Record<string, string>
): Promise<T> {
  const response = await fetchApi<T>(endpoint, { method: 'GET', params });
  return response as T;
}

/**
 * POST request
 */
export async function post<T>(
  endpoint: string,
  body?: unknown
): Promise<T> {
  const response = await fetchApi<T>(endpoint, {
    method: 'POST',
    body: JSON.stringify(body),
  });
  return response as T;
}

/**
 * PUT request
 */
export async function put<T>(
  endpoint: string,
  body?: unknown
): Promise<T> {
  const response = await fetchApi<T>(endpoint, {
    method: 'PUT',
    body: JSON.stringify(body),
  });
  return response.data;
}

/**
 * PATCH request
 */
export async function patch<T>(
  endpoint: string,
  body?: unknown
): Promise<T> {
  const response = await fetchApi<T>(endpoint, {
    method: 'PATCH',
    body: JSON.stringify(body),
  });
  return response.data;
}

/**
 * DELETE request
 */
export async function del<T>(endpoint: string): Promise<T> {
  const response = await fetchApi<T>(endpoint, { method: 'DELETE' });
  return response.data;
}
