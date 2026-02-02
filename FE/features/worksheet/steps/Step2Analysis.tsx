'use client';

import React from 'react';
import { useWorksheet } from '../context/WorksheetContext';
import { Textarea } from '@/components/ui/textarea';

export function Step2Analysis() {
  const { session, updateStep2 } = useWorksheet();

  return (
    <div className="max-w-4xl mx-auto px-12 py-8">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-1.5">
          Step 2: Analysis (분석)
        </h2>
        <p className="text-sm text-gray-600">
          자신과 자신의 의사결정 방식, 그리고 일의 세계에 대해 더 많이 배우는 단계입니다.
        </p>
      </div>

      <div className="space-y-6">
        {/* 자기 지식 향상 */}
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <h3 className="text-base font-semibold text-gray-900 mb-4">자기 지식 향상 (Enhance Self-Knowledge)</h3>

          {/* 가치 */}
          <div className="mb-5">
            <label className="block mb-2">
              <span className="text-sm font-medium text-gray-900">가치 (Values)</span>
              <span className="text-xs text-gray-500 block mt-1">
                당신이 중요하게 생각하는 가치관을 작성하세요.
              </span>
            </label>
            <Textarea
              value={session.step2.selfKnowledge.values}
              onChange={(e) => updateStep2({
                selfKnowledge: { ...session.step2.selfKnowledge, values: e.target.value }
              })}
              rows={3}
              placeholder="예: 성장, 자율성, 사회적 기여, 워라밸 등"
              className="text-sm"
            />
          </div>

          {/* 흥미 */}
          <div className="mb-5">
            <label className="block mb-2">
              <span className="text-sm font-medium text-gray-900">흥미 (Interests)</span>
              <span className="text-xs text-gray-500 block mt-1">
                당신이 관심 있는 분야나 활동을 작성하세요.
              </span>
            </label>
            <Textarea
              value={session.step2.selfKnowledge.interests}
              onChange={(e) => updateStep2({
                selfKnowledge: { ...session.step2.selfKnowledge, interests: e.target.value }
              })}
              rows={3}
              placeholder="예: 데이터 분석, 사람들과의 협업, 문제 해결, 창작 활동 등"
              className="text-sm"
            />
          </div>

          {/* 기술 */}
          <div className="mb-5">
            <label className="block mb-2">
              <span className="text-sm font-medium text-gray-900">기술 (Skills)</span>
              <span className="text-xs text-gray-500 block mt-1">
                당신이 보유한 기술과 강점을 작성하세요.
              </span>
            </label>
            <Textarea
              value={session.step2.selfKnowledge.skills}
              onChange={(e) => updateStep2({
                selfKnowledge: { ...session.step2.selfKnowledge, skills: e.target.value }
              })}
              rows={3}
              placeholder="예: 프로그래밍, 커뮤니케이션, 분석력, 리더십 등"
              className="text-sm"
            />
          </div>

          {/* 직업적/일적 흥미 */}
          <div>
            <label className="block mb-2">
              <span className="text-sm font-medium text-gray-900">직업적/일적 흥미 (Occupational/ Work interests)</span>
              <span className="text-xs text-gray-500 block mt-1">
                어떤 종류의 일을 하고 싶은지 작성하세요.
              </span>
            </label>
            <Textarea
              value={session.step2.selfKnowledge.occupationalInterests}
              onChange={(e) => updateStep2({
                selfKnowledge: { ...session.step2.selfKnowledge, occupationalInterests: e.target.value }
              })}
              rows={3}
              placeholder="예: 연구직, 교육직, 기술직, 경영직 등"
              className="text-sm"
            />
          </div>
        </div>

        {/* 직업 지식 향상 */}
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <h3 className="text-base font-semibold text-gray-900 mb-4">직업 지식 향상 (Enhance Occupational Knowledge)</h3>

          <label className="block mb-2">
            <span className="text-sm font-medium text-gray-900">조사 내용</span>
            <span className="text-xs text-gray-500 block mt-1">
              개별 직업, 학습 프로그램, 또는 일자리에 대해 조사하고 지식을 습득하세요.
            </span>
          </label>
          <Textarea
            value={session.step2.occupationalKnowledge}
            onChange={(e) => updateStep2({ occupationalKnowledge: e.target.value })}
            rows={4}
            placeholder="예: 데이터 사이언티스트는 통계와 프로그래밍 능력이 필요하며, 평균 연봉은 6000만원 수준입니다."
            className="text-sm"
          />
        </div>

        {/* 일반적 정보 처리 */}
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <h3 className="text-base font-semibold text-gray-900 mb-4">일반적 정보 처리 (Generic Information Processing)</h3>

          <label className="block mb-2">
            <span className="text-sm font-medium text-gray-900">의사결정 스타일</span>
            <span className="text-xs text-gray-500 block mt-1">
              당신의 개인적인 의사결정 스타일을 작성하세요. 과거에 어떻게 결정을 내렸으며, 어떤 전략들을 사용했나요?
            </span>
          </label>
          <Textarea
            value={session.step2.decisionMakingStyle}
            onChange={(e) => updateStep2({ decisionMakingStyle: e.target.value })}
            rows={3}
            placeholder="예: 주로 장단점을 나열하고 비교하는 방식으로 결정합니다. 때로는 감정에 의존하기도 합니다."
            className="text-sm"
          />
        </div>

        {/* 초인지 */}
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <h3 className="text-base font-semibold text-gray-900 mb-4">초인지 (Metacognition) - 자신의 결정에 대해 생각하기</h3>

          {/* 자기 대화 */}
          <div className="mb-5">
            <label className="block mb-2">
              <span className="text-sm font-medium text-gray-900">자기 대화 (Self-talk)</span>
              <span className="text-xs text-gray-500 block mt-1">
                진로 문제 해결 및 의사결정과 관련된 자기 대화의 성격을 서술하십시오.
              </span>
            </label>
            <Textarea
              value={session.step2.metacognition.selfTalk}
              onChange={(e) => updateStep2({
                metacognition: { ...session.step2.metacognition, selfTalk: e.target.value }
              })}
              rows={3}
              placeholder="예: '정말 이 선택이 맞을까?', '다른 사람들은 어떻게 생각할까?' 같은 생각이 자주 듭니다."
              className="text-sm"
            />
          </div>

          {/* 자기 자각 */}
          <div className="mb-5">
            <label className="block mb-2">
              <span className="text-sm font-medium text-gray-900">자기 자각 (Self-awareness)</span>
              <span className="text-xs text-gray-500 block mt-1">
                진로 문제 해결 및 의사결정 접근 방식에 대한 자신의 자각 수준을 서술하십시오.
              </span>
            </label>
            <Textarea
              value={session.step2.metacognition.selfAwareness}
              onChange={(e) => updateStep2({
                metacognition: { ...session.step2.metacognition, selfAwareness: e.target.value }
              })}
              rows={3}
              placeholder="예: 저는 결정을 미루는 경향이 있다는 것을 알고 있습니다."
              className="text-sm"
            />
          </div>

          {/* 통제 및 모니터링 */}
          <div>
            <label className="block mb-2">
              <span className="text-sm font-medium text-gray-900">통제 및 모니터링 (Control and Monitoring)</span>
              <span className="text-xs text-gray-500 block mt-1">
                진로 문제 해결 및 의사결정 과정을 모니터링하고 통제하는 능력을 서술하십시오.
              </span>
            </label>
            <Textarea
              value={session.step2.metacognition.controlAndMonitoring}
              onChange={(e) => updateStep2({
                metacognition: { ...session.step2.metacognition, controlAndMonitoring: e.target.value }
              })}
              rows={3}
              placeholder="예: 일정을 정해두고 단계별로 진행하며, 정기적으로 진행상황을 점검합니다."
              className="text-sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
