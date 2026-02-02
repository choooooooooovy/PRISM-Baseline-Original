import { get, post, patch, del } from './client';
import type {
  WorksheetSession,
  SessionListItem,
  CreateSessionRequest,
  UpdateSessionRequest,
} from '../types';

/**
 * Get all sessions
 */
export async function getSessions(): Promise<SessionListItem[]> {
  return get<SessionListItem[]>('/sessions');
}

/**
 * Get a single session by ID
 */
export async function getSession(id: string): Promise<WorksheetSession> {
  return get<WorksheetSession>(`/sessions/${id}`);
}

/**
 * Create a new session
 */
export async function createSession(
  data: CreateSessionRequest = {}
): Promise<WorksheetSession> {
  return post<WorksheetSession>('/sessions', data);
}

/**
 * Update a session
 */
export async function updateSession(
  id: string,
  data: UpdateSessionRequest
): Promise<WorksheetSession> {
  return patch<WorksheetSession>(`/sessions/${id}`, data);
}

/**
 * Delete a session
 */
export async function deleteSession(id: string): Promise<void> {
  return del<void>(`/sessions/${id}`);
}

/**
 * Update full worksheet session data
 */
export async function updateWorksheetData(
  id: string,
  session: Partial<WorksheetSession>
): Promise<WorksheetSession> {
  return patch<WorksheetSession>(`/sessions/${id}`, session);
}
