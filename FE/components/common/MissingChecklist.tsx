'use client';

import React from 'react';
import { CheckCircle2, Circle } from 'lucide-react';

interface MissingItem {
  label: string;
  completed: boolean;
}

interface MissingChecklistProps {
  items: MissingItem[];
}

export function MissingChecklist({ items }: MissingChecklistProps) {
  const completedCount = items.filter(item => item.completed).length;
  const totalCount = items.length;
  const allCompleted = completedCount === totalCount;

  return (
    <div className="overflow-hidden rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-card)]">
      <div className="border-b border-[var(--color-border)] bg-[var(--color-bg-surface)] px-4 py-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-semibold text-[var(--color-text-primary)]">입력 항목</h3>
          <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${allCompleted
              ? 'bg-[var(--color-hover)] text-[var(--color-benefits)]'
              : 'bg-[var(--color-hover-strong)] text-[var(--color-text-primary)]'
            }`}>
            {completedCount}/{totalCount}
          </span>
        </div>
      </div>

      <div className="p-4">
        <div className="space-y-2">
          {items.map((item, index) => (
            <div key={index} className="flex items-start gap-2">
              {item.completed ? (
                <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-[var(--color-benefits)]" strokeWidth={2} />
              ) : (
                <Circle className="mt-0.5 h-4 w-4 flex-shrink-0 text-[var(--color-text-secondary)]" strokeWidth={2} />
              )}
              <span className={`text-xs leading-relaxed ${item.completed ? 'text-[var(--color-text-primary)]' : 'text-[var(--color-text-secondary)]'
                }`}>
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
