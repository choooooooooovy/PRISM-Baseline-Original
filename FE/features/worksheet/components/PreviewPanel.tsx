'use client';

import React from 'react';
import { Eye } from 'lucide-react';

interface PreviewPanelProps {
  title: string;
  content: React.ReactNode;
}

export function PreviewPanel({ title, content }: PreviewPanelProps) {
  return (
    <div className="h-full flex flex-col bg-white border-l border-gray-200">
      <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex-shrink-0">
        <div className="flex items-center gap-2">
          <Eye className="w-4 h-4 text-gray-500" strokeWidth={2} />
          <h3 className="text-xs font-semibold text-gray-900">{title}</h3>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        {content}
      </div>
    </div>
  );
}
