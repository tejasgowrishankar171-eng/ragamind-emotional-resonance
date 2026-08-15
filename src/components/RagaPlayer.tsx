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

const BASE_HZ = 174.6; // F3 — a warm male tonic (Sa)

/** Deterministic PRNG so each raga always sings the same alapana. */
function seeded(seed: string) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return () => {
    h ^= h << 13;
    h ^= h >>> 17;
    h ^= h << 5;
    return ((h >>> 0) % 100000) / 100000;
  };
}

type Note = { semis: number; dur: number; glide: boolean };

/**
 * Builds an alapana-like melodic line: slow low-register opening, gradual
 * ascent, a peak around the upper Sa, then a settled descent to the tonic.
 */
function buildAlapana(arohana: string[], avarohana: string[], seed: string) {
  const rand = seeded(seed);
  const up = arohana.map((s) => SWARA_SEMITONES[s] ?? 0);
  const down = avarohana.map((s) => SWARA_SEMITONES[s] ?? 0);
  const low = up.filter((s) => s < 12).map((s) => s - 12);

  const notes: Note[] = [];
  const push = (semis: number, dur: number, glide = true) =>
    notes.push({ semis, dur, glide });

  // 1. Opening: settle on Sa, touch the note below, return.
  push(0, 1.5, false);
  push(low[low.length - 1] ?? -3, 0.7);
  push(0, 1.3);

  // 2. Slow ascent in overlapping waves through the arohana.
  for (let i = 1; i < up.length - 1; i++) {
    push(up[i], 0.55 + rand() * 0.4);
    if (rand() > 0.45) push(up[i - 1], 0.35 + rand() * 0.2);
    push(up[i], 0.5 + rand() * 0.5);
    if (rand() > 0.6 && i + 1 < up.length) push(up[i + 1], 0.4);
  }

  // 3. Peak on the upper tonic, held.
  push(12, 1.8, true);
  push(down[1] ?? 11, 0.5);
  push(12, 1.2);

  // 4. Descent, lingering on the characteristic notes.
  for (let i = 1; i < down.length; i++) {
    push(down[i], 0.55 + rand() * 0.45);
    if (rand() > 0.55) push(down[i - 1], 0.3 + rand() * 0.2);
  }

  // 5. Resolution.
  push(low[low.length - 1] ?? -3, 0.6);
  push(0, 2.4, true);
  return notes;
}

/** Small hall reverb so the voice is not dry. */
function makeReverb(ctx: AudioContext) {
  const seconds = 2.2;
  const rate = ctx.sampleRate;
  const len = Math.floor(rate * seconds);
  const buf = ctx.createBuffer(2, len, rate);
  for (let ch = 0; ch < 2; ch++) {
    const data = buf.getChannelData(ch);
    for (let i = 0; i < len; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 2.6);
    }
  }
  const conv = ctx.createConvolver();
  conv.buffer = buf;
  return conv;
}

export function RagaPlayer({
  ragaName,
  arohana,
  avarohana,
}: {
  ragaName: string;
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

    const start = ctx.currentTime + 0.15;
    const notes = buildAlapana(arohana, avarohana, ragaName);
    const total = notes.reduce((a, n) => a + n.dur, 0);

    const master = ctx.createGain();
    master.gain.value = 0.85;
    master.connect(ctx.destination);

    const reverb = makeReverb(ctx);
    const wet = ctx.createGain();
    wet.gain.value = 0.28;
    reverb.connect(wet).connect(master);

    // ---- Tanpura: repeating Pa – Sa – Sa – Sa̱ pluck cycle ----
    const tanpuraBus = ctx.createGain();
    tanpuraBus.gain.value = 0.5;
    tanpuraBus.connect(master);
    tanpuraBus.connect(reverb);

    const pluck = (hz: number, t: number) => {
      const osc = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const g = ctx.createGain();
      const lp = ctx.createBiquadFilter();
      lp.type = "lowpass";
      lp.frequency.setValueAtTime(2600, t);
      lp.frequency.exponentialRampToValueAtTime(700, t + 1.6);
      osc.type = "sawtooth";
      osc2.type = "triangle";
      osc.frequency.value = hz;
      osc2.frequency.value = hz * 2.005;
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(0.09, t + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0015, t + 2.4);
      osc.connect(lp);
      osc2.connect(lp);
      lp.connect(g).connect(tanpuraBus);
      osc.start(t);
      osc2.start(t);
      osc.stop(t + 2.5);
      osc2.stop(t + 2.5);
      return [osc, osc2];
    };

    const oscillators: OscillatorNode[] = [];
    const cycle = [
      (BASE_HZ * 3) / 4, // Pa below
      BASE_HZ,
      BASE_HZ,
      BASE_HZ / 2, // Sa low
    ];
    const step = 0.85;
    for (let i = 0; start + i * step < start + total + 1.5; i++) {
      oscillators.push(...pluck(cycle[i % cycle.length], start + i * step));
    }

    // ---- Voice: formant-filtered "aa" with vibrato and gamaka glides ----
    const voiceIn = ctx.createGain();
    voiceIn.gain.value = 1;
    const voiceOut = ctx.createGain();
    voiceOut.gain.value = 0.9;
    voiceOut.connect(master);
    voiceOut.connect(reverb);

    // Three formants approximating an open vowel sung by a male voice.
    ([
      [700, 90, 1],
      [1180, 110, 0.55],
      [2600, 160, 0.22],
    ] as const).forEach(([f, bw, amp]) => {
      const bp = ctx.createBiquadFilter();
      bp.type = "bandpass";
      bp.frequency.value = f;
      bp.Q.value = f / bw;
      const g = ctx.createGain();
      g.gain.value = amp;
      voiceIn.connect(bp).connect(g).connect(voiceOut);
    });
    // A little direct body so it is not too nasal.
    const body = ctx.createBiquadFilter();
    body.type = "lowpass";
    body.frequency.value = 900;
    const bodyGain = ctx.createGain();
    bodyGain.gain.value = 0.35;
    voiceIn.connect(body).connect(bodyGain).connect(voiceOut);

    const vocalOsc = ctx.createOscillator();
    vocalOsc.type = "sawtooth";
    const breath = ctx.createOscillator();
    breath.type = "sine";
    const breathGain = ctx.createGain();
    breathGain.gain.value = 0.12;

    const env = ctx.createGain();
    env.gain.value = 0;
    vocalOsc.connect(env);
    breath.connect(breathGain).connect(env);
    env.connect(voiceIn);

    // Vibrato
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 5.2;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 4.5; // cents-ish in Hz at this register
    lfo.connect(lfoGain);
    lfoGain.connect(vocalOsc.frequency);
    lfoGain.connect(breath.frequency);

    const hz = (semis: number) => BASE_HZ * Math.pow(2, semis / 12);
    let t = start;
    vocalOsc.frequency.setValueAtTime(hz(notes[0].semis), t);
    breath.frequency.setValueAtTime(hz(notes[0].semis) * 2, t);

    notes.forEach((n, i) => {
      const target = hz(n.semis);
      const glideTime = n.glide ? Math.min(0.28, n.dur * 0.5) : 0.05;
      vocalOsc.frequency.exponentialRampToValueAtTime(target, t + glideTime);
      breath.frequency.exponentialRampToValueAtTime(target * 2, t + glideTime);

      // Gentle breath-shaped amplitude per note, legato between them.
      const peak = i === 0 ? 0.2 : 0.26;
      env.gain.linearRampToValueAtTime(peak, t + Math.min(0.18, n.dur * 0.4));
      env.gain.linearRampToValueAtTime(peak * 0.72, t + n.dur * 0.92);
      t += n.dur;
    });
    env.gain.linearRampToValueAtTime(0, t + 0.5);

    vocalOsc.start(start);
    breath.start(start);
    lfo.start(start);
    vocalOsc.stop(t + 0.8);
    breath.stop(t + 0.8);
    lfo.stop(t + 0.8);
    oscillators.push(vocalOsc, breath, lfo);

    // Fade the tanpura out with the voice.
    tanpuraBus.gain.setTargetAtTime(0, t - 0.5, 0.6);

    const timer = setTimeout(
      () => setPlaying(false),
      (total + 1.2) * 1000,
    );
    stopRef.current = () => {
      clearTimeout(timer);
      try {
        master.gain.cancelScheduledValues(ctx.currentTime);
        master.gain.setTargetAtTime(0, ctx.currentTime, 0.08);
      } catch {
        /* noop */
      }
      oscillators.forEach((o) => {
        try {
          o.stop(ctx.currentTime + 0.3);
        } catch {
          /* already stopped */
        }
      });
      setTimeout(() => master.disconnect(), 500);
    };
    setPlaying(true);
  };

  return (
    <button
      type="button"
      onClick={play}
      aria-label={playing ? "Stop the alapana" : `Play a ${ragaName} alapana`}
      className="inline-flex items-center gap-2 rounded-lg border border-primary/40 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary/20"
    >
      <span aria-hidden="true">{playing ? "■" : "▶"}</span>
      {playing ? "Stop alapana" : "Play alapana"}
    </button>
  );
}
