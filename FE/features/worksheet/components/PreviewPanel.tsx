'use client';

import React from 'react';
import { Eye } from 'lucide-react';

interface PreviewPanelProps {
  title: string;
  content: React.ReactNode;
}

export function PreviewPanel({ title, content }: PreviewPanelProps) {
  return (
    <div className="flex h-full flex-col border-l border-[var(--color-border)] bg-[var(--color-bg-card)]">
      <div className="flex-shrink-0 border-b border-[var(--color-border)] bg-[var(--color-bg-surface)] px-4 py-3">
        <div className="flex items-center gap-2">
          <Eye className="h-4 w-4 text-[var(--color-text-secondary)]" strokeWidth={2} />
          <h3 className="text-xs font-semibold text-[var(--color-text-primary)]">{title}</h3>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        {content}
      </div>
    </div>
  );
}
