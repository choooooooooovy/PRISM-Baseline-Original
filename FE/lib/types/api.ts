// API Response wrapper
export interface ApiResponse<T = unknown> {
  data: T;
  error?: string;
  message?: string;
}

// Session list item
export interface SessionListItem {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  currentStep: number;
}

// API Request types
export interface CreateSessionRequest {
  title?: string;
}

export interface UpdateSessionRequest {
  title?: string;
  currentStep?: number;
  stepData?: Record<string, unknown>;
}

// API Error
export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public details?: unknown
  ) {
    super(message);
    this.name = 'ApiError';
  }
}
