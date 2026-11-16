import { useEffect } from 'react';
import { BookOpen, Medal, RotateCcw, Settings2, Trophy } from 'lucide-react';
import { Team } from '../types/game';
import { playVictorySound } from '../utils/sound';
import { MascotAvatar } from './MascotAvatar';

interface GameOverSummaryProps {
  teams: Team[];
  muted: boolean;
  onPlayAgainSameTeams: () => void;
  onOpenSetup: () => void;
  onOpenStudyGuide: () => void;
}

export function GameOverSummary({
  teams,
  muted,
  onPlayAgainSameTeams,
  onOpenSetup,
  onOpenStudyGuide,
}: GameOverSummaryProps) {
  useEffect(() => {
    playVictorySound(muted);
  }, [muted]);

  const sortedTeams = [...teams].sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return b.correctCount - a.correctCount;
  });

  const topScore = sortedTeams[0]?.score ?? 0;
  const winners = sortedTeams.filter((t) => t.score === topScore);
  const isTie = winners.length > 1;

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
      {/* Winner Hero Card */}
      <section className="bg-white border-2 border-[#FACC15] rounded-3xl p-6 sm:p-10 text-center space-y-5 shadow-xs">
        <div className="w-16 h-16 rounded-2xl bg-[#FEF9C3] border border-[#FDE047] flex items-center justify-center mx-auto">
          <Trophy className="w-9 h-9 text-[#CA8A04]" />
        </div>

        <div className="space-y-2">
          <p className="text-sm font-semibold text-[#15803D]">
            จบภารกิจพิชิตอาณาจักรพืชแล้ว!
          </p>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#132A1C]">
            {isTie
              ? `ผู้ชนะร่วม: ${winners.map((w) => w.name).join(' และ ')}`
              : `ขอแสดงความยินดีกับ ${winners[0]?.name}!`}
          </h1>
          <p className="text-base text-[#3F624C] font-mono tabular-nums">
            ทำคะแนนสูงสุดได้ถึง {topScore} คะแนน
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          {winners.map((winner) => (
            <div
              key={winner.id}
              className="flex items-center gap-3.5 px-5 py-3 rounded-2xl bg-[#ECFDF3] border border-[#86EFAC]"
            >
              <MascotAvatar mascotId={winner.mascotId} size="lg" />
              <div className="text-left">
                <p className="font-display text-lg font-bold text-[#14532D]">
                  {winner.name}
                </p>
                <p className="text-sm font-semibold text-[#15803D] font-mono tabular-nums">
                  {winner.score} คะแนน · ตอบถูก {winner.correctCount} ข้อ
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
          <button
            type="button"
            onClick={onPlayAgainSameTeams}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#16A34A] hover:bg-[#15803D] text-white font-display font-bold text-base transition-colors cursor-pointer"
          >
            <RotateCcw className="w-5 h-5" />
            <span>เล่นใหม่อีกครั้ง (สุ่มคำถามใหม่)</span>
          </button>

          <button
            type="button"
            onClick={onOpenSetup}
            className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-[#FEF9C3] hover:bg-[#FEF08A] border border-[#FDE047] text-[#854D0E] font-display font-bold text-base transition-colors cursor-pointer"
          >
            <Settings2 className="w-5 h-5" />
            <span>ตั้งค่าทีมใหม่</span>
          </button>

          <button
            type="button"
            onClick={onOpenStudyGuide}
            className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white hover:bg-[#F4FAF2] border border-[#D8EAD2] text-[#14532D] font-display font-semibold text-base transition-colors cursor-pointer"
          >
            <BookOpen className="w-5 h-5" />
            <span>ทบทวนบทเรียน</span>
          </button>
        </div>
      </section>

      {/* Complete Team Standings Table */}
      <section className="bg-white border border-[#D8EAD2] rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Medal className="w-5 h-5 text-[#16A34A]" />
          <h2 className="font-display text-xl font-bold text-[#132A1C]">
            ตารางอันดับและคะแนนรวมทุกทีม
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#E2EFE0] text-xs font-semibold text-[#4B6B56]">
                <th className="py-3 pr-3">อันดับ</th>
                <th className="py-3 px-3">ชื่อทีม</th>
                <th className="py-3 px-3 text-right">ตอบถูกรวม</th>
                <th className="py-3 px-3 text-right">ภารกิจพิเศษ</th>
                <th className="py-3 px-3 text-right">โบนัส</th>
                <th className="py-3 pl-3 text-right">คะแนนรวม</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EEF5EB] text-sm sm:text-base">
              {sortedTeams.map((team, idx) => {
                const rank = idx + 1;
                const isWinner = team.score === topScore;
                return (
                  <tr
                    key={team.id}
                    className={isWinner ? 'bg-[#F6FAF4] font-semibold' : ''}
                  >
                    <td className="py-3.5 pr-3 font-mono font-bold text-[#14532D] tabular-nums">
                      #{rank}
                    </td>
                    <td className="py-3.5 px-3">
                      <div className="flex items-center gap-3">
                        <MascotAvatar mascotId={team.mascotId} size="sm" />
                        <span className="font-display font-bold text-[#132A1C]">
                          {team.name}
                        </span>
                      </div>
                    </td>
                    <td className="py-3.5 px-3 text-right font-mono tabular-nums text-[#2E523B]">
                      {team.correctCount} ข้อ
                    </td>
                    <td className="py-3.5 px-3 text-right font-mono tabular-nums text-[#0F766E]">
                      {team.missionCount} ครั้ง
                    </td>
                    <td className="py-3.5 px-3 text-right font-mono tabular-nums text-[#A16207]">
                      {team.bonusCount} ครั้ง
                    </td>
                    <td className="py-3.5 pl-3 text-right font-mono font-bold text-lg text-[#15803D] tabular-nums">
                      {team.score}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
