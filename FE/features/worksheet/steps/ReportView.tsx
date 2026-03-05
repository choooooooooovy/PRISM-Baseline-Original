'use client';

import React, { useEffect } from 'react';
import { FileText, CheckCircle2 } from 'lucide-react';
import { useWorksheet } from '../context/WorksheetContext';
import {
  saveSessionToServer,
  isSessionSubmitted,
  markSessionAsSubmitted,
} from '@/lib/services/session-logger';

export function ReportView() {
  const { session } = useWorksheet();

  // 리포트 보기 시 서버로 세션 데이터 전송
  useEffect(() => {
    const submitSession = async () => {
      // 이미 전송된 세션이면 스킵
      if (isSessionSubmitted(session.id)) {
        console.log('✓ Session already submitted, skipping');
        return;
      }

      // 서버로 전송
      const result = await saveSessionToServer(session);

      if (result.success) {
        // 전송 성공 시 localStorage에 기록
        markSessionAsSubmitted(session.id);
        console.log('✓ Session successfully submitted to server');
      } else {
        console.warn('⚠ Failed to submit session, will retry next time');
      }
    };

    submitSession();
  }, [session]);

  // Get selected options from Step 3
  const selectedOptions = session.step3.generatedOptions.filter(opt =>
    session.step3.selectedOptionIds.includes(opt.id)
  );

  // Get primary and secondary choices
  const primaryChoice = selectedOptions.find(opt => opt.id === session.step4.primaryChoice);
  const secondaryChoice = selectedOptions.find(opt => opt.id === session.step4.secondaryChoice);

  // Format date
  const completedDate = new Date(session.updatedAt).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="flex h-full bg-[var(--color-bg-primary)] text-[var(--color-text-primary)]">
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-4xl px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-[var(--color-accent)]" strokeWidth={2} />
                <h1 className="text-xl font-semibold text-[var(--color-text-primary)]">CASVE 의사결정 워크시트 리포트</h1>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm text-[var(--color-text-secondary)]">
              <span>{session.title}</span>
              <span>•</span>
              <span>{completedDate}</span>
            </div>
          </div>

          {/* Final Decision (Highlighted) */}
          {primaryChoice && (
            <div className="mb-8 rounded-lg border border-[var(--color-accent)] bg-[var(--color-accent-soft)] p-6">
              <h2 className="mb-3 flex items-center gap-2 text-sm font-medium text-[var(--color-text-primary)]">
                <CheckCircle2 className="h-4 w-4 text-[var(--color-accent)]" strokeWidth={2} />
                최종 결정
              </h2>
              <div className="mb-3">
                <p className="mb-1 text-xs text-[var(--color-text-secondary)]">1순위</p>
                <p className="text-base font-medium text-[var(--color-text-primary)]">{primaryChoice.title}</p>
              </div>
              {secondaryChoice && (
                <div className="border-t border-[var(--color-border)] pt-3">
                  <p className="mb-1 text-xs text-[var(--color-text-secondary)]">2순위</p>
                  <p className="text-sm text-[var(--color-text-primary)]">{secondaryChoice.title}</p>
                </div>
              )}
            </div>
          )}

          {/* Step 1: Communication */}
          <section className="mb-8 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-card)] p-6">
            <h2 className="mb-4 text-base font-semibold text-[var(--color-text-primary)]">Step 1: Communication (의사소통)</h2>

            <div className="space-y-5">
              <div>
                <h3 className="mb-2 text-sm font-medium text-[var(--color-text-primary)]">외적 단서</h3>
                <div className="space-y-3 pl-3">
                  {session.step1.externalCues.events && (
                    <div>
                      <p className="mb-1 text-xs font-medium text-[var(--color-text-primary)]">사건:</p>
                      <p className="text-sm text-[var(--color-text-secondary)]">{session.step1.externalCues.events}</p>
                    </div>
                  )}
                  {session.step1.externalCues.significantOther && (
                    <div>
                      <p className="mb-1 text-xs font-medium text-[var(--color-text-primary)]">주요 타인:</p>
                      <p className="text-sm text-[var(--color-text-secondary)]">{session.step1.externalCues.significantOther}</p>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h3 className="mb-2 text-sm font-medium text-[var(--color-text-primary)]">내적 단서</h3>
                <div className="space-y-3 pl-3">
                  {session.step1.internalCues.emotions && (
                    <div>
                      <p className="mb-1 text-xs font-medium text-[var(--color-text-primary)]">정서:</p>
                      <p className="text-sm text-[var(--color-text-secondary)]">{session.step1.internalCues.emotions}</p>
                    </div>
                  )}
                  {session.step1.internalCues.avoidanceBehaviour && (
                    <div>
                      <p className="mb-1 text-xs font-medium text-[var(--color-text-primary)]">회피 행동:</p>
                      <p className="text-sm text-[var(--color-text-secondary)]">{session.step1.internalCues.avoidanceBehaviour}</p>
                    </div>
                  )}
                  {session.step1.internalCues.physicallyFeeling && (
                    <div>
                      <p className="mb-1 text-xs font-medium text-[var(--color-text-primary)]">신체적 느낌:</p>
                      <p className="text-sm text-[var(--color-text-secondary)]">{session.step1.internalCues.physicallyFeeling}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Step 2: Analysis */}
          <section className="mb-8 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-card)] p-6">
            <h2 className="mb-4 text-base font-semibold text-[var(--color-text-primary)]">Step 2: Analysis (분석)</h2>

            <div className="space-y-5">
              <div>
                <h3 className="mb-2 text-sm font-medium text-[var(--color-text-primary)]">자기 지식</h3>
                <div className="grid grid-cols-2 gap-4 pl-3">
                  {session.step2.selfKnowledge.values && (
                    <div>
                      <p className="mb-1 text-xs font-medium text-[var(--color-text-primary)]">가치:</p>
                      <p className="text-sm text-[var(--color-text-secondary)]">{session.step2.selfKnowledge.values}</p>
                    </div>
                  )}
                  {session.step2.selfKnowledge.interests && (
                    <div>
                      <p className="mb-1 text-xs font-medium text-[var(--color-text-primary)]">흥미:</p>
                      <p className="text-sm text-[var(--color-text-secondary)]">{session.step2.selfKnowledge.interests}</p>
                    </div>
                  )}
                  {session.step2.selfKnowledge.skills && (
                    <div>
                      <p className="mb-1 text-xs font-medium text-[var(--color-text-primary)]">기술:</p>
                      <p className="text-sm text-[var(--color-text-secondary)]">{session.step2.selfKnowledge.skills}</p>
                    </div>
                  )}
                  {session.step2.selfKnowledge.occupationalInterests && (
                    <div>
                      <p className="mb-1 text-xs font-medium text-[var(--color-text-primary)]">직업적 흥미:</p>
                      <p className="text-sm text-[var(--color-text-secondary)]">{session.step2.selfKnowledge.occupationalInterests}</p>
                    </div>
                  )}
                </div>
              </div>

              {session.step2.occupationalKnowledge && (
                <div>
                  <h3 className="mb-2 text-sm font-medium text-[var(--color-text-primary)]">직업 지식</h3>
                  <p className="pl-3 text-sm text-[var(--color-text-secondary)]">{session.step2.occupationalKnowledge}</p>
                </div>
              )}

              {session.step2.decisionMakingStyle && (
                <div>
                  <h3 className="mb-2 text-sm font-medium text-[var(--color-text-primary)]">의사결정 스타일</h3>
                  <p className="pl-3 text-sm text-[var(--color-text-secondary)]">{session.step2.decisionMakingStyle}</p>
                </div>
              )}
            </div>
          </section>

          {/* Step 3: Synthesis */}
          <section className="mb-8 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-card)] p-6">
            <h2 className="mb-4 text-base font-semibold text-[var(--color-text-primary)]">Step 3: Synthesis (종합)</h2>

            <div className="space-y-5">
              {session.step3.elaboration && (
                <div>
                  <h3 className="mb-2 text-sm font-medium text-[var(--color-text-primary)]">정교화</h3>
                  <p className="pl-3 text-sm text-[var(--color-text-secondary)]">{session.step3.elaboration}</p>
                </div>
              )}

              {selectedOptions.length > 0 && (
                <div>
                  <h3 className="mb-3 text-sm font-medium text-[var(--color-text-primary)]">선택된 대안 ({selectedOptions.length}개)</h3>
                  <div className="space-y-3">
                    {selectedOptions.map((option, idx) => (
                      <div key={option.id} className="rounded-lg bg-[var(--color-bg-surface)] p-4">
                        <p className="mb-2 text-sm font-medium text-[var(--color-text-primary)]">{idx + 1}. {option.title}</p>
                        <p className="text-xs text-[var(--color-text-secondary)]">{option.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {session.step3.crystallization && (
                <div>
                  <h3 className="mb-2 text-sm font-medium text-[var(--color-text-primary)]">구체화</h3>
                  <p className="pl-3 text-sm text-[var(--color-text-secondary)]">{session.step3.crystallization}</p>
                </div>
              )}
            </div>
          </section>

          {/* Step 4: Valuing */}
          <section className="mb-8 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-card)] p-6">
            <h2 className="mb-4 text-base font-semibold text-[var(--color-text-primary)]">Step 4: Valuing (평가)</h2>

            {session.step4.optionValuations.length > 0 && (
              <div className="space-y-4">
                {session.step4.optionValuations.map((valuation) => (
                  <div key={valuation.optionId} className="rounded-lg border border-[var(--color-border)] p-4">
                    <h3 className="mb-3 text-sm font-medium text-[var(--color-text-primary)]">{valuation.optionTitle}</h3>
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      {valuation.oneself.benefits && (
                        <div>
                          <p className="mb-1 font-medium text-[var(--color-benefits)]">자신 - 혜택:</p>
                          <p className="text-[var(--color-text-secondary)]">{valuation.oneself.benefits}</p>
                        </div>
                      )}
                      {valuation.oneself.costs && (
                        <div>
                          <p className="mb-1 font-medium text-[var(--color-costs)]">자신 - 비용:</p>
                          <p className="text-[var(--color-text-secondary)]">{valuation.oneself.costs}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Step 5: Execution */}
          <section className="mb-8 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-card)] p-6">
            <h2 className="mb-4 text-base font-semibold text-[var(--color-text-primary)]">Step 5: Execution (실행)</h2>

            <div className="space-y-4">
              {session.step5.preparationProgram && (
                <div>
                  <h3 className="mb-2 text-sm font-medium text-[var(--color-text-primary)]">준비 프로그램</h3>
                  <p className="pl-3 text-sm text-[var(--color-text-secondary)]">{session.step5.preparationProgram}</p>
                </div>
              )}

              {session.step5.employmentSeeking && (
                <div>
                  <h3 className="mb-2 text-sm font-medium text-[var(--color-text-primary)]">구직 활동</h3>
                  <p className="pl-3 text-sm text-[var(--color-text-secondary)]">{session.step5.employmentSeeking}</p>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
