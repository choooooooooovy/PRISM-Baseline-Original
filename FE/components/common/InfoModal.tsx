'use client';

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface InfoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function InfoModal({ open, onOpenChange }: InfoModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>워크시트 정보</DialogTitle>
          <DialogDescription>
            CASVE 기반 의사결정 프로세스 안내
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <section>
            <h3 className="mb-2 text-sm font-semibold text-[var(--color-text-primary)]">개요</h3>
            <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]">
              CASVE는 진로 및 의사결정 문제를 체계적으로 해결하기 위한 5단계 모델입니다.
              Communication(의사소통), Analysis(분석), Synthesis(종합), Valuing(평가), Execution(실행), Communication(재순환) 단계로 구성되며,
              각 단계는 명확한 목표와 과제를 가지고 있습니다.
            </p>
          </section>

          <section>
            <h3 className="mb-3 text-sm font-semibold text-[var(--color-text-primary)]">단계 설명</h3>
            <div className="space-y-3">
              <div className="border-l-2 border-[var(--color-accent)] pl-4">
                <h4 className="mb-1 text-sm font-medium text-[var(--color-text-primary)]">Step 1: Communication (의사소통 - 초기)</h4>
                <p className="text-sm text-[var(--color-text-secondary)]">
                  의사결정이 필요한 상황을 인식하고, 외부/내부 단서를 기록합니다.
                </p>
              </div>

              <div className="border-l-2 border-[var(--color-accent)] pl-4">
                <h4 className="mb-1 text-sm font-medium text-[var(--color-text-primary)]">Step 2: Analysis (분석)</h4>
                <p className="text-sm text-[var(--color-text-secondary)]">
                  자기지식(가치/흥미/기술), 직업지식, 의사결정 스타일을 탐색합니다.
                </p>
              </div>

              <div className="border-l-2 border-[var(--color-accent)] pl-4">
                <h4 className="mb-1 text-sm font-medium text-[var(--color-text-primary)]">Step 3: Synthesis (종합)</h4>
                <p className="text-sm text-[var(--color-text-secondary)]">
                  고려 중인 진로 대안들을 직접 작성하고(정교화), 2~5개의 핵심 대안으로 좁힙니다(구체화).
                </p>
              </div>

              <div className="border-l-2 border-[var(--color-accent)] pl-4">
                <h4 className="mb-1 text-sm font-medium text-[var(--color-text-primary)]">Step 4: Valuing (평가)</h4>
                <p className="text-sm text-[var(--color-text-secondary)]">
                  선택된 대안들을 자신/타인/문화/사회 관점에서 평가하고 1, 2순위를 결정합니다.
                </p>
              </div>

              <div className="border-l-2 border-[var(--color-accent)] pl-4">
                <h4 className="mb-1 text-sm font-medium text-[var(--color-text-primary)]">Step 5: Execution (실행)</h4>
                <p className="text-sm text-[var(--color-text-secondary)]">
                  선택한 대안을 실행하기 위한 준비 프로그램, 현실 검증, 구직 활동을 계획합니다.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="mb-2 text-sm font-semibold text-[var(--color-text-primary)]">프로세스 진행</h3>
            <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]">
              각 단계의 모든 입력 항목을 작성(ChatGPT, 웹 검색 등 외부 지원 이용 가능)하며 진로 의사결정 과정을 진행합니다. <br />
              모든 내용은 자동으로 저장되며, 마지막 단계에서 종합 리포트를 확인할 수 있습니다.
            </p>
          </section>
        </div>

        <DialogFooter>
          <Button onClick={() => onOpenChange(false)} className="w-full">
            확인
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
