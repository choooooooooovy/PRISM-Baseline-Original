'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useWorksheet } from '../context/WorksheetContext';
import { StepNavigation } from './StepNavigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// Step components
import { Step1Communication } from '../steps/Step1Communication';
import { Step2Analysis } from '../steps/Step2Analysis';
import { Step3Synthesis } from '../steps/Step3Synthesis';
import { Step4Valuing } from '../steps/Step4Valuing';
import { Step5Execution } from '../steps/Step5Execution';
import { ReportView } from '../steps/ReportView';

export function WorksheetShell() {
  const router = useRouter();
  const { session, setTitle, setCurrentStep, goToNextStep, goToPreviousStep } = useWorksheet();
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [titleInput, setTitleInput] = useState(session.title);
  const [showReport, setShowReport] = useState(false);

  const handleTitleSave = () => {
    if (titleInput.trim()) {
      setTitle(titleInput.trim());
    }
    setIsEditingTitle(false);
  };

  const handleBackToLanding = () => {
    router.push('/');
  };

  const handleNextStep = () => {
    // If on Step 5, show report instead of going to next step
    if (session.currentStep === 5) {
      setShowReport(true);
    } else {
      goToNextStep();
    }
  };

  const handleBackToWorksheet = () => {
    setShowReport(false);
  };

  // Render current step component
  const renderCurrentStep = () => {
    if (showReport) {
      return <ReportView />;
    }

    switch (session.currentStep) {
      case 1:
        return <Step1Communication />;
      case 2:
        return <Step2Analysis />;
      case 3:
        return <Step3Synthesis />;
      case 4:
        return <Step4Valuing />;
      case 5:
        return <Step5Execution />;
      default:
        return null;
    }
  };

  const canGoNext = () => {
    if (session.currentStep === 3) {
      return session.step3.selectedOptionIds.length >= 2 && session.step3.selectedOptionIds.length <= 5;
    }
    return session.currentStep < session.steps.length;
  };

  const canGoPrevious = session.currentStep > 1;

  return (
    <div className="h-screen flex flex-col bg-white">
      {/* Top Bar */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={handleBackToLanding}
            className="p-1.5 hover:bg-gray-100 rounded-md transition-colors"
            title="홈으로"
          >
            <ArrowLeft className="w-4 h-4 text-gray-600" strokeWidth={2} />
          </button>
          <div className="h-4 w-px bg-gray-200" />
          {isEditingTitle ? (
            <Input
              type="text"
              value={titleInput}
              onChange={(e) => setTitleInput(e.target.value)}
              onBlur={handleTitleSave}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleTitleSave();
                if (e.key === 'Escape') {
                  setTitleInput(session.title);
                  setIsEditingTitle(false);
                }
              }}
              className="h-8 text-sm font-medium border-gray-900"
              autoFocus
            />
          ) : (
            <h1
              onClick={() => setIsEditingTitle(true)}
              className="text-sm font-medium text-gray-900 cursor-pointer hover:text-gray-600 transition-colors"
            >
              {session.title}
            </h1>
          )}
        </div>
      </header>

      {/* Main Content - 2 Column Layout */}
      <div className="flex-1 flex overflow-hidden min-h-0">
        {/* Left Sidebar - Step Navigation */}
        <div className="w-56 bg-gray-50 border-r border-gray-200 overflow-y-auto shrink-0">
          <StepNavigation
            steps={session.steps}
            currentStep={session.currentStep}
            onStepClick={setCurrentStep}
          />
        </div>

        {/* Center - Current Step Content */}
        <div className="flex-1 overflow-y-auto">
          {renderCurrentStep()}
        </div>
      </div>

      {/* Bottom Bar */}
      <footer className="bg-white border-t border-gray-200 px-6 py-3.5 flex items-center justify-between shrink-0">
        {showReport ? (
          <>
            <Button
              variant="outline"
              onClick={handleBackToWorksheet}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" strokeWidth={2} />
              워크시트로 돌아가기
            </Button>
            <div className="text-xs text-gray-500">
              리포트 보기
            </div>
            <div className="w-30" /> {/* Spacer for alignment */}
          </>
        ) : (
          <>
            <Button
              variant="outline"
              onClick={goToPreviousStep}
              disabled={!canGoPrevious}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" strokeWidth={2} />
              이전
            </Button>

            <div className="text-xs text-gray-500">
              Step {session.currentStep} / {session.steps.length}
            </div>

            <Button
              onClick={handleNextStep}
              disabled={!canGoNext()}
              className="flex items-center gap-2"
            >
              {session.currentStep === 5 ? '리포트 보기' : '다음'}
              <ArrowRight className="w-4 h-4" strokeWidth={2} />
            </Button>
          </>
        )}
      </footer>
    </div>
  );
}
