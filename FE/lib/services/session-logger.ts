import type { WorksheetSession } from '@/lib/types';

/**
 * 세션 데이터를 서버에 저장합니다.
 * 로컬 JSON 파일로 저장됩니다.
 */
export async function saveSessionToServer(
  session: WorksheetSession
): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch('/api/save-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(session),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to save session');
    }

    console.log('✅ Session saved to server:', data.fileName);
    return { success: true };
  } catch (error) {
    console.error('❌ Failed to save session to server:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * localStorage에서 submitted 상태를 확인합니다.
 */
export function isSessionSubmitted(sessionId: string): boolean {
  if (typeof window === 'undefined') return false;

  const key = `session_submitted_${sessionId}`;
  return localStorage.getItem(key) === 'true';
}

/**
 * localStorage에 submitted 상태를 저장합니다.
 */
export function markSessionAsSubmitted(sessionId: string): void {
  if (typeof window === 'undefined') return;

  const key = `session_submitted_${sessionId}`;
  localStorage.setItem(key, 'true');
}
