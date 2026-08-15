import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { RagaPlayer } from "@/components/RagaPlayer";
import { featuredRagas, type Raga } from "@/data/ragas";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ragamind — Feel the Raga" },
      {
        name: "description",
        content:
          "Discover how Carnatic ragas shape emotion. Learn which ragas evoke happiness, devotion, sorrow, peace, and energy.",
      },
      {
        property: "og:title",
        content: "Ragamind — Feel the Raga",
      },
      {
        property: "og:description",
        content:
          "Discover how Carnatic ragas shape emotion. Learn which ragas evoke happiness, devotion, sorrow, peace, and energy.",
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

function RagaCard({ raga }: { raga: Raga }) {
  const [open, setOpen] = useState(false);
  const panelId = `raga-${raga.name.toLowerCase()}`;

  return (
    <div className="rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/30">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-2xl font-semibold">{raga.name}</h3>
          {raga.altName ? (
            <p className="mt-1 text-xs text-muted-foreground">{raga.altName}</p>
          ) : null}
          <p className="mt-1 text-sm font-medium text-primary">
            {raga.feeling}
          </p>
        </div>
        <span className="rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground">
          {raga.emotion}
        </span>
      </div>

      <p className="mt-4 leading-relaxed text-muted-foreground">
        {raga.description}
      </p>

      <p className="mt-4 font-mono text-xs leading-relaxed text-muted-foreground">
        {raga.scaleLabel}
      </p>

      <div className="mt-5 flex flex-wrap gap-3">
        <RagaPlayer arohana={raga.arohana} avarohana={raga.avarohana} />
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
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="gradient-hero relative overflow-hidden px-6 pb-24 pt-20 md:px-12 lg:pb-32 lg:pt-28">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="mb-4 inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                Carnatic Music & Emotion
              </p>
              <h1 className="text-5xl font-bold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
                Ragamind
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground md:text-xl">
                Every raga carries a feeling. Explore how the ancient scales of
                South Indian classical music shape happiness, devotion, sorrow,
                serenity, and energy.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="#emotions"
                  className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-base font-semibold text-primary-foreground transition-all hover:bg-primary/90 glow-primary"
                >
                  Explore Emotions
                </a>
                <a
                  href="#featured"
                  className="inline-flex items-center justify-center rounded-lg border border-input bg-background px-6 py-3 text-base font-semibold text-foreground transition-all hover:bg-secondary"
                >
                  Meet the Ragas
                </a>
              </div>
            </div>

            <div className="relative w-full max-w-md lg:max-w-lg">
              <div className="absolute -inset-4 rounded-3xl bg-primary/10 blur-3xl" />
              <img
                src="/images/hero-ragamind.jpg"
                alt="Abstract sound waves and tanpura motifs in deep blue and black"
                className="relative rounded-2xl border border-white/10 shadow-2xl"
                width={640}
                height={480}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="px-6 py-20 md:px-12">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            What is a Raga?
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            A raga is more than a scale — it is a living mood. Built from a
            specific set of notes and ornamentation, each raga is associated with
            a <span className="text-foreground">rasa</span>: an emotional essence
            that colors every phrase. Ragamind helps you listen with awareness,
            connecting sound to feeling.
          </p>
        </div>
      </section>

      {/* Emotions grid */}
      <section id="emotions" className="px-6 py-20 md:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Emotions by Raga
            </h2>
            <p className="mt-4 text-muted-foreground">
              Click a mood to learn which ragas bring it to life.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {emotions.map((emotion) => (
              <div
                key={emotion.title}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/30 hover:bg-card/80"
              >
                <div
                  className="absolute left-0 top-0 h-1 w-full opacity-60 transition-opacity group-hover:opacity-100"
                  style={{ backgroundColor: emotion.tone }}
                />
                <h3 className="text-xl font-semibold">{emotion.title}</h3>
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
            ))}
          </div>
        </div>
      </section>

      {/* Featured ragas */}
      <section id="featured" className="px-6 py-20 md:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Featured Ragas
            </h2>
            <p className="mt-4 text-muted-foreground">
              Play each scale in your browser, then open a full concert
              performance and read what shapes its mood.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {featuredRagas.map((raga) => (
              <RagaCard key={raga.name} raga={raga} />
            ))}
          </div>

          <p className="mt-8 text-center text-xs text-muted-foreground">
            Scale structures and melakarta numbering follow the Chaturdandi
            Prakasika tradition and standard references (Sambamoorthy,
            <em> South Indian Music</em>); emotion findings draw on
            cross-cultural raga-and-affect research such as Balkwill &amp;
            Thompson (1999).
          </p>

        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20 md:px-12">
        <div className="mx-auto max-w-4xl rounded-3xl border border-border bg-card p-10 text-center md:p-16">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Start Listening with Intention
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground">
            The more you understand the emotion behind each raga, the deeper
            your connection to Carnatic music becomes.
          </p>
          <a
            href="#emotions"
            className="mt-8 inline-flex items-center justify-center rounded-lg bg-primary px-8 py-3.5 text-base font-semibold text-primary-foreground transition-all hover:bg-primary/90 glow-primary"
          >
            Explore the Moods
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border px-6 py-10 md:px-12">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight">Ragamind</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Educating the world about the emotional power of Carnatic ragas.
          </p>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Ragamind
          </p>
        </div>
      </footer>
    </main>
  );
}
