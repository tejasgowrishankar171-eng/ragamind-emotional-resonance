import { useEffect, useRef, useState } from "react";

// Semitone offsets for Carnatic swaras (relative to Sa)
const SWARA_SEMITONES: Record<string, number> = {
  S: 0,
  R1: 1,
  R2: 2,
  R3: 3,
  G1: 2,
  G2: 3,
  G3: 4,
  M1: 5,
  M2: 6,
  P: 7,
  D1: 8,
  D2: 9,
  D3: 10,
  N1: 9,
  N2: 10,
  N3: 11,
  "S'": 12,
};

const BASE_HZ = 196; // G3 — a comfortable male tonic (Sa)

export function RagaPlayer({
  arohana,
  avarohana,
}: {
  arohana: string[];
  avarohana: string[];
}) {
  const [playing, setPlaying] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const stopRef = useRef<(() => void) | null>(null);

  useEffect(() => () => stopRef.current?.(), []);

  const stop = () => {
    stopRef.current?.();
    stopRef.current = null;
    setPlaying(false);
  };

  const play = async () => {
    if (playing) return stop();

    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    const ctx = ctxRef.current ?? new AudioCtx();
    ctxRef.current = ctx;
    await ctx.resume();

    const notes = [...arohana, ...avarohana];
    const dur = 0.45;
    const start = ctx.currentTime + 0.05;

    const master = ctx.createGain();
    master.gain.value = 0.9;
    master.connect(ctx.destination);

    // Tanpura-like drone on Sa + Pa
    const droneNodes = [BASE_HZ / 2, (BASE_HZ * 3) / 4].map((hz) => {
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.value = hz;
      g.gain.value = 0;
      g.gain.linearRampToValueAtTime(0.05, start + 0.4);
      osc.connect(g).connect(master);
      osc.start(start);
      return { osc, g };
    });

    notes.forEach((n, i) => {
      const semis = SWARA_SEMITONES[n] ?? 0;
      const t = start + i * dur;
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = BASE_HZ * Math.pow(2, semis / 12);
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(0.22, t + 0.06);
      g.gain.exponentialRampToValueAtTime(0.001, t + dur * 0.95);
      osc.connect(g).connect(master);
      osc.start(t);
      osc.stop(t + dur);
    });

    const total = notes.length * dur;
    droneNodes.forEach(({ osc, g }) => {
      g.gain.setTargetAtTime(0, start + total, 0.3);
      osc.stop(start + total + 1.2);
    });

    const timer = setTimeout(() => setPlaying(false), (total + 0.6) * 1000);
    stopRef.current = () => {
      clearTimeout(timer);
      master.disconnect();
      droneNodes.forEach(({ osc }) => {
        try {
          osc.stop();
        } catch {
          /* already stopped */
        }
      });
    };
    setPlaying(true);
  };

  return (
    <button
      type="button"
      onClick={play}
      aria-label={playing ? "Stop the scale" : "Play the scale"}
      className="inline-flex items-center gap-2 rounded-lg border border-primary/40 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary/20"
    >
      <span aria-hidden="true">{playing ? "■" : "▶"}</span>
      {playing ? "Stop scale" : "Play the scale"}
    </button>
  );
}
