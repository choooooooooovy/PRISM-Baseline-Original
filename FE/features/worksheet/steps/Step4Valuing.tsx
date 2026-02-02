'use client';

import React from 'react';
import { useWorksheet } from '../context/WorksheetContext';
import { Textarea } from '@/components/ui/textarea';

export function Step4Valuing() {
  const { session, updateStep4 } = useWorksheet();

  // Get selected options from Step3
  const selectedOptions = session.step3.generatedOptions.filter(opt =>
    session.step3.selectedOptionIds.includes(opt.id)
  );

  const updateValuation = (optionId: string, field: string, subfield: string, value: string) => {
    const valuations = [...session.step4.optionValuations];
    const index = valuations.findIndex(v => v.optionId === optionId);

    if (index >= 0) {
      const existing = valuations[index];
      const fieldData = existing[field as keyof typeof existing];

      valuations[index] = {
        ...existing,
        [field]: {
          ...(typeof fieldData === 'object' && fieldData !== null ? fieldData : {}),
          [subfield]: value,
        },
      };
    } else {
      const option = selectedOptions.find(o => o.id === optionId);
      const newValuation = {
        optionId,
        optionTitle: option?.title || '',
        oneself: { benefits: '', costs: '' },
        significantOthers: { benefits: '', costs: '' },
        culturalGroup: { benefits: '', costs: '' },
        communitySociety: { benefits: '', costs: '' },
      };

      const fieldObj = newValuation[field as keyof typeof newValuation];
      if (typeof fieldObj === 'object' && fieldObj !== null) {
        (fieldObj as Record<string, string>)[subfield] = value;
      }

      valuations.push(newValuation);
    }

    updateStep4({ optionValuations: valuations });
  };

  const getValuation = (optionId: string) => {
    return session.step4.optionValuations.find(v => v.optionId === optionId);
  };

  return (
    <div className="max-w-4xl mx-auto px-12 py-8">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-1.5">
          Step 4: Valuing (평가)
        </h2>
        <p className="text-sm text-gray-600">
          좁혀진 직업 목록에 있는 각 대안의 비용(손실)과 혜택(이득)을 평가하여 우선순위를 매기고, 직업/학습 프로그램/일자리를 선택하는 단계입니다.
        </p>
      </div>

      {selectedOptions.length === 0 ? (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-5">
          <p className="text-sm text-yellow-800">
            Step 3에서 3~5개의 대안을 선택해주세요.
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {/* 각 대안별 평가 */}
          {selectedOptions.map((option) => {
            const valuation = getValuation(option.id);

            return (
              <div key={option.id} className="bg-white border-2 border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-5">{option.title}</h3>

                {/* 자신 */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">자신 (Oneself)</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block mb-2">
                        <span className="text-xs font-medium text-green-700">혜택 (Benefits)</span>
                      </label>
                      <Textarea
                        value={valuation?.oneself.benefits || ''}
                        onChange={(e) => updateValuation(option.id, 'oneself', 'benefits', e.target.value)}
                        rows={3}
                        placeholder="이 결정이 당신에게 어떤 혜택을 줄지 적으세요."
                        className="text-sm"
                      />
                    </div>
                    <div>
                      <label className="block mb-2">
                        <span className="text-xs font-medium text-red-700">비용 (Costs)</span>
                      </label>
                      <Textarea
                        value={valuation?.oneself.costs || ''}
                        onChange={(e) => updateValuation(option.id, 'oneself', 'costs', e.target.value)}
                        rows={3}
                        placeholder="어떤 비용이 들까요?"
                        className="text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* 주요 타인 */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">주요 타인 (Significant Others)</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block mb-2">
                        <span className="text-xs font-medium text-green-700">혜택 (Benefits)</span>
                      </label>
                      <Textarea
                        value={valuation?.significantOthers.benefits || ''}
                        onChange={(e) => updateValuation(option.id, 'significantOthers', 'benefits', e.target.value)}
                        rows={3}
                        placeholder="가족, 배우자, 주요 타인에게 어떤 혜택을 줄지 적으세요."
                        className="text-sm"
                      />
                    </div>
                    <div>
                      <label className="block mb-2">
                        <span className="text-xs font-medium text-red-700">비용 (Costs)</span>
                      </label>
                      <Textarea
                        value={valuation?.significantOthers.costs || ''}
                        onChange={(e) => updateValuation(option.id, 'significantOthers', 'costs', e.target.value)}
                        rows={3}
                        placeholder="주요 타인에게 발생하는 비용은 무엇일까요?"
                        className="text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* 문화 집단 */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">문화 집단 (Cultural Group)</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block mb-2">
                        <span className="text-xs font-medium text-green-700">혜택 (Benefits)</span>
                      </label>
                      <Textarea
                        value={valuation?.culturalGroup.benefits || ''}
                        onChange={(e) => updateValuation(option.id, 'culturalGroup', 'benefits', e.target.value)}
                        rows={3}
                        placeholder="당신의 문화 집단에 어떤 혜택을 줄지 적으세요."
                        className="text-sm"
                      />
                    </div>
                    <div>
                      <label className="block mb-2">
                        <span className="text-xs font-medium text-red-700">비용 (Costs)</span>
                      </label>
                      <Textarea
                        value={valuation?.culturalGroup.costs || ''}
                        onChange={(e) => updateValuation(option.id, 'culturalGroup', 'costs', e.target.value)}
                        rows={3}
                        placeholder="문화 집단에 발생하는 비용은 무엇일까요?"
                        className="text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* 지역사회 및 사회 전체 */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">지역사회 및 사회 전체 (Community & Society)</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block mb-2">
                        <span className="text-xs font-medium text-green-700">혜택 (Benefits)</span>
                      </label>
                      <Textarea
                        value={valuation?.communitySociety.benefits || ''}
                        onChange={(e) => updateValuation(option.id, 'communitySociety', 'benefits', e.target.value)}
                        rows={3}
                        placeholder="지역사회 및 사회 전체에 어떤 혜택을 줄지 적으세요."
                        className="text-sm"
                      />
                    </div>
                    <div>
                      <label className="block mb-2">
                        <span className="text-xs font-medium text-red-700">비용 (Costs)</span>
                      </label>
                      <Textarea
                        value={valuation?.communitySociety.costs || ''}
                        onChange={(e) => updateValuation(option.id, 'communitySociety', 'costs', e.target.value)}
                        rows={3}
                        placeholder="지역사회 및 사회 전체에 발생하는 비용은 무엇일까요?"
                        className="text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* 최종 선택 */}
          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <h3 className="text-base font-semibold text-gray-900 mb-4">최종 선택</h3>

            {/* 1순위 */}
            <div className="mb-4">
              <label className="block mb-2">
                <span className="text-sm font-medium text-gray-900">1순위 선택 (Primary Choice)</span>
                <span className="text-xs text-gray-500 block mt-1">
                  지금까지의 모든 정보를 고려하여, 당신의 첫 번째 선택을 적으세요.
                </span>
              </label>
              <select
                value={session.step4.primaryChoice}
                onChange={(e) => updateStep4({ primaryChoice: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
              >
                <option value="">-- 선택하세요 --</option>
                {selectedOptions.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.title}
                  </option>
                ))}
              </select>
            </div>

            {/* 2순위 */}
            <div>
              <label className="block mb-2">
                <span className="text-sm font-medium text-gray-900">2순위 선택 (Secondary Choice)</span>
                <span className="text-xs text-gray-500 block mt-1">
                  지금까지의 모든 정보를 고려하여, 당신의 두 번째 선택을 적으세요.
                </span>
              </label>
              <select
                value={session.step4.secondaryChoice}
                onChange={(e) => updateStep4({ secondaryChoice: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
              >
                <option value="">-- 선택하세요 --</option>
                {selectedOptions.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
