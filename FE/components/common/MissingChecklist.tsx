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
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-semibold text-gray-900">입력 항목</h3>
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${allCompleted
              ? 'bg-green-50 text-green-700'
              : 'bg-gray-100 text-gray-900'
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
                <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" strokeWidth={2} />
              ) : (
                <Circle className="w-4 h-4 text-gray-300 flex-shrink-0 mt-0.5" strokeWidth={2} />
              )}
              <span className={`text-xs leading-relaxed ${item.completed ? 'text-gray-900' : 'text-gray-500'
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