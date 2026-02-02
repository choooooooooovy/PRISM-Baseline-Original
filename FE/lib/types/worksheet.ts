// Step Status
export type StepStatus = 'draft' | 'complete';

// Step 1: Communication (의사소통 - 초기)
export interface Step1Data {
  externalCues: {
    events: string;              // 의사결정 요구 사건
    significantOther: string;    // 주요 타인의 영향
  };
  internalCues: {
    emotions: string;            // 현재 감정
    avoidanceBehaviour: string;  // 회피 행동
    physicallyFeeling: string;   // 신체적 느낌
  };
}

// Step 2: Analysis (분석)
export interface Step2Data {
  selfKnowledge: {
    values: string;                  // 가치
    interests: string;               // 흥미
    skills: string;                  // 기술
    occupationalInterests: string;   // 직업적/일적 흥미
  };
  occupationalKnowledge: string;     // 직업 지식 향상
  decisionMakingStyle: string;       // 일반적 정보 처리
  metacognition: {
    selfTalk: string;                // 자기 대화
    selfAwareness: string;           // 자기 자각
    controlAndMonitoring: string;    // 통제 및 모니터링
  };
}

// Step 3: Synthesis (종합) - LLM 개입
export type OptionProfile = Record<string, string>;

export interface Option {
  id: string;
  title: string;
  description: string;
  profile: OptionProfile;
  matchReason: string;
}

export interface Step3Data {
  elaboration: string;             // 정교화: 전체 대안 목록
  generatedOptions: Option[];      // 생성된 대안
  crystallization: string;         // 구체화: 2-5개로 좁힌 대안
  selectedOptionIds: string[];     // 선택된 대안 ID (2-5개)
}

// Step 4: Valuing (평가)
export interface ValuingPerspective {
  benefits: string;  // 혜택
  costs: string;     // 비용
}

export interface OptionValuation {
  optionId: string;
  optionTitle: string;
  oneself: ValuingPerspective;           // 자신
  significantOthers: ValuingPerspective; // 주요 타인
  culturalGroup: ValuingPerspective;     // 문화 집단
  communitySociety: ValuingPerspective;  // 지역사회/사회
}

export interface Step4Data {
  optionValuations: OptionValuation[];  // 각 대안별 평가
  primaryChoice: string;                // 1순위 선택 (optionId)
  secondaryChoice: string;              // 2순위 선택 (optionId)
}

// Step 5: Execution (실행)
export interface Step5Data {
  preparationProgram: string;  // 준비 프로그램
  realityTesting: {
    workSchedule: string;          // 근무 형태
    volunteerExperience: string;   // 자원봉사/직무 경험
    timeAndResources: string;      // 시간/자원 가용성
  };
  employmentSeeking: string;   // 구직 활동
}

// Step 6: Communication (의사소통 - Recycle)
export interface Step6Data {
  emotions: string;           // 잠정 선택에 대한 감정
  hasGapClosed: string;       // 격차 해소 여부
  physicallyFeeling: string;  // 신체 상태 변화
  action: string;             // 행동 여부
}

// Main Worksheet Session
export interface WorksheetSession {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  currentStep: number;
  steps: {
    id: number;
    label: string;
    status: StepStatus;
  }[];
  step1: Step1Data;
  step2: Step2Data;
  step3: Step3Data;
  step4: Step4Data;
  step5: Step5Data;
  step6: Step6Data;
}

// Initial empty state factory
export function createEmptySession(id: string = ''): WorksheetSession {
  return {
    id,
    title: 'CASVE Worksheet',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    currentStep: 1,
    steps: [
      { id: 1, label: 'Communication', status: 'draft' },
      { id: 2, label: 'Analysis', status: 'draft' },
      { id: 3, label: 'Synthesis', status: 'draft' },
      { id: 4, label: 'Valuing', status: 'draft' },
      { id: 5, label: 'Execution', status: 'draft' },
      { id: 6, label: 'Communication (Recycle)', status: 'draft' },
    ],
    step1: {
      externalCues: {
        events: '',
        significantOther: '',
      },
      internalCues: {
        emotions: '',
        avoidanceBehaviour: '',
        physicallyFeeling: '',
      },
    },
    step2: {
      selfKnowledge: {
        values: '',
        interests: '',
        skills: '',
        occupationalInterests: '',
      },
      occupationalKnowledge: '',
      decisionMakingStyle: '',
      metacognition: {
        selfTalk: '',
        selfAwareness: '',
        controlAndMonitoring: '',
      },
    },
    step3: {
      elaboration: '',
      generatedOptions: [],
      crystallization: '',
      selectedOptionIds: [],
    },
    step4: {
      optionValuations: [],
      primaryChoice: '',
      secondaryChoice: '',
    },
    step5: {
      preparationProgram: '',
      realityTesting: {
        workSchedule: '',
        volunteerExperience: '',
        timeAndResources: '',
      },
      employmentSeeking: '',
    },
    step6: {
      emotions: '',
      hasGapClosed: '',
      physicallyFeeling: '',
      action: '',
    },
  };
}
