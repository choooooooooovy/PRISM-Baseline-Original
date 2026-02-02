'use client';

import { WorksheetProvider } from '@/features/worksheet/context/WorksheetContext';
import { WorksheetShell } from '@/features/worksheet/components/WorksheetShell';

export default function WorksheetPage() {
  return (
    <WorksheetProvider>
      <WorksheetShell />
    </WorksheetProvider>
  );
}
