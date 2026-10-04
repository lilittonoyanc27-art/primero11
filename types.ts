export type LanguageFunctionId =
  | 'referencial'
  | 'expresiva'
  | 'apelativa'
  | 'fatica'
  | 'metalinguistica'
  | 'poetica';

export interface LanguageFunctionInfo {
  id: LanguageFunctionId;
  nameEs: string;
  nameArm: string;
  aliasesEs: string;
  purposeEs: string;
  purposeArm: string;
  shortcutEs: string;
  shortcutArm: string;
  formulaEs: string;
  formulaArm: string;
  color: string;
  badgeBg: string;
  badgeText: string;
  borderColor: string;
  iconName: string;
  elementOfCommunication: {
    es: string;
    arm: string;
  };
}

export interface ExamQuestion {
  id: number;
  spanish: string;
  armenian: string;
  functionId?: LanguageFunctionId;
  isTheoretical?: boolean;
  answerEs: string;
  answerArm: string;
  explanationEs?: string;
  explanationArm?: string;
  note?: {
    es: string;
    arm: string;
  };
}

export interface DialogueLine {
  speaker?: string;
  es: string;
  arm: string;
  functionId?: LanguageFunctionId;
  boldPhraseEs?: string;
  boldPhraseArm?: string;
}

export interface TextQuestion {
  id: number;
  questionEs: string;
  questionArm: string;
  answerEs: string;
  answerArm: string;
  options?: Array<{
    key: string;
    text: string;
    isCorrect: boolean;
  }>;
  explanationEs?: string;
  explanationArm?: string;
}

export interface TextStudyUnit {
  id: string;
  number: number;
  series: 'primera' | 'segunda';
  titleEs: string;
  titleArm: string;
  subtitleEs: string;
  subtitleArm: string;
  badge: string;
  dialogue: DialogueLine[];
  questions: TextQuestion[];
  tip?: {
    es: string;
    arm: string;
  };
}

export interface ScrambleExerciseItem {
  id: number;
  series: 'ejercicio_1' | 'ejercicio_2' | 'ejercicio_3' | 'ejercicio_4';
  words?: string[];
  correctSentence?: string;
  functionId?: LanguageFunctionId;
  promptEs: string;
  promptArm: string;
  answerEs: string;
  answerArm?: string;
  explanationArm?: string;
}
