'use client';

import React, { useState } from 'react';
import { Plus, Trash2, Check } from 'lucide-react';
import { useWorksheet } from '../context/WorksheetContext';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import type { Option } from '@/lib/types';

export function Step3Synthesis() {
  const { session, updateStep3 } = useWorksheet();
  const [editingOption, setEditingOption] = useState<Partial<Option>>({
    title: '',
    description: '',
    profile: {
      핵심역할: '',
      필요역량: '',
      진입경로: '',
      성장가능성: '',
      위험요소: '',
    },
    matchReason: '',
  });

  const handleAddOption = () => {
    if (!editingOption.title?.trim()) {
      alert('대안 제목을 입력해주세요.');
      return;
    }

    const newOption: Option = {
      id: `option-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      title: editingOption.title.trim(),
      description: editingOption.description?.trim() || '',
      profile: editingOption.profile || {},
      matchReason: editingOption.matchReason?.trim() || '',
    };

    updateStep3({
      generatedOptions: [...session.step3.generatedOptions, newOption],
    });

    // 폼 초기화
    setEditingOption({
      title: '',
      description: '',
      profile: {
        핵심역할: '',
        필요역량: '',
        진입경로: '',
        성장가능성: '',
        위험요소: '',
      },
      matchReason: '',
    });
  };

  const handleDeleteOption = (optionId: string) => {
    updateStep3({
      generatedOptions: session.step3.generatedOptions.filter(opt => opt.id !== optionId),
      selectedOptionIds: session.step3.selectedOptionIds.filter(id => id !== optionId),
    });
  };

  const toggleOptionSelection = (optionId: string) => {
    const currentSelected = session.step3.selectedOptionIds;
    const isSelected = currentSelected.includes(optionId);

    if (isSelected) {
      updateStep3({
        selectedOptionIds: currentSelected.filter(id => id !== optionId),
      });
    } else {
      updateStep3({
        selectedOptionIds: [...currentSelected, optionId],
      });
    }
  };

  const selectedCount = session.step3.selectedOptionIds.length;

  const updateProfileField = (field: string, value: string) => {
    setEditingOption(prev => ({
      ...prev,
      profile: {
        ...prev.profile,
        [field]: value,
      },
    }));
  };

  return (
    <div className="mx-auto max-w-4xl px-12 py-8 text-[var(--color-text-primary)]">
      <div className="mb-6">
        <h2 className="mb-1.5 text-lg font-semibold text-[var(--color-text-primary)]">
          Step 3: Synthesis (종합)
        </h2>
        <p className="text-sm text-[var(--color-text-secondary)]">
          가능한 진로 선택지 목록을 확장(Elaboration)한 다음, 앞선 두 단계에서 수집한 모든 정보를 활용하여 이 목록을 2~5개의 대안으로 좁히는(Crystallization) 단계입니다.
        </p>
      </div>

      <div className="space-y-6">
        {/* 정교화 (Elaboration) - 대안 작성 */}
        <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-card)] p-5">
          <h3 className="mb-2 text-base font-semibold text-[var(--color-text-primary)]">정교화 (Elaboration)</h3>
          <p className="mb-4 text-sm text-[var(--color-text-secondary)]">
            고려 중인 진로 대안들을 직접 작성해주세요. (5-8개 권장)
          </p>

          {/* 대안 작성 폼 */}
          <div className="mb-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-surface)] p-4">
            <h4 className="mb-3 text-sm font-semibold text-[var(--color-text-primary)]">새 대안 추가</h4>

            <div className="space-y-3">
              <div>
                <label className="mb-1 block text-xs font-medium text-[var(--color-text-secondary)]">
                  대안 제목 *
                </label>
                <Input
                  value={editingOption.title || ''}
                  onChange={(e) => setEditingOption(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="예: 데이터 사이언티스트"
                  className="w-full"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-[var(--color-text-secondary)]">
                  설명
                </label>
                <Textarea
                  value={editingOption.description || ''}
                  onChange={(e) => setEditingOption(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="이 진로 대안에 대한 간단한 설명을 입력하세요."
                  className="h-20 w-full text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-xs font-medium text-[var(--color-text-secondary)]">
                    핵심역할
                  </label>
                  <Input
                    value={editingOption.profile?.['핵심역할'] || ''}
                    onChange={(e) => updateProfileField('핵심역할', e.target.value)}
                    placeholder="예: 데이터 분석 및 예측 모델 개발"
                    className="w-full text-sm"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-medium text-[var(--color-text-secondary)]">
                    필요역량
                  </label>
                  <Input
                    value={editingOption.profile?.['필요역량'] || ''}
                    onChange={(e) => updateProfileField('필요역량', e.target.value)}
                    placeholder="예: Python, 통계학, 머신러닝"
                    className="w-full text-sm"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-medium text-[var(--color-text-secondary)]">
                    진입경로
                  </label>
                  <Input
                    value={editingOption.profile?.['진입경로'] || ''}
                    onChange={(e) => updateProfileField('진입경로', e.target.value)}
                    placeholder="예: 학사 이상, 관련 자격증"
                    className="w-full text-sm"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-medium text-[var(--color-text-secondary)]">
                    성장가능성
                  </label>
                  <Input
                    value={editingOption.profile?.['성장가능성'] || ''}
                    onChange={(e) => updateProfileField('성장가능성', e.target.value)}
                    placeholder="예: 높음"
                    className="w-full text-sm"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-medium text-[var(--color-text-secondary)]">
                    위험요소
                  </label>
                  <Input
                    value={editingOption.profile?.['위험요소'] || ''}
                    onChange={(e) => updateProfileField('위험요소', e.target.value)}
                    placeholder="예: 높은 경쟁률, 지속적인 학습 필요"
                    className="w-full text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-[var(--color-text-secondary)]">
                  선택 이유
                </label>
                <Textarea
                  value={editingOption.matchReason || ''}
                  onChange={(e) => setEditingOption(prev => ({ ...prev, matchReason: e.target.value }))}
                  placeholder="이 대안이 나에게 적합한 이유를 작성하세요."
                  className="h-20 w-full text-sm"
                />
              </div>

              <Button
                onClick={handleAddOption}
                className="w-full"
              >
                <Plus className="mr-2 h-4 w-4" />
                대안 추가
              </Button>
            </div>
          </div>

          {/* 작성된 대안 목록 */}
          {session.step3.generatedOptions.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-[var(--color-text-primary)]">
                작성된 대안 ({session.step3.generatedOptions.length}개)
              </h4>
              {session.step3.generatedOptions.map((option) => (
                <div
                  key={option.id}
                  className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-5 transition-all hover:bg-[var(--color-hover)]"
                >
                  <div className="mb-2 flex items-start justify-between">
                    <h4 className="text-base font-semibold text-[var(--color-text-primary)]">{option.title}</h4>
                    <button
                      onClick={() => handleDeleteOption(option.id)}
                      className="text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-costs)]"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>

                  <p className="mb-4 text-sm text-[var(--color-text-secondary)]">{option.description}</p>

                  <div className="mb-3 flex flex-wrap gap-2">
                    {Object.entries(option.profile).slice(0, 3).map(([key, value]) => (
                      value && (
                        <span
                          key={key}
                          className="inline-block rounded-full bg-[var(--color-hover-strong)] px-3 py-1 text-xs text-[var(--color-text-secondary)]"
                        >
                          {value}
                        </span>
                      )
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 구체화 (Crystallization) - 대안 선택 */}
        {session.step3.generatedOptions.length > 0 && (
          <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-card)] p-5">
            <h3 className="mb-4 text-base font-semibold text-[var(--color-text-primary)]">구체화 (Crystallization)</h3>

            <p className="mb-4 text-sm text-[var(--color-text-secondary)]">
              위에서 작성한 대안 중 2~5개를 선택하여 다음 단계에서 심층 평가할 대안으로 좁히세요.
            </p>

            <div className="space-y-3">
              {session.step3.generatedOptions.map((option) => {
                const isSelected = session.step3.selectedOptionIds.includes(option.id);

                return (
                  <div
                    key={option.id}
                    className={`cursor-pointer rounded-lg border p-4 transition-all ${isSelected
                      ? 'border-[var(--color-accent)] bg-[var(--color-accent-soft)] shadow-sm'
                      : 'border-[var(--color-border)] bg-[var(--color-bg-card)] hover:bg-[var(--color-hover)]'
                      }`}
                    onClick={() => toggleOptionSelection(option.id)}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 ${isSelected
                          ? 'border-[var(--color-accent)] bg-[var(--color-accent)]'
                          : 'border-[var(--color-border)] bg-[var(--color-bg-surface)]'
                          }`}
                      >
                        {isSelected && <Check className="h-3 w-3 text-[var(--primary-foreground)]" strokeWidth={3} />}
                      </div>

                      <div className="flex-1">
                        <h4 className="mb-1 text-sm font-semibold text-[var(--color-text-primary)]">
                          {option.title}
                        </h4>
                        <p className="mb-2 text-xs text-[var(--color-text-secondary)]">{option.description}</p>

                        {/* Profile fields */}
                        <div className="mt-3 grid grid-cols-2 gap-2">
                          {Object.entries(option.profile).map(([key, value]) => (
                            value && (
                              <div key={key} className="text-xs">
                                <span className="font-medium text-[var(--color-text-primary)]">{key}:</span>{' '}
                                <span className="text-[var(--color-text-secondary)]">{value}</span>
                              </div>
                            )
                          ))}
                        </div>

                        {option.matchReason && (
                          <p className="mt-3 text-xs text-[var(--color-accent)]">
                            선택 이유: {option.matchReason}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 rounded-md border border-[var(--color-border)] bg-[var(--color-bg-surface)] p-3">
              <div className="text-sm">
                {selectedCount === 0 && (
                  <span className="text-[var(--color-text-secondary)]">💡 2~5개의 대안을 선택하세요.</span>
                )}
                {selectedCount === 1 && (
                  <span className="text-[var(--color-costs)]">⚠️ {selectedCount}개 선택됨. 최소 2개를 선택해주세요.</span>
                )}
                {selectedCount >= 2 && selectedCount <= 5 && (
                  <span className="text-[var(--color-benefits)]">✅ {selectedCount}개 선택됨</span>
                )}
                {selectedCount > 5 && (
                  <span className="text-[var(--color-costs)]">⚠️ {selectedCount}개 선택됨. 5개 이하로 줄여주세요.</span>
                )}
              </div>
            </div>

            {/* 선택된 대안 요약 */}
            {selectedCount > 0 && (
              <div className="mt-4 rounded-lg border border-[var(--color-accent)] bg-[var(--color-accent-soft)] p-4">
                <h4 className="mb-2 text-sm font-semibold text-[var(--color-text-primary)]">
                  선택된 대안 ({selectedCount}개)
                </h4>
                <ul className="space-y-1">
                  {session.step3.generatedOptions
                    .filter(opt => session.step3.selectedOptionIds.includes(opt.id))
                    .map((opt, idx) => (
                      <li key={opt.id} className="text-xs text-[var(--color-text-secondary)]">
                        {idx + 1}. {opt.title}
                      </li>
                    ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
