import { AppScreen } from '../types/game';

interface NavbarProps {
  currentScreen: AppScreen;
  onNavigateHome: () => void;
  onOpenSetup: () => void;
  onOpenStudyGuide: () => void;
  onJumpToRules: () => void;
}

export function Navbar({
  currentScreen,
  onNavigateHome,
  onOpenSetup,
  onOpenStudyGuide,
  onJumpToRules,
}: NavbarProps) {
  const isPlaying = currentScreen === 'PLAYING';

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-[#D8EAD2]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand wordmark (single line, no badges or subtitles) */}
        <button
          type="button"
          onClick={onNavigateHome}
          className="font-display text-lg sm:text-xl font-bold tracking-tight text-[#14532D] hover:text-[#16A34A] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16A34A] rounded-md"
        >
          ภารกิจพิชิตอาณาจักรพืช
        </button>

        {/* Zone 2: Concise single-line text links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[#2E523B]">
          <button
            type="button"
            onClick={onNavigateHome}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer py-1 border-b-2 ${
              currentScreen === 'TITLE_MENU'
                ? 'text-[#14532D] border-[#16A34A]'
                : 'border-transparent hover:text-[#14532D] hover:border-[#86EFAC]'
            }`}
          >
            หน้าแรก
          </button>
          <button
            type="button"
            onClick={onJumpToRules}
            className="whitespace-nowrap shrink-0 transition-colors cursor-pointer py-1 border-b-2 border-transparent hover:text-[#14532D] hover:border-[#86EFAC]"
          >
            กติกาการเล่น
          </button>
          <button
            type="button"
            onClick={onOpenStudyGuide}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer py-1 border-b-2 ${
              currentScreen === 'STUDY_GUIDE'
                ? 'text-[#14532D] border-[#16A34A]'
                : 'border-transparent hover:text-[#14532D] hover:border-[#86EFAC]'
            }`}
          >
            สรุปบทเรียน
          </button>
        </nav>

        {/* Zone 3: Single primary action */}
        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={onOpenSetup}
            className="px-4 py-2 text-sm font-semibold text-white bg-[#16A34A] hover:bg-[#15803D] active:scale-[0.98] rounded-xl transition-all whitespace-nowrap shrink-0 cursor-pointer shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16A34A] focus-visible:ring-offset-2"
          >
            {isPlaying ? 'เริ่มเกมใหม่' : 'เริ่มเกมเลย'}
          </button>
        </div>
      </div>
    </header>
  );
}
