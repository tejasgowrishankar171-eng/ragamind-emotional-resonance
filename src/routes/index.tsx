import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { RagaPlayer } from "@/components/RagaPlayer";
import { Reveal } from "@/components/Reveal";
import { SiteHeader } from "@/components/SiteHeader";
import { featuredRagas, type Raga } from "@/data/ragas";
import logo from "@/assets/ragamind-logo.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ragamind — Feel the Raga" },
      {
        name: "description",
        content:
          "Discover how Carnatic ragas shape emotion. Learn what a raga is from scratch, then hear which ones evoke happiness, devotion, sorrow, peace, and energy.",
      },
      { property: "og:title", content: "Ragamind — Feel the Raga" },
      {
        property: "og:description",
        content:
          "Discover how Carnatic ragas shape emotion. Learn what a raga is from scratch, then hear which ones evoke happiness, devotion, sorrow, peace, and energy.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const emotions = [
  {
    title: "Happiness",
    description: "Bright, uplifting scales that spark joy and celebration.",
    ragas: ["Shankarabharanam", "Mohanam", "Hamsadhwani"],
    tone: "oklch(0.75 0.12 85)",
  },
  {
    title: "Devotion",
    description: "Sacred moods that open the heart toward the divine.",
    ragas: ["Kalyani", "Bhairavi", "Hamsadhwani"],
    tone: "oklch(0.6 0.14 260)",
  },
  {
    title: "Sadness",
    description: "Melancholic phrases that carry longing and compassion.",
    ragas: ["Kharaharapriya", "Subhapanthuvarali", "Bhairavi"],
    tone: "oklch(0.55 0.1 260)",
  },
  {
    title: "Peace",
    description: "Calm, centered melodies that quiet the mind.",
    ragas: ["Madhyamavati", "Shuddha Saveri", "Neelambari"],
    tone: "oklch(0.7 0.08 190)",
  },
  {
    title: "Energy",
    description: "Bold, rhythmic patterns that drive momentum and vigor.",
    ragas: ["Nata", "Atana", "Varali"],
    tone: "oklch(0.65 0.16 30)",
  },
  {
    title: "Love",
    description: "Romantic, tender phrases that express beauty and longing.",
    ragas: ["Shankarabharanam", "Kalyani", "Mohanam"],
    tone: "oklch(0.7 0.14 340)",
  },
];

const ragaBasics = [
  {
    step: "01",
    title: "A raga is a melodic framework",
    body: "Not a song and not simply a scale: a raga is a set of rules about which notes may be used, how they must be approached, and which of them the melody leans on. Two ragas can share the same notes and still be entirely different ragas.",
  },
  {
    step: "02",
    title: "It is built from seven swaras",
    body: "Carnatic music names its notes Sa, Ri, Ga, Ma, Pa, Da, Ni — comparable to do-re-mi. Sa is the tonic, chosen to suit the singer's voice; everything else is heard in relation to it, which is why a raga sounds the same in any key.",
  },
  {
    step: "03",
    title: "Movement matters more than pitch",
    body: "Each raga has an arohana (ascent) and avarohana (descent), and notes are bent, oscillated and slid into with ornaments called gamaka. That living movement — not the bare scale — is what gives a raga its recognisable face.",
  },
  {
    step: "04",
    title: "Every raga carries a rasa",
    body: "Rasa is the emotional flavour a raga evokes: joy, compassion, devotion, courage, wonder, peace. Musicians reveal it in an unmetered opening improvisation called alapana, before any composition or rhythm begins.",
  },
];

const glossary = [
  { term: "Raga", meaning: "A melodic framework with a distinct mood" },
  { term: "Swara", meaning: "A musical note (Sa, Ri, Ga, Ma, Pa, Da, Ni)" },
  { term: "Sa", meaning: "The tonic — the home note everything orbits" },
  { term: "Gamaka", meaning: "Ornament: a slide, shake or oscillation" },
  { term: "Alapana", meaning: "Free, unmetered exploration of a raga" },
  { term: "Rasa", meaning: "The emotional essence a raga evokes" },
  { term: "Melakarta", meaning: "One of 72 parent scales ragas derive from" },
  { term: "Tanpura", meaning: "The drone instrument holding Sa and Pa" },
];

function SectionLabel({ children }: { children: string }) {
  return (
    <p className="mb-4 flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
      <span aria-hidden="true" className="h-px w-8 bg-primary/40" />
      {children}
      <span aria-hidden="true" className="h-px w-8 bg-primary/40" />
    </p>
  );
}

function RagaCard({ raga }: { raga: Raga }) {
  const [open, setOpen] = useState(false);
  const panelId = `raga-${raga.name.toLowerCase()}`;

  return (
    <div className="card-lux rounded-2xl p-6 hover:card-lux-hover">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-display text-2xl font-semibold">{raga.name}</h3>
          {raga.altName ? (
            <p className="mt-1 text-xs text-muted-foreground">{raga.altName}</p>
          ) : null}
          <p className="mt-1 text-sm font-medium text-primary">
            {raga.feeling}
          </p>
        </div>
        <span className="rounded-full border border-border bg-background/60 px-3 py-1 text-xs font-medium text-muted-foreground">
          {raga.emotion}
        </span>
      </div>

      <p className="mt-4 leading-relaxed text-muted-foreground">
        {raga.description}
      </p>

      <p className="mt-4 rounded-lg border border-border/60 bg-background/40 px-3 py-2 font-mono text-xs leading-relaxed text-muted-foreground">
        {raga.scaleLabel}
      </p>

      <div className="mt-5 flex flex-wrap gap-3">
        <a
          href={`https://www.youtube.com/watch?v=${raga.video.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg border border-primary/40 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary/20"
        >
          <span aria-hidden="true">▶</span>
          Watch alapana · {raga.video.artist}
        </a>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={panelId}
          className="inline-flex items-center gap-2 rounded-lg border border-input px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
        >
          {open ? "Hide details" : "Listen & learn"}
        </button>
      </div>

      {open ? (
        <div id={panelId} className="mt-6 border-t border-border pt-5">
          <ul className="space-y-3 text-sm leading-relaxed text-muted-foreground">
            {raga.bullets.map((point) => (
              <li key={point} className="flex gap-3">
                <span aria-hidden="true" className="mt-1 text-primary">
                  •
                </span>
                <span>{point}</span>
              </li>
            ))}
          </ul>

          <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-foreground">
            Full performances
          </p>
          <div className="mt-3 flex flex-wrap gap-3">
            {raga.listen.map((item) => (
              <a
                key={item.artist}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground transition-colors hover:bg-secondary/70"
              >
                {item.artist}
                <span aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Concert recordings open on the artists' official channels, so
            performers keep full credit for their work.
          </p>
        </div>
      ) : null}
    </div>
  );
}

function Index() {
  return (
    <main id="top" className="relative min-h-screen bg-background text-foreground">
      {/* Ambient light + grain */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="orb absolute -left-32 top-10 size-96 bg-primary/20" />
        <div className="orb-slow absolute -right-24 top-1/3 size-[28rem] bg-[oklch(0.45_0.1_220_/_0.18)]" />
        <div className="orb absolute bottom-0 left-1/3 size-80 bg-[oklch(0.4_0.09_300_/_0.16)]" />
        <div className="grain-overlay absolute inset-0" />
      </div>

      <div className="relative z-10">
        <SiteHeader />

        {/* Hero */}
        <section className="gradient-hero relative overflow-hidden px-6 pb-24 pt-14 md:px-12 lg:pb-32 lg:pt-20">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-col items-start gap-14 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <Reveal>
                  <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                    <span aria-hidden="true" className="size-1.5 rounded-full bg-primary" />
                    Carnatic Music & Emotion
                  </p>
                </Reveal>
                <Reveal delay={80}>
                  <h1 className="text-aurora font-display text-6xl font-bold leading-[1.02] tracking-tight md:text-7xl lg:text-8xl">
                    Ragamind
                  </h1>
                </Reveal>
                <Reveal delay={160}>
                  <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl">
                    Every raga carries a feeling. Start with no background at
                    all — learn what a raga actually is, then hear how the
                    melodic worlds of South Indian classical music shape joy,
                    devotion, sorrow, serenity and energy.
                  </p>
                </Reveal>
                <Reveal delay={240}>
                  <div className="mt-9 flex flex-wrap gap-4">
                    <a
                      href="#what-is-a-raga"
                      className="glow-primary inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-base font-semibold text-primary-foreground transition-all hover:bg-primary/90"
                    >
                      Start from zero
                    </a>
                    <a
                      href="#featured"
                      className="inline-flex items-center justify-center rounded-lg border border-input bg-background/60 px-6 py-3 text-base font-semibold text-foreground backdrop-blur transition-all hover:bg-secondary"
                    >
                      Hear an alapana
                    </a>
                  </div>
                </Reveal>
                <Reveal delay={320}>
                  <dl className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-border pt-6">
                    {[
                      ["72", "parent scales"],
                      ["7", "swaras"],
                      ["9", "classical rasas"],
                    ].map(([n, label]) => (
                      <div key={label}>
                        <dt className="font-display text-2xl font-bold text-foreground">
                          {n}
                        </dt>
                        <dd className="text-xs uppercase tracking-wider text-muted-foreground">
                          {label}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </Reveal>
              </div>

              <Reveal delay={200} className="w-full max-w-md lg:max-w-lg">
                <div className="relative">
                  <div className="absolute -inset-6 rounded-full bg-primary/10 blur-3xl" />
                  <div className="relative mx-auto flex aspect-square max-w-md items-center justify-center">
                    <span
                      aria-hidden="true"
                      className="pulse-ring absolute inset-6 rounded-full border border-primary/25"
                    />
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 rounded-full border border-border"
                    />
                    <img
                      src={logo}
                      alt="Ragamind emblem: a veena neck and lotus enclosed by a circular soundwave"
                      width={816}
                      height={816}
                      className="relative w-3/4 object-contain drop-shadow-[0_0_45px_oklch(0.55_0.14_260_/_0.55)]"
                    />
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <div className="rule-fade mx-auto max-w-6xl" />

        {/* What is a raga — beginner primer */}
        <section id="what-is-a-raga" className="px-6 py-24 md:px-12">
          <div className="mx-auto max-w-6xl">
            <Reveal className="text-center">
              <SectionLabel>Start here</SectionLabel>
              <h2 className="font-display text-3xl font-bold tracking-tight md:text-5xl">
                What is a raga?
              </h2>
              <p className="mx-auto mt-5 max-w-3xl text-lg leading-relaxed text-muted-foreground">
                Never heard Carnatic music before? Here is the whole idea in
                four steps. A{" "}
                <span className="text-foreground">raga</span> is a melodic
                framework — a chosen family of notes, plus strict rules for how
                they move and which of them the melody rests on. It behaves less
                like a scale and more like a character: recognisable, alive, and
                tied to a particular feeling.
              </p>
            </Reveal>

            <div className="mt-14 grid gap-6 md:grid-cols-2">
              {ragaBasics.map((item, i) => (
                <Reveal key={item.step} delay={i * 90}>
                  <div className="card-lux group h-full rounded-2xl p-7 hover:card-lux-hover">
                    <span className="font-mono text-xs tracking-[0.3em] text-primary">
                      {item.step}
                    </span>
                    <h3 className="mt-4 font-display text-xl font-semibold">
                      {item.title}
                    </h3>
                    <p className="mt-3 leading-relaxed text-muted-foreground">
                      {item.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={120}>
              <div className="mt-10 rounded-2xl border border-border bg-card/50 p-7 backdrop-blur">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                  The words you will meet
                </p>
                <dl className="mt-5 grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-4">
                  {glossary.map((g) => (
                    <div key={g.term}>
                      <dt className="font-display text-sm font-semibold text-foreground">
                        {g.term}
                      </dt>
                      <dd className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        {g.meaning}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>

            <Reveal delay={160}>
              <p className="mx-auto mt-10 max-w-3xl border-l-2 border-primary/50 pl-5 font-display text-lg leading-relaxed text-foreground/90 md:text-xl">
                “A raga is that which colours the mind.” The Sanskrit root{" "}
                <em>ranj</em> means to tint or delight — the name itself says
                that the point of a raga is the feeling it leaves behind.
              </p>
            </Reveal>
          </div>
        </section>

        <div className="rule-fade mx-auto max-w-6xl" />

        {/* Emotions grid */}
        <section id="emotions" className="px-6 py-24 md:px-12">
          <div className="mx-auto max-w-6xl">
            <Reveal className="mb-14 text-center">
              <SectionLabel>Rasa map</SectionLabel>
              <h2 className="font-display text-3xl font-bold tracking-tight md:text-5xl">
                Emotions by raga
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
                Each mood below is a rasa, and each raga listed is one of the
                classic ways musicians reach for it.
              </p>
            </Reveal>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {emotions.map((emotion, i) => (
                <Reveal key={emotion.title} delay={i * 70}>
                  <div className="card-lux group h-full overflow-hidden rounded-2xl p-6 hover:card-lux-hover">
                    <div
                      className="absolute left-0 top-0 h-1 w-full opacity-60 transition-opacity group-hover:opacity-100"
                      style={{ backgroundColor: emotion.tone }}
                    />
                    <h3 className="font-display text-xl font-semibold">
                      {emotion.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {emotion.description}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {emotion.ragas.map((raga) => (
                        <span
                          key={raga}
                          className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground"
                        >
                          {raga}
                        </span>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <div className="rule-fade mx-auto max-w-6xl" />

        {/* Featured ragas */}
        <section id="featured" className="px-6 py-24 md:px-12">
          <div className="mx-auto max-w-6xl">
            <Reveal className="mb-14 text-center">
              <SectionLabel>Listening room</SectionLabel>
              <h2 className="font-display text-3xl font-bold tracking-tight md:text-5xl">
                Featured ragas
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
                Press play for a sung alapana over a tanpura drone, then read
                what shapes its mood and open a full concert performance.
              </p>
            </Reveal>

            <div className="grid gap-6 md:grid-cols-2">
              {featuredRagas.map((raga, i) => (
                <Reveal key={raga.name} delay={i * 80}>
                  <RagaCard raga={raga} />
                </Reveal>
              ))}
            </div>

            <p className="mt-10 text-center text-xs text-muted-foreground">
              Scale structures and melakarta numbering follow the Chaturdandi
              Prakasika tradition and standard references (Sambamoorthy,
              <em> South Indian Music</em>); emotion findings draw on
              cross-cultural raga-and-affect research such as Balkwill &amp;
              Thompson (1999).
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 py-24 md:px-12">
          <Reveal>
            <div className="card-lux mx-auto max-w-4xl overflow-hidden rounded-3xl p-10 text-center md:p-16">
              <img
                src={logo}
                alt=""
                aria-hidden="true"
                loading="lazy"
                width={816}
                height={816}
                className="mx-auto mb-6 size-14 object-contain opacity-80"
              />
              <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
                Start listening with intention
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground">
                The more you understand the emotion behind each raga, the deeper
                your connection to Carnatic music becomes.
              </p>
              <a
                href="#emotions"
                className="glow-primary mt-8 inline-flex items-center justify-center rounded-lg bg-primary px-8 py-3.5 text-base font-semibold text-primary-foreground transition-all hover:bg-primary/90"
              >
                Explore the moods
              </a>
            </div>
          </Reveal>
        </section>

        {/* Footer */}
        <footer className="border-t border-border px-6 py-12 md:px-12">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-3">
              <img
                src={logo}
                alt="Ragamind logo"
                loading="lazy"
                width={816}
                height={816}
                className="size-8 object-contain"
              />
              <span className="font-display text-xl font-bold tracking-tight">
                Ragamind
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Educating the world about the emotional power of Carnatic ragas.
            </p>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Ragamind
            </p>
          </div>
        </footer>
      </div>
    </main>
  );
}
