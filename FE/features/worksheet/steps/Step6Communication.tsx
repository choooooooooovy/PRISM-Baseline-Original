'use client';

import React from 'react';
import { useWorksheet } from '../context/WorksheetContext';
import { Textarea } from '@/components/ui/textarea';

export function Step6Communication() {
  const { session, updateStep6 } = useWorksheet();

  return (
    <div className="max-w-4xl mx-auto px-12 py-8">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-1.5">
          Step 6: Communication (의사소통 - Recycle)
        </h2>
        <p className="text-sm text-gray-600">
          당신이 느끼는 감정을 성찰하고 좋은 선택을 내렸는지 확인하는 단계입니다. 잠정적인 선택이 당신에게 올바른지 확인합니다.
        </p>
      </div>

      <div className="space-y-6">
        {/* 내적 단서 - 정서 */}
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <h3 className="text-base font-semibold text-gray-900 mb-4">내적 단서 - 정서 (Internal Cues - Emotions)</h3>

          <label className="block mb-2">
            <span className="text-sm font-medium text-gray-900">잠정적인 선택에 대한 감정</span>
            <span className="text-xs text-gray-500 block mt-1">
              당신이 내린 잠정적인 선택에 대해 감정적으로 어떻게 느끼고 있는지 적으세요.
            </span>
          </label>
          <Textarea
            value={session.step6.emotions}
            onChange={(e) => updateStep6({ emotions: e.target.value })}
            rows={3}
            placeholder="예: 불안감이 줄어들고 기대감이 생깁니다. 올바른 방향으로 가고 있다는 느낌이 듭니다."
            className="text-sm"
          />
        </div>

        {/* 격차가 좁혀졌는가 */}
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <h3 className="text-base font-semibold text-gray-900 mb-4">격차가 좁혀졌는가 (Has the Gap Closed)</h3>

          <label className="block mb-2">
            <span className="text-sm font-medium text-gray-900">현재-미래 격차 해소 여부</span>
            <span className="text-xs text-gray-500 block mt-1">
              현재 당신의 위치와 미래에 당신이 있고 싶은 위치 사이의 격차가 좁혀졌습니까?
            </span>
          </label>
          <Textarea
            value={session.step6.hasGapClosed}
            onChange={(e) => updateStep6({ hasGapClosed: e.target.value })}
            rows={3}
            placeholder="예: 명확한 방향이 생겼고, 구체적인 실행 계획이 있어서 격차가 많이 줄어든 것 같습니다."
            className="text-sm"
          />
        </div>

        {/* 신체적 느낌 */}
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <h3 className="text-base font-semibold text-gray-900 mb-4">신체적 느낌 (Physically Feeling)</h3>

          <label className="block mb-2">
            <span className="text-sm font-medium text-gray-900">신체 상태 변화</span>
            <span className="text-xs text-gray-500 block mt-1">
              부정적인 감정과 신체 상태가 평온함과 차분한 느낌으로 대체되었습니까?
            </span>
          </label>
          <Textarea
            value={session.step6.physicallyFeeling}
            onChange={(e) => updateStep6({ physicallyFeeling: e.target.value })}
            rows={3}
            placeholder="예: 두통이 사라졌고, 잠도 잘 자게 되었습니다. 몸이 가벼워진 느낌입니다."
            className="text-sm"
          />
        </div>

        {/* 행동 */}
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <h3 className="text-base font-semibold text-gray-900 mb-4">행동 (Action)</h3>

          <label className="block mb-2">
            <span className="text-sm font-medium text-gray-900">목표 달성 행동</span>
            <span className="text-xs text-gray-500 block mt-1">
              목표를 달성하기 위해 행동을 취하고 있습니까?
            </span>
          </label>
          <Textarea
            value={session.step6.action}
            onChange={(e) => updateStep6({ action: e.target.value })}
            rows={3}
            placeholder="예: 이미 관련 강의를 신청했고, 매일 조금씩 공부하고 있습니다. 네트워킹도 시작했습니다."
            className="text-sm"
          />
        </div>
      </div>
    </div>
  );
}
