export type Raga = {
  name: string;
  altName?: string;
  feeling: string;
  emotion: string;
  description: string;
  arohana: string[];
  avarohana: string[];
  scaleLabel: string;
  bullets: string[];
  video: { id: string; artist: string; title: string };
  listen: { artist: string; url: string }[];
};

const yt = (q: string) =>
  `https://www.youtube.com/results?search_query=${encodeURIComponent(q)}`;

export const featuredRagas: Raga[] = [
  {
    name: "Shankarabharanam",
    altName: "Dheerasankarabharanam · 29th melakarta",
    feeling: "Joy & Warmth",
    emotion: "Happiness",
    description:
      "A complete, symmetrical scale whose bright intervals give it an open, celebratory glow.",
    arohana: ["S", "R2", "G3", "M1", "P", "D2", "N3", "S'"],
    avarohana: ["S'", "N3", "D2", "P", "M1", "G3", "R2", "S"],
    scaleLabel: "S R₂ G₃ M₁ P D₂ N₃ Ṡ  /  Ṡ N₃ D₂ P M₁ G₃ R₂ S",
    bullets: [
      "A sampoorna (seven-note) melakarta raga — the 29th in the 72-melakarta system codified by Venkatamakhin's Chaturdandi Prakasika.",
      "Its interval pattern matches the Western major scale, which is a large part of why listeners hear it as bright, resolved and optimistic.",
      "Both major third (G₃) and major seventh (N₃) push phrases upward toward the tonic, creating a feeling of arrival rather than tension.",
      "Traditionally treated as an all-hours raga suited to grand, expansive alapana — it carries long concert-opening pieces well.",
      "Landmark compositions include Tyagaraja's 'Endaro Mahanubhavulu' (one of the Pancharatna kritis) and Dikshitar's 'Akshayalinga Vibho'.",
      "Controlled studies of Carnatic ragas (Sriram & U K, International Journal of Interdisciplinary Approaches in Psychology) show that bright, major-type intervals like those here significantly lift positive affect in listeners.",
    ],
    video: { id: "088saQOhP9E", artist: "Sanjay Subrahmanyan", title: "Sankarabharanam alapana — Swararaga Sudha" },
    listen: [
      { artist: "Sanjay Subrahmanyan", url: yt("Sanjay Subrahmanyan Sankarabharanam") },
      { artist: "T.M. Krishna", url: yt("T M Krishna Dheerasankarabharanam") },
    ],
  },
  {
    name: "Kharaharapriya",
    altName: "22nd melakarta",
    feeling: "Compassion & Longing",
    emotion: "Sadness",
    description:
      "Deeply introspective, Kharaharapriya carries empathy and a soft, unforced sorrow.",
    arohana: ["S", "R2", "G2", "M1", "P", "D2", "N2", "S'"],
    avarohana: ["S'", "N2", "D2", "P", "M1", "G2", "R2", "S"],
    scaleLabel: "S R₂ G₂ M₁ P D₂ N₂ Ṡ  /  Ṡ N₂ D₂ P M₁ G₂ R₂ S",
    bullets: [
      "The 22nd melakarta, and the parent of many well-loved janya ragas including Abheri, Sriranjani, Madhyamavati and Sudha Saveri.",
      "Uses the minor-type third (G₂) and minor-type seventh (N₂) — the same interval family as the Western natural minor / Dorian-adjacent modes associated with sadness.",
      "The emotional weight comes less from the notes than from gamaka: slow, weighted oscillations on G₂ and N₂ are what make phrases ache.",
      "Considered a raga of karuna rasa (compassion) rather than despair — Carnatic aesthetics treat sorrow as devotional tenderness, not defeat.",
      "Tyagaraja's 'Chakkani Raja Margamu' and 'Rama Nee Samana Mevaru' are the canonical demonstrations of its range.",
      "Within the Carnatic system this interval family is classed among ragas of karuna rasa — compassion and gentle pathos rather than despair.",
    ],
    video: { id: "yeMTHIbBAVM", artist: "T.M. Krishna", title: "Kharaharapriya alapana" },
    listen: [
      { artist: "Sanjay Subrahmanyan", url: yt("Sanjay Subrahmanyan Kharaharapriya") },
      { artist: "T.M. Krishna", url: yt("T M Krishna Kharaharapriya") },
    ],
  },
  {
    name: "Kalyani",
    altName: "Mechakalyani · 65th melakarta",
    feeling: "Devotion & Radiance",
    emotion: "Devotion",
    description:
      "The raised fourth gives Kalyani a luminous, prayerful lift that opens the heart.",
    arohana: ["S", "R2", "G3", "M2", "P", "D2", "N3", "S'"],
    avarohana: ["S'", "N3", "D2", "P", "M2", "G3", "R2", "S"],
    scaleLabel: "S R₂ G₃ M₂ P D₂ N₃ Ṡ  /  Ṡ N₃ D₂ P M₂ G₃ R₂ S",
    bullets: [
      "The 65th melakarta and one of the most expansive ragas in the system — every note can be elaborated, so it is a favourite for long ragam-tanam-pallavi.",
      "Defined by prati madhyama (M₂, the raised fourth); it corresponds to the Western Lydian mode.",
      "That raised fourth resists settling on the tonic, producing the sense of aspiration and reaching-upward that performers describe as devotional brilliance.",
      "Classed as a sarva-svara gamaka varika rakti raga — all its notes bear ornamentation, which is why it sounds ornate rather than plain.",
      "Traditionally an evening raga, associated with auspiciousness (its name shares a root with 'kalyana', wellbeing).",
      "Key works: Tyagaraja's 'Etavunara', Dikshitar's 'Bhajare Re Chitta' and Shyama Shastri's 'Himagiri Tanaye'.",
    ],
    video: { id: "bMbT7faDZJI", artist: "Sanjay Subrahmanyan", title: "Ragam Kalyani alapana" },
    listen: [
      { artist: "Sanjay Subrahmanyan", url: yt("Sanjay Subrahmanyan Kalyani RTP") },
      { artist: "T.M. Krishna", url: yt("T M Krishna Kalyani") },
    ],
  },
  {
    name: "Mohanam",
    altName: "Janya of Harikambhoji (28th melakarta)",
    feeling: "Serenity",
    emotion: "Peace",
    description:
      "A five-note raga of effortless calm — open, spacious, and universally recognisable.",
    arohana: ["S", "R2", "G3", "P", "D2", "S'"],
    avarohana: ["S'", "D2", "P", "G3", "R2", "S"],
    scaleLabel: "S R₂ G₃ P D₂ Ṡ  /  Ṡ D₂ P G₃ R₂ S",
    bullets: [
      "An audava-audava raga: five notes ascending and five descending, omitting madhyama (M) and nishadha (N) entirely.",
      "Those two omissions remove the scale's strongest points of tension, which is the structural reason it feels uncluttered and restful.",
      "It is a major pentatonic scale, and near-identical scales appear worldwide — Chinese, Japanese, Andean and folk traditions — one of the most widely shared tonal shapes in music.",
      "Because of the wide gaps between notes, Mohanam is carried by long glides and slow phrases rather than dense ornament.",
      "Regarded as an auspicious, any-time raga and often taught early to students for exactly that clarity.",
      "Hear it in Tyagaraja's 'Mohana Rama' and Dikshitar's 'Kadambari Priyayai'.",
    ],
    video: { id: "ZjU3i6SYTP8", artist: "T.M. Krishna", title: "Raga Mohanam alapana" },
    listen: [
      { artist: "Sanjay Subrahmanyan", url: yt("Sanjay Subrahmanyan Mohanam") },
      { artist: "T.M. Krishna", url: yt("T M Krishna Mohanam") },
    ],
  },
];
