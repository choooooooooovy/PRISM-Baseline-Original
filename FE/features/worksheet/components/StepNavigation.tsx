'use client';

import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import type { StepStatus } from '@/lib/types';

interface StepState {
  id: number;
  label: string;
  status: StepStatus;
}

interface StepNavigationProps {
  steps: StepState[];
  currentStep: number;
  onStepClick: (stepId: number) => void;
}

export function StepNavigation({ steps, currentStep, onStepClick }: StepNavigationProps) {
  return (
    <div className="p-4 space-y-2">
      {steps.map((step) => {
        const isActive = step.id === currentStep;
        const isComplete = step.status === 'complete';

        return (
          <button
            key={step.id}
            onClick={() => onStepClick(step.id)}
            className={cn(
              'w-full flex items-start gap-3 p-3 rounded-lg text-left transition-all',
              isActive
                ? 'bg-gray-900 text-white'
                : 'bg-white hover:bg-gray-50 text-gray-900 border border-gray-200'
            )}
          >
            <div
              className={cn(
                'shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium',
                isActive
                  ? 'bg-white text-gray-900'
                  : isComplete
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-600 border-2 border-gray-300'
              )}
            >
              {isComplete ? <Check className="w-3.5 h-3.5" strokeWidth={2.5} /> : step.id}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-medium mb-0.5">Step {step.id}</div>
              <div className="text-xs opacity-90 leading-tight">{step.label}</div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
