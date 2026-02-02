'use client';

import React, { createContext, useContext, useReducer, useCallback, useEffect } from 'react';
import type { WorksheetSession, StepStatus } from '@/lib/types';
import { createEmptySession } from '@/lib/types';
import { worksheetReducer, type WorksheetAction } from './WorksheetReducer';
import { saveToLocalStorage, loadFromLocalStorage } from '@/lib/utils/storage';

interface WorksheetContextValue {
  session: WorksheetSession;
  dispatch: React.Dispatch<WorksheetAction>;
  // Helper functions
  setTitle: (title: string) => void;
  setCurrentStep: (step: number) => void;
  updateStepStatus: (stepId: number, status: StepStatus) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  updateStep1: (data: Partial<WorksheetSession['step1']>) => void;
  updateStep2: (data: Partial<WorksheetSession['step2']>) => void;
  updateStep3: (data: Partial<WorksheetSession['step3']>) => void;
  updateStep4: (data: Partial<WorksheetSession['step4']>) => void;
  updateStep5: (data: Partial<WorksheetSession['step5']>) => void;
  updateStep6: (data: Partial<WorksheetSession['step6']>) => void;
}

const WorksheetContext = createContext<WorksheetContextValue | null>(null);

interface WorksheetProviderProps {
  children: React.ReactNode;
  initialSession?: WorksheetSession;
}

export function WorksheetProvider({ children, initialSession }: WorksheetProviderProps) {
  const [session, dispatch] = useReducer(
    worksheetReducer,
    initialSession || createEmptySession()
  );

  // Load from localStorage on mount
  useEffect(() => {
    if (!initialSession) {
      const saved = loadFromLocalStorage();
      if (saved) {
        dispatch({ type: 'LOAD_SESSION', payload: saved });
      }
    }
  }, [initialSession]);

  // Save to localStorage whenever session changes
  useEffect(() => {
    if (session.id) {
      saveToLocalStorage(session);
    }
  }, [session]);

  // Helper functions
  const setTitle = useCallback((title: string) => {
    dispatch({ type: 'SET_TITLE', payload: title });
  }, []);

  const setCurrentStep = useCallback((step: number) => {
    dispatch({ type: 'SET_CURRENT_STEP', payload: step });
  }, []);

  const updateStepStatus = useCallback((stepId: number, status: StepStatus) => {
    dispatch({ type: 'UPDATE_STEP_STATUS', payload: { stepId, status } });
  }, []);

  const goToNextStep = useCallback(() => {
    if (session.currentStep < session.steps.length) {
      // Mark current step as complete
      dispatch({
        type: 'UPDATE_STEP_STATUS',
        payload: { stepId: session.currentStep, status: 'complete' },
      });
      // Move to next step
      dispatch({
        type: 'SET_CURRENT_STEP',
        payload: session.currentStep + 1,
      });
    }
  }, [session.currentStep, session.steps.length]);

  const goToPreviousStep = useCallback(() => {
    if (session.currentStep > 1) {
      dispatch({
        type: 'SET_CURRENT_STEP',
        payload: session.currentStep - 1,
      });
    }
  }, [session.currentStep]);

  const updateStep1 = useCallback((data: Partial<WorksheetSession['step1']>) => {
    dispatch({ type: 'UPDATE_STEP1', payload: data });
  }, []);

  const updateStep2 = useCallback((data: Partial<WorksheetSession['step2']>) => {
    dispatch({ type: 'UPDATE_STEP2', payload: data });
  }, []);

  const updateStep3 = useCallback((data: Partial<WorksheetSession['step3']>) => {
    dispatch({ type: 'UPDATE_STEP3', payload: data });
  }, []);

  const updateStep4 = useCallback((data: Partial<WorksheetSession['step4']>) => {
    dispatch({ type: 'UPDATE_STEP4', payload: data });
  }, []);

  const updateStep5 = useCallback((data: Partial<WorksheetSession['step5']>) => {
    dispatch({ type: 'UPDATE_STEP5', payload: data });
  }, []);

  const updateStep6 = useCallback((data: Partial<WorksheetSession['step6']>) => {
    dispatch({ type: 'UPDATE_STEP6', payload: data });
  }, []);

  const value: WorksheetContextValue = {
    session,
    dispatch,
    setTitle,
    setCurrentStep,
    updateStepStatus,
    goToNextStep,
    goToPreviousStep,
    updateStep1,
    updateStep2,
    updateStep3,
    updateStep4,
    updateStep5,
    updateStep6,
  };

  return (
    <WorksheetContext.Provider value={value}>
      {children}
    </WorksheetContext.Provider>
  );
}

/**
 * Hook to access worksheet context
 */
export function useWorksheet() {
  const context = useContext(WorksheetContext);
  if (!context) {
    throw new Error('useWorksheet must be used within WorksheetProvider');
  }
  return context;
}
