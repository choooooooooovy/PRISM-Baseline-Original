'use client';

import { useRouter } from 'next/navigation';
import { LandingPage } from '@/components/common/LandingPage';
import { createEmptySession } from '@/lib/types';

export default function HomePage() {
  const router = useRouter();

  const handleStartNew = () => {
    // Create a new session with timestamp ID
    const newSession = createEmptySession(`session-${Date.now()}`);
    
    // TODO: When backend is ready, call createSession API
    // For now, navigate to worksheet which will use localStorage
    router.push('/worksheet');
  };

  return <LandingPage onStartNew={handleStartNew} />;
}
