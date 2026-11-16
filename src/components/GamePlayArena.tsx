import { useEffect, useMemo, useState } from 'react';
import {
  AlertTriangle,
  ArrowRight,
  Award,
  Check,
  CheckCircle2,
  Clock,
  RotateCcw,
  Sparkles,
  Volume2,
  VolumeX,
  XCircle,
} from 'lucide-react';
import { PRAISE_MESSAGES, TOPICS } from '../data/questions';
import {
  AnswerOutcome,
  ClassifyMissionQuestion,
  GameQuestion,
  MatchMissionQuestion,
  QuestionPhase,
  Team,
} from '../types/game';
import {
  playBonusSound,
  playClickSound,
  playCorrectSound,
  playTickSound,
  playWrongSound,
} from '../utils/sound';
import { ConfettiBurst } from './ConfettiBurst';
import { MascotAvatar } from './MascotAvatar';

interface GamePlayArenaProps {
  deck: GameQuestion[];
  teams: Team[];
  timerSeconds: 15 | 20;
  muted: boolean;
  onToggleMute: () => void;
  onRecordScore: (
    teamIndex: number,
    points: number,
    questionType: GameQuestion['type'],
    isCorrect: boolean
  ) => void;
  onFinishGame: () => void;
  onRestartGame: () => void;
}

const CHOICE_LETTERS = ['ก', 'ข', 'ค', 'ง'];

function shuffleIndices(len: number): number[] {
  const arr = Array.from({ length: len }, (_, i) => i);
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function getQuestionTypeLabel(q: GameQuestion): string {
  switch (q.type) {
    case 'multiple_choice':
      return 'คำถาม 4 ตัวเลือก · 10 คะแนน';
    case 'true_false':
      return 'คำถามถูกหรือผิด · 10 คะแนน';
    case 'special_mission':
      return 'ภารกิจพิเศษ · 15 คะแนน';
    case 'bonus':
      return 'คำถามโบนัส · 20 คะแนน';
  }
}

export function GamePlayArena({
  deck,
  teams,
  timerSeconds,
  muted,
  onToggleMute,
  onRecordScore,
  onFinishGame,
  onRestartGame,
}: GamePlayArenaProps) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [phase, setPhase] = useState<QuestionPhase>('ANSWERING');
  const [timeLeft, setTimeLeft] = useState<number>(timerSeconds);
  const [outcome, setOutcome] = useState<AnswerOutcome | null>(null);
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [selectedTrueFalse, setSelectedTrueFalse] = useState<boolean | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  // Special Mission: Classify state -> maps item.id to bucketIndex (0 or 1)
  const [classifyAnswers, setClassifyAnswers] = useState<Record<string, 0 | 1>>({});

  // Special Mission: Match state -> maps pair.id (left) to matched pair.id (right)
  const [selectedLeftId, setSelectedLeftId] = useState<string | null>(null);
  const [matchAnswers, setMatchAnswers] = useState<Record<string, string>>({});

  const currentQuestion = deck[questionIndex];
  const activeTeamIndex = questionIndex % teams.length;
  const activeTeam = teams[activeTeamIndex];
  const nextTeam = teams[(questionIndex + 1) % teams.length];

  // Shuffle right-hand column options deterministically per match question
  const shuffledRightPairs = useMemo(() => {
    if (currentQuestion.type === 'special_mission' && currentQuestion.missionMode === 'match') {
      const indices = shuffleIndices(currentQuestion.pairs.length);
      // Avoid completely identical order if possible
      if (indices.every((val, idx) => val === idx) && indices.length > 1) {
        [indices[0], indices[1]] = [indices[1], indices[0]];
      }
      return indices.map((i) => currentQuestion.pairs[i]);
    }
    return [];
  }, [currentQuestion]);

  // Reset per-question interaction state whenever questionIndex changes
  useEffect(() => {
    setPhase('ANSWERING');
    setTimeLeft(timerSeconds);
    setOutcome(null);
    setSelectedChoice(null);
    setSelectedTrueFalse(null);
    setClassifyAnswers({});
    setSelectedLeftId(null);
    setMatchAnswers({});
    setShowConfetti(false);
  }, [questionIndex, timerSeconds]);

  // Countdown timer
  useEffect(() => {
    if (phase !== 'ANSWERING') return;
    if (timeLeft <= 0) {
      handleTimeout();
      return;
    }

    const timerId = window.setTimeout(() => {
      const next = timeLeft - 1;
      setTimeLeft(next);
      if (next > 0 && next <= 5) {
        playTickSound(muted);
      }
    }, 1000);

    return () => window.clearTimeout(timerId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, timeLeft, muted]);

  function getCorrectSummary(q: GameQuestion): string {
    if (q.type === 'multiple_choice' || q.type === 'bonus') {
      return `${CHOICE_LETTERS[q.correctIndex]}. ${q.options[q.correctIndex]}`;
    }
    if (q.type === 'true_false') {
      return q.correctAnswer ? 'ถูก (ใช่)' : 'ผิด (ไม่ใช่)';
    }
    if (q.type === 'special_mission' && q.missionMode === 'classify') {
      return q.items
        .map((it) => `${it.label} → ${q.buckets[it.correctBucketIndex]}`)
        .join(' | ');
    }
    if (q.type === 'special_mission' && q.missionMode === 'match') {
      return q.pairs.map((p) => `${p.left} = ${p.right}`).join(' | ');
    }
    return '';
  }

  function finalizeOutcome(isCorrect: boolean, isTimedOut: boolean) {
    const q = currentQuestion;
    const earned = isCorrect ? q.points : 0;
    const praise = PRAISE_MESSAGES[Math.floor(Math.random() * PRAISE_MESSAGES.length)];

    if (isCorrect) {
      if (q.type === 'bonus' || q.type === 'special_mission') {
        playBonusSound(muted);
      } else {
        playCorrectSound(muted);
      }
      setShowConfetti(true);
    } else {
      playWrongSound(muted);
    }

    onRecordScore(activeTeamIndex, earned, q.type, isCorrect);
    setOutcome({
      isCorrect,
      isTimedOut,
      pointsEarned: earned,
      praiseText: praise,
      correctSummary: getCorrectSummary(q),
      explanation: q.explanation,
    });
    setPhase('FEEDBACK');
  }

  function handleTimeout() {
    if (phase !== 'ANSWERING') return;
    finalizeOutcome(false, true);
  }

  function handleChoiceSelect(index: number) {
    if (phase !== 'ANSWERING') return;
    if (currentQuestion.type !== 'multiple_choice' && currentQuestion.type !== 'bonus') return;
    setSelectedChoice(index);
    finalizeOutcome(index === currentQuestion.correctIndex, false);
  }

  function handleTrueFalseSelect(val: boolean) {
    if (phase !== 'ANSWERING') return;
    if (currentQuestion.type !== 'true_false') return;
    setSelectedTrueFalse(val);
    finalizeOutcome(val === currentQuestion.correctAnswer, false);
  }

  function handleClassifySubmit(q: ClassifyMissionQuestion) {
    if (phase !== 'ANSWERING') return;
    const allAnswered = q.items.every((it) => classifyAnswers[it.id] !== undefined);
    if (!allAnswered) return;
    const allCorrect = q.items.every((it) => classifyAnswers[it.id] === it.correctBucketIndex);
    finalizeOutcome(allCorrect, false);
  }

  function handleMatchRightClick(rightPairId: string) {
    if (phase !== 'ANSWERING') return;
    if (!selectedLeftId) return;
    playClickSound(muted);

    setMatchAnswers((prev) => {
      const next = { ...prev };
      // Remove any existing link that pointed to the same rightPairId so pairs stay 1-to-1
      for (const leftKey of Object.keys(next)) {
        if (next[leftKey] === rightPairId) {
          delete next[leftKey];
        }
      }
      next[selectedLeftId] = rightPairId;
      return next;
    });
    setSelectedLeftId(null);
  }

  function handleMatchSubmit(q: MatchMissionQuestion) {
    if (phase !== 'ANSWERING') return;
    const allMatched = q.pairs.every((p) => Boolean(matchAnswers[p.id]));
    if (!allMatched) return;
    const allCorrect = q.pairs.every((p) => matchAnswers[p.id] === p.id);
    finalizeOutcome(allCorrect, false);
  }

  function handleNextStep() {
    playClickSound(muted);
    if (questionIndex + 1 >= deck.length) {
      onFinishGame();
    } else {
      setQuestionIndex((prev) => prev + 1);
    }
  }

  // Keyboard shortcuts for 4-choice (1-4) and next step (Enter)
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (phase === 'ANSWERING') {
        if (currentQuestion.type === 'multiple_choice' || currentQuestion.type === 'bonus') {
          if (['1', '2', '3', '4'].includes(e.key)) {
            handleChoiceSelect(Number(e.key) - 1);
          }
        }
      } else if (phase === 'FEEDBACK' && e.key === 'Enter') {
        handleNextStep();
      }
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, currentQuestion, questionIndex]);

  const progressPercent = Math.round(((questionIndex + (phase === 'FEEDBACK' ? 1 : 0)) / deck.length) * 100);
  const timerPercent = Math.max(0, (timeLeft / timerSeconds) * 100);
  const isUrgent = phase === 'ANSWERING' && timeLeft <= 5;

  const isBonus = currentQuestion.type === 'bonus';
  const isSpecial = currentQuestion.type === 'special_mission';

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 py-5 sm:py-7 space-y-5">
      <ConfettiBurst points={outcome?.pointsEarned ?? 0} visible={showConfetti} />

      {/* Live Team Scoreboard Strip */}
      <section aria-label="กระดานคะแนนทีม" className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {teams.map((team, idx) => {
          const isActive = idx === activeTeamIndex;
          return (
            <div
              key={team.id}
              className={`rounded-2xl p-3.5 transition-all border flex items-center gap-3 ${
                isActive
                  ? 'bg-[#ECFDF3] border-[#16A34A] ring-2 ring-[#16A34A]/30 shadow-xs'
                  : 'bg-white border-[#D8EAD2]'
              }`}
            >
              <MascotAvatar mascotId={team.mascotId} size="sm" />
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-1">
                  <p className="font-display text-sm font-bold text-[#132A1C] truncate">
                    {team.name}
                  </p>
                </div>
                <div className="flex items-center justify-between gap-2 mt-0.5">
                  <span className="font-mono text-lg font-bold text-[#15803D] tabular-nums">
                    {team.score} <span className="font-sans text-xs font-medium text-[#3F624C]">คะแนน</span>
                  </span>
                  {isActive && (
                    <span className="text-xs font-bold text-[#14532D] shrink-0">
                      ▶ กำลังตอบ
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Main Question Arena Card */}
      <section
        className={`rounded-3xl border p-5 sm:p-8 shadow-xs space-y-6 transition-colors ${
          isBonus
            ? 'bg-[#FFFDF0] border-[#FACC15]'
            : isSpecial
              ? 'bg-[#F5FDFB] border-[#5EEAD4]'
              : 'bg-white border-[#D8EAD2]'
        }`}
      >
        {/* Top HUD: Progress, Metadata, Timer & Audio controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#E4EFE0]">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-sm text-[#3F624C]">
              <span className="font-display font-bold text-[#14532D] tabular-nums">
                ข้อที่ {questionIndex + 1} / {deck.length}
              </span>
              <span aria-hidden="true">·</span>
              <span>{TOPICS[currentQuestion.topic].shortTitle}</span>
              <span aria-hidden="true">·</span>
              <span
                className={`font-semibold ${
                  isBonus
                    ? 'text-[#A16207]'
                    : isSpecial
                      ? 'text-[#0F766E]'
                      : 'text-[#15803D]'
                }`}
              >
                {getQuestionTypeLabel(currentQuestion)}
              </span>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-40 sm:w-56 h-2 rounded-full bg-[#E6F1E2] overflow-hidden">
                <div
                  className="h-full bg-[#16A34A] transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <span className="text-xs font-medium text-[#4B6B56] tabular-nums">
                คืบหน้า {progressPercent}%
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between md:justify-end gap-3">
            {/* Countdown Timer */}
            <div
              className={`flex items-center gap-2.5 px-4 py-2 rounded-xl border font-mono font-bold tabular-nums ${
                isUrgent
                  ? 'bg-[#FEF2F2] border-[#EF4444] text-[#B91C1C]'
                  : 'bg-white border-[#D8EAD2] text-[#14532D]'
              }`}
              aria-live="polite"
            >
              {isUrgent ? (
                <AlertTriangle className="w-4 h-4 text-[#DC2626]" />
              ) : (
                <Clock className="w-4 h-4 text-[#16A34A]" />
              )}
              <span className="text-lg">{timeLeft}</span>
              <span className="font-sans text-xs font-medium">วินาที</span>
            </div>

            <button
              type="button"
              onClick={onToggleMute}
              title={muted ? 'เปิดเสียงเอฟเฟกต์' : 'ปิดเสียงเอฟเฟกต์'}
              aria-label={muted ? 'เปิดเสียงเอฟเฟกต์' : 'ปิดเสียงเอฟเฟกต์'}
              className="p-2.5 rounded-xl bg-white border border-[#D8EAD2] text-[#2E523B] hover:bg-[#F4FAF2] cursor-pointer"
            >
              {muted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>

            <button
              type="button"
              onClick={onRestartGame}
              title="เริ่มเกมใหม่"
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-white border border-[#D8EAD2] text-sm font-semibold text-[#2E523B] hover:bg-[#F4FAF2] cursor-pointer whitespace-nowrap"
            >
              <RotateCcw className="w-4 h-4" />
              <span className="hidden sm:inline">เริ่มใหม่</span>
            </button>
          </div>
        </div>

        {/* Visual Timer Bar */}
        <div className="w-full h-2.5 rounded-full bg-[#E8F1E5] overflow-hidden -mt-2">
          <div
            className={`h-full transition-all duration-700 ease-linear ${
              isUrgent ? 'bg-[#EF4444]' : isBonus ? 'bg-[#EAB308]' : 'bg-[#22C55E]'
            }`}
            style={{ width: `${timerPercent}%` }}
          />
        </div>

        {/* Active Team Banner */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <MascotAvatar mascotId={activeTeam.mascotId} size="md" />
            <div>
              <p className="text-xs font-medium text-[#4B6B56]">ตาของทีมที่กำลังตอบ</p>
              <p className="font-display text-lg font-bold text-[#132A1C]">{activeTeam.name}</p>
            </div>
          </div>

          {(isBonus || isSpecial) && (
            <div
              className={`flex items-center gap-2 text-sm font-bold ${
                isBonus ? 'text-[#A16207]' : 'text-[#0F766E]'
              }`}
            >
              {isBonus ? <Sparkles className="w-5 h-5" /> : <Award className="w-5 h-5" />}
              <span>
                {isBonus
                  ? 'รอบโบนัสพิเศษ! ตอบถูกรับ 20 คะแนน'
                  : 'ภารกิจพิเศษ! ทำสำเร็จรับ 15 คะแนน'}
              </span>
            </div>
          )}
        </div>

        {/* Prompt */}
        <h2 className="font-display text-xl sm:text-2xl font-bold text-[#132A1C] leading-snug text-balance">
          {currentQuestion.prompt}
        </h2>

        {/* Interactive Question Controls */}
        {(currentQuestion.type === 'multiple_choice' || currentQuestion.type === 'bonus') && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {currentQuestion.options.map((opt, idx) => {
              const isSelected = selectedChoice === idx;
              const isCorrectChoice = idx === currentQuestion.correctIndex;

              let btnClass =
                'bg-white border-[#CBE0C5] hover:border-[#16A34A] hover:bg-[#F6FAF4] text-[#132A1C]';
              if (phase === 'FEEDBACK') {
                if (isCorrectChoice) {
                  btnClass = 'bg-[#DCFCE7] border-[#16A34A] text-[#14532D] ring-2 ring-[#16A34A]/30';
                } else if (isSelected && !isCorrectChoice) {
                  btnClass = 'bg-[#FEE2E2] border-[#EF4444] text-[#991B1B]';
                } else {
                  btnClass = 'bg-[#F8FAF7] border-[#E5EDE2] text-[#64748B] opacity-75';
                }
              }

              return (
                <button
                  key={idx}
                  type="button"
                  disabled={phase === 'FEEDBACK'}
                  onClick={() => handleChoiceSelect(idx)}
                  className={`min-h-[64px] p-4 rounded-2xl border-2 text-left flex items-center gap-3.5 transition-all ${
                    phase === 'ANSWERING' ? 'cursor-pointer active:scale-[0.99]' : 'cursor-default'
                  } ${btnClass}`}
                >
                  <span
                    className={`w-9 h-9 rounded-xl font-display font-bold text-base flex items-center justify-center shrink-0 ${
                      phase === 'FEEDBACK' && isCorrectChoice
                        ? 'bg-[#16A34A] text-white'
                        : phase === 'FEEDBACK' && isSelected && !isCorrectChoice
                          ? 'bg-[#DC2626] text-white'
                          : 'bg-[#ECFDF3] text-[#15803D] border border-[#BBF7D0]'
                    }`}
                  >
                    {CHOICE_LETTERS[idx]}
                  </span>
                  <span className="text-base sm:text-lg font-medium leading-snug flex-1">
                    {opt}
                  </span>
                  {phase === 'FEEDBACK' && isCorrectChoice && (
                    <CheckCircle2 className="w-5 h-5 text-[#16A34A] shrink-0" />
                  )}
                  {phase === 'FEEDBACK' && isSelected && !isCorrectChoice && (
                    <XCircle className="w-5 h-5 text-[#DC2626] shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        )}

        {currentQuestion.type === 'true_false' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: 'ถูก (ใช่)', value: true },
              { label: 'ผิด (ไม่ใช่)', value: false },
            ].map((choice) => {
              const isSelected = selectedTrueFalse === choice.value;
              const isCorrectChoice = choice.value === currentQuestion.correctAnswer;

              let btnClass =
                'bg-white border-[#CBE0C5] hover:border-[#16A34A] hover:bg-[#F6FAF4] text-[#132A1C]';
              if (phase === 'FEEDBACK') {
                if (isCorrectChoice) {
                  btnClass = 'bg-[#DCFCE7] border-[#16A34A] text-[#14532D] ring-2 ring-[#16A34A]/30';
                } else if (isSelected && !isCorrectChoice) {
                  btnClass = 'bg-[#FEE2E2] border-[#EF4444] text-[#991B1B]';
                } else {
                  btnClass = 'bg-[#F8FAF7] border-[#E5EDE2] text-[#64748B] opacity-75';
                }
              }

              return (
                <button
                  key={String(choice.value)}
                  type="button"
                  disabled={phase === 'FEEDBACK'}
                  onClick={() => handleTrueFalseSelect(choice.value)}
                  className={`min-h-[84px] p-5 rounded-2xl border-2 flex items-center justify-center gap-3 font-display text-xl font-bold transition-all ${
                    phase === 'ANSWERING' ? 'cursor-pointer active:scale-[0.99]' : 'cursor-default'
                  } ${btnClass}`}
                >
                  {choice.value ? (
                    <CheckCircle2 className="w-6 h-6 text-[#16A34A]" />
                  ) : (
                    <XCircle className="w-6 h-6 text-[#DC2626]" />
                  )}
                  <span>{choice.label}</span>
                </button>
              );
            })}
          </div>
        )}

        {currentQuestion.type === 'special_mission' &&
          currentQuestion.missionMode === 'classify' && (
            <div className="space-y-4">
              <p className="text-sm text-[#0F766E] font-medium">
                เลือกว่าแต่ละรายการอยู่กลุ่มไหนให้ครบทั้ง 3 ข้อ แล้วกดยืนยันคำตอบภารกิจ
              </p>
              <div className="space-y-3">
                {currentQuestion.items.map((item) => {
                  const chosenBucket = classifyAnswers[item.id];
                  return (
                    <div
                      key={item.id}
                      className="p-4 rounded-2xl bg-white border border-[#B2EAE0] flex flex-col md:flex-row md:items-center justify-between gap-3"
                    >
                      <span className="font-semibold text-base text-[#132A1C]">
                        {item.label}
                      </span>
                      <div className="grid grid-cols-2 gap-2.5 shrink-0">
                        {currentQuestion.buckets.map((bucketLabel, bIdx) => {
                          const bucketIndex = bIdx as 0 | 1;
                          const isPicked = chosenBucket === bucketIndex;
                          const isRightBucket = item.correctBucketIndex === bucketIndex;

                          let bClass =
                            'bg-[#F8FCF6] border-[#DCEAD7] text-[#2E523B] hover:border-[#0D9488]';
                          if (phase === 'ANSWERING' && isPicked) {
                            bClass = 'bg-[#0D9488] border-[#0F766E] text-white';
                          } else if (phase === 'FEEDBACK') {
                            if (isRightBucket) {
                              bClass = 'bg-[#DCFCE7] border-[#16A34A] text-[#14532D] font-bold';
                            } else if (isPicked && !isRightBucket) {
                              bClass = 'bg-[#FEE2E2] border-[#EF4444] text-[#991B1B]';
                            }
                          }

                          return (
                            <button
                              key={bucketIndex}
                              type="button"
                              disabled={phase === 'FEEDBACK'}
                              onClick={() => {
                                playClickSound(muted);
                                setClassifyAnswers((prev) => ({
                                  ...prev,
                                  [item.id]: bucketIndex,
                                }));
                              }}
                              className={`px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-semibold transition-all ${
                                phase === 'ANSWERING' ? 'cursor-pointer' : 'cursor-default'
                              } ${bClass}`}
                            >
                              {bucketLabel}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>

              {phase === 'ANSWERING' && (
                <div className="flex justify-end pt-1">
                  <button
                    type="button"
                    disabled={
                      !currentQuestion.items.every((it) => classifyAnswers[it.id] !== undefined)
                    }
                    onClick={() => handleClassifySubmit(currentQuestion)}
                    className="px-6 py-3 rounded-xl bg-[#0D9488] hover:bg-[#0F766E] disabled:opacity-45 disabled:cursor-not-allowed text-white font-display font-bold text-base transition-all cursor-pointer"
                  >
                    ยืนยันคำตอบภารกิจ (+15 คะแนน)
                  </button>
                </div>
              )}
            </div>
          )}

        {currentQuestion.type === 'special_mission' &&
          currentQuestion.missionMode === 'match' && (
            <div className="space-y-4">
              <p className="text-sm text-[#0F766E] font-medium">
                แตะรายการฝั่งซ้าย แล้วแตะคำตอบฝั่งขวาที่คู่กันให้ครบทั้ง 3 คู่ จากนั้นกดยืนยัน
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Left Column */}
                <div className="space-y-2.5">
                  <p className="text-xs font-bold text-[#3F624C] px-1">
                    {currentQuestion.leftHeader}
                  </p>
                  {currentQuestion.pairs.map((pair, idx) => {
                    const isSelected = selectedLeftId === pair.id;
                    const pairedRightId = matchAnswers[pair.id];
                    const isMatchedCorrectly =
                      phase === 'FEEDBACK' && pairedRightId === pair.id;
                    const isMatchedWrong =
                      phase === 'FEEDBACK' && pairedRightId && pairedRightId !== pair.id;

                    let cardClass = 'bg-white border-[#CBE0C5] text-[#132A1C]';
                    if (phase === 'ANSWERING') {
                      if (isSelected) {
                        cardClass = 'bg-[#FEF9C3] border-[#EAB308] text-[#854D0E] ring-2 ring-[#EAB308]/30';
                      } else if (pairedRightId) {
                        cardClass = 'bg-[#ECFDF3] border-[#16A34A] text-[#14532D]';
                      }
                    } else {
                      if (isMatchedCorrectly) {
                        cardClass = 'bg-[#DCFCE7] border-[#16A34A] text-[#14532D]';
                      } else if (isMatchedWrong) {
                        cardClass = 'bg-[#FEE2E2] border-[#EF4444] text-[#991B1B]';
                      }
                    }

                    return (
                      <button
                        key={pair.id}
                        type="button"
                        disabled={phase === 'FEEDBACK'}
                        onClick={() => {
                          playClickSound(muted);
                          setSelectedLeftId(pair.id);
                        }}
                        className={`w-full p-3.5 rounded-xl border-2 text-left flex items-center justify-between gap-2 transition-all ${
                          phase === 'ANSWERING' ? 'cursor-pointer' : 'cursor-default'
                        } ${cardClass}`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="w-7 h-7 rounded-lg bg-[#14532D] text-white font-mono text-xs font-bold flex items-center justify-center shrink-0">
                            {idx + 1}
                          </span>
                          <span className="font-semibold text-sm sm:text-base">{pair.left}</span>
                        </div>
                        {pairedRightId && (
                          <span className="text-xs font-bold text-[#15803D] shrink-0">
                            จับคู่แล้ว
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Right Column */}
                <div className="space-y-2.5">
                  <p className="text-xs font-bold text-[#3F624C] px-1">
                    {currentQuestion.rightHeader}
                  </p>
                  {shuffledRightPairs.map((rightPair) => {
                    // Find which left item index (1, 2, 3) is currently matched to this right item
                    const linkedLeftIndex = currentQuestion.pairs.findIndex(
                      (p) => matchAnswers[p.id] === rightPair.id
                    );

                    let rightClass =
                      'bg-white border-[#CBE0C5] text-[#132A1C] hover:border-[#0D9488]';
                    if (phase === 'ANSWERING' && linkedLeftIndex !== -1) {
                      rightClass = 'bg-[#ECFDF3] border-[#16A34A] text-[#14532D]';
                    } else if (phase === 'FEEDBACK') {
                      const wasRight =
                        linkedLeftIndex !== -1 &&
                        currentQuestion.pairs[linkedLeftIndex].id === rightPair.id;
                      if (wasRight) {
                        rightClass = 'bg-[#DCFCE7] border-[#16A34A] text-[#14532D]';
                      }
                    }

                    return (
                      <button
                        key={rightPair.id}
                        type="button"
                        disabled={phase === 'FEEDBACK' || !selectedLeftId}
                        onClick={() => handleMatchRightClick(rightPair.id)}
                        className={`w-full p-3.5 rounded-xl border-2 text-left flex items-center justify-between gap-2 transition-all ${
                          phase === 'ANSWERING' && selectedLeftId
                            ? 'cursor-pointer ring-1 ring-[#0D9488]/30'
                            : 'cursor-default'
                        } ${rightClass}`}
                      >
                        <span className="text-sm sm:text-base font-medium">{rightPair.right}</span>
                        {linkedLeftIndex !== -1 && (
                          <span className="px-2 py-1 rounded-lg bg-[#16A34A] text-white font-mono text-xs font-bold shrink-0">
                            คู่ {linkedLeftIndex + 1}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {phase === 'ANSWERING' && (
                <div className="flex justify-end pt-1">
                  <button
                    type="button"
                    disabled={!currentQuestion.pairs.every((p) => Boolean(matchAnswers[p.id]))}
                    onClick={() => handleMatchSubmit(currentQuestion)}
                    className="px-6 py-3 rounded-xl bg-[#0D9488] hover:bg-[#0F766E] disabled:opacity-45 disabled:cursor-not-allowed text-white font-display font-bold text-base transition-all cursor-pointer"
                  >
                    ยืนยันคำตอบภารกิจ (+15 คะแนน)
                  </button>
                </div>
              )}
            </div>
          )}

        {/* Immediate Feedback Panel */}
        {phase === 'FEEDBACK' && outcome && (
          <div
            className={`p-5 sm:p-6 rounded-2xl border-2 space-y-4 ${
              outcome.isCorrect
                ? 'bg-[#ECFDF3] border-[#16A34A]'
                : 'bg-[#FFF7ED] border-[#F97316]'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                {outcome.isCorrect ? (
                  <div className="w-11 h-11 rounded-xl bg-[#16A34A] text-white flex items-center justify-center shrink-0">
                    <Check className="w-6 h-6" />
                  </div>
                ) : (
                  <div className="w-11 h-11 rounded-xl bg-[#EA580C] text-white flex items-center justify-center shrink-0">
                    {outcome.isTimedOut ? (
                      <Clock className="w-6 h-6" />
                    ) : (
                      <XCircle className="w-6 h-6" />
                    )}
                  </div>
                )}

                <div>
                  <h3
                    className={`font-display text-xl font-bold ${
                      outcome.isCorrect ? 'text-[#14532D]' : 'text-[#9A3412]'
                    }`}
                  >
                    {outcome.isCorrect
                      ? outcome.praiseText
                      : outcome.isTimedOut
                        ? 'หมดเวลาแล้ว! น่าเสียดายจัง'
                        : 'ยังไม่ถูกนะ ลองดูเฉลยกัน!'}
                  </h3>
                  <p className="text-sm font-medium text-[#2E523B]">
                    {outcome.isCorrect
                      ? `${activeTeam.name} ได้รับ +${outcome.pointsEarned} คะแนน`
                      : `${activeTeam.name} ยังไม่ได้คะแนนในข้อนี้`}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleNextStep}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#14532D] hover:bg-[#166534] text-white font-display font-bold text-sm sm:text-base transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                <span>
                  {questionIndex + 1 >= deck.length
                    ? 'ดูสรุปผลคะแนนรวม'
                    : `ข้อถัดไป (${nextTeam.name})`}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {!outcome.isCorrect && (
              <div className="p-3.5 rounded-xl bg-white border border-[#FED7AA] text-sm text-[#132A1C]">
                <span className="font-bold text-[#9A3412]">เฉลยที่ถูกต้อง: </span>
                <span className="font-semibold">{outcome.correctSummary}</span>
              </div>
            )}

            <p className="text-sm sm:text-base text-[#1E3A28] leading-relaxed">
              <strong>คำอธิบายเพิ่มเติม:</strong> {outcome.explanation}
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
