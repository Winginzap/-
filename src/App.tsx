/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { GameOverSummary } from './components/GameOverSummary';
import { GamePlayArena } from './components/GamePlayArena';
import { Navbar } from './components/Navbar';
import { StudyGuideView } from './components/StudyGuideView';
import { TeamSetupView } from './components/TeamSetupView';
import { TitleLandingView } from './components/TitleLandingView';
import { buildGameDeck, DEFAULT_TEAM_NAMES, MASCOTS } from './data/questions';
import { AppScreen, GameQuestion, GameSettings, Team } from './types/game';
import { playClickSound } from './utils/sound';

function createInitialTeams(): Team[] {
  return DEFAULT_TEAM_NAMES.map((name, idx) => ({
    id: `team-${idx + 1}`,
    name,
    mascotId: MASCOTS[idx].id,
    score: 0,
    correctCount: 0,
    missionCount: 0,
    bonusCount: 0,
    streak: 0,
  }));
}

export default function App() {
  const [screen, setScreen] = useState<AppScreen>('TITLE_MENU');
  const [settings, setSettings] = useState<GameSettings>({
    teamCount: 2,
    timerSeconds: 20,
    totalQuestions: 20,
    topicFilter: 'all',
  });
  const [teams, setTeams] = useState<Team[]>(createInitialTeams);
  const [deck, setDeck] = useState<GameQuestion[]>([]);
  const [gameRunId, setGameRunId] = useState(0);
  const [muted, setMuted] = useState(false);

  function handleUpdateTeam(index: number, patch: Partial<Team>) {
    setTeams((prev) =>
      prev.map((team, i) => (i === index ? { ...team, ...patch } : team))
    );
  }

  function startNewGameWithCurrentTeams() {
    playClickSound(muted);
    const activeTeams = teams.slice(0, settings.teamCount).map((t, idx) => ({
      ...t,
      name: t.name.trim() || DEFAULT_TEAM_NAMES[idx],
      score: 0,
      correctCount: 0,
      missionCount: 0,
      bonusCount: 0,
      streak: 0,
    }));

    setTeams((prev) =>
      prev.map((t, idx) =>
        idx < activeTeams.length ? activeTeams[idx] : { ...t, score: 0, correctCount: 0, missionCount: 0, bonusCount: 0, streak: 0 }
      )
    );

    const freshDeck = buildGameDeck(settings.totalQuestions, settings.topicFilter);
    setDeck(freshDeck);
    setGameRunId((prev) => prev + 1);
    setScreen('PLAYING');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleRecordScore(
    teamIndex: number,
    points: number,
    questionType: GameQuestion['type'],
    isCorrect: boolean
  ) {
    setTeams((prev) =>
      prev.map((team, idx) => {
        if (idx !== teamIndex) return team;
        if (!isCorrect) {
          return { ...team, streak: 0 };
        }
        return {
          ...team,
          score: team.score + points,
          correctCount: team.correctCount + 1,
          missionCount:
            questionType === 'special_mission' ? team.missionCount + 1 : team.missionCount,
          bonusCount: questionType === 'bonus' ? team.bonusCount + 1 : team.bonusCount,
          streak: team.streak + 1,
        };
      })
    );
  }

  function handleJumpToRules() {
    if (screen !== 'TITLE_MENU') {
      setScreen('TITLE_MENU');
      window.setTimeout(() => {
        document.getElementById('rules-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 60);
    } else {
      document.getElementById('rules-section')?.scrollIntoView({ behavior: 'smooth' });
    }
  }

  const playingTeams = teams.slice(0, settings.teamCount);

  return (
    <div className="min-h-screen flex flex-col bg-[#F5FAF3] text-[#132A1C]">
      <Navbar
        currentScreen={screen}
        onNavigateHome={() => {
          setScreen('TITLE_MENU');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenSetup={() => {
          setScreen('SETUP');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenStudyGuide={() => {
          setScreen('STUDY_GUIDE');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onJumpToRules={handleJumpToRules}
      />

      <div className="flex-1">
        {screen === 'TITLE_MENU' && (
          <TitleLandingView
            onStartSetup={() => {
              setScreen('SETUP');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenStudyGuide={() => {
              setScreen('STUDY_GUIDE');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {screen === 'STUDY_GUIDE' && (
          <StudyGuideView
            onBack={() => {
              setScreen('TITLE_MENU');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onStartSetup={() => {
              setScreen('SETUP');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {screen === 'SETUP' && (
          <TeamSetupView
            settings={settings}
            teams={teams}
            onChangeSettings={setSettings}
            onUpdateTeam={handleUpdateTeam}
            onStartGame={startNewGameWithCurrentTeams}
            onBack={() => {
              setScreen('TITLE_MENU');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {screen === 'PLAYING' && deck.length > 0 && (
          <GamePlayArena
            key={gameRunId}
            deck={deck}
            teams={playingTeams}
            timerSeconds={settings.timerSeconds}
            muted={muted}
            onToggleMute={() => setMuted((m) => !m)}
            onRecordScore={handleRecordScore}
            onFinishGame={() => {
              setScreen('GAME_OVER');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onRestartGame={() => {
              setScreen('SETUP');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {screen === 'GAME_OVER' && (
          <GameOverSummary
            teams={playingTeams}
            muted={muted}
            onPlayAgainSameTeams={startNewGameWithCurrentTeams}
            onOpenSetup={() => {
              setScreen('SETUP');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenStudyGuide={() => {
              setScreen('STUDY_GUIDE');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}
      </div>

      <footer className="border-t border-[#D8EAD2] bg-white/80 py-5 mt-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs sm:text-sm text-[#4B6B56]">
          <span>ภารกิจพิชิตอาณาจักรพืช · สื่อการเรียนรู้ชีววิทยา บทที่ 3 เรื่อง การดำรงชีวิตของพืช</span>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => {
                setScreen('STUDY_GUIDE');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-[#14532D] transition-colors cursor-pointer"
            >
              สรุปบทเรียน
            </button>
            <button
              type="button"
              onClick={() => {
                setScreen('SETUP');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-[#14532D] transition-colors cursor-pointer"
            >
              ตั้งค่าเกมใหม่
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
