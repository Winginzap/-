import { ArrowLeft, Clock, ListChecks, Play, Sparkles, Users } from 'lucide-react';
import { DEFAULT_TEAM_NAMES, MASCOTS, TOPICS } from '../data/questions';
import { GameSettings, Team, TopicId } from '../types/game';
import { MascotAvatar } from './MascotAvatar';

interface TeamSetupViewProps {
  settings: GameSettings;
  teams: Team[];
  onChangeSettings: (next: GameSettings) => void;
  onUpdateTeam: (index: number, patch: Partial<Team>) => void;
  onStartGame: () => void;
  onBack: () => void;
}

export function TeamSetupView({
  settings,
  teams,
  onChangeSettings,
  onUpdateTeam,
  onStartGame,
  onBack,
}: TeamSetupViewProps) {
  const activeTeams = teams.slice(0, settings.teamCount);

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-10 space-y-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[#15803D] hover:text-[#14532D] cursor-pointer mb-1"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>กลับหน้าหลัก</span>
          </button>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#132A1C]">
            ตั้งค่าทีมและกติการอบเกม
          </h1>
          <p className="text-sm sm:text-base text-[#3F624C]">
            ปรับจำนวนทีม ตั้งชื่อทีม เลือกเวลา และจำนวนคำถามก่อนเริ่มแข่งขัน
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Team count & Team customization */}
        <section className="lg:col-span-7 bg-white border border-[#D8EAD2] rounded-2xl p-6 space-y-6">
          <div className="space-y-3">
            <label className="flex items-center gap-2 font-display text-lg font-bold text-[#132A1C]">
              <Users className="w-5 h-5 text-[#16A34A]" />
              <span>จำนวนทีมที่เข้าแข่งขัน (2–5 ทีม)</span>
            </label>
            <div className="grid grid-cols-4 gap-3">
              {[2, 3, 4, 5].map((count) => {
                const selected = settings.teamCount === count;
                return (
                  <button
                    key={count}
                    type="button"
                    onClick={() => onChangeSettings({ ...settings, teamCount: count })}
                    className={`py-3 px-4 rounded-xl font-display text-base font-bold transition-all cursor-pointer border-2 whitespace-nowrap ${
                      selected
                        ? 'bg-[#16A34A] text-white border-[#15803D] shadow-xs'
                        : 'bg-[#F8FCF6] text-[#1E3A28] border-[#DCEAD7] hover:border-[#86EFAC]'
                    }`}
                  >
                    {count} ทีม
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-3 pt-2 border-t border-[#E6F1E2]">
            <p className="font-display text-base font-bold text-[#132A1C]">
              รายชื่อทีมและตัวการ์ตูนประจำทีม
            </p>
            <div className="space-y-3">
              {activeTeams.map((team, idx) => (
                <div
                  key={team.id}
                  className="p-3.5 rounded-xl bg-[#F8FCF6] border border-[#DCEAD7] flex flex-col sm:flex-row sm:items-center gap-3"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <MascotAvatar mascotId={team.mascotId} size="md" />
                    <div className="flex-1 min-w-0">
                      <label
                        htmlFor={`team-name-${idx}`}
                        className="block text-xs font-medium text-[#3F624C] mb-1"
                      >
                        ทีมที่ {idx + 1}
                      </label>
                      <input
                        id={`team-name-${idx}`}
                        type="text"
                        maxLength={24}
                        value={team.name}
                        placeholder={DEFAULT_TEAM_NAMES[idx]}
                        onChange={(e) => onUpdateTeam(idx, { name: e.target.value })}
                        className="w-full px-3 py-2 text-sm sm:text-base font-semibold text-[#132A1C] bg-white border border-[#CBE0C5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#16A34A]"
                      />
                    </div>
                  </div>

                  {/* Quick Mascot Switcher */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    {MASCOTS.map((m) => {
                      const isPicked = team.mascotId === m.id;
                      return (
                        <button
                          key={m.id}
                          type="button"
                          title={m.name}
                          aria-label={`เลือก${m.name}ให้ทีมที่ ${idx + 1}`}
                          onClick={() => onUpdateTeam(idx, { mascotId: m.id })}
                          className={`p-0.5 rounded-lg transition-transform cursor-pointer ${
                            isPicked
                              ? 'ring-2 ring-[#16A34A] scale-105 bg-white'
                              : 'opacity-60 hover:opacity-100'
                          }`}
                        >
                          <MascotAvatar mascotId={m.id} size="sm" />
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Right: Timer, question count, topic & Start button */}
        <section className="lg:col-span-5 bg-white border border-[#D8EAD2] rounded-2xl p-6 space-y-6">
          {/* Timer */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 font-display text-base font-bold text-[#132A1C]">
              <Clock className="w-5 h-5 text-[#CA8A04]" />
              <span>เวลาตอบคำถามต่อข้อ</span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              {([15, 20] as const).map((sec) => {
                const selected = settings.timerSeconds === sec;
                return (
                  <button
                    key={sec}
                    type="button"
                    onClick={() => onChangeSettings({ ...settings, timerSeconds: sec })}
                    className={`py-3 px-4 rounded-xl font-display font-bold text-base transition-all cursor-pointer border-2 ${
                      selected
                        ? 'bg-[#FEF9C3] text-[#854D0E] border-[#EAB308]'
                        : 'bg-[#F8FCF6] text-[#1E3A28] border-[#DCEAD7] hover:border-[#FDE047]'
                    }`}
                  >
                    {sec} วินาที
                  </button>
                );
              })}
            </div>
          </div>

          {/* Total Questions */}
          <div className="space-y-3 pt-2 border-t border-[#E6F1E2]">
            <label className="flex items-center gap-2 font-display text-base font-bold text-[#132A1C]">
              <ListChecks className="w-5 h-5 text-[#16A34A]" />
              <span>จำนวนคำถามในรอบนี้ (สุ่มใหม่ทุกเกม)</span>
            </label>
            <div className="grid grid-cols-3 gap-3">
              {([20, 25, 30] as const).map((qty) => {
                const selected = settings.totalQuestions === qty;
                return (
                  <button
                    key={qty}
                    type="button"
                    onClick={() => onChangeSettings({ ...settings, totalQuestions: qty })}
                    className={`py-3 px-3 rounded-xl font-display font-bold text-base transition-all cursor-pointer border-2 ${
                      selected
                        ? 'bg-[#16A34A] text-white border-[#15803D]'
                        : 'bg-[#F8FCF6] text-[#1E3A28] border-[#DCEAD7] hover:border-[#86EFAC]'
                    }`}
                  >
                    {qty} ข้อ
                  </button>
                );
              })}
            </div>
          </div>

          {/* Topic Filter */}
          <div className="space-y-3 pt-2 border-t border-[#E6F1E2]">
            <label className="flex items-center gap-2 font-display text-base font-bold text-[#132A1C]">
              <Sparkles className="w-5 h-5 text-[#0D9488]" />
              <span>ขอบเขตเนื้อหาที่ต้องการสุ่ม</span>
            </label>
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => onChangeSettings({ ...settings, topicFilter: 'all' })}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold border transition-all cursor-pointer ${
                  settings.topicFilter === 'all'
                    ? 'bg-[#ECFDF3] text-[#14532D] border-[#16A34A]'
                    : 'bg-[#F8FCF6] text-[#2E523B] border-[#DCEAD7] hover:border-[#86EFAC]'
                }`}
              >
                รวมทุกหัวข้อในบทที่ 3 (แนะนำ)
              </button>
              {(Object.keys(TOPICS) as TopicId[]).map((tid) => {
                const selected = settings.topicFilter === tid;
                return (
                  <button
                    key={tid}
                    type="button"
                    onClick={() => onChangeSettings({ ...settings, topicFilter: tid })}
                    className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium border transition-all cursor-pointer ${
                      selected
                        ? 'bg-[#ECFDF3] text-[#14532D] border-[#16A34A] font-semibold'
                        : 'bg-[#F8FCF6] text-[#2E523B] border-[#DCEAD7] hover:border-[#86EFAC]'
                    }`}
                  >
                    เน้น{TOPICS[tid].title}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={onStartGame}
              className="w-full py-4 px-6 rounded-xl bg-[#16A34A] hover:bg-[#15803D] active:scale-[0.99] text-white font-display text-lg font-bold shadow-sm transition-all flex items-center justify-center gap-2.5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16A34A] focus-visible:ring-offset-2"
            >
              <Play className="w-5 h-5 fill-current" />
              <span>เริ่มภารกิจเลย!</span>
            </button>
            <p className="text-xs text-center text-[#4B6B56] mt-2.5">
              ตอบถูก +10 · ภารกิจพิเศษ +15 · คำถามโบนัส +20 คะแนน
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
