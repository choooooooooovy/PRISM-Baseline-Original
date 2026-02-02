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
    <div className="max-w-4xl mx-auto px-12 py-8">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-1.5">
          Step 3: Synthesis (종합)
        </h2>
        <p className="text-sm text-gray-600">
          가능한 진로 선택지 목록을 확장(Elaboration)한 다음, 앞선 두 단계에서 수집한 모든 정보를 활용하여 이 목록을 2~5개의 대안으로 좁히는(Crystallization) 단계입니다.
        </p>
      </div>

      <div className="space-y-6">
        {/* 정교화 (Elaboration) - 대안 작성 */}
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <h3 className="text-base font-semibold text-gray-900 mb-2">정교화 (Elaboration)</h3>
          <p className="text-sm text-gray-600 mb-4">
            고려 중인 진로 대안들을 직접 작성해주세요. (5-8개 권장)
          </p>

          {/* 대안 작성 폼 */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
            <h4 className="text-sm font-semibold text-gray-900 mb-3">새 대안 추가</h4>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
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
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  설명
                </label>
                <Textarea
                  value={editingOption.description || ''}
                  onChange={(e) => setEditingOption(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="이 진로 대안에 대한 간단한 설명을 입력하세요."
                  className="w-full h-20 text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
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
                  <label className="block text-xs font-medium text-gray-700 mb-1">
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
                  <label className="block text-xs font-medium text-gray-700 mb-1">
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
                  <label className="block text-xs font-medium text-gray-700 mb-1">
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
                  <label className="block text-xs font-medium text-gray-700 mb-1">
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
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  선택 이유
                </label>
                <Textarea
                  value={editingOption.matchReason || ''}
                  onChange={(e) => setEditingOption(prev => ({ ...prev, matchReason: e.target.value }))}
                  placeholder="이 대안이 나에게 적합한 이유를 작성하세요."
                  className="w-full h-20 text-sm"
                />
              </div>

              <Button
                onClick={handleAddOption}
                className="w-full"
              >
                <Plus className="w-4 h-4 mr-2" />
                대안 추가
              </Button>
            </div>
          </div>

          {/* 작성된 대안 목록 */}
          {session.step3.generatedOptions.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-gray-900">
                작성된 대안 ({session.step3.generatedOptions.length}개)
              </h4>
              {session.step3.generatedOptions.map((option) => (
                <div
                  key={option.id}
                  className="border border-gray-200 rounded-xl p-5 bg-white hover:shadow-md transition-all"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-base font-semibold text-gray-900">{option.title}</h4>
                    <button
                      onClick={() => handleDeleteOption(option.id)}
                      className="text-gray-400 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                  <p className="text-sm text-gray-600 mb-4">{option.description}</p>

                  <div className="flex flex-wrap gap-2 mb-3">
                    {Object.entries(option.profile).slice(0, 3).map(([key, value]) => (
                      value && (
                        <span
                          key={key}
                          className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
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
          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <h3 className="text-base font-semibold text-gray-900 mb-4">구체화 (Crystallization)</h3>

            <p className="text-sm text-gray-600 mb-4">
              위에서 작성한 대안 중 2~5개를 선택하여 다음 단계에서 심층 평가할 대안으로 좁히세요.
            </p>

            <div className="space-y-3">
              {session.step3.generatedOptions.map((option) => {
                const isSelected = session.step3.selectedOptionIds.includes(option.id);

                return (
                  <div
                    key={option.id}
                    className={`border rounded-lg p-4 transition-all cursor-pointer ${isSelected
                      ? 'border-blue-500 bg-blue-50 shadow-sm'
                      : 'border-gray-200 hover:border-gray-300'
                      }`}
                    onClick={() => toggleOptionSelection(option.id)}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center mt-0.5 ${isSelected
                          ? 'bg-blue-600 border-blue-600'
                          : 'border-gray-300'
                          }`}
                      >
                        {isSelected && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                      </div>

                      <div className="flex-1">
                        <h4 className="text-sm font-semibold text-gray-900 mb-1">
                          {option.title}
                        </h4>
                        <p className="text-xs text-gray-600 mb-2">{option.description}</p>

                        {/* Profile fields */}
                        <div className="grid grid-cols-2 gap-2 mt-3">
                          {Object.entries(option.profile).map(([key, value]) => (
                            value && (
                              <div key={key} className="text-xs">
                                <span className="font-medium text-gray-700">{key}:</span>{' '}
                                <span className="text-gray-600">{value}</span>
                              </div>
                            )
                          ))}
                        </div>

                        {option.matchReason && (
                          <p className="text-xs text-blue-700 mt-3">
                            선택 이유: {option.matchReason}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 p-3 rounded-md bg-gray-50 border border-gray-200">
              <div className="text-sm">
                {selectedCount === 0 && (
                  <span className="text-gray-600">💡 2~5개의 대안을 선택하세요.</span>
                )}
                {selectedCount === 1 && (
                  <span className="text-orange-600">⚠️ {selectedCount}개 선택됨. 최소 2개를 선택해주세요.</span>
                )}
                {selectedCount >= 2 && selectedCount <= 5 && (
                  <span className="text-green-600">✅ {selectedCount}개 선택됨</span>
                )}
                {selectedCount > 5 && (
                  <span className="text-orange-600">⚠️ {selectedCount}개 선택됨. 5개 이하로 줄여주세요.</span>
                )}
              </div>
            </div>

            {/* 선택된 대안 요약 */}
            {selectedCount > 0 && (
              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="text-sm font-semibold text-gray-900 mb-2">
                  선택된 대안 ({selectedCount}개)
                </h4>
                <ul className="space-y-1">
                  {session.step3.generatedOptions
                    .filter(opt => session.step3.selectedOptionIds.includes(opt.id))
                    .map((opt, idx) => (
                      <li key={opt.id} className="text-xs text-gray-700">
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
