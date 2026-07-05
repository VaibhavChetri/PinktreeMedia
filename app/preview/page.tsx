/* TEMPORARY comparison mockup — three tonal directions for the redesign.
   Throwaway route: delete before real execution. Not committed. */
import Image from "next/image";

const FR = {
  fontFamily: "var(--font-fraunces)",
  fontWeight: 400,
  fontVariationSettings: '"opsz" 144, "SOFT" 30, "WONK" 0',
} as const;
const GS = { fontFamily: "var(--font-general-sans)" } as const;

type Palette = {
  key: string;
  name: string;
  bg: string;
  text: string;
  rose: string; // accent word / line (legible on this bg)
  meta: string;
  line: string;
  note: string;
};

const NIGHT: Palette = {
  key: "night",
  name: "01 · Night gallery",
  bg: "#191016",
  text: "#F6EEF0",
  rose: "#E486B3",
  meta: "#9E8E9A",
  line: "rgba(228,134,179,0.5)",
  note: "Dark-dominant. Pearl sections rare. Rose as glowing light.",
};
const BONE: Palette = {
  key: "bone",
  name: "02 · Bone editorial",
  bg: "#F6EEF0",
  text: "#191016",
  rose: "#B85C8B", // rose-deep for contrast on light
  meta: "#9E8E9A",
  line: "rgba(184,92,139,0.45)",
  note: "Light-dominant, pink-cast pearl. Dark hero is the one dark moment.",
};

function Eyebrow({ p }: { p: Palette }) {
  return (
    <p
      style={{
        ...GS,
        color: p.meta,
        fontSize: 11,
        fontWeight: 500,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
      }}
    >
      The consultancy
    </p>
  );
}

function Body({ p }: { p: Palette }) {
  return (
    <>
      {/* who we are */}
      <div style={{ marginTop: 40, maxWidth: 760 }}>
        <Eyebrow p={p} />
        <h2
          style={{
            ...FR,
            color: p.text,
            fontSize: "clamp(30px, 4.4vw, 56px)",
            lineHeight: 1.02,
            letterSpacing: "-0.03em",
            marginTop: 20,
          }}
        >
          Complete marketing for{" "}
          <span style={{ color: p.rose }}>ambitious</span> brands, handled
          entirely under one roof.
        </h2>
      </div>

      {/* the signature line */}
      <div
        style={{
          height: 1,
          width: "100%",
          background: p.line,
          margin: "48px 0",
        }}
      />

      {/* selected work row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.1fr 1fr",
          gap: 48,
          alignItems: "center",
        }}
      >
        <div style={{ position: "relative", aspectRatio: "3 / 2" }}>
          <Image
            src="/images/chigwell-marquee-night.jpg"
            alt=""
            fill
            sizes="50vw"
            style={{ objectFit: "cover" }}
          />
        </div>
        <div>
          <p
            style={{
              ...GS,
              color: p.meta,
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            Selected work
          </p>
          <h3
            style={{
              ...FR,
              color: p.text,
              fontSize: "clamp(26px, 3vw, 40px)",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              marginTop: 14,
            }}
          >
            The Chigwell Marquees
          </h3>
          <p style={{ ...GS, color: p.text, opacity: 0.72, marginTop: 12, maxWidth: 380, lineHeight: 1.5 }}>
            A complete brand world for an exceptional private venue.
          </p>
          <p
            style={{
              ...GS,
              color: p.rose,
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              marginTop: 24,
              display: "flex",
              alignItems: "center",
              gap: 14,
            }}
          >
            View case study
            <span style={{ width: 40, height: 1, background: p.rose, display: "inline-block" }} />
          </p>
        </div>
      </div>

      {/* closing */}
      <h2
        style={{
          ...FR,
          color: p.text,
          fontSize: "clamp(28px, 4vw, 52px)",
          lineHeight: 1.05,
          letterSpacing: "-0.03em",
          marginTop: 72,
        }}
      >
        Start a <span style={{ color: p.rose }}>conversation.</span>
      </h2>
    </>
  );
}

function Panel({ p }: { p: Palette }) {
  return (
    <section style={{ background: p.bg }} data-panel={p.key}>
      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "80px clamp(24px,6vw,80px)" }}>
        <p style={{ ...GS, color: p.rose, fontSize: 12, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase" }}>
          {p.name}
        </p>
        <p style={{ ...GS, color: p.meta, fontSize: 13, marginTop: 6 }}>{p.note}</p>
        <Body p={p} />
      </div>
    </section>
  );
}

// Dusk: one panel whose background moves dark -> pearl; text adapts per band.
function DuskPanel() {
  return (
    <section
      data-panel="dusk"
      style={{ background: "linear-gradient(to bottom, #191016 0%, #2A1C28 30%, #6A4E63 55%, #C9A9BE 78%, #F6EEF0 100%)" }}
    >
      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "80px clamp(24px,6vw,80px)" }}>
        <p style={{ ...GS, color: "#E486B3", fontSize: 12, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase" }}>
          03 · Dusk (split-tone)
        </p>
        <p style={{ ...GS, color: "#C9A9BE", fontSize: 13, marginTop: 6 }}>
          Background moves dark → pearl as you scroll; the rose line draws down through it.
        </p>

        {/* top band — on dark */}
        <div style={{ marginTop: 40, maxWidth: 760 }}>
          <p style={{ ...GS, color: "#B49AAE", fontSize: 11, fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase" }}>
            The consultancy
          </p>
          <h2 style={{ ...FR, color: "#F6EEF0", fontSize: "clamp(30px,4.4vw,56px)", lineHeight: 1.02, letterSpacing: "-0.03em", marginTop: 20 }}>
            Complete marketing for <span style={{ color: "#E486B3" }}>ambitious</span> brands.
          </h2>
        </div>

        <div style={{ height: 220, width: 1, background: "linear-gradient(#E486B3, rgba(228,134,179,0.2))", margin: "40px auto" }} />

        {/* bottom band — on pearl */}
        <div style={{ maxWidth: 760, marginLeft: "auto", textAlign: "right" }}>
          <h3 style={{ ...FR, color: "#191016", fontSize: "clamp(26px,3vw,40px)", lineHeight: 1.05, letterSpacing: "-0.02em" }}>
            Start a <span style={{ color: "#B85C8B" }}>conversation.</span>
          </h3>
          <p style={{ ...GS, color: "#5A4A55", marginTop: 12 }}>
            By the footer, you have arrived in daylight.
          </p>
        </div>
      </div>
    </section>
  );
}

export default function PreviewPage() {
  return (
    <main style={{ paddingTop: 72 }}>
      <Panel p={NIGHT} />
      <Panel p={BONE} />
      <DuskPanel />
    </main>
  );
}
