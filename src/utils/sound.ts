// Lightweight Web Audio API sound effects (no external audio assets required)

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (Ctx) {
      audioCtx = new Ctx();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

function playTone(
  frequency: number,
  startTimeOffset: number,
  duration: number,
  type: OscillatorType = 'sine',
  volume = 0.14
) {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime + startTimeOffset;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = type;
  osc.frequency.setValueAtTime(frequency, now);

  gain.gain.setValueAtTime(0.001, now);
  gain.gain.exponentialRampToValueAtTime(volume, now + 0.015);
  gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + duration + 0.02);
}

export function playClickSound(muted: boolean) {
  if (muted) return;
  playTone(540, 0, 0.06, 'triangle', 0.08);
}

export function playCorrectSound(muted: boolean) {
  if (muted) return;
  playTone(523.25, 0, 0.14, 'triangle', 0.14); // C5
  playTone(659.25, 0.09, 0.14, 'triangle', 0.14); // E5
  playTone(783.99, 0.18, 0.24, 'triangle', 0.16); // G5
}

export function playBonusSound(muted: boolean) {
  if (muted) return;
  playTone(523.25, 0, 0.11, 'sine', 0.15); // C5
  playTone(659.25, 0.08, 0.11, 'sine', 0.15); // E5
  playTone(783.99, 0.16, 0.11, 'sine', 0.15); // G5
  playTone(1046.5, 0.24, 0.34, 'triangle', 0.18); // C6
}

export function playWrongSound(muted: boolean) {
  if (muted) return;
  playTone(310, 0, 0.16, 'sawtooth', 0.07);
  playTone(230, 0.14, 0.25, 'sawtooth', 0.07);
}

export function playTickSound(muted: boolean) {
  if (muted) return;
  playTone(880, 0, 0.045, 'sine', 0.05);
}

export function playVictorySound(muted: boolean) {
  if (muted) return;
  const notes = [523.25, 659.25, 783.99, 659.25, 1046.5];
  const offsets = [0, 0.11, 0.22, 0.33, 0.44];
  const durations = [0.12, 0.12, 0.12, 0.12, 0.45];
  notes.forEach((freq, idx) => {
    playTone(freq, offsets[idx], durations[idx], 'triangle', 0.16);
  });
}
