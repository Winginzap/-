export type TopicId = 'organic_substances' | 'growth_factors' | 'plant_responses';

export type QuestionType = 'multiple_choice' | 'true_false' | 'special_mission' | 'bonus';

export interface BaseQuestion {
  id: string;
  topic: TopicId;
  type: QuestionType;
  points: number;
  prompt: string;
  explanation: string;
}

export interface ChoiceQuestion extends BaseQuestion {
  type: 'multiple_choice' | 'bonus';
  options: [string, string, string, string];
  correctIndex: number;
}

export interface TrueFalseQuestion extends BaseQuestion {
  type: 'true_false';
  correctAnswer: boolean;
}

export interface ClassifyMissionItem {
  id: string;
  label: string;
  correctBucketIndex: 0 | 1;
}

export interface ClassifyMissionQuestion extends BaseQuestion {
  type: 'special_mission';
  missionMode: 'classify';
  buckets: [string, string];
  items: [ClassifyMissionItem, ClassifyMissionItem, ClassifyMissionItem];
}

export interface MatchMissionPair {
  id: string;
  left: string;
  right: string;
}

export interface MatchMissionQuestion extends BaseQuestion {
  type: 'special_mission';
  missionMode: 'match';
  leftHeader: string;
  rightHeader: string;
  pairs: [MatchMissionPair, MatchMissionPair, MatchMissionPair];
}

export type GameQuestion =
  | ChoiceQuestion
  | TrueFalseQuestion
  | ClassifyMissionQuestion
  | MatchMissionQuestion;

export interface MascotOption {
  id: string;
  name: string;
  imageUrl: string;
  accentHex: string;
  softBgClass: string;
  borderClass: string;
  textClass: string;
}

export interface Team {
  id: string;
  name: string;
  mascotId: string;
  score: number;
  correctCount: number;
  missionCount: number;
  bonusCount: number;
  streak: number;
}

export type AppScreen = 'TITLE_MENU' | 'SETUP' | 'PLAYING' | 'GAME_OVER' | 'STUDY_GUIDE';

export type QuestionPhase = 'ANSWERING' | 'FEEDBACK';

export interface GameSettings {
  teamCount: number;
  timerSeconds: 15 | 20;
  totalQuestions: 20 | 25 | 30;
  topicFilter: TopicId | 'all';
}

export interface AnswerOutcome {
  isCorrect: boolean;
  isTimedOut: boolean;
  pointsEarned: number;
  praiseText: string;
  correctSummary: string;
  explanation: string;
}
