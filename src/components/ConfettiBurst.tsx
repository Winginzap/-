import { Sparkles } from 'lucide-react';

interface ConfettiBurstProps {
  points: number;
  visible: boolean;
}

const CONFETTI_PIECES = [
  { left: '12%', delay: '0ms', color: '#16A34A', tx: '-26px', rot: '220deg' },
  { left: '22%', delay: '40ms', color: '#FACC15', tx: '34px', rot: '-260deg' },
  { left: '34%', delay: '20ms', color: '#22C55E', tx: '-18px', rot: '310deg' },
  { left: '46%', delay: '60ms', color: '#F59E0B', tx: '28px', rot: '290deg' },
  { left: '56%', delay: '10ms', color: '#10B981', tx: '-30px', rot: '-240deg' },
  { left: '68%', delay: '50ms', color: '#EAB308', tx: '22px', rot: '340deg' },
  { left: '78%', delay: '30ms', color: '#4ADE80', tx: '-22px', rot: '-300deg' },
  { left: '88%', delay: '70ms', color: '#FBBF24', tx: '18px', rot: '260deg' },
];

export function ConfettiBurst({ points, visible }: ConfettiBurstProps) {
  if (!visible) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-40 overflow-hidden flex items-start justify-center pt-28"
      aria-hidden="true"
    >
      <div className="relative w-full max-w-2xl h-64">
        {CONFETTI_PIECES.map((piece, idx) => (
          <span
            key={idx}
            style={{
              left: piece.left,
              animationDelay: piece.delay,
              backgroundColor: piece.color,
              ['--tx' as string]: piece.tx,
              ['--rot' as string]: piece.rot,
            }}
            className="animate-confetti-piece absolute top-4 w-3 h-3.5 rounded-xs opacity-0"
          />
        ))}

        <div className="animate-float-score mx-auto w-fit px-6 py-3 rounded-2xl bg-[#16A34A] text-white shadow-lg border-2 border-[#FDE047] flex items-center gap-2.5">
          <Sparkles className="w-5 h-5 text-[#FDE047]" />
          <span className="font-display text-2xl font-bold tabular-nums">
            +{points} คะแนน!
          </span>
        </div>
      </div>
    </div>
  );
}
