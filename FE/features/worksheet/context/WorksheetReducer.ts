import type { WorksheetSession, StepStatus } from '@/lib/types';
import { createEmptySession } from '@/lib/types';

// Action Types
export type WorksheetAction =
  | { type: 'LOAD_SESSION'; payload: WorksheetSession }
  | { type: 'SET_TITLE'; payload: string }
  | { type: 'SET_CURRENT_STEP'; payload: number }
  | { type: 'UPDATE_STEP_STATUS'; payload: { stepId: number; status: StepStatus } }
  | { type: 'UPDATE_STEP1'; payload: Partial<WorksheetSession['step1']> }
  | { type: 'UPDATE_STEP2'; payload: Partial<WorksheetSession['step2']> }
  | { type: 'UPDATE_STEP3'; payload: Partial<WorksheetSession['step3']> }
  | { type: 'UPDATE_STEP4'; payload: Partial<WorksheetSession['step4']> }
  | { type: 'UPDATE_STEP5'; payload: Partial<WorksheetSession['step5']> }
  | { type: 'UPDATE_STEP6'; payload: Partial<WorksheetSession['step6']> }
  | { type: 'RESET_SESSION' };

/**
 * Worksheet Reducer
 */
export function worksheetReducer(
  state: WorksheetSession,
  action: WorksheetAction
): WorksheetSession {
  switch (action.type) {
    case 'LOAD_SESSION':
      return {
        ...action.payload,
        updatedAt: new Date().toISOString(),
      };

    case 'SET_TITLE':
      return {
        ...state,
        title: action.payload,
        updatedAt: new Date().toISOString(),
      };

    case 'SET_CURRENT_STEP':
      return {
        ...state,
        currentStep: action.payload,
        updatedAt: new Date().toISOString(),
      };

    case 'UPDATE_STEP_STATUS':
      return {
        ...state,
        steps: state.steps.map((step) =>
          step.id === action.payload.stepId
            ? { ...step, status: action.payload.status }
            : step
        ),
        updatedAt: new Date().toISOString(),
      };

    case 'UPDATE_STEP1':
      return {
        ...state,
        step1: { ...state.step1, ...action.payload },
        updatedAt: new Date().toISOString(),
      };

    case 'UPDATE_STEP2':
      return {
        ...state,
        step2: { ...state.step2, ...action.payload },
        updatedAt: new Date().toISOString(),
      };

    case 'UPDATE_STEP3':
      return {
        ...state,
        step3: { ...state.step3, ...action.payload },
        updatedAt: new Date().toISOString(),
      };

    case 'UPDATE_STEP4':
      return {
        ...state,
        step4: { ...state.step4, ...action.payload },
        updatedAt: new Date().toISOString(),
      };

    case 'UPDATE_STEP5':
      return {
        ...state,
        step5: { ...state.step5, ...action.payload },
        updatedAt: new Date().toISOString(),
      };

    case 'UPDATE_STEP6':
      return {
        ...state,
        step6: { ...state.step6, ...action.payload },
        updatedAt: new Date().toISOString(),
      };

    case 'RESET_SESSION':
      return createEmptySession();

    default:
      return state;
  }
}
