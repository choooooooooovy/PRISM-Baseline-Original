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
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>워크시트 정보</DialogTitle>
          <DialogDescription>
            CASVE 기반 의사결정 프로세스 안내
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <section>
            <h3 className="text-sm font-semibold text-gray-900 mb-2">개요</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              CASVE는 진로 및 의사결정 문제를 체계적으로 해결하기 위한 단계적 모델입니다.
              Communication, Analysis, Synthesis, Valuing 단계로 구성되며,
              각 단계는 명확한 목표와 과제를 가지고 있습니다.
            </p>
          </section>

          <section>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">단계 설명</h3>
            <div className="space-y-3">
              <div className="border-l-2 border-gray-200 pl-4">
                <h4 className="text-sm font-medium text-gray-900 mb-1">Step 0: Self-Profile Elicitation</h4>
                <p className="text-sm text-gray-600">
                  의사결정의 토대가 되는 가치, 흥미, 강점, 제약 조건을 기록합니다.
                </p>
              </div>

              <div className="border-l-2 border-gray-900 pl-4">
                <h4 className="text-sm font-medium text-gray-900 mb-1">Step 1: Communication</h4>
                <p className="text-sm text-gray-600">
                  의사결정이 필요한 문제를 정의하고, 내적·외적 단서를 파악합니다.
                </p>
              </div>

              <div className="border-l-2 border-gray-900 pl-4">
                <h4 className="text-sm font-medium text-gray-900 mb-1">Step 2: Analysis</h4>
                <p className="text-sm text-gray-600">
                  대안을 평가할 기준, 제약 조건, 정보 템플릿을 확정합니다.
                </p>
              </div>

              <div className="border-l-2 border-gray-900 pl-4">
                <h4 className="text-sm font-medium text-gray-900 mb-1">Step 3: Synthesis</h4>
                <p className="text-sm text-gray-600">
                  평가 프레임에 따라 대안을 확장한 후, Shortlist로 축소합니다.
                </p>
              </div>

              <div className="border-l-2 border-gray-900 pl-4">
                <h4 className="text-sm font-medium text-gray-900 mb-1">Step 4: Valuing</h4>
                <p className="text-sm text-gray-600">
                  Shortlist 대안들을 비교하고 트레이드오프를 명확히 한 뒤 선택을 확정합니다.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-sm font-semibold text-gray-900 mb-2">시스템 역할</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              시스템은 각 단계별로 질문을 제시하고 응답을 구조화합니다.
              최종 결정은 참여자가 직접 내립니다.
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
