'use client';

import React, { useState } from 'react';
import { FileText, ArrowRight, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { InfoModal } from './InfoModal';

interface LandingPageProps {
  onStartNew: () => void;
}

export function LandingPage({ onStartNew }: LandingPageProps) {
  const [showInfoModal, setShowInfoModal] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-8 py-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <FileText className="w-5 h-5 text-gray-900" strokeWidth={2} />
            <h1 className="text-base font-semibold text-gray-900">CASVE Worksheet</h1>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowInfoModal(true)}
            className="flex items-center gap-2"
          >
            <Info className="w-4 h-4" strokeWidth={2} />
            실험 안내
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-12 pt-20 pb-16">
        <div className="max-w-3xl">
          <h2 className="text-2xl font-semibold text-gray-900 mb-3 tracking-tight">
            진로 탐색 의사결정 워크시트
          </h2>
          <p className="text-base text-gray-600 leading-relaxed mb-8">
            본 워크시트는 진로·전공 선택 과정에서 떠오르는 생각과 기준을 단계별로 정리하도록 지원합니다.<br />
            시스템은 질문을 제시하고 응답을 구조화해 보여주는 역할만 하며, 해석과 최종 선택은 참여자가 직접 수행합니다.<br />
            작성된 내용은 이후 단계에서 비교·검토 자료로 활용됩니다.
          </p>
          <Button
            onClick={onStartNew}
            size="lg"
            className="inline-flex items-center gap-2"
          >
            워크시트 시작
            <ArrowRight className="w-4 h-4" strokeWidth={2} />
          </Button>
        </div>

        {/* Process Overview */}
        <div className="mt-20">
          <h3 className="text-sm font-medium text-gray-500 mb-5">워크시트 단계</h3>
          <div className="space-y-3">
            {[
              {
                step: '1',
                label: 'Communication',
                description: '의사결정 문제를 정의하고 내적·외적 단서를 파악합니다.'
              },
              {
                step: '2',
                label: 'Analysis',
                description: '자기 이해, 직업 정보, 메타인지 측면에서 의사결정 요소를 분석합니다.'
              },
              {
                step: '3',
                label: 'Synthesis',
                description: 'AI를 활용해 대안을 생성하고 정교화한 후 3~5개의 주요 대안으로 축소합니다.'
              },
              {
                step: '4',
                label: 'Valuing',
                description: '다양한 관점에서 각 대안의 비용과 이득을 평가하고 우선순위를 결정합니다.'
              },
              {
                step: '5',
                label: 'Execution',
                description: '선택한 대안을 실행하기 위한 구체적인 계획과 현실 검증을 수행합니다.'
              },
              {
                step: '6',
                label: 'Communication (Recycle)',
                description: '실행 과정에서의 변화를 평가하고 필요시 의사결정 과정을 성찰합니다.'
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="shrink-0 w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center mt-0.5">
                    <span className="text-xs font-medium text-gray-500">{item.step}</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-900 mb-1">{item.label}</h4>
                    <p className="text-xs text-gray-600 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Info Modal */}
      <InfoModal open={showInfoModal} onOpenChange={setShowInfoModal} />
    </div>
  );
}
