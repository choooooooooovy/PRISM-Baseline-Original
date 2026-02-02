'use client';

import React from 'react';
import { useWorksheet } from '../context/WorksheetContext';
import { Textarea } from '@/components/ui/textarea';

export function Step1Communication() {
  const { session, updateStep1 } = useWorksheet();

  return (
    <div className="max-w-4xl mx-auto px-12 py-8">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-1.5">
          Step 1: Communication (의사소통)
        </h2>
        <p className="text-sm text-gray-600">
          진로 의사결정 과정에 참여하고, 선택을 내려야 한다는 사실을 인지하는 단계입니다.
        </p>
      </div>

      <div className="space-y-6">
        {/* 외적 단서 */}
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <h3 className="text-base font-semibold text-gray-900 mb-4">외적 단서</h3>

          {/* 사건 */}
          <div className="mb-5">
            <label className="block mb-2">
              <span className="text-sm font-medium text-gray-900">사건 (Events)</span>
              <span className="text-xs text-gray-500 block mt-1">
                당신에게 의사결정을 요구하게 만든 사건(들)을 적으세요.
              </span>
            </label>
            <Textarea
              value={session.step1.externalCues.events}
              onChange={(e) => updateStep1({
                externalCues: { ...session.step1.externalCues, events: e.target.value }
              })}
              rows={3}
              placeholder="예: 졸업을 앞두고 있으며, 취업 시장이 어렵다는 소식을 자주 듣게 되었습니다."
              className="text-sm"
            />
          </div>

          {/* 주요 타인 */}
          <div>
            <label className="block mb-2">
              <span className="text-sm font-medium text-gray-900">주요 타인 (Significant Other)</span>
              <span className="text-xs text-gray-500 block mt-1">
                가족 구성원, 배우자, 또는 당신의 삶에서 중요한 다른 사람들이 당신의 의사결정에 어떻게 영향을 미치고 있는지 여기에 적으세요.
              </span>
            </label>
            <Textarea
              value={session.step1.externalCues.significantOther}
              onChange={(e) => updateStep1({
                externalCues: { ...session.step1.externalCues, significantOther: e.target.value }
              })}
              rows={3}
              placeholder="예: 부모님은 안정적인 직장을 원하시지만, 친구들은 창업을 권유합니다."
              className="text-sm"
            />
          </div>
        </div>

        {/* 내적 단서 */}
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <h3 className="text-base font-semibold text-gray-900 mb-4">내적 단서</h3>

          {/* 정서 */}
          <div className="mb-5">
            <label className="block mb-2">
              <span className="text-sm font-medium text-gray-900">정서 (Emotions)</span>
              <span className="text-xs text-gray-500 block mt-1">
                선택을 내려야 한다는 것에 대해 현재 감정적으로 어떻게 느끼고 있는지 여기에 적으세요.
              </span>
            </label>
            <Textarea
              value={session.step1.internalCues.emotions}
              onChange={(e) => updateStep1({
                internalCues: { ...session.step1.internalCues, emotions: e.target.value }
              })}
              rows={3}
              placeholder="예: 불안하고 초조합니다. 잘못된 선택을 할까봐 두렵습니다."
              className="text-sm"
            />
          </div>

          {/* 회피 행동 */}
          <div className="mb-5">
            <label className="block mb-2">
              <span className="text-sm font-medium text-gray-900">회피 행동 (Avoidance Behaviour)</span>
              <span className="text-xs text-gray-500 block mt-1">
                선택을 내리는 것을 어떻게 회피하고 있는지 적으세요.
              </span>
            </label>
            <Textarea
              value={session.step1.internalCues.avoidanceBehaviour}
              onChange={(e) => updateStep1({
                internalCues: { ...session.step1.internalCues, avoidanceBehaviour: e.target.value }
              })}
              rows={3}
              placeholder="예: 결정을 미루고 다른 일에 집중하려고 합니다."
              className="text-sm"
            />
          </div>

          {/* 신체적 느낌 */}
          <div>
            <label className="block mb-2">
              <span className="text-sm font-medium text-gray-900">신체적 느낌 (Physically Feeling)</span>
              <span className="text-xs text-gray-500 block mt-1">
                선택을 내려야 한다는 것에 대해 신체적으로 어떻게 느끼고 있는지 적으세요. (예: 스트레스, 식욕 부진, 피로, 과도한 생각 등)
              </span>
            </label>
            <Textarea
              value={session.step1.internalCues.physicallyFeeling}
              onChange={(e) => updateStep1({
                internalCues: { ...session.step1.internalCues, physicallyFeeling: e.target.value }
              })}
              rows={3}
              placeholder="예: 자주 피곤하고, 잠을 잘 못 자며, 두통이 있습니다."
              className="text-sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
