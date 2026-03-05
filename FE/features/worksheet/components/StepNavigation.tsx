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
    <div className="space-y-2 p-4">
      {steps.map((step) => {
        const isActive = step.id === currentStep;
        const isComplete = step.status === 'complete';

        return (
          <button
            key={step.id}
            onClick={() => onStepClick(step.id)}
            className={cn(
              'w-full rounded-lg border p-3 text-left transition-all',
              'flex items-start gap-3',
              isActive
                ? 'border-[var(--color-accent)] bg-[var(--color-accent-soft)] text-[var(--color-text-primary)]'
                : 'border-[var(--color-border)] bg-[var(--color-bg-card)] text-[var(--color-text-primary)] hover:bg-[var(--color-hover)]'
            )}
          >
            <div
              className={cn(
                'flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-medium',
                isActive
                  ? 'border border-[var(--color-accent)] bg-[var(--color-accent)] text-[var(--primary-foreground)]'
                  : isComplete
                    ? 'bg-[var(--color-benefits)] text-[var(--primary-foreground)]'
                    : 'border-2 border-[var(--color-border)] bg-[var(--color-bg-surface)] text-[var(--color-text-secondary)]'
              )}
            >
              {isComplete ? <Check className="h-3.5 w-3.5" strokeWidth={2.5} /> : step.id}
            </div>
            <div className="min-w-0 flex-1">
              <div className="mb-0.5 text-xs font-medium">Step {step.id}</div>
              <div className="text-xs leading-tight text-[var(--color-text-secondary)]">{step.label}</div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
