'use client';

import React from 'react';
import { useWorksheet } from '../context/WorksheetContext';
import { Textarea } from '@/components/ui/textarea';

export function Step5Execution() {
  const { session, updateStep5 } = useWorksheet();

  return (
    <div className="max-w-4xl mx-auto px-12 py-8">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-1.5">
          Step 5: Execution (실행)
        </h2>
        <p className="text-sm text-gray-600">
          잠정적인 선택을 실행하기 위한 계획을 수립합니다. 행동을 취하고, 목표를 설정하고, 단계를 계획합니다.
        </p>
      </div>

      <div className="space-y-6">
        {/* 준비 프로그램 */}
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <h3 className="text-base font-semibold text-gray-900 mb-4">준비 프로그램 (Preparation Program)</h3>

          <label className="block mb-2">
            <span className="text-sm font-medium text-gray-900">필요한 교육, 훈련 또는 경험</span>
            <span className="text-xs text-gray-500 block mt-1">
              당신이 획득해야 할 정규 교육, 훈련 또는 경험을 여기에 적으세요.
            </span>
          </label>
          <Textarea
            value={session.step5.preparationProgram}
            onChange={(e) => updateStep5({ preparationProgram: e.target.value })}
            rows={4}
            placeholder="예: 데이터 분석 부트캠프 수료, Python 자격증 취득, 관련 인턴십 경험 등"
            className="text-sm"
          />
        </div>

        {/* 현실 검증 */}
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <h3 className="text-base font-semibold text-gray-900 mb-4">현실 검증 (Reality Testing)</h3>

          {/* 근무 형태 */}
          <div className="mb-5">
            <label className="block mb-2">
              <span className="text-sm font-medium text-gray-900">얼마나 일할 수 있습니까?</span>
              <span className="text-xs text-gray-500 block mt-1">
                전일제, 시간제 등 가능한 근무 형태를 적으세요.
              </span>
            </label>
            <Textarea
              value={session.step5.realityTesting.workSchedule}
              onChange={(e) => updateStep5({
                realityTesting: { ...session.step5.realityTesting, workSchedule: e.target.value }
              })}
              rows={2}
              placeholder="예: 전일제 근무 가능, 주 5일 근무 선호"
              className="text-sm"
            />
          </div>

          {/* 자원봉사/직무 경험 */}
          <div className="mb-5">
            <label className="block mb-2">
              <span className="text-sm font-medium text-gray-900">자원봉사 또는 직무 경험</span>
              <span className="text-xs text-gray-500 block mt-1">
                관련 경험을 쌓을 수 있는 기회를 적으세요.
              </span>
            </label>
            <Textarea
              value={session.step5.realityTesting.volunteerExperience}
              onChange={(e) => updateStep5({
                realityTesting: { ...session.step5.realityTesting, volunteerExperience: e.target.value }
              })}
              rows={2}
              placeholder="예: 관련 분야 인턴십 지원, 오픈소스 프로젝트 참여"
              className="text-sm"
            />
          </div>

          {/* 시간과 자원 */}
          <div>
            <label className="block mb-2">
              <span className="text-sm font-medium text-gray-900">필요한 코스나 훈련을 받는 데 쓸 시간과 돈이 있습니까?</span>
              <span className="text-xs text-gray-500 block mt-1">
                현실적인 시간과 자원 가용성을 평가하세요.
              </span>
            </label>
            <Textarea
              value={session.step5.realityTesting.timeAndResources}
              onChange={(e) => updateStep5({
                realityTesting: { ...session.step5.realityTesting, timeAndResources: e.target.value }
              })}
              rows={3}
              placeholder="예: 6개월간 부트캠프 참여 가능, 약 500만원 준비되어 있음"
              className="text-sm"
            />
          </div>
        </div>

        {/* 구직 활동 */}
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <h3 className="text-base font-semibold text-gray-900 mb-4">구직 활동 (Employment Seeking)</h3>

          <label className="block mb-2">
            <span className="text-sm font-medium text-gray-900">취업을 위한 단계</span>
            <span className="text-xs text-gray-500 block mt-1">
              일자리에 지원하고 취업하기 위해 취해야 할 단계들을 여기에 적으세요.
            </span>
          </label>
          <Textarea
            value={session.step5.employmentSeeking}
            onChange={(e) => updateStep5({ employmentSeeking: e.target.value })}
            rows={5}
            placeholder="예: 1. 이력서 및 포트폴리오 작성 2. 관련 기업 리서치 3. 채용 공고 지원 4. 네트워킹 활동 5. 면접 준비"
            className="text-sm"
          />
        </div>
      </div>
    </div>
  );
}
